import createIntlMiddleware from "next-intl/middleware";
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin login page — always allow
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // All other /admin routes — check session
  if (pathname.startsWith("/admin")) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    // If env vars missing, allow through (will fail gracefully on the page)
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.next();
    }

    const response = NextResponse.next();

    const supabase = createServerClient(
      supabaseUrl,
      supabaseKey,
      {
        cookies: {
          getAll() { return request.cookies.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      },
    );

    // getUser memverifikasi JWT ke server Supabase — getSession hanya baca cookie
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return response;
  }

  // All other paths — next-intl locale routing
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // next-intl — exclude /admin, /_next, /api, static files
    "/((?!admin|_next|api|.*\\..*).*)",
  ],
};
