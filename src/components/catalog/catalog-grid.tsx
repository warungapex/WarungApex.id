"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Account } from "@/lib/accounts";
import { ProductCard } from "@/components/ui/product-card";

const tiers = ["Semua", "PRED", "MAST", "D1", "D2", "D3", "P1", "G2"];

export function CatalogGrid({ list }: { list: Account[] }) {
  const [tier, setTier] = useState("Semua");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return list.filter((a) => {
      const okTier = tier === "Semua" || a.tierBadge === tier;
      const hay = `${a.rank} ${a.badge}`.toLowerCase();
      const okQ = hay.includes(q.toLowerCase());
      return okTier && okQ;
    });
  }, [tier, q, list]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {tiers.map((t) => (
            <button
              key={t}
              onClick={() => setTier(t)}
              className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition ${
                tier === t
                  ? "bg-brand-red text-white"
                  : "border border-white/10 bg-brand-surface text-gray-400 hover:border-brand-cyan/40 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari rank atau badge…"
            className="w-full rounded-full border border-white/10 bg-brand-surface py-2.5 pl-10 pr-4 text-sm text-[#f0f2f5] outline-none placeholder:text-gray-500 focus:border-brand-cyan/50"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-sm text-gray-500">
          Tidak ada akun yang cocok dengan filter ini.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((a) => (
            <ProductCard key={a.id} a={a} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CatalogGrid;