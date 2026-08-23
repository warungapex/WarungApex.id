"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { User } from "@supabase/supabase-js";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/client";
import { ChevronDown, LogOut, MessageCircle, Package, UserCircle2 } from "lucide-react";

export function UserMenu() {
  const t = useTranslations("auth");
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) =>
      setUser(session?.user ?? null),
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  async function signOut() {
    setOpen(false);
    await createClient().auth.signOut();
    router.replace("/");
    router.refresh();
  }

  if (!user) {
    return (
      <Link
        href={`/login?redirectTo=${encodeURIComponent(pathname)}`}
        className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-xs font-semibold text-white hover:bg-white/15 hover:border-white/40 transition whitespace-nowrap"
      >
        {t("signInShort")}
      </Link>
    );
  }

  const meta = user.user_metadata as Record<string, string | null | undefined>;
  const avatar = meta.avatar_url || meta.picture || null;
  const name =
    meta.full_name ||
    [meta.first_name, meta.last_name].filter(Boolean).join(" ") ||
    user.email?.split("@")[0] ||
    "User";
  const initial = (name[0] ?? "U").toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:border-brand-cyan/50 transition"
      >
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element -- avatar eksternal (Google), tanpa optimasi
          <img src={avatar} alt="" className="w-7 h-7 rounded-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          <span className="flex w-7 h-7 shrink-0 items-center justify-center rounded-full bg-brand-cyan/15 text-brand-cyan text-xs font-bold">
            {initial}
          </span>
        )}
        <span className="max-w-[120px] truncate text-xs font-semibold text-gray-200">{name}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/10 bg-[#101018] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)] overflow-hidden z-50">
          {/* Header profil */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-white/8">
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element -- avatar eksternal (Google), tanpa optimasi
              <img src={avatar} alt="" className="h-11 w-11 shrink-0 rounded-xl object-cover ring-1 ring-white/15" referrerPolicy="no-referrer" />
            ) : (
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-cyan/15 text-brand-cyan text-base font-bold ring-1 ring-white/15">
                {initial}
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">{name}</p>
              <p className="truncate text-xs text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Menu */}
          <div className="p-1.5">
            <Link
              href="/dashboard/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-200 hover:bg-white/5 hover:text-white transition"
            >
              <UserCircle2 className="h-4 w-4 text-gray-400" />
              {t("profile")}
            </Link>
            <Link
              href="/dashboard/orders"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-200 hover:bg-white/5 hover:text-white transition"
            >
              <Package className="h-4 w-4 text-gray-400" />
              {t("myOrders")}
            </Link>
            <a
              href="https://wa.me/6285167202134"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-200 hover:bg-white/5 hover:text-white transition"
            >
              <MessageCircle className="h-4 w-4 text-gray-400" />
              {t("helpCenter")}
            </a>
          </div>

          {/* Keluar */}
          <div className="border-t border-white/8 p-1.5">
            <button
              onClick={signOut}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-400/10 hover:text-red-300 transition"
            >
              <LogOut className="h-4 w-4" />
              {t("signOut")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
