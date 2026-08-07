"use client";

import { useState, useTransition } from "react";
import { createAccount, updateAccount } from "@/lib/actions/accounts";
import type { Account } from "@/lib/supabase/accounts";
import { useRouter } from "next/navigation";

const TIER_BADGES = ["PRED", "MAST", "D1", "D2", "D3", "D4", "P1", "P2", "P3", "P4", "G1", "G2", "G3", "G4", "S1", "S2", "S3", "S4", "B1", "B2", "B3", "B4"];

interface Props {
  account?: Account;
}

export function AccountForm({ account }: Props) {
  const isEdit = !!account;
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = isEdit
        ? await updateAccount(account!.id, formData)
        : await createAccount(formData);

      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.02] space-y-5">

        {/* ID — only for new */}
        {!isEdit && (
          <Field label="ID Akun" hint="Contoh: a4, a5 (huruf a + angka)">
            <input name="id" required placeholder="a4"
              className={inputCls} />
          </Field>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Field label="Badge / Nama Akun">
            <input name="badge" required defaultValue={account?.badge}
              placeholder="Heirloom Wraith" className={inputCls} />
          </Field>
          <Field label="Tier Badge">
            <select name="tier_badge" required defaultValue={account?.tierBadge} className={inputCls}>
              {TIER_BADGES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Rank">
          <input name="rank" required defaultValue={account?.rank}
            placeholder="Master / Diamond III / Apex Predator" className={inputCls} />
        </Field>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Harga (IDR)">
            <input name="price" type="number" required defaultValue={account?.price}
              placeholder="3100000" className={inputCls} />
          </Field>
          <Field label="Level">
            <input name="level" type="number" required defaultValue={account?.level}
              placeholder="290" className={inputCls} />
          </Field>
          <Field label="Skins">
            <input name="skins" type="number" required defaultValue={account?.skins}
              placeholder="144" className={inputCls} />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Apex Coins">
            <input name="coins" type="number" required defaultValue={account?.coins}
              placeholder="12200" className={inputCls} />
          </Field>
          <Field label="Badges Tokens">
            <input name="badges_tokens" type="number" defaultValue={account?.badgesTokens ?? 0}
              placeholder="12" className={inputCls} />
          </Field>
        </div>

        <Field label="Platform">
          <input name="platform" defaultValue={account?.platform ?? "PC / PS4 / Xbox"}
            placeholder="PC / PS4 / Xbox" className={inputCls} />
        </Field>

        <Field label="Tags" hint="Pisahkan dengan koma: Heirloom Wraith, Level 290">
          <input name="tags" defaultValue={account?.tags?.join(", ")}
            placeholder="Heirloom Wraith, Level 290" className={inputCls} />
        </Field>

        <Field label="Deskripsi">
          <textarea name="description" rows={6} defaultValue={account?.description ?? ""}
            placeholder="✅ Setelah pembayaran kamu akan menerima:&#10;🏆 Full Access"
            className={`${inputCls} resize-none`} />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Status Jual">
            <select name="sold" defaultValue={account?.sold ? "true" : "false"} className={inputCls}>
              <option value="false">Tersedia</option>
              <option value="true">Terjual</option>
            </select>
          </Field>
          <Field label="Featured">
            <select name="featured" defaultValue={account?.featured ? "true" : "false"} className={inputCls}>
              <option value="false">Tidak</option>
              <option value="true">Ya (tampil di homepage)</option>
            </select>
          </Field>
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-brand-red text-white font-semibold text-sm hover:bg-brand-red/80 transition"
        >
          {isEdit ? "Simpan Perubahan" : "Tambah Akun"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 rounded-xl border border-white/10 text-gray-300 text-sm hover:bg-white/5 transition"
        >
          Batal
        </button>
      </div>
    </form>
  );
}

const inputCls =
  "w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder:text-gray-600 focus:border-brand-cyan/50 focus:outline-none transition";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1.5">
        {label}
        {hint && <span className="text-gray-600 ml-1">— {hint}</span>}
      </label>
      {children}
    </div>
  );
}
