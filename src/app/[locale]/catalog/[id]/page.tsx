import { getAccount, getAccountIds } from "@/lib/supabase/accounts";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ProductDetail } from "@/components/catalog/product-detail";
import { UserMenu } from "@/components/auth/user-menu";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { LocaleSwitcherModal } from "@/components/ui/locale-switcher-modal";
import type { Metadata } from "next";

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

export async function generateStaticParams() {
  const ids = await getAccountIds();
  const params = [];
  for (const locale of routing.locales) {
    for (const id of ids) {
      params.push({ locale, id });
    }
  }
  return params;
}

export default async function ProductPage({
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
