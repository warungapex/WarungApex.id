"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, MailCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/client";
import { AuthShell } from "@/components/auth/auth-shell";
import { AuthForm } from "@/components/auth/auth-form";
import { errMsg } from "@/components/auth/password-reset-forms";

/** d****a@gmail.com — sensor local part, domain tetap utuh. */
function maskEmail(email: string) {
  const at = email.indexOf("@");
  if (at <= 0) return email;
  const local = email.slice(0, at);
  const domain = email.slice(at);
  return local.length <= 2
    ? `${local[0]}***${domain}`
    : `${local[0]}${"*".repeat(local.length - 2)}${local[at - 1]}${domain}`;
}

/* ── Tampilan setelah signUp sukses: tunggu verifikasi email ── */
export function VerifyEmailView({ email }: { email: string }) {
  const t = useTranslations("auth");
  const locale = useLocale();
  const [resent, setResent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  async function resend() {
    setError("");
    setResent(false);
    setLoading(true);
    const { error } = await createClient().auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/${locale}/auth/callback?next=${encodeURIComponent("/catalog")}`,
      },
    });
    setLoading(false);
    if (error) {
      setError(errMsg(t, error));
      return;
    }
    setResent(true);
    // ponytail: cooldown 60s di client saja — Supabase rate limit resend ~60s
    setCooldown(60);
    const iv = setInterval(
      () => setCooldown((c) => (c <= 1 ? (clearInterval(iv), 0) : c - 1)),
      1000,
    );
  }

  return (
    <div className="space-y-6">
      {/* Icon */}
      <div className="flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-cyan/30 bg-brand-cyan/10">
          <MailCheck className="h-8 w-8 text-brand-cyan" />
        </div>
      </div>

      {/* Heading */}
      <div className="text-center space-y-1.5">
        <h2 className="font-[var(--font-display)] text-xl font-bold text-white tracking-wide">
          {t("verifyTitle")}
        </h2>
        <p className="text-sm text-gray-400">{t("verifySubtitle", { email: maskEmail(email) })}</p>
      </div>

      {/* Buka Gmail */}
      <a
        href="https://mail.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white text-gray-900 font-bold text-sm hover:bg-gray-200 transition"
      >
        <MailCheck className="w-4 h-4" />
        {t("openGmail")}
      </a>

      {/* Kirim ulang */}
      <button
        type="button"
        onClick={resend}
        disabled={loading || cooldown > 0}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/15 bg-white/[0.04] text-sm font-semibold text-white hover:bg-white/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {cooldown > 0 ? t("resendCooldown", { seconds: cooldown }) : t("resendEmail")}
      </button>

      {resent && (
        <div className="flex items-start gap-2.5 text-xs text-emerald-300 bg-emerald-400/10 border border-emerald-400/20 rounded-lg px-3 py-2.5">
          <MailCheck className="w-4 h-4 shrink-0 mt-px" />
          <span>{t("resendSent")}</span>
        </div>
      )}
      {error && (
        <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <p className="text-center">
        <Link href="/login" className="text-xs text-gray-400 hover:text-brand-cyan transition">
          ← {t("backToLogin")}
        </Link>
      </p>
    </div>
  );
}

/**
 * Alur register dua fase dalam satu halaman (tanpa pindah route):
 * 'form' → signUp sukses tanpa sesi → 'verify', stepper kiri ikut maju ke Step 2.
 */
export function RegisterFlow({ redirectTo }: { redirectTo: string }) {
  const [step, setStep] = useState<"form" | "verify">("form");
  const [email, setEmail] = useState("");

  return (
    <AuthShell activeStep={step === "verify" ? 1 : 0}>
      <AnimatePresence mode="wait" initial={false}>
        {step === "form" ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            <AuthForm
              mode="register"
              redirectTo={redirectTo}
              onNeedVerification={(e) => {
                setEmail(e);
                setStep("verify");
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="verify"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            <VerifyEmailView email={email} />
          </motion.div>
        )}
      </AnimatePresence>
    </AuthShell>
  );
}
