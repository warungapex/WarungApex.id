"use client";

import { formatPrice } from "@/lib/accounts";
import type { Account } from "@/lib/supabase/accounts";
import { ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useUsdIdrRate } from "@/components/rate-provider";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import ReactLenis from "lenis/react";
import { useRef } from "react";

export function Catalog({ spot }: { spot: Account[] }) {
  const locale = useLocale();
  const t = useTranslations("catalog");
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <ReactLenis root>
      <section
        id="katalog"
        ref={container}
        className="relative w-full bg-brand-dark pb-[10vh]"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-brand-red/10 blur-[130px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-8">
          <Reveal>
            <SectionHeading title={t("title1")} accent={t("latest")} />
          </Reveal>
        </div>

        {/* Stacking Cards */}
        <div className="relative w-full flex flex-col items-center">
          {spot.length === 0 ? (
            <div className="text-center text-gray-500 py-20 text-sm">
              Belum ada akun tersedia.
            </div>
          ) : (
            spot.map((a, i) => {
              const targetScale = Math.max(0.75, 1 - (spot.length - i - 1) * 0.05);
              return (
                <StickyCard
                  key={a.id}
                  i={i}
                  a={a}
                  progress={scrollYProgress}
                  range={[i * (1 / spot.length), 1]}
                  targetScale={targetScale}
                  locale={locale}
                />
              );
            })
          )}
        </div>

        {/* CTA */}
        <div className="py-24 text-center">
          <Link
            href="/catalog"
            className="inline-block border border-brand-cyan/40 text-brand-cyan px-10 py-3.5 rounded-full text-sm font-semibold tracking-wide hover:bg-brand-cyan/10 transition"
          >
            {t("viewAll")}
          </Link>
        </div>
      </section>
    </ReactLenis>
  );
}

/* ─── Animated Sticky Card ─── */
function StickyCard({
  i,
  a,
  progress,
  range,
  targetScale,
  locale,
}: {
  i: number;
  a: Account;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  locale: string;
}) {
  const rate = useUsdIdrRate();
  const t = useTranslations("catalog");
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-0 flex h-screen w-full items-center justify-center px-4 sm:px-6">
      <motion.div
        style={{ scale, top: `calc(${i * 20}px)` }}
        className="relative origin-top flex flex-col md:flex-row overflow-hidden rounded-[2rem] bg-[#0c0c10] border border-white/10 shadow-[0_30px_100px_-20px_rgba(0,0,0,1)] w-full max-w-5xl md:h-[500px]"
      >
        {/* Left: Image */}
        <div className="w-full md:w-[40%] bg-gradient-to-br from-[#13131a] to-[#0a0a0c] relative flex items-center justify-center p-12 border-r border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
          {a.mainImage ? (
            <div className="relative z-10 w-full h-full rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(255,42,68,0.15)]">
              <img
                src={a.mainImage}
                alt={`${a.rank} Account`}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="relative z-10 w-40 h-40 md:w-56 md:h-56 rounded-[2rem] bg-gradient-to-br from-brand-red/20 to-brand-cyan/20 flex items-center justify-center border border-white/10">
              <span className="font-[var(--font-display)] text-6xl md:text-8xl font-black text-brand-red drop-shadow-lg">
                {a.tierBadge}
              </span>
            </div>
          )}
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-[60%] p-8 md:p-16 flex flex-col justify-center bg-[#0a0a0c]">
          <div className="flex items-center gap-4 text-xs font-semibold tracking-[0.2em] text-brand-cyan mb-4 md:mb-6">
            <span>{t("spotlightLabel")}</span>
            <span className="text-white/20">/</span>
            <span>0{i + 1}</span>
          </div>

          <h3 className="font-[var(--font-display)] text-4xl md:text-6xl font-black text-white tracking-wide mb-4 md:mb-6">
            {a.rank}
          </h3>

          <p className="text-gray-400 text-sm md:text-lg leading-relaxed mb-8 md:mb-10 max-lg">
            {t("cardDesc", {
              level: a.level,
              skins: a.legendarySkins,
              coins: a.coins.toLocaleString(locale),
            })}
          </p>

          <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-12">
            {(a.tags?.length ? a.tags : [a.badge, `Level ${a.level}`, t("fullAccess")]).map(
              (tag, idx) => (
                <span
                  key={idx}
                  className={`px-4 py-1.5 md:px-5 md:py-2 rounded-full border text-xs font-medium ${
                    idx === 2 && !a.tags?.length
                      ? "bg-brand-cyan/10 border-brand-cyan/20 text-brand-cyan"
                      : "bg-white/5 border-white/10 text-gray-300"
                  }`}
                >
                  {tag}
                </span>
              ),
            )}
          </div>

          <div className="flex items-center justify-between mt-auto pt-6 md:pt-8 border-t border-white/5">
            <div className="font-[var(--font-display)] text-2xl md:text-4xl font-bold text-white">
              {formatPrice(a.price, locale, rate)}
            </div>
            <Link
              href={`/catalog/${a.id}`}
              className="group flex items-center gap-2 md:gap-3 text-sm md:text-base font-semibold text-brand-cyan hover:text-white transition-colors"
            >
              {t("viewDetails")}
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
