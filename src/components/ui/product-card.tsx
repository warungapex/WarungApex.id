"use client";

import { Coins, Gamepad2, ShieldCheck } from "lucide-react";
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
      <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-brand-surface transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-cyan/50 hover:shadow-[0_20px_50px_-12px_rgba(0,240,255,0.15)] cursor-pointer">

        {/* Status badges */}
        {a.sold && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-brand-dark/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-300 ring-1 ring-white/20 backdrop-blur">
            Sold
          </span>
        )}
        {a.featured && !a.sold && (
          <span className="absolute right-3 top-3 z-10 hidden rounded-full bg-brand-red px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg sm:block">
            Featured
          </span>
        )}

        {/* Banner — Main image if available, fallback to rank gradient */}
        {mainImage ? (
          <div className="relative h-40 overflow-hidden">
            <Image
              src={mainImage}
              alt={a.badge}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition duration-500"
              unoptimized
            />
          </div>
        ) : (
          <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-brand-red/30 to-brand-red/10 border-b border-white/5">
            <div className="text-center">
              <p className="font-[var(--font-display)] text-3xl font-black tracking-widest text-white drop-shadow">
                {a.tierBadge}
              </p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">
                {a.rank}
              </p>
            </div>
          </div>
        )}

        <div className="p-5">
          {/* Account name */}
          <p className="text-sm font-semibold text-white mb-4 leading-snug">
            {a.badge}
          </p>

          <ul className="space-y-2 text-xs text-gray-400">
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Gamepad2 className="h-3.5 w-3.5" /> Level
              </span>
              <span className="text-gray-200">{a.level}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Coins className="h-3.5 w-3.5" /> AC/Coins
              </span>
              <span className="text-gray-200">{a.coins.toLocaleString("id-ID")}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" /> Skin Legendary
              </span>
              <span className="text-gray-200">{a.legendarySkins}</span>
            </li>
          </ul>

          <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
            <span className="text-lg font-bold text-[#f0f2f5]">
              {formatPrice(a.price, locale, rate)}
            </span>
            <span className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition ${
              a.sold
                ? "cursor-not-allowed bg-white/10 text-gray-400"
                : "bg-brand-red text-white hover:bg-brand-red/80"
            }`}>
              {a.sold ? "Sold Out" : "Beli"}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
