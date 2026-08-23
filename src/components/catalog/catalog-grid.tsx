"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import type { Account } from "@/lib/supabase/accounts";
import { ProductCard } from "@/components/ui/product-card";
import { useTranslations, useLocale } from "next-intl";

const RANKS = ["Apex Predator", "Master", "Diamond", "Platinum", "Gold", "Silver", "Bronze"];
/* Only legends that actually own an heirloom */
const HEIRLOOMS: { legend: string; weapon: string }[] = [
  { legend: "Wraith", weapon: "Kunai" },
  { legend: "Bloodhound", weapon: "Axe" },
  { legend: "Lifeline", weapon: "Shock Sticks" },
  { legend: "Pathfinder", weapon: "Boxing Gloves" },
  { legend: "Octane", weapon: "Butterfly Knife" },
  { legend: "Mirage", weapon: "Statue" },
  { legend: "Caustic", weapon: "Sledgehammer" },
  { legend: "Gibraltar", weapon: "War Club" },
  { legend: "Bangalore", weapon: "Kukri" },
  { legend: "Revenant", weapon: "Scythe" },
  { legend: "Rampart", weapon: "Wrench" },
  { legend: "Wattson", weapon: "Energy Reader" },
  { legend: "Crypto", weapon: "Jikdo/Sword" },
  { legend: "Loba", weapon: "Folding Fan" },
  { legend: "Seer", weapon: "Sickles" },
  { legend: "Valkyrie", weapon: "Spear/Yari" },
  { legend: "Ash", weapon: "Nunchaku" },
  { legend: "Horizon", weapon: "Gravity Mace" },
  { legend: "Fuse", weapon: "Guitar" },
];
const PLATFORMS = ["PC", "PlayStation 4", "Xbox One"];
const SORT_KEYS = ["recommended", "lowestPrice", "highestPrice", "newest"] as const;

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
    <label className="group flex cursor-pointer items-center gap-2.5">
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
          checked
            ? "border-brand-red bg-brand-red"
            : "border-white/25 bg-white/5 group-hover:border-brand-red/60"
        }`}
        onClick={onToggle}
      >
        {checked && (
          <svg viewBox="0 0 10 8" className="h-2.5 w-2.5 fill-current text-white">
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

/* ─── Heirloom multi-select dropdown ─── */
function HeirloomDropdown({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (h: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="border-b border-white/8 py-4" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-sm font-semibold text-white transition hover:text-gray-200"
      >
        <span className="flex items-center gap-2">
          Heirloom
          {selected.length > 0 && (
            <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-bold text-white">
              {selected.length}
            </span>
          )}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="mt-3 max-h-60 space-y-2.5 overflow-y-auto rounded-lg border border-white/10 bg-black/30 p-3">
          {HEIRLOOMS.map(({ legend, weapon }) => (
            <CheckboxItem
              key={legend}
              label={`${legend} · ${weapon}`}
              checked={selected.includes(legend)}
              onToggle={() => onToggle(legend)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Sidebar Filter Panel ─── */
function FilterPanel({
  heirlooms,
  setHeirlooms,
  platforms,
  setPlatforms,
  budget,
  setBudget,
  maxPrice,
  onClear,
}: {
  heirlooms: string[];
  setHeirlooms: (v: string[]) => void;
  platforms: string[];
  setPlatforms: (v: string[]) => void;
  budget: number;
  setBudget: (v: number) => void;
  maxPrice: number;
  onClear: () => void;
}) {
  const locale = useLocale();
  const t = useTranslations("catalog");
  const numberLocale = locale === "en" ? "en-US" : "id-ID";
  const toggleHeirloom = (h: string) =>
    setHeirlooms(heirlooms.includes(h) ? heirlooms.filter((x) => x !== h) : [...heirlooms, h]);
  const togglePlatform = (p: string) =>
    setPlatforms(platforms.includes(p) ? platforms.filter((x) => x !== p) : [...platforms, p]);

  const hasFilters = heirlooms.length > 0 || platforms.length > 0 || budget > 0;

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-sm font-bold text-white">Filter</h3>
        {hasFilters && (
          <button
            onClick={onClear}
            className="text-xs font-medium text-brand-cyan transition-colors hover:text-white"
          >
            {t("reset")}
          </button>
        )}
      </div>

      {/* Heirloom — dropdown */}
      <HeirloomDropdown selected={heirlooms} onToggle={toggleHeirloom} />

      {/* Platform */}
      <div className="border-b border-white/8 py-4">
        <div className="mb-3 text-sm font-semibold text-white">Platform</div>
        <div className="space-y-2.5">
          {PLATFORMS.map((p) => (
            <CheckboxItem
              key={p}
              label={p}
              checked={platforms.includes(p)}
              onToggle={() => togglePlatform(p)}
            />
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="py-4">
        <div className="mb-3 text-sm font-semibold text-white">{t("priceRange")}</div>
        <input
          type="range"
          min="0"
          max={maxPrice}
          value={budget}
          onChange={(e) => setBudget(parseInt(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-brand-red"
          style={{
            background: `linear-gradient(to right, #FF2A44 0%, #FF2A44 ${(budget / maxPrice) * 100}%, rgba(255,255,255,0.1) ${(budget / maxPrice) * 100}%, rgba(255,255,255,0.1) 100%)`,
          }}
        />
        <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
          <span>Rp 0</span>
          <span className="font-semibold text-brand-red">
            {budget > 0 ? `Rp ${budget.toLocaleString(numberLocale)}` : t("all")}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Main CatalogGrid ─── */
