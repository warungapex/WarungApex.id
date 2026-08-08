"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { createAccount, updateAccount } from "@/lib/actions/accounts";
import type { Account } from "@/lib/supabase/accounts";
import { ChevronDown, Check } from "lucide-react";
import { ImageUploader } from "@/components/admin/image-uploader";

/* ─────────────────────────────────────────
   Constants
───────────────────────────────────────── */
const PLATFORMS = ["PC", "PlayStation 4", "PlayStation 5", "Xbox One", "Xbox Series X/S"];
const PC_LAUNCHERS = ["EA App", "Steam"];

const RANK_TIERS = [
  { label: "Apex Predator", value: "Apex Predator", divisions: false },
  { label: "Master",        value: "Master",        divisions: false },
  { label: "Diamond",       value: "Diamond",       divisions: true  },
  { label: "Platinum",      value: "Platinum",      divisions: true  },
  { label: "Gold",          value: "Gold",          divisions: true  },
  { label: "Silver",        value: "Silver",        divisions: true  },
  { label: "Bronze",        value: "Bronze",        divisions: true  },
  { label: "Rookie",        value: "Rookie",        divisions: true  },
  { label: "Unranked",      value: "Unranked",      divisions: false },
];
const DIVISIONS = ["I", "II", "III", "IV"];

const inputCls =
  "w-full px-4 py-2.5 rounded-xl border border-white/8 bg-[#16161f] text-white text-sm placeholder:text-gray-600 focus:border-brand-red/40 focus:outline-none transition";

