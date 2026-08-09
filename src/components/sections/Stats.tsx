"use client";

import { useEffect, useRef, useState } from "react";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
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
    <section className="w-full bg-brand-dark py-24 border-t border-white/5">
      <Stagger className="max-w-4xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-12">
        {stats.map((s, i) => (
          <StaggerItem key={s.key} className="relative text-center">
            {i < stats.length - 1 && <div className="hidden sm:block absolute inset-y-0 right-0 w-px bg-white/5" />}
            <div className="inline-block bg-gradient-to-r from-brand-red to-brand-cyan bg-clip-text text-transparent text-4xl md:text-6xl font-[var(--font-display)] font-bold">
              <AnimatedNumber end={s.end} decimals={s.decimals} suffix={s.suffix} />
            </div>
            <div className="mt-3 text-xs sm:text-sm uppercase tracking-[0.25em] text-gray-400">{t(s.key)}</div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
