"use client";

import React, { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { useTranslations } from "next-intl";

const faqs = [
  { key: "q1", meta: "Security" },
  { key: "q2", meta: "Transaction" },
  { key: "q3", meta: "Payment" },
  { key: "q4", meta: "Trade-in" },
];

export function FaqArticle() {
  const t = useTranslations("faq");
  const [open, setOpen] = useState(0);
  const toggle = (i: number) => setOpen((p) => (p === i ? -1 : i));

  return (
    <section id="faq" className="relative w-full overflow-hidden bg-brand-dark py-28">
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 90% at 90% 0%, rgba(0,240,255,0.06), transparent 60%), radial-gradient(ellipse 60% 90% at 5% 100%, rgba(255,42,68,0.06), transparent 60%)" }} />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-12 px-6">
        <Reveal className="text-center">
          <div className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-brand-cyan">
            <span className="h-px w-8 bg-brand-cyan/50" />
            {t("eyebrow")}
            <span className="h-px w-8 bg-brand-cyan/50" />
          </div>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl md:text-5xl font-black tracking-[0.1em] text-[#f0f2f5]">
            {t("title")} <span className="text-brand-red">{t("accent")}</span>
          </h2>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.key} delay={i * 0.05}>
                <div
                  className={`group relative overflow-hidden border transition-colors duration-300 ${
                    isOpen ? "border-brand-cyan/40 bg-brand-surface" : "border-white/10 bg-brand-surface/60 hover:border-brand-cyan/30"
                  }`}
                >
                  {/* corner ticks */}
                  <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-brand-cyan/40" />
                  <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-brand-cyan/40" />

                  <button
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-7 sm:gap-6"
                  >
                    <span className={`w-12 shrink-0 font-mono text-xs uppercase tracking-[0.25em] ${isOpen ? "text-brand-red" : "text-gray-500"}`}>
                      CH/{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-sm font-medium text-[#eef2f7] sm:text-base">{t(`${item.key}`)}</span>
                    <span className="hidden shrink-0 rounded-full border border-white/10 px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-gray-400 md:inline-block">
                      {item.meta}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen ? "rotate-180 border-brand-red/60 bg-brand-red/10 text-brand-red" : "border-white/20 text-white"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </button>

                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-white/5 px-5 pb-5 pt-4 pr-12 text-sm leading-relaxed text-gray-400 sm:pl-[3.5rem]">{t(item.key.replace("q", "a"))}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FaqArticle;