export function CatalogGrid({ list }: { list: Account[] }) {
  const t = useTranslations("catalog");
  const locale = useLocale();
  const numberLocale = locale === "en" ? "en-US" : "id-ID";
  const [q, setQ] = useState("");
  const [selectedRank, setSelectedRank] = useState<string | null>(null);
  const [selectedHeirlooms, setSelectedHeirlooms] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const maxPrice = Math.max(...list.map((a) => a.price));
  const [budget, setBudget] = useState(0);
  const [sort, setSort] = useState<(typeof SORT_KEYS)[number]>("recommended");
  const [openSort, setOpenSort] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  /* Close sort dropdown on outside click / Escape */
  useEffect(() => {
    if (!openSort) return;
    const onDown = (e: MouseEvent) => {
      if (!sortRef.current?.contains(e.target as Node)) setOpenSort(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenSort(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openSort]);

  const clearAll = () => {
    setSelectedRank(null);
    setSelectedHeirlooms([]);
    setSelectedPlatforms([]);
    setBudget(0);
  };

  const filtered = useMemo(() => {
    return list.filter((a) => {
      const hay = `${a.rank} ${a.badge}`.toLowerCase();
      const okQ = hay.includes(q.toLowerCase());
      const okRank =
        !selectedRank ||
        a.rank.toLowerCase().includes(selectedRank.toLowerCase());
      const okHeirloom =
        selectedHeirlooms.length === 0 ||
        selectedHeirlooms.some((h) => a.badge.toLowerCase().includes(h.toLowerCase()));
      const okBudget = budget === 0 || a.price <= budget;
      const okPlatform =
        selectedPlatforms.length === 0 ||
        selectedPlatforms.some((p) =>
          (a.platform ?? "").toLowerCase().includes(p.toLowerCase()),
        );
      return okQ && okRank && okHeirloom && okBudget && okPlatform;
    });
  }, [q, selectedRank, selectedHeirlooms, selectedPlatforms, budget, list]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === "lowestPrice") arr.sort((a, b) => a.price - b.price);
    if (sort === "highestPrice") arr.sort((a, b) => b.price - a.price);
    if (sort === "newest") arr.reverse();
    return arr;
  }, [filtered, sort]);

  const activeChips = [
    ...(selectedRank ? [{ label: selectedRank, remove: () => setSelectedRank(null) }] : []),
    ...selectedHeirlooms.map((h) => ({
      label: h,
      remove: () => setSelectedHeirlooms((prev) => prev.filter((x) => x !== h)),
    })),
    ...selectedPlatforms.map((p) => ({
      label: p,
      remove: () => setSelectedPlatforms((prev) => prev.filter((x) => x !== p)),
    })),
    ...(budget > 0
      ? [{ label: `≤ Rp ${budget.toLocaleString(numberLocale)}`, remove: () => setBudget(0) }]
      : []),
  ];

  const sidebarProps = {
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
    <div>
      {/* ── Search bar besar ala marketplace ── */}
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full rounded-full border border-white/10 bg-brand-surface py-3.5 pl-12 pr-12 text-sm text-gray-200 transition placeholder:text-gray-600 focus:border-brand-red/50 focus:outline-none focus:ring-2 focus:ring-brand-red/20"
        />
        {q && (
          <button
            onClick={() => setQ("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-white"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* ── Tab kategori rank ── */}
      <div className="scrollbar-none -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {[null, ...RANKS].map((r) => {
          const active = selectedRank === r;
          return (
            <button
              key={r ?? "all"}
              onClick={() => setSelectedRank(r)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                active
                  ? "bg-brand-red text-white shadow-[0_0_16px_-4px_rgba(255,42,68,0.6)]"
                  : "border border-white/10 bg-brand-surface text-gray-300 hover:border-white/25 hover:text-white"
              }`}
            >
              {r ?? t("all")}
            </button>
          );
        })}
      </div>

      <div className="flex gap-6">
        {/* ── Mobile filter drawer ── */}
        {showMobileFilter && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowMobileFilter(false)}
            />
            <div className="absolute bottom-0 left-0 top-0 w-full max-w-xs overflow-y-auto border-r border-white/10 bg-[#0c0c10] p-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-base font-bold text-white">Filter</span>
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <FilterPanel {...sidebarProps} />
              <button
                onClick={() => setShowMobileFilter(false)}
                className="mt-4 w-full rounded-xl bg-brand-red py-3 text-sm font-semibold text-white transition hover:bg-brand-red/90"
              >
                {t("apply")}
              </button>
            </div>
          </div>
        )}

        {/* ── Desktop sidebar ── */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-6 rounded-2xl border border-white/10 bg-brand-surface/60 px-5 py-4">
            <FilterPanel {...sidebarProps} />
          </div>
        </aside>

        {/* ── Main content ── */}
        <div className="min-w-0 flex-1">
          {/* Toolbar */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            {/* Mobile filter button */}
            <button
              onClick={() => setShowMobileFilter(true)}
              className="flex shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-brand-surface px-3.5 py-2 text-sm text-gray-300 transition hover:border-white/25 hover:text-white lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter
              {(selectedHeirlooms.length > 0 || selectedPlatforms.length > 0 || budget > 0) && (
                <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-white">
                  {selectedHeirlooms.length + selectedPlatforms.length + (budget > 0 ? 1 : 0)}
                </span>
              )}
            </button>

            {/* Result count */}
            <p className="hidden text-sm text-gray-400 sm:block">
              {t("results.prefix")}{" "}
              <span className="font-semibold text-white">{sorted.length.toLocaleString()}</span>{" "}
              {t("results.suffix")}
            </p>

            {/* Sort dropdown */}
            <div className="relative ml-auto shrink-0" ref={sortRef}>
              <button
                onClick={() => setOpenSort(!openSort)}
                aria-expanded={openSort}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-brand-surface px-3.5 py-2 text-sm text-gray-300 transition hover:border-white/25 hover:text-white"
              >
                <span className="hidden sm:inline">{t("sort.sortBy")}</span>
                <span className="font-semibold text-white">{t(`sort.${sort}`)}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${openSort ? "rotate-180" : ""}`} />
              </button>
              {openSort && (
                <div className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl border border-white/10 bg-[#12131a] shadow-2xl">
                  {SORT_KEYS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSort(opt);
                        setOpenSort(false);
                      }}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition ${
                        sort === opt
                          ? "bg-brand-red/10 text-brand-red"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {t(`sort.${opt}`)}
                      {sort === opt && <Check className="h-3.5 w-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Active filter chips */}
          {activeChips.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {activeChips.map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-red/30 bg-brand-red/10 px-3 py-1 text-xs font-medium text-brand-red"
                >
                  {chip.label}
                  <button onClick={chip.remove} className="transition-colors hover:text-white" aria-label={`Remove ${chip.label}`}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <button
                onClick={clearAll}
                className="rounded-full px-2 py-1 text-xs text-gray-400 underline-offset-2 transition hover:text-white hover:underline"
              >
                Reset
              </button>
            </div>
          )}

          {/* Result count mobile */}
          <p className="mb-4 text-sm text-gray-400 sm:hidden">
            {t("results.prefix")}{" "}
            <span className="font-semibold text-white">{sorted.length.toLocaleString()}</span>{" "}
            {t("results.suffix")}
          </p>

          {/* Grid */}
          {sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 py-20 text-center">
              <Search className="mb-4 h-8 w-8 text-gray-600" />
              <p className="max-w-xs text-sm text-gray-500">{t("empty")}</p>
              <button
                onClick={clearAll}
                className="mt-4 rounded-full border border-brand-red/40 px-5 py-2 text-xs font-semibold text-brand-red transition hover:bg-brand-red/10"
              >
                {t("resetFilters")}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
              {sorted.map((a) => (
                <ProductCard key={a.id} a={a} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CatalogGrid;
