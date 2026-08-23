"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Eye, EyeOff, Loader2, MailCheck } from "lucide-react";
import { Link, useRouter } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/client";

/** Terjemahkan error Supabase via kode; fallback ke pesan mentah. */
export function errMsg(
  t: ReturnType<typeof useTranslations>,
  e: { code?: string; message: string },
) {
  const key = `errors.${e.code}`;
  return t.has(key) ? (t(key as Parameters<typeof t>[0]) as string) : e.message;
}

export const inputClass =
  "w-full px-4 py-3 rounded-xl border border-white/15 bg-white/[0.04] text-white text-sm placeholder:text-gray-600 focus:border-brand-cyan/60 focus:bg-white/[0.06] focus:outline-none transition";

function Heading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center space-y-1.5">
      <h2 className="font-[var(--font-display)] text-xl font-bold text-white tracking-wide">
        {title}
      </h2>
      <p className="text-sm text-gray-400">{subtitle}</p>
    </div>
  );
}

function ErrorBox({ message }: { message: string }) {
  return (
    <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
      {message}
    </p>
  );
}

/* ── Langkah 1: minta link reset ── */
export function ForgotPasswordForm() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const email = new FormData(e.currentTarget).get("email") as string;
    const { error } = await createClient().auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/${locale}/auth/callback?next=${encodeURIComponent("/update-password")}`,
    });
    if (error) {
      setError(errMsg(t, error));
      setLoading(false);
      return;
    }
    // Sukses generik — jangan bocorkan apakah email terdaftar
    setSent(true);
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <Heading title={t("forgotTitle")} subtitle={t("forgotSubtitle")} />

      {sent ? (
        <div className="flex items-start gap-2.5 text-xs text-emerald-300 bg-emerald-400/10 border border-emerald-400/20 rounded-lg px-3 py-2.5">
          <MailCheck className="w-4 h-4 shrink-0 mt-px" />
          <span>{t("resetSent")}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">{t("email")}</label>
            <input name="email" type="email" required autoComplete="email" className={inputClass} placeholder={t("emailPh")} />
          </div>

          {error && <ErrorBox message={error} />}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white text-gray-900 font-bold text-sm hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? t("loading") : t("sendResetLink")}
          </button>
        </form>
      )}

      <p className="text-center text-xs text-gray-400">
        <Link href="/login" className="text-brand-cyan font-semibold hover:underline">
          ← {t("backToLogin")}
        </Link>
      </p>
    </div>
  );
}

/* ── Langkah 2: pasang password baru (sesi dari link recovery) ── */
export function UpdatePasswordForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const password = new FormData(e.currentTarget).get("password") as string;
    const { error } = await createClient().auth.updateUser({ password });
    if (error) {
      setError(errMsg(t, error));
      setLoading(false);
      return;
    }
    router.replace("/catalog");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <Heading title={t("updatePwTitle")} subtitle={t("updatePwSubtitle")} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">{t("newPassword")}</label>
          <div className="relative">
            <input
              name="password"
              type={showPw ? "text" : "password"}
              required
              minLength={8}
              autoComplete="new-password"
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

        {error && <ErrorBox message={error} />}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white text-gray-900 font-bold text-sm hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? t("loading") : t("savePassword")}
        </button>
      </form>
    </div>
  );
}