/* ─────────────────────────────────────────
   Generic single-select dropdown
───────────────────────────────────────── */
function Select({
  name,
  options,
  defaultValue,
  required,
}: {
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  required?: boolean;
}) {
  const initial = options.find((o) => o.value === defaultValue) ?? options[0];
  const [selected, setSelected] = useState(initial);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <input type="hidden" name={name} value={selected.value} required={required} />
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={inputCls + " flex items-center justify-between"}
      >
        <span>{selected.label}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-50 mt-1.5 w-full rounded-xl border border-white/10 bg-[#16161f] shadow-2xl shadow-black/60 overflow-hidden">
          <div className="relative">
            <div className="max-h-56 overflow-y-auto">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { setSelected(opt); setOpen(false); }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition hover:bg-white/5 ${
                    selected.value === opt.value ? "text-brand-red bg-brand-red/5" : "text-gray-300"
                  }`}
                >
                  {opt.label}
                  {selected.value === opt.value && <Check className="w-3.5 h-3.5 text-brand-red shrink-0" />}
                </button>
              ))}
            </div>
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-[#16161f] to-transparent" />
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   Rank selector — tier grid + division row
───────────────────────────────────────── */
function RankSelect({ defaultValue }: { defaultValue?: string }) {
  const parseTier = (v?: string) => {
    if (!v) return RANK_TIERS[0].value;
    const found = RANK_TIERS.find((t) => v.startsWith(t.value));
    return found ? found.value : RANK_TIERS[0].value;
  };
  const parseDiv = (v?: string) => {
    if (!v) return "I";
    const m = v.match(/\s(IV|III|II|I)$/);
    return m ? m[1] : "I";
  };

  const [tier, setTier] = useState(parseTier(defaultValue));
  const [div, setDiv] = useState(parseDiv(defaultValue));
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const tierObj = RANK_TIERS.find((t) => t.value === tier)!;
  const fullValue = tierObj.divisions ? `${tier} ${div}` : tier;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function pickTier(t: typeof RANK_TIERS[0]) {
    setTier(t.value);
    setDiv("I");
    if (!t.divisions) setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <input type="hidden" name="rank" value={fullValue} required />
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={inputCls + " flex items-center justify-between"}
      >
        <span>{fullValue}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1.5 w-full rounded-xl border border-white/10 bg-[#16161f] shadow-2xl shadow-black/60 overflow-hidden">
          {/* Tier grid — 3 columns */}
          <div className="p-1.5 grid grid-cols-3 gap-1">
            {RANK_TIERS.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => pickTier(t)}
                className={`px-2 py-2 rounded-lg text-xs font-semibold text-center transition border ${
                  tier === t.value
                    ? "bg-brand-red/15 border-brand-red/30 text-brand-red"
                    : "border-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Division row */}
          {tierObj.divisions && (
            <div className="border-t border-white/8 px-3 py-2.5 flex gap-2">
              {DIVISIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => { setDiv(d); setOpen(false); }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition ${
                    div === d
                      ? "bg-brand-red/15 border-brand-red/40 text-brand-red"
                      : "border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   Platform multi-select with launcher
───────────────────────────────────────── */
function PlatformSelect({
  defaultPlatforms = [],
  defaultLauncher = "",
}: {
  defaultPlatforms?: string[];
  defaultLauncher?: string;
}) {
  const [selected, setSelected] = useState<string[]>(defaultPlatforms);
  const [launcher, setLauncher] = useState(defaultLauncher);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasPC = selected.includes("PC");

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function toggle(p: string) {
    setSelected((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
    );
    if (p === "PC" && selected.includes("PC")) setLauncher("");
  }

  function buildValue() {
    return selected
      .map((p) => (p === "PC" && launcher ? `PC (${launcher})` : p))
      .join(", ");
  }

  return (
    <div ref={ref} className="relative">
      <input type="hidden" name="platform" value={buildValue()} />
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={inputCls + " flex items-center justify-between"}
      >
        <span className={selected.length === 0 ? "text-gray-600" : "text-white"}>
          {selected.length === 0 ? "Pilih platform..." : buildValue()}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1.5 w-full rounded-xl border border-white/10 bg-[#16161f] shadow-2xl shadow-black/60 overflow-hidden">
          <div className="p-2 space-y-0.5">
            {PLATFORMS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => toggle(p)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition hover:bg-white/5"
              >
                <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                  selected.includes(p) ? "bg-brand-red border-brand-red" : "border-white/20 bg-white/5"
                }`}>
                  {selected.includes(p) && <Check className="w-2.5 h-2.5 text-white" />}
                </span>
                <span className={selected.includes(p) ? "text-white" : "text-gray-400"}>{p}</span>
              </button>
            ))}

            {hasPC && (
              <div className="border-t border-white/8 pt-2 mt-1 px-3 pb-1">
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">PC Launcher</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setLauncher("")}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition ${
                      launcher === "" ? "bg-brand-red/15 border-brand-red/40 text-brand-red" : "border-white/10 text-gray-400 hover:border-white/20"
                    }`}
                  >
                    Keduanya
                  </button>
                  {PC_LAUNCHERS.map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLauncher(launcher === l ? "" : l)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition ${
                        launcher === l ? "bg-brand-red/15 border-brand-red/40 text-brand-red" : "border-white/10 text-gray-400 hover:border-white/20"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   Layout helpers
───────────────────────────────────────── */
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
        {label}
        {hint && <span className="normal-case tracking-normal font-normal text-gray-600 ml-1">— {hint}</span>}
      </label>
      {children}
    </div>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <div className="h-px flex-1 bg-white/5" />
      <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{label}</span>
      <div className="h-px flex-1 bg-white/5" />
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Form
───────────────────────────────────────── */
interface Props { account?: Account; }

export function AccountForm({ account }: Props) {
  const isEdit = !!account;
  const [, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [accountId, setAccountId] = useState(account?.id ?? "");
  const [images, setImages] = useState<string[]>(account?.images ?? []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    formData.delete("images");
    formData.append("images", images.join(","));
    startTransition(async () => {
      const result = isEdit
        ? await updateAccount(account!.id, formData)
        : await createAccount(formData);
      if (result?.error) setError(result.error);
    });
  }

  // Parse default platform/launcher for edit mode
  const defaultPlatforms = account?.platform
    ? account.platform.split(",").map((p) => {
        const m = p.trim().match(/^([^(]+)/);
        return m ? m[1].trim() : p.trim();
      })
    : [];
  const defaultLauncher = account?.platform
    ? (() => { const m = account.platform.match(/PC \(([^)]+)\)/); return m ? m[1] : ""; })()
    : "";

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10 items-start">

        {/* LEFT — Images sticky */}
        <div className="lg:sticky lg:top-24 space-y-6">
          <ImageUploader
            accountId={accountId}
            initialMain={images[0]}
            initialScreenshots={images.slice(1)}
            onChange={setImages}
          />
        </div>

        {/* RIGHT — Fields */}
        <div className="space-y-6">

          {!isEdit && (
            <Field label="ID Akun" hint="Contoh: a4, a5">
              <input
                name="id" required placeholder="a4"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className={inputCls}
              />
            </Field>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Field label="Nama Akun">
              <input name="badge" required defaultValue={account?.badge}
                placeholder="Heirloom Wraith" className={inputCls} />
            </Field>
            <Field label="Rank">
              <RankSelect defaultValue={account?.rank} />
            </Field>
          </div>

          <Divider label="Statistik" />

          <div className="grid grid-cols-3 gap-4">
            <Field label="Harga (IDR)">
              <input name="price" type="number" required defaultValue={account?.price}
                placeholder="3100000" className={inputCls} />
            </Field>
            <Field label="Level">
              <input name="level" type="number" required defaultValue={account?.level}
                placeholder="290" className={inputCls} />
            </Field>
            <Field label="Skin Legendary">
              <input name="legendary_skins" type="number" required defaultValue={account?.legendarySkins}
                placeholder="144" className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Field label="Apex Coins">
              <input name="coins" type="number" required defaultValue={account?.coins}
                placeholder="12200" className={inputCls} />
            </Field>
            <Field label="Crafting Materials">
              <input name="crafting_materials" type="number" defaultValue={account?.craftingMaterials ?? 0}
                placeholder="500" className={inputCls} />
            </Field>
            <Field label="Green Shard">
              <input name="crafting_materials_legends" type="number" defaultValue={account?.craftingMaterialsLegends ?? 0}
                placeholder="0" className={inputCls} />
            </Field>
          </div>

          <Divider label="Detail" />

          <Field label="Platform">
            <PlatformSelect
              defaultPlatforms={defaultPlatforms}
              defaultLauncher={defaultLauncher}
            />
          </Field>

          <Field label="Tags" hint="pisahkan dengan koma">
            <input name="tags" defaultValue={account?.tags?.join(", ")}
              placeholder="Heirloom Wraith, Level 290" className={inputCls} />
          </Field>

          <Field label="Deskripsi">
            <textarea name="description" rows={6} defaultValue={account?.description ?? ""}
              placeholder={"✅ Setelah pembayaran kamu akan menerima:\n🏆 Full Access"}
              className={`${inputCls} resize-none`} />
          </Field>

          {error && (
            <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <div className="pt-2">
            <button type="submit"
              className="px-7 py-3 rounded-xl bg-brand-red text-white font-semibold text-sm hover:bg-brand-red/80 transition shadow-lg shadow-brand-red/20">
              {isEdit ? "Simpan Perubahan" : "Tambah Akun"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
