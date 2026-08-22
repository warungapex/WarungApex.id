"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/client";

export function AuthForm({
  mode,
  redirectTo,
}: {
  mode: "login" | "register";
  redirectTo: string;
}) {
  const t = useTranslations("auth");
  const router = useRouter();
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  function done() {
    // refresh agar server components membaca sesi terbaru dari cookie
    router.replace(redirectTo || "/");
    router.refresh();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const supabase = createClient();

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      done();
      return;
    }

    // register
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    if (data.session) {
      done();
      return;
    }
    // konfirmasi email diaktifkan — user harus verifikasi dulu
    setInfo(t("checkEmail"));
    setLoading(false);
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder:text-gray-600 focus:border-brand-cyan/50 focus:outline-none transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.03] space-y-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">{t("email")}</label>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="kamu@email.com"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">{t("password")}</label>
          <input
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            className={inputClass}
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
        {info && (
          <p className="text-xs text-cyan-300 bg-cyan-400/10 border border-cyan-400/20 rounded-lg px-3 py-2">
            {info}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-brand-red text-white font-semibold text-sm hover:bg-brand-red/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? t("loading")
            : mode === "login"
              ? t("signIn")
              : t("signUp")}
        </button>

        <p className="text-xs text-center text-gray-400">
          {mode === "login" ? t("noAccount") : t("haveAccount")}{" "}
          <Link
            href={
              mode === "login"
                ? `/register?redirectTo=${encodeURIComponent(redirectTo)}`
                : `/login?redirectTo=${encodeURIComponent(redirectTo)}`
            }
            className="text-brand-cyan hover:underline"
          >
            {mode === "login" ? t("goRegister") : t("goLogin")}
          </Link>
        </p>
      </div>
    </form>
  );
}
