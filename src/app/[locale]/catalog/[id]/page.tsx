import type { Metadata } from "next";
import { getAccount, getAccountIds } from "@/lib/supabase/accounts";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ProductDetail } from "@/components/catalog/product-detail";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

// Allow dynamic IDs not in generateStaticParams
export const dynamicParams = true;

export const metadata: Metadata = {
  title: "Detail Akun | Warung Apex",
  description: "Detail akun Apex Legends di Warung Apex.",
};

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

  // Normalize ID — handle both "A1" and "a1"
  const normalizedId = id.toLowerCase();

  const [product, t] = await Promise.all([
    getAccount(normalizedId),
    getTranslations({ locale, namespace: "catalog" }),
  ]);

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <nav className="text-xs text-gray-500 tracking-wide mb-8">
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

        <ProductDetail product={product} />
      </div>
    </main>
  );
}
