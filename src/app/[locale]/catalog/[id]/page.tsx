import { getAccount } from "@/lib/supabase/accounts";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ProductDetail } from "@/components/catalog/product-detail";
import { UserMenu } from "@/components/auth/user-menu";
import { notFound } from "next/navigation";
import { LocaleSwitcherModal } from "@/components/ui/locale-switcher-modal";
import type { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const [product, t] = await Promise.all([
    getAccount(id),
    getTranslations({ locale, namespace: "catalog" }),
  ]);

  if (!product) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: `${product.badge} | ${t("metaDetail")}`,
    description: `${product.badge} - High-tier Apex Legends account at Warung Apex.`,
  };
}

// ponytail: render dinamis penuh — cookies() dari client Supabase bikin route ini
// tidak bisa di-prerender; memaksa SSG hanya menghasilkan 500 static-to-dynamic.
export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;

  // Buyer yang keluar dari Snap tanpa bayar tidak boleh terus mengunci akun:
  // batalkan order pending milik viewer ini (trigger SQL melepas accounts.sold).
  // Kalau ternyata dia sempat membayar, webhook settlement menjual-ulang akun.
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await createAdminClient()
        .from("orders")
        .update({ status: "cancel" })
        .eq("user_id", user.id)
        .eq("account_id", id)
        .eq("status", "pending");
    }
  } catch (e) {
    console.warn("[ProductPage] release own pending gagal (abaikan):", e);
  }

  const [product, t] = await Promise.all([
    getAccount(id),
    getTranslations({ locale, namespace: "catalog" }),
  ]);

  if (!product) {
    console.warn(`[ProductPage] Product not found for id: ${id}`);
    notFound();
  }

  return (
    <main className="min-h-screen bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <nav className="text-xs text-gray-500 tracking-wide">
            <Link href="/" className="hover:text-brand-cyan transition">
              {t("home")}
            </Link>
            <span className="mx-2">/</span>
            <Link href="/catalog" className="hover:text-brand-cyan transition">
              {t("catalog")}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">{product.badge}</span>
          </nav>
          <div className="flex items-center gap-3">
            <LocaleSwitcherModal />
            <UserMenu />
          </div>
        </div>

        <ProductDetail
          product={product}
          snapUrl={
            process.env.MIDTRANS_IS_PRODUCTION === "true"
              ? "https://app.midtrans.com/snap/snap.js"
              : "https://app.sandbox.midtrans.com/snap/snap.js"
          }
          snapClientKey={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ?? ""}
        />
      </div>
    </main>
  );
}
