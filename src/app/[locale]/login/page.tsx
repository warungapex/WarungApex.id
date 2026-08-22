import { getTranslations } from "next-intl/server";
import { AuthForm } from "@/components/auth/auth-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk | Warung Apex",
};

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const { locale } = await params;
  const { redirectTo } = await searchParams;
  const t = await getTranslations({ locale, namespace: "auth" });

  return (
    <main className="min-h-screen bg-brand-dark flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-white">{t("loginTitle")}</h1>
          <p className="text-sm text-gray-400">{t("subtitle")}</p>
        </div>
        <AuthForm mode="login" redirectTo={redirectTo ?? "/"} />
      </div>
    </main>
  );
}
