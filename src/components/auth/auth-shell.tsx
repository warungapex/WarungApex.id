"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

/* Noise overlay via SVG feTurbulence — tanpa dependency */
const NOISE_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E")`;

/**
 * Shell dua kolom untuk halaman auth.
 * Kiri: branding + stepper (hidden di mobile). Kanan: form (children).
 * activeStep: index step aktif di stepper kiri (0-based).
 */
export function AuthShell({
  children,
  activeStep = 0,
}: {
  children: React.ReactNode;
  activeStep?: number;
}) {
  const t = useTranslations("auth");
  const steps = [t("step1Label"), t("step2Label"), t("step3Label")];

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-black">
      {/* ── Panel kiri: branding & stepper ── */}
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-[#0a0a12] p-12 xl:p-16">
        {/* Glow cyan */}
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[560px] h-[380px] rounded-full bg-brand-cyan/20 blur-[130px]"
        />
        {/* Noise overlay */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: NOISE_BG }}
        />

        <Link href="/" className="relative z-10 inline-flex w-fit">
          <Image
            src="/logo/white/white warpex no background.svg"
            alt="Warung Apex"
            width={150}
            height={38}
            className="h-9 w-auto"
            unoptimized
          />
        </Link>

        <div className="relative z-10 max-w-md">
          <h1 className="font-[var(--font-display)] text-3xl xl:text-4xl font-bold text-white tracking-wide leading-tight">
            {t("panelTitle")}
          </h1>
          <p className="mt-3 text-sm text-gray-400">{t("panelSubtitle")}</p>

          <ol className="mt-10 space-y-3">
            {steps.map((label, i) => {
              const active = i === activeStep;
              return (
                <li
                  key={label}
                  className={`flex items-center gap-3 px-5 py-3.5 rounded-full text-sm transition ${
                    active
                      ? "bg-white text-gray-900 font-semibold shadow-[0_0_30px_rgba(255,255,255,0.12)]"
                      : "bg-white/[0.04] border border-white/10 text-gray-400"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-6 h-6 shrink-0 rounded-full text-xs font-bold ${
                      active ? "bg-gray-900 text-white" : "bg-white/10 text-gray-400"
                    }`}
                  >
                    {i + 1}
                  </span>
                  {label}
                </li>
              );
            })}
          </ol>
        </div>

        <p className="relative z-10 text-[11px] text-gray-600">
          © {new Date().getFullYear()} Warung Apex
        </p>
      </aside>

      {/* ── Panel kanan: form ── */}
      <main className="bg-black flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          {/* Logo mobile (karena panel kiri disembunyikan) */}
          <Link href="/" className="lg:hidden flex justify-center mb-10">
            <Image
              src="/logo/white/white warpex no background.svg"
              alt="Warung Apex"
              width={150}
              height={38}
              className="h-8 w-auto"
              unoptimized
            />
          </Link>
          {children}
        </div>
      </main>
    </div>
  );
}
