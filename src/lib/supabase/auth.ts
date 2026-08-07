import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

/** Returns the current session or null */
export async function getSession() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

/** Throws a redirect to /admin/login if not authenticated */
export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}
