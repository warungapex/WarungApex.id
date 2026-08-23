import { redirect } from "next/navigation";
import { RegisterFlow } from "@/components/auth/register-flow";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { safeNext } from "@/lib/safe-next";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar | Warung Apex",
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const next = safeNext((await searchParams).redirectTo, "/");

  // Sudah login — langsung ke tujuan
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect(next === "/" ? "/dashboard/orders" : next);

  return <RegisterFlow redirectTo={next} />;
}
