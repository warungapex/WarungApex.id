"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Eye, EyeOff, Loader2, MailCheck } from "lucide-react";
import { Link, useRouter } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/client";
import { safeNext } from "@/lib/safe-next";
import { errMsg, inputClass } from "@/components/auth/password-reset-forms";

const GOOGLE_G_SVG = (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
    <path
      fill="#4285F4"
      d="M23.5 12.3c0-.9-.1-1.7-.2-2.5H12v4.8h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1.1.7-2.5 1.2-4 1.2-3.1 0-5.7-2.1-6.7-4.9H1.3v3.1C3.3 21.3 7.3 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.3 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.7.4-2.4V6.5H1.3C.5 8.2 0 10 0 12s.5 3.8 1.3 5.5l4-3.1z"
    />
    <path
      fill="#EA4335"
      d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C18 1.2 15.2 0 12 0 7.3 0 3.3 2.7 1.3 6.5l4 3.1c1-2.8 3.6-4.8 6.7-4.8z"
    />
  </svg>
);

export function AuthForm({
  mode,
  redirectTo,
}: {
  mode: "login" | "register";
  redirectTo: string;
}) {
  const t = useTranslations("auth");
  const locale = useLocale();
  const router = useRouter();
  const next = safeNext(redirectTo, "/");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  function done() {
    // refresh agar server components membaca sesi terbaru dari cookie
    router.replace(next);
    router.refresh();
  }

  async function handleGoogle() {
    setError("");
    setGoogleLoading(true);
    const target = encodeURIComponent(next === "/" ? "/dashboard/orders" : next);
    const { error } = await createClient().auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/${locale}/auth/callback?next=${target}`,
      },
    });
    if (error) {
      setError(errMsg(t, error));
      setGoogleLoading(false);
    }
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
        setError(errMsg(t, error));
        setLoading(false);
        return;
      }
      done();
      return;
    }

    // register — simpan nama ke user_metadata (terbaca customer_details Midtrans)
    const firstName = ((form.get("first_name") as string) ?? "").trim();
    const lastName = ((form.get("last_name") as string) ?? "").trim();
    const fullName = [firstName, lastName].filter(Boolean).join(" ") || null;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName || null, last_name: lastName || null, full_name: fullName },
      },
    });
    if (error) {
      setError(errMsg(t, error));
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

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="text-center space-y-1.5">
        <h2 className="font-[var(--font-display)] text-xl font-bold text-white tracking-wide">
          {mode === "login" ? t("loginTitle") : t("registerTitle")}
        </h2>
        <p className="text-sm text-gray-400">{t("subtitle")}</p>
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={handleGoogle}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-white/15 bg-white/[0.04] text-sm font-semibold text-white hover:bg-white/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {googleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : GOOGLE_G_SVG}
        {t("continueWithGoogle")}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4" role="separator">
        <span className="h-px grow bg-white/10" />
        <span className="text-xs uppercase tracking-wider text-gray-500">{t("orContinueWith")}</span>
        <span className="h-px grow bg-white/10" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">{t("firstName")}</label>
              <input name="first_name" type="text" required autoComplete="given-name" className={inputClass} placeholder={t("firstNamePh")} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">{t("lastName")}</label>
              <input name="last_name" type="text" required autoComplete="family-name" className={inputClass} placeholder={t("lastNamePh")} />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs text-gray-400 mb-1.5">{t("email")}</label>
          <input name="email" type="email" required autoComplete="email" className={inputClass} placeholder={t("emailPh")} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs text-gray-400">{t("password")}</label>
            {mode === "login" && (
              <Link href="/forgot-password" className="text-[11px] text-brand-cyan hover:underline">
                {t("forgotPassword")}
              </Link>
            )}
          </div>
          <div className="relative">
            <input
              name="password"
              type={showPw ? "text" : "password"}
              required
              minLength={8}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              className={`${inputClass} pr-11`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              aria-label={showPw ? t("hidePassword") : t("showPassword")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className="mt-1.5 text-[11px] text-gray-500">{t("passwordHelper")}</p>
        </div>

        {error && (
          <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
        {info && (
          <div className="flex items-start gap-2.5 text-xs text-emerald-300 bg-emerald-400/10 border border-emerald-400/20 rounded-lg px-3 py-2.5">
            <MailCheck className="w-4 h-4 shrink-0 mt-px" />
            <span>{info}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white text-gray-900 font-bold text-sm hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? t("loading") : mode === "login" ? t("signIn") : t("signUp")}
        </button>
      </form>

      {/* Footer */}
      <div className="space-y-4 text-center">
        <p className="text-xs text-gray-400">
          {mode === "login" ? t("noAccount") : t("haveAccount")}{" "}
          <Link
            href={
              mode === "login"
                ? `/register?redirectTo=${encodeURIComponent(next)}`
                : `/login?redirectTo=${encodeURIComponent(next)}`
            }
            className="text-brand-cyan font-semibold hover:underline"
          >
            {mode === "login" ? t("goRegister") : t("goLogin")}
          </Link>
        </p>
        <Link href="/catalog" className="inline-flex items-center gap-1 text-[11px] text-gray-500 hover:text-brand-cyan transition">
          ← {t("backToCatalog")}
        </Link>
      </div>
    </div>
  );
}
