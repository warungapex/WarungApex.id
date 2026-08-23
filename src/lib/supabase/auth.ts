import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

/**
 * User yang sudah diverifikasi ke server Supabase (bukan sekadar baca cookie).
 * Null jika tidak login / token invalid.
 */
export async function getCurrentUser() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/**
 * Guard halaman & action admin.
 * Sesi valid TIDAK cukup — user harus memiliki role 'admin' di profiles.
 * Non-admin dilempar ke homepage.
 */
export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  const supabase = await createServerSupabaseClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/");

  return user;
}
