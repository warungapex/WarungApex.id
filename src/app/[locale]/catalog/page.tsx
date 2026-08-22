import type { Metadata } from "next";
import { getAccounts } from "@/lib/supabase/accounts";
import { CatalogGrid } from "@/components/catalog/catalog-grid";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { LocaleSwitcherModal } from "@/components/ui/locale-switcher-modal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [accounts, t] = await Promise.all([
    getAccounts(),
    getTranslations({ locale, namespace: "catalog" }),
  ]);

  const available = accounts.filter((a) => !a.sold).length;

  return {
    title: t("metaList") as string,
    description: t("metaListDesc") as string,
  };
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [accounts, t] = await Promise.all([
    getAccounts(),
    getTranslations({ locale, namespace: "catalog" }),
  ]);

  const available = accounts.filter((a) => !a.sold).length;

  return (
    <main className="min-h-screen bg-brand-dark">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <nav className="text-xs text-gray-500 tracking-wide">
            <Link href="/" className="hover:text-brand-cyan transition">
              {t("home")}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">{t("catalog")}</span>
          </nav>
          <LocaleSwitcherModal />
        </div>
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-[var(--font-display)] font-bold tracking-widest text-[#f0f2f5]">
            {t("title1")} <span className="text-brand-red">{t("title2")}</span>
          </h1>
          <p className="mt-3 text-sm text-gray-400">
            {available} {t("desc1")} {t("desc2")}
          </p>
        </div>
        <CatalogGrid list={accounts} />
      </div>
    </main>
  );
}
