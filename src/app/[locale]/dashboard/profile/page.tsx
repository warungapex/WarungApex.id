import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { UserMenu } from "@/components/auth/user-menu";
import { LocaleSwitcherModal } from "@/components/ui/locale-switcher-modal";
import { ProfileForm } from "@/components/auth/profile-form";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "settings" });
  return { title: `${t("title")} | Warung Apex` };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login?redirectTo=/dashboard/profile`);
  }

  const t = await getTranslations({ locale, namespace: "settings" });
  const meta = user.user_metadata as Record<string, string | null | undefined>;
  const isGoogle = user.app_metadata?.provider === "google";

  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-dark">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 90% at 90% 0%, rgba(0,240,255,0.06), transparent 60%), radial-gradient(ellipse 60% 90% at 5% 100%, rgba(255,42,68,0.06), transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              {t("title")}
            </h1>
            <p className="mt-2 text-sm text-gray-400">{t("subtitle")}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3 pt-1">
            <LocaleSwitcherModal />
            <UserMenu />
          </div>
        </div>

        <ProfileForm
          email={user.email ?? ""}
          firstName={meta.first_name ?? ""}
          lastName={meta.last_name ?? ""}
          avatarUrl={meta.avatar_url ?? null}
          isGoogle={isGoogle}
        />
      </div>
    </main>
  );
}
