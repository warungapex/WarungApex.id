"use client";

import { formatPrice } from "@/lib/accounts";
import type { Account } from "@/lib/supabase/accounts";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { SectionHeading } from "@/components/ui/section-heading";
import { useUsdIdrRate } from "@/components/rate-provider";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
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
    <section
      id="katalog"
      ref={container}
      className="relative w-full bg-brand-dark pb-[10vh]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-24 h-[300px] w-[500px] rounded-full bg-brand-cyan/[0.06] blur-[130px]"
      />

      {/* Header */}
      <div data-reveal className="relative mx-auto max-w-6xl px-6 pt-32 pb-8">
        <SectionHeading title={t("title1")} accent={t("latest")} />
      </div>

        {/* Stacking Cards */}
        <div className="relative flex w-full flex-col items-center">
          {spot.length === 0 ? (
            <div className="py-20 text-center text-sm text-white/40">
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
            className="glass inline-block rounded-full px-10 py-3.5 text-sm font-semibold tracking-wide text-brand-cyan transition hover:bg-brand-cyan/10"
          >
            {t("viewAll")}
          </Link>
        </div>
      </section>
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
        className="glass relative flex origin-top flex-col overflow-hidden rounded-[2rem] bg-[#0a0c12] shadow-[0_30px_100px_-20px_rgba(0,0,0,1)] w-full max-w-5xl md:h-[500px]"
      >
        {/* corner ticks */}
        <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-10 h-4 w-4 border-l-2 border-t-2 border-brand-cyan/50" />
        <span aria-hidden="true" className="pointer-events-none absolute right-0 top-0 z-10 h-4 w-4 border-r-2 border-t-2 border-brand-cyan/50" />

        {/* Left: Image */}
        <div className="relative w-full overflow-hidden border-b border-white/5 bg-gradient-to-br from-[#10121b] to-[#08090e] md:w-[40%] md:border-b-0 md:border-r md:min-h-0 flex min-h-[220px] items-center justify-center p-6 md:p-12">
          <div aria-hidden="true" className="absolute inset-0 bg-grid-sm opacity-60 mask-radial-fade" />
          {a.mainImage ? (
            <div className="relative z-10 h-full min-h-[180px] w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_80px_rgba(0,240,255,0.12)] md:min-h-0">
              <Image
                src={a.mainImage}
                alt={`${a.rank} Account`}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                quality={80}
                loading="lazy"
              />
            </div>
          ) : (
            <div className="relative z-10 flex h-36 w-36 items-center justify-center rounded-[2rem] border border-white/10 bg-gradient-to-br from-brand-red/20 to-brand-cyan/20 md:h-56 md:w-56">
              <span className="font-display text-5xl font-black text-brand-red drop-shadow-lg md:text-8xl">
                {a.tierBadge}
              </span>
            </div>
          )}
        </div>

        {/* Right: Content */}
        <div className="flex w-full flex-col justify-center p-8 md:w-[60%] md:p-16">
          <h3 className="font-display mb-4 text-2xl font-black tracking-wide text-white md:mb-6 md:text-4xl">
            {a.badge}
          </h3>

          <p className="mb-8 text-sm leading-relaxed text-white/50 md:mb-10 md:text-lg">
            {t("cardDesc", {
              level: a.level,
              skins: a.legendarySkins,
              coins: a.coins.toLocaleString(locale),
            })}
          </p>

          <div className="mb-8 flex flex-wrap gap-2 md:mb-12 md:gap-3">
            {(a.tags?.length ? a.tags : [a.badge, `Level ${a.level}`, t("fullAccess")]).map(
              (tag, idx) => (
                <span
                  key={idx}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium ${
                    idx === 2 && !a.tags?.length
                      ? "border border-brand-cyan/25 bg-brand-cyan/10 text-brand-cyan"
                      : "border border-white/10 bg-white/[0.04] text-white/60"
                  }`}
                >
                  {tag}
                </span>
              ),
            )}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-6 md:pt-8">
            <div className="font-display text-2xl font-bold text-white md:text-4xl">
              {formatPrice(a.price, locale, rate)}
            </div>
            <Link
              href={`/catalog/${a.id}`}
              className="group flex items-center gap-2 text-sm font-semibold text-brand-cyan transition-colors hover:text-white md:gap-3 md:text-base"
            >
              {t("viewDetails")}
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-1 md:size-5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
