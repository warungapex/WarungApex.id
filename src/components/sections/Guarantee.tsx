"use client";

import { ShieldCheck, BadgeCheck, Timer, Users } from "lucide-react";
import { useTranslations } from "next-intl";

const items = [
  { icon: ShieldCheck, key: "item1" },
  { icon: BadgeCheck, key: "item2" },
  { icon: Timer, key: "item3" },
  { icon: Users, key: "item4" },
];

export function Guarantee() {
  const t = useTranslations("guarantee");

  return (
    <section id="garansi" className="relative w-full overflow-hidden bg-brand-dark py-28">
      <div className="absolute inset-x-0 top-0 beam-line" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div data-reveal className="text-center">
          <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5">
            <span className="dot-pulse inline-block size-1 rounded-full bg-brand-cyan text-brand-cyan" />
            <span className="font-mono2 text-[10px] font-medium uppercase tracking-[0.35em] text-brand-cyan/90">
              {t("eyebrow")}
            </span>
          </div>
          <h2 className="font-display mt-6 text-3xl font-bold tracking-tight text-white md:text-5xl">
            {t("title")} <span className="text-gradient">{t("accent")}</span>
          </h2>
        </div>

        <div data-reveal-group className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div
              key={it.key}
              data-reveal
              className="glass group relative overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan/30"
            >
              <div className="flex size-11 items-center justify-center rounded-xl border border-brand-red/25 bg-brand-red/10 text-brand-red transition-colors duration-300 group-hover:border-brand-cyan/25 group-hover:bg-brand-cyan/10 group-hover:text-brand-cyan">
                <it.icon className="size-5" strokeWidth={1.75} />
              </div>
              <h3 className="font-display mt-5 text-base font-semibold text-white">{t(`${it.key}_title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{t(`${it.key}_desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
