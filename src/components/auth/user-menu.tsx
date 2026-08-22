"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { User } from "@supabase/supabase-js";
import { Link, useRouter } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/client";
import { ChevronDown, LogOut, Package } from "lucide-react";

export function UserMenu() {
  const t = useTranslations("auth");
  const router = useRouter();
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
        href="/login"
        className="px-4 py-2 rounded-full border border-white/15 bg-white/5 text-xs font-semibold text-gray-200 hover:border-brand-cyan/50 hover:text-white transition whitespace-nowrap"
      >
        {t("signInShort")}
      </Link>
    );
  }

  const emailLabel = user.email ?? "";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-xs font-semibold text-gray-200 hover:border-brand-cyan/50 hover:text-white transition"
      >
        <span className="max-w-[140px] truncate">{emailLabel}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl border border-white/10 bg-[#101018] shadow-2xl overflow-hidden z-50">
          <Link
            href="/dashboard/orders"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-3 text-xs text-gray-200 hover:bg-white/5 hover:text-white transition"
          >
            <Package className="w-4 h-4 text-brand-cyan" />
            {t("myOrders")}
          </Link>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-2.5 px-4 py-3 text-xs text-gray-200 hover:bg-white/5 hover:text-white transition border-t border-white/5"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            {t("signOut")}
          </button>
        </div>
      )}
    </div>
  );
}
