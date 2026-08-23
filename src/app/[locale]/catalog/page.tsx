import { getAccounts } from "@/lib/supabase/accounts";
import { CatalogGrid } from "@/components/catalog/catalog-grid";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { LocaleSwitcherModal } from "@/components/ui/locale-switcher-modal";
import { UserMenu } from "@/components/auth/user-menu";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "catalog" });

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
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Breadcrumb + account menu */}
        <div className="mb-6 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs tracking-wide text-gray-500">
            <Link href="/" className="transition hover:text-brand-cyan">
              {t("home")}
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-gray-300">{t("catalog")}</span>
          </nav>
          <div className="flex items-center gap-3">
            <LocaleSwitcherModal />
            <UserMenu />
          </div>
        </div>

        {/* Header */}
        <header className="mb-6">
          <h1 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            {t("title1")} <span className="text-brand-red">{t("title2")}</span>
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            {available} {t("desc1")} {t("desc2")}
          </p>
        </header>

        <CatalogGrid list={accounts} />
      </div>
    </main>
  );
}
