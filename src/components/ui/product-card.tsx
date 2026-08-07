import { Coins, Crown, Gamepad2, ShieldCheck } from "lucide-react";
import type { Account } from "@/lib/accounts";
import { formatPrice, rankColor, rankTier } from "@/lib/accounts";
import { useLocale } from "next-intl";
import { useUsdIdrRate } from "@/components/rate-provider";

export function ProductCard({ a }: { a: Account }) {
  const locale = useLocale();
  const rate = useUsdIdrRate();

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-brand-surface transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-cyan/50 hover:shadow-[0_20px_50px_-12px_rgba(0,240,255,0.15)]">
      {a.sold && (
        <span className="absolute right-3 top-3 z-10 rounded-full bg-brand-dark/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-300 ring-1 ring-white/20 backdrop-blur">
          Sold
        </span>
      )}
      {a.featured && !a.sold && (
        <span className="absolute right-3 top-3 z-10 rounded-full bg-brand-red px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
          Featured
        </span>
      )}

      {/* Rank banner */}
      <div className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${rankColor(a.tierBadge)}`}>
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_30%_50%,white,transparent_60%)]" />
        <div className="relative text-center text-white">
          <div className="font-[var(--font-display)] text-3xl font-black tracking-[0.2em] drop-shadow">{a.tierBadge}</div>
          <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/90 drop-shadow">
            {a.rank}
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-cyan">
            <Crown className="h-4 w-4" />
            {a.badge}
          </div>
          <span className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.3em] text-gray-400">
            {rankTier(a.tierBadge)} TIER
          </span>
        </div>

        <ul className="mt-4 space-y-2 text-xs text-gray-400">
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
              <ShieldCheck className="h-3.5 w-3.5" /> Skins
            </span>
            <span className="text-gray-200">{a.skins}</span>
          </li>
        </ul>

        <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
          <span className="text-lg font-bold text-[#f0f2f5]">{formatPrice(a.price, locale, rate)}</span>
          <span className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition ${a.sold ? "cursor-not-allowed bg-white/10 text-gray-400" : "bg-brand-red text-white hover:bg-brand-red/80"}`}>
            {a.sold ? "Sold Out" : "Beli"}
          </span>
        </div>
      </div>
    </article>
  );
}