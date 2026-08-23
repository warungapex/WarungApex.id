"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function Cta() {
  const t = useTranslations("cta");

  return (
    <section className="relative w-full bg-brand-dark px-6 pb-32 pt-10">
      <div
        data-reveal
        className="border-beam relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-[#0a0c12] px-8 py-20 text-center sm:px-16 sm:py-24 noise"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-60 mask-radial-fade" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-[360px] w-[560px] -translate-x-1/2 rounded-full bg-brand-cyan/10 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 left-[15%] h-[280px] w-[380px] rounded-full bg-brand-red/10 blur-[120px]"
        />

        <div className="relative">
          <h2 className="font-display mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl">
            {t("title")} <span className="text-gradient">{t("accent")}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-balance text-sm leading-relaxed text-white/55 sm:text-base">
            {t("desc")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/catalog"
              className="btn-glow-cyan w-full rounded-full bg-brand-cyan px-9 py-4 text-sm font-semibold tracking-wide text-black transition hover:bg-white sm:w-auto"
            >
              {t("btnCatalog")}
            </Link>
            <a
              href="https://wa.me/6285167202134"
              target="_blank"
              rel="noopener noreferrer"
              className="glass w-full rounded-full px-9 py-4 text-sm font-semibold tracking-wide text-white transition hover:bg-white/10 sm:w-auto"
            >
              {t("btnContact")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
