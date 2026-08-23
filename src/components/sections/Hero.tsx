"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { gsap } from "@/lib/gsap";
import { LazyNeuralGrid } from "@/components/ui/lazy-neural-grid";

function SplitWords({ text }: { text: string }) {
  return (
    <span className="inline-flex flex-wrap justify-center gap-x-[0.22em]">
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <span className="hero-word inline-block will-change-transform">{w}</span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-bg", { opacity: 0 }, { opacity: 1, duration: 1.6, ease: "power2.out" })
        .fromTo(".hero-badge", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, 0.2)
        .fromTo(".hero-word", { yPercent: 115 }, { yPercent: 0, duration: 1, stagger: 0.09 }, 0.35)
        .fromTo(".hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.9)
        .fromTo(".hero-cta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, 1.05)
        .fromTo(".hero-scroll", { opacity: 0 }, { opacity: 1, duration: 1 }, 1.5);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative min-h-screen w-full overflow-hidden noise">
      {/* Layered background */}
      <div className="hero-bg absolute inset-0">
        <div className="absolute inset-0 bg-grid mask-radial-fade opacity-70" />
        <LazyNeuralGrid />
        <div
          data-parallax="14"
          className="absolute -top-40 left-[8%] h-[480px] w-[480px] rounded-full bg-brand-cyan/10 blur-[140px]"
        />
        <div
          data-parallax="20"
          className="absolute right-[4%] top-1/3 h-[420px] w-[420px] rounded-full bg-brand-red/10 blur-[150px]"
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-dark to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-28 pb-24 text-center">
        <div className="hero-badge glass mb-8 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5">
          <span className="dot-pulse inline-block size-1.5 rounded-full bg-brand-cyan text-brand-cyan" />
          <span className="font-mono2 text-[10px] font-medium uppercase tracking-[0.3em] text-white/70 sm:text-xs">
            {t("badge")}
          </span>
        </div>

        <h1 className="font-display max-w-5xl text-[2.6rem] font-bold leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5.2rem]">
          <SplitWords text={t("title1")} />
          <span className="text-gradient mt-2 block tracking-normal">
            <SplitWords text={t("title2")} />
          </span>
        </h1>

        <p className="hero-sub mt-7 max-w-xl text-balance text-sm leading-relaxed text-white/55 sm:text-base">
          {t("subtitle")}
        </p>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-5">
          <Link
            href="/catalog"
            className="hero-cta btn-glow-cyan group relative w-full overflow-hidden rounded-full bg-brand-cyan px-8 py-3.5 text-sm font-semibold tracking-wide text-black transition hover:bg-white sm:w-auto"
          >
            {t("buttonCatalog")}
          </Link>
          <a
            href="https://wa.me/6285167202134"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta glass w-full rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-white/10 sm:w-auto"
          >
            {t("buttonSell")}
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="font-mono2 text-[9px] uppercase tracking-[0.4em] text-white/35">Scroll</span>
        <div className="h-10 w-px overflow-hidden bg-white/10">
          <div className="animate-scroll-line h-4 w-px bg-brand-cyan" />
        </div>
      </div>
    </section>
  );
}
