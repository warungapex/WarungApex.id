"use client";

import { useState, useTransition } from "react";
import type { Account } from "@/lib/supabase/accounts";
import { deleteAccount, toggleSold } from "@/lib/actions/accounts";
import { logoutAction } from "@/lib/actions/auth";
import { Link } from "@/i18n/routing";
import { Plus, Pencil, Trash2, Eye, EyeOff, LogOut, ExternalLink } from "lucide-react";

export function AdminDashboard({ accounts }: { accounts: Account[] }) {
  const [, startTransition] = useTransition();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (!confirm("Yakin hapus akun ini? Tindakan ini tidak bisa dibatalkan.")) return;
    setDeleting(id);
    startTransition(async () => {
      await deleteAccount(id);
      setDeleting(null);
    });
  };

  const handleToggleSold = (id: string, currentSold: boolean) => {
    startTransition(async () => {
      await toggleSold(id, !currentSold);
    });
  };

  const available = accounts.filter((a) => !a.sold).length;
  const sold = accounts.filter((a) => a.sold).length;

  return (
    <div className="min-h-screen bg-[#08080c]">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold text-white tracking-widest">WARUNG APEX</h1>
          <span className="text-xs text-gray-500 border border-white/10 rounded-full px-2.5 py-0.5">Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Lihat Toko
          </a>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-400 transition"
            >
              <LogOut className="w-3.5 h-3.5" /> Keluar
            </button>
          </form>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Total Akun", value: accounts.length },
            { label: "Tersedia", value: available, color: "text-green-400" },
            { label: "Terjual", value: sold, color: "text-red-400" },
          ].map((s) => (
            <div key={s.label} className="border border-white/10 rounded-2xl p-5 bg-white/[0.02]">
              <p className="text-xs text-gray-500 mb-1">{s.label}</p>
              <p className={`text-3xl font-bold ${s.color ?? "text-white"}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold text-white">Daftar Akun</h2>
          <Link
            href="/admin/accounts/new"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-red text-white text-sm font-semibold hover:bg-brand-red/80 transition"
          >
            <Plus className="w-4 h-4" /> Tambah Akun
          </Link>
        </div>

        {/* Table */}
        <div className="border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-white/[0.02]">
                <th className="text-left px-5 py-3.5 text-xs text-gray-500 font-semibold">ID</th>
                <th className="text-left px-5 py-3.5 text-xs text-gray-500 font-semibold">Akun</th>
                <th className="text-left px-5 py-3.5 text-xs text-gray-500 font-semibold">Rank</th>
                <th className="text-right px-5 py-3.5 text-xs text-gray-500 font-semibold">Harga</th>
                <th className="text-center px-5 py-3.5 text-xs text-gray-500 font-semibold">Status</th>
                <th className="text-right px-5 py-3.5 text-xs text-gray-500 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {accounts.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-500 text-sm">
                    Belum ada akun. Tambah akun pertamamu!
                  </td>
                </tr>
              )}
              {accounts.map((a) => (
                <tr key={a.id} className="hover:bg-white/[0.02] transition">
                  <td className="px-5 py-4 text-gray-500 font-mono text-xs">{a.id}</td>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-white">{a.badge}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      Level {a.level} · {a.skins} skins
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-gray-300">{a.rank}</span>
                    <span className="ml-2 text-[10px] text-gray-600 border border-white/10 rounded px-1.5 py-0.5">{a.tierBadge}</span>
                  </td>
                  <td className="px-5 py-4 text-right font-semibold text-white">
                    {a.price.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button
                      onClick={() => handleToggleSold(a.id, a.sold)}
                      title={a.sold ? "Tandai Tersedia" : "Tandai Terjual"}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition ${
                        a.sold
                          ? "bg-red-400/10 text-red-400 hover:bg-red-400/20"
                          : "bg-green-400/10 text-green-400 hover:bg-green-400/20"
                      }`}
                    >
                      {a.sold ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      {a.sold ? "Terjual" : "Tersedia"}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/accounts/${a.id}/edit`}
                        className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition"
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(a.id)}
                        disabled={deleting === a.id}
                        className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-400/30 transition disabled:opacity-50"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
