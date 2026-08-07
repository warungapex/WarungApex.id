"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";
import { GooeySearchBar } from "@/components/ui/animated-search-bar";
import type { Account } from "@/lib/supabase/accounts";
import { ProductCard } from "@/components/ui/product-card";

const RANKS = ["Apex Predator", "Master", "Diamond", "Platinum", "Gold"];
const HEIRLOOMS = ["Wraith", "Bloodhound", "Gibraltar", "Lifeline", "Pathfinder", "Octane", "Mirage", "Caustic", "Bangalore", "Wattson", "Crypto", "Revenant", "Loba", "Rampart", "Horizon", "Fuse", "Valkyrie", "Seer", "Ash", "Mad Maggie", "Newcastle", "Vantage", "Catalyst", "Ballistic"];
const PLATFORMS = ["PC", "PlayStation 4", "Xbox One"];
const SORT_OPTIONS = ["Recommended", "Harga Terendah", "Harga Tertinggi", "Terbaru"];

/* ─── Collapsible filter section ─── */
function FilterSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/8 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-sm font-semibold text-white tracking-wide hover:text-brand-cyan transition-colors"
      >
        {title}
        {open ? (
          <ChevronUp className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </button>
      {open && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

/* ─── Checkbox row ─── */
function CheckboxItem({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <span
        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
          checked
            ? "bg-brand-cyan border-brand-cyan"
            : "border-white/25 bg-white/5 group-hover:border-brand-cyan/60"
        }`}
        onClick={onToggle}
      >
        {checked && (
          <svg viewBox="0 0 10 8" className="w-2.5 h-2.5 text-brand-dark fill-current">
            <path d="M1 4l2.5 2.5L9 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span
        onClick={onToggle}
        className={`text-sm transition-colors ${checked ? "text-white" : "text-gray-400 group-hover:text-gray-200"}`}
      >
        {label}
      </span>
    </label>
  );
}

/* ─── Active filter chip ─── */
function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 text-xs text-brand-cyan font-medium">
      {label}
      <button onClick={onRemove} className="hover:text-white transition-colors">
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

/* ─── Sidebar Filter Panel ─── */
function FilterPanel({
  ranks,
  setRanks,
  heirlooms,
  setHeirlooms,
  platforms,
  setPlatforms,
  budget,
  setBudget,
  maxPrice,
  onClear,
}: {
  ranks: string[];
  setRanks: (v: string[]) => void;
  heirlooms: string[];
  setHeirlooms: (v: string[]) => void;
  platforms: string[];
  setPlatforms: (v: string[]) => void;
  budget: number;
  setBudget: (v: number) => void;
  maxPrice: number;
  onClear: () => void;
}) {
  const toggleRank = (r: string) =>
    setRanks(ranks.includes(r) ? ranks.filter((x) => x !== r) : [...ranks, r]);
  const toggleHeirloom = (h: string) =>
    setHeirlooms(heirlooms.includes(h) ? heirlooms.filter((x) => x !== h) : [...heirlooms, h]);
  const togglePlatform = (p: string) =>
    setPlatforms(platforms.includes(p) ? platforms.filter((x) => x !== p) : [...platforms, p]);

  const hasFilters = ranks.length > 0 || heirlooms.length > 0 || platforms.length > 0 || budget > 0;

  return (
    <div className="space-y-0">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-bold text-white tracking-tight">Filter</h3>
        {hasFilters && (
          <button
            onClick={onClear}
            className="text-xs text-brand-cyan hover:text-white transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Rank */}
      <FilterSection title="Rank">
        {RANKS.map((r) => (
          <CheckboxItem
            key={r}
            label={r}
            checked={ranks.includes(r)}
            onToggle={() => toggleRank(r)}
          />
        ))}
      </FilterSection>

      {/* Heirloom */}
      <FilterSection title="Heirloom">
        {HEIRLOOMS.map((h) => (
          <CheckboxItem
            key={h}
            label={h}
            checked={heirlooms.includes(h)}
            onToggle={() => toggleHeirloom(h)}
          />
        ))}
      </FilterSection>

      {/* Platform */}
      <FilterSection title="Platform">
        {PLATFORMS.map((p) => (
          <CheckboxItem
            key={p}
            label={p}
            checked={platforms.includes(p)}
            onToggle={() => togglePlatform(p)}
          />
        ))}
      </FilterSection>

      {/* Budget */}
      <div className="py-4 border-b border-white/8">
        <div className="text-sm font-semibold text-white tracking-wide mb-3">Budget</div>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={budget}
            onChange={(e) => setBudget(parseInt(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-red"
            style={{
              background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${(budget / maxPrice) * 100}%, rgba(255,255,255,0.1) ${(budget / maxPrice) * 100}%, rgba(255,255,255,0.1) 100%)`,
            }}
          />
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Rp 0</span>
            <span className="text-brand-red font-semibold">
              Rp {budget.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main CatalogGrid ─── */
export function CatalogGrid({ list }: { list: Account[] }) {
  const [q, setQ] = useState("");
  const [selectedRanks, setSelectedRanks] = useState<string[]>([]);
  const [selectedHeirlooms, setSelectedHeirlooms] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const maxPrice = Math.max(...list.map((a) => a.price));
  const [budget, setBudget] = useState(0);
  const [sort, setSort] = useState("Recommended");
  const [openSort, setOpenSort] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const clearAll = () => {
    setSelectedRanks([]);
    setSelectedHeirlooms([]);
    setSelectedPlatforms([]);
    setBudget(0);
  };

  const filtered = useMemo(() => {
    return list.filter((a) => {
      const hay = `${a.rank} ${a.badge}`.toLowerCase();
      const okQ = hay.includes(q.toLowerCase());
      const okRank =
        selectedRanks.length === 0 ||
        selectedRanks.some((r) => a.rank.toLowerCase().includes(r.toLowerCase()));
      const okHeirloom =
        selectedHeirlooms.length === 0 ||
        selectedHeirlooms.some((h) => a.badge.toLowerCase().includes(h.toLowerCase()));
      const okBudget = budget === 0 || a.price <= budget;
      return okQ && okRank && okHeirloom && okBudget;
    });
  }, [q, selectedRanks, selectedHeirlooms, budget, list]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === "Harga Terendah") arr.sort((a, b) => a.price - b.price);
    if (sort === "Harga Tertinggi") arr.sort((a, b) => b.price - a.price);
    if (sort === "Terbaru") arr.reverse();
    return arr;
  }, [filtered, sort]);

  const activeChips = [
    ...selectedRanks.map((r) => ({
      label: r,
      remove: () => setSelectedRanks((prev) => prev.filter((x) => x !== r)),
    })),
    ...selectedHeirlooms.map((h) => ({
      label: h,
      remove: () => setSelectedHeirlooms((prev) => prev.filter((x) => x !== h)),
    })),
    ...selectedPlatforms.map((p) => ({
      label: p,
      remove: () => setSelectedPlatforms((prev) => prev.filter((x) => x !== p)),
    })),
    ...(budget > 0
      ? [{ label: `≤ Rp ${budget.toLocaleString("id-ID")}`, remove: () => setBudget(0) }]
      : []),
  ];

  const sidebarProps = {
    ranks: selectedRanks,
    setRanks: setSelectedRanks,
    heirlooms: selectedHeirlooms,
    setHeirlooms: setSelectedHeirlooms,
    platforms: selectedPlatforms,
    setPlatforms: setSelectedPlatforms,
    budget,
    setBudget,
    onClear: clearAll,
    maxPrice,
  };

  return (
    <div className="flex gap-8">
      {/* ── Mobile filter drawer ── */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowMobileFilter(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-full max-w-sm bg-[#0c0c10] border-r border-white/10 overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <span className="text-base font-bold text-white">Filter</span>
              <button
                onClick={() => setShowMobileFilter(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 py-4">
              <FilterPanel {...sidebarProps} />
            </div>
          </div>
        </div>
      )}

      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 border border-white/10 rounded-2xl px-5 py-4 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-sm shadow-lg">
          <FilterPanel {...sidebarProps} />
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          {/* Mobile filter button */}
          <button
            onClick={() => setShowMobileFilter(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-brand-surface text-sm text-gray-300 hover:text-white hover:border-brand-cyan/40 transition shrink-0"
          >
            <Filter className="h-4 w-4" />
            Filter
          </button>

          {/* Search */}
          <div className="relative flex-1 min-w-48">
            <GooeySearchBar
              data={list.map((a) => a.badge)}
              placeholder="Type to filter..."
              onSearch={(text) => setQ(text)}
              onSelect={(item) => setQ(item)}
            />
          </div>

          {/* Sort dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={() => setOpenSort(!openSort)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-brand-surface text-sm text-gray-300 hover:text-white hover:border-brand-cyan/40 transition"
            >
              Sort by: <span className="font-semibold text-white">{sort}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${openSort ? "rotate-180" : ""}`} />
            </button>
            {openSort && (
              <div className="absolute right-0 mt-2 w-52 bg-[#0c0c10] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSort(opt);
                      setOpenSort(false);
                    }}
                    className={`block w-full text-left px-4 py-2.5 text-sm transition ${
                      sort === opt
                        ? "bg-brand-cyan/10 text-brand-cyan"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Active filter chips */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {activeChips.map((chip) => (
              <FilterChip key={chip.label} label={chip.label} onRemove={chip.remove} />
            ))}
          </div>
        )}

        {/* Result count */}
        <p className="mb-5 text-sm text-gray-400">
          About <span className="font-semibold text-white">{sorted.length.toLocaleString()}</span> results
        </p>

        {/* Grid */}
        {sorted.length === 0 ? (
          <p className="mt-16 text-center text-sm text-gray-500">
            Tidak ada akun yang cocok dengan filter ini.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {sorted.map((a) => (
              <ProductCard key={a.id} a={a} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CatalogGrid;
