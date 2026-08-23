import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { safeNext } from "@/lib/safe-next";

/**
 * Callback Supabase Auth (PKCE): tukar code menjadi sesi, lalu lanjut ke tujuan.
 * Menangani login Google OAuth DAN link reset password (?next=/update-password).
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = safeNext(searchParams.get("next"), "/");
  const locale = (await params).locale;

  if (code) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}/${locale}${next}`);
    }
  }

  return NextResponse.redirect(
    `${origin}/${locale}/login?redirectTo=${encodeURIComponent(next)}`,
  );
}
