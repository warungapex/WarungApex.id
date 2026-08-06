import { accounts } from "@/lib/accounts";
import { formatPrice } from "@/lib/accounts";
import { Crosshair, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";

const spot = accounts.filter((a) => !a.sold).slice(0, 3);

export function Catalog() {
  const locale = useLocale();
  const t = useTranslations("catalog");

  return (
    <section id="katalog" className="relative w-full bg-brand-dark py-28 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-brand-red/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeading eyebrow={t("spotlight")} title={t("title1")} accent={t("latest")} />
        </Reveal>

        <Stagger className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 max-lg:max-w-md max-lg:mx-auto">
          {spot.map((a, i) => (
            <StaggerItem key={a.id}>
              <div className="group relative h-full bg-brand-surface">
                {/* HUD top frame */}
                <div className="relative flex h-36 items-end bg-gradient-to-b from-brand-surface to-black/60 overflow-hidden">
                  {/* scanline sweep */}
                  <div className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-brand-cyan/10 to-transparent skew-x-[-20deg] translate-x-[-200%] group-hover:translate-x-[400%] transition-transform duration-1000 ease-out" />
                  {/* corner brackets */}
                  <div className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-brand-red/70" />
                  <div className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-brand-red/70" />
                  <div className="pointer-events-none absolute left-3 bottom-3 h-5 w-5 border-l-2 border-b-2 border-brand-red/70" />
                  <div className="pointer-events-none absolute right-3 bottom-3 h-5 w-5 border-r-2 border-b-2 border-brand-red/70" />

                  <div className="relative z-10 flex w-full items-end justify-between px-8 pb-4">
                    <div>
                      <div className="flex items-center gap-2 text-cyan-300">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-cyan">Target du Code</span>
                        <Crosshair className="h-3.5 w-3.5" />
                        <span className="font-[var(--font-display)] text-sm text-brand-cyan">0{i + 1}</span>
                      </div>
                      <h3 className="font-[var(--font-display)] text-4xl font-black text-[#dfeaf6] tracking-[0.08em]">
                        {a.rank.toUpperCase()}
                      </h3>
                      <p className="text-[11px] uppercase tracking-[0.35em] text-gray-500">{a.badge}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-[var(--font-display)] text-2xl font-black leading-none text-brand-red">{a.tierBadge}</div>
                      <div className="mt-1 flex items-center gap-1 text-brand-cyan">
                        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-brand-cyan" />
                        <span className="text-[9px] uppercase tracking-[0.3em]">Ready</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* HUD readout */}
                <dl className="space-y-3 px-6 py-5">
                  {[
                    ["LEVEL", String(a.level)],
                    ["AC / COINS", a.coins.toLocaleString("id-ID")],
                    ["SKINS", String(a.skins)],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between border-b border-white/5 pb-2">
                      <dt className="text-[10px] uppercase tracking-[0.3em] text-gray-500">{k}</dt>
                      <dd className="font-mono text-sm text-[#dfeaf6]">{v}</dd>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-1">
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-gray-500">PRICE</dt>
                    <dd className="font-[var(--font-display)] text-lg font-bold text-brand-red">{formatPrice(a.price, locale)}</dd>
                  </div>
                  <span className="mt-3 flex w-full items-center justify-center gap-2 border border-brand-red/60 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition group-hover:bg-brand-red group-hover:shadow-[0_0_30px_-6px_rgba(255,42,68,0.8)]">
                    Claim
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </dl>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-12 text-center">
          <Link
            href="/catalog"
            className="inline-block border border-brand-cyan/40 text-brand-cyan px-10 py-3.5 rounded-full text-sm font-semibold tracking-wide hover:bg-brand-cyan/10 transition"
          >
            {t("viewAll")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}