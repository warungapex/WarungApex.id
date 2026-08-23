"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function AnimatedNumber({
  end,
  decimals = 0,
  suffix = "",
}: {
  end: number;
  decimals?: number;
  suffix?: string;
}) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let started = false;
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          observer.disconnect();
          const start = performance.now();
          const duration = 2000;
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const current = easeOutExpo(progress) * end;
            setDisplay(
              current.toLocaleString("en-US", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              })
            );
            if (progress < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end, decimals]);

  return (
    <span ref={ref} className="inline-block">
      {display}
      {suffix}
    </span>
  );
}

const stats = [
  { end: 50, decimals: 0, suffix: "+", key: "sold" },
  { end: 4.9, decimals: 1, suffix: "/5", key: "customers" },
  { end: 24, decimals: 0, suffix: "/7", key: "support" },
];

export function Stats() {
  const t = useTranslations("stats");

  return (
    <section className="relative w-full bg-brand-dark py-20">
      <div data-reveal-group className="glass relative mx-auto max-w-4xl grid grid-cols-1 gap-10 rounded-3xl px-8 py-12 sm:grid-cols-3 sm:gap-6 sm:px-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl bg-grid-sm opacity-40 mask-radial-fade"
        />
        {stats.map((s) => (
          <div key={s.key} data-reveal className="relative text-center">
            <div className="font-display text-gradient text-5xl font-bold md:text-6xl">
              <AnimatedNumber end={s.end} decimals={s.decimals} suffix={s.suffix} />
            </div>
            <div className="font-mono2 mt-3 text-[11px] uppercase tracking-[0.3em] text-white/45">
              {t(s.key)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
