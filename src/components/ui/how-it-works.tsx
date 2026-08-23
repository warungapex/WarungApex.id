"use client";

import { useEffect, useRef } from "react";
import { Layers, Search, Zap } from "lucide-react";
import type React from "react";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

export function HowItWorks() {
  const t = useTranslations("howItWorks");
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const tween = gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        transformOrigin: "left center",
        scrollTrigger: { trigger: el, start: "top 85%", end: "top 35%", scrub: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const steps: Step[] = [
    {
      icon: <Search className="h-5 w-5" />,
      title: t("step1_title"),
      description: t("step1_desc"),
      benefits: [t("step1_b1"), t("step1_b2"), t("step1_b3")],
    },
    {
      icon: <Layers className="h-5 w-5" />,
      title: t("step2_title"),
      description: t("step2_desc"),
      benefits: [t("step2_b1"), t("step2_b2"), t("step2_b3")],
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: t("step3_title"),
      description: t("step3_desc"),
      benefits: [t("step3_b1"), t("step3_b2"), t("step3_b3")],
    },
  ];

  return (
    <section id="how-it-works" className="relative w-full overflow-hidden bg-brand-dark py-28 sm:py-36">
      <div className="absolute inset-x-0 top-0 beam-line" />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: "radial-gradient(ellipse 50% 60% at 50% 30%, rgb(0 240 255 / 0.05), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5">
            <span className="dot-pulse inline-block size-1 rounded-full bg-brand-cyan text-brand-cyan" />
            <span className="font-mono2 text-[10px] font-medium uppercase tracking-[0.35em] text-brand-cyan/90">
              {t("eyebrow")}
            </span>
          </div>
          <h2 className="font-display mt-6 text-3xl font-bold tracking-tight text-white md:text-5xl">
            {t("title")} <span className="text-gradient">{t("accent")}</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/50 sm:text-base">{t("subtitle")}</p>
        </div>

        {/* Connector line */}
        <div className="relative mx-auto mt-20 hidden w-full max-w-4xl md:block">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />
          <div ref={lineRef} className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-brand-cyan via-brand-cyan to-brand-red shadow-[0_0_12px_rgb(0_240_255/0.6)]" />
          <div className="relative grid grid-cols-3">
            {steps.map((_, i) => (
              <div key={i} className="flex justify-center">
                <span className="font-mono2 flex size-9 items-center justify-center rounded-full border border-white/15 bg-brand-dark text-xs font-semibold text-brand-cyan ring-4 ring-brand-dark">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step cards */}
        <div data-reveal-group className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-5 md:mt-14 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={i}
              data-reveal
              className="glass group relative overflow-hidden rounded-2xl p-7 transition-colors duration-300 hover:border-brand-cyan/30"
            >
              <span className="pointer-events-none absolute right-4 top-4 font-mono2 text-[10px] tracking-[0.3em] text-white/15 transition-colors group-hover:text-brand-cyan/40">
                /{String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex size-11 items-center justify-center rounded-xl border border-brand-cyan/20 bg-brand-cyan/10 text-brand-cyan">
                {step.icon}
              </div>
              <h3 className="font-display mt-5 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{step.description}</p>
              <ul className="mt-5 space-y-2.5 border-t border-white/5 pt-5">
                {step.benefits.map((benefit, bi) => (
                  <li key={bi} className="flex items-start gap-2.5 text-[13px] text-white/60">
                    <Zap className="mt-0.5 size-3.5 shrink-0 text-brand-cyan/70" strokeWidth={2} />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
