"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { useTranslations } from "next-intl";

const keys = ["item1", "item2", "item3", "item4"];

export function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section id="testimoni" className="relative w-full overflow-hidden bg-brand-dark py-28 md:py-36">
      <div className="absolute inset-x-0 top-0 beam-line" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50 mask-radial-fade" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red/[0.07] blur-[140px]"
      />

      <div className="relative mx-auto max-w-[1330px] px-6">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} accent={t("accent")} />
      </div>

      <div data-reveal-group className="relative mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-4 px-6 md:grid-cols-2">
        {keys.map((key) => (
          <figure
            key={key}
            data-reveal
            className="glass group relative overflow-hidden rounded-2xl p-8 transition-colors duration-300 hover:border-white/20"
          >
            <span
              aria-hidden="true"
              className="font-display pointer-events-none absolute -top-3 right-5 text-[7rem] font-bold leading-none text-white/[0.04] transition-colors duration-300 group-hover:text-brand-cyan/10"
            >
              &rdquo;
            </span>
            <blockquote className="relative text-[15px] leading-relaxed text-white/75 sm:text-base">
              &ldquo;{t(`${key}_q`)}&rdquo;
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-3 border-t border-white/5 pt-5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-red to-brand-cyan text-sm font-bold text-white">
                {t(`${key}_n`)[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{t(`${key}_n`)}</p>
                <p className="font-mono2 text-xs text-white/40">{t(`${key}_r`)}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
