"use client";

import { useTranslations } from "next-intl";

export function Marquee() {
  const t = useTranslations("marquee");
  const items = t.raw("items") as string[];
  const row = [...items, ...items];
  return (
    <div className="relative w-full overflow-hidden border-y border-white/5 bg-white/[0.02] py-3.5">
      <div className="flex whitespace-nowrap animate-marquee">
        {row.map((item, i) => (
          <div key={i} className="flex shrink-0 items-center">
            <span className="font-mono2 px-7 text-[11px] font-medium uppercase tracking-[0.3em] text-white/45">
              {item}
            </span>
            <span className="text-[9px] text-brand-cyan/60">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
