"use client";

import { Gamepad2 } from "lucide-react";
import type { Account } from "@/lib/supabase/accounts";
import { formatPrice } from "@/lib/accounts";
import { useLocale } from "next-intl";
import { useUsdIdrRate } from "@/components/rate-provider";
import { Link } from "@/i18n/routing";
import Image from "next/image";

/* Fallback main images for seeded accounts */
const MAIN_IMAGES: Record<string, string> = {
  a1: "/account/Acc1/Main.png",
  a2: "/account/Acc2/Main.png",
  a3: "/account/Acc3/Main.png",
};

export function ProductCard({ a }: { a: Account }) {
  const locale = useLocale();
  const rate = useUsdIdrRate();

  // Use image from DB first, then local fallback
  const mainImage = a.mainImage ?? MAIN_IMAGES[a.id];

  return (
    <Link href={`/catalog/${a.id}`}>
      <article className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-white/10 bg-brand-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)]">

        {/* Banner */}
        <div className="relative aspect-video overflow-hidden bg-[#13131a]">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={a.badge}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1280px) 50vw, 33vw"
              className={`object-cover transition duration-500 group-hover:scale-105 ${a.sold ? "opacity-40 grayscale" : ""}`}
              loading="lazy"
              quality={75}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-red/30 to-brand-red/10">
              <span className="font-display text-4xl font-black tracking-widest text-white drop-shadow">
                {a.tierBadge}
              </span>
            </div>
          )}

          {a.sold && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="rounded-lg bg-black/70 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gray-200 ring-1 ring-white/20 backdrop-blur">
                Sold Out
              </span>
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-4">
          {/* Title — fixed height 2 lines */}
          <p className="min-h-[2.5rem] text-sm font-medium leading-snug text-white line-clamp-2">
            {a.badge}
          </p>

          {/* Price — marketplace signature */}
          <p className="text-lg font-bold text-brand-red">
            {formatPrice(a.price, locale, rate)}
          </p>

          {/* Specs — one dense line */}
          <p className="truncate text-xs text-gray-400">
            Lv {a.level} · {a.legendarySkins} Skin Legendary · {a.coins.toLocaleString(locale === "en" ? "en-US" : "id-ID")} Coins
          </p>

          {/* Platform — like location on marketplace cards */}
          {a.platform && (
            <p className="mt-auto flex items-center gap-1 pt-1 text-[11px] text-gray-500">
              <Gamepad2 className="h-3 w-3" />
              {a.platform}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
