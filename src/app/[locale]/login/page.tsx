import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthForm } from "@/components/auth/auth-form";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { safeNext } from "@/lib/safe-next";
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
  // redirectTo SELALU locale-relative (mis. "/catalog") — server yang menambah prefix
  const next = safeNext((await searchParams).redirectTo, "/catalog");

  // Sudah login — langsung ke tujuan
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect(`/${locale}${next}`);

  return (
    <AuthShell>
      <AuthForm mode="login" redirectTo={next} />
    </AuthShell>
  );
}
