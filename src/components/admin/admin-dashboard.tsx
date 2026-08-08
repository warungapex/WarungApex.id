"use client";

import { useState, useTransition } from "react";
import type { Account } from "@/lib/supabase/accounts";
import { deleteAccount, toggleSold, toggleFeatured } from "@/lib/actions/accounts";
import { logoutAction } from "@/lib/actions/auth";
import Link from "next/link";
import {
  LayoutDashboard, Package, Settings, LogOut,
  ExternalLink, Plus, Pencil, Trash2,
  TrendingUp, ShoppingBag, CheckCircle2, Clock,
  Search, Bell, ChevronRight, MoreHorizontal, Star, Eye, EyeOff,
} from "lucide-react";

/* ── Sidebar ── */
function Sidebar() {
  return (
    <aside className="w-56 shrink-0 flex flex-col bg-[#0f0f14] border-r border-white/8 min-h-screen">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/8">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-brand-red flex items-center justify-center text-white font-black text-sm">W</div>
          <span className="font-bold text-white text-sm tracking-wide">Warung Apex</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-widest px-3 mb-2">Menu</p>
        <NavItem icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" active />
        <NavItem icon={<Package className="w-4 h-4" />} label="Akun" href="/admin/accounts/new" />
        <NavItem icon={<Settings className="w-4 h-4" />} label="Settings" />

        <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-widest px-3 mb-2 mt-6">Lainnya</p>
        <a href="/" target="_blank">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition text-sm cursor-pointer">
            <ExternalLink className="w-4 h-4" />
            <span>Lihat Toko</span>
          </div>
        </a>
        <form action={logoutAction}>
          <button type="submit" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-400/5 transition text-sm">
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </button>
        </form>
      </nav>

      {/* Bottom card */}
      <div className="m-3 rounded-2xl bg-brand-red/20 border border-brand-red/30 p-4">
        <p className="text-xs font-bold text-white mb-1">Warung Apex</p>
        <p className="text-[11px] text-gray-400 mb-3">Admin Panel v1.0</p>
        <a href="https://wa.me/6285167202134" target="_blank"
          className="block w-full text-center py-1.5 rounded-lg bg-brand-red text-white text-xs font-semibold hover:bg-brand-red/80 transition">
          WhatsApp
        </a>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, href, active }: { icon: React.ReactNode; label: string; href?: string; active?: boolean }) {
  const cls = `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition cursor-pointer ${
    active
      ? "bg-brand-red/15 text-white font-semibold border-l-2 border-brand-red"
      : "text-gray-400 hover:text-white hover:bg-white/5"
  }`;
  if (href) return <Link href={href} className={cls}>{icon}<span>{label}</span></Link>;
  return <div className={cls}>{icon}<span>{label}</span></div>;
}

/* ── Stat Card ── */
function StatCard({ label, value, sub, accent }: { label: string; value: number; sub?: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl p-5 border ${accent ? "bg-brand-red text-white border-brand-red" : "bg-white/[0.03] border-white/10 text-white"}`}>
      <div className="flex items-start justify-between mb-3">
        <p className={`text-xs font-semibold ${accent ? "text-white/80" : "text-gray-400"}`}>{label}</p>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${accent ? "bg-white/20" : "bg-white/5"}`}>
          <TrendingUp className="w-3.5 h-3.5" />
        </div>
      </div>
      <p className="text-4xl font-bold leading-none mb-2">{value}</p>
      {sub && (
        <p className={`text-[11px] flex items-center gap-1 ${accent ? "text-white/70" : "text-gray-500"}`}>
          <CheckCircle2 className="w-3 h-3" /> {sub}
        </p>
      )}
    </div>
  );
}

/* ── Main Dashboard ── */
export function AdminDashboard({ accounts }: { accounts: Account[] }) {
  const [, startTransition] = useTransition();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const available = accounts.filter((a) => !a.sold).length;
  const sold = accounts.filter((a) => a.sold).length;
  const featured = accounts.filter((a) => a.featured).length;

  const filtered = accounts.filter((a) =>
    `${a.badge} ${a.rank} ${a.id}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (!confirm("Yakin hapus akun ini?")) return;
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

  const handleToggleFeatured = (id: string, currentFeatured: boolean) => {
    startTransition(async () => {
      await toggleFeatured(id, !currentFeatured);
    });
  };

  // revenue from sold accounts
  const revenue = accounts.filter((a) => a.sold).reduce((s, a) => s + a.price, 0);

  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="flex items-center justify-between px-8 py-4 border-b border-white/8 bg-[#0a0a0f]">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari akun..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-red/50 transition"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
              <Bell className="w-4 h-4 text-gray-400" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white font-bold text-xs">A</div>
              <div className="text-xs">
                <p className="font-semibold text-white">Admin</p>
                <p className="text-gray-500">warungapex.id</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-8 py-8 overflow-auto">
          {/* Page title + actions */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              <p className="text-sm text-gray-500 mt-0.5">Kelola katalog akun Apex Legends kamu.</p>
            </div>
            <Link
              href="/admin/accounts/new"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-red text-white text-sm font-semibold hover:bg-brand-red/80 transition shadow-lg shadow-brand-red/20"
            >
              <Plus className="w-4 h-4" /> Tambah Akun
            </Link>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Akun" value={accounts.length} sub="Semua akun" accent />
            <StatCard label="Tersedia" value={available} sub="Siap dijual" />
            <StatCard label="Terjual" value={sold} sub="Sudah sold out" />
            <StatCard label="Featured" value={featured} sub="Di homepage" />
          </div>

          {/* Two-col layout */}
          <div className="grid grid-cols-[1fr_280px] gap-6">

            {/* Left — table */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-white">Daftar Akun</h2>
                <span className="text-xs text-gray-500">{filtered.length} akun</span>
              </div>

              <div className="border border-white/8 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/[0.03] border-b border-white/8">
                      <th className="text-left px-5 py-3.5 text-xs text-gray-500 font-semibold">Akun</th>
                      <th className="text-left px-5 py-3.5 text-xs text-gray-500 font-semibold">Rank</th>
                      <th className="text-right px-5 py-3.5 text-xs text-gray-500 font-semibold">Harga</th>
                      <th className="text-center px-5 py-3.5 text-xs text-gray-500 font-semibold">Status</th>
                      <th className="text-center px-5 py-3.5 text-xs text-gray-500 font-semibold">
                        <Star className="w-3.5 h-3.5 mx-auto" />
                      </th>
                      <th className="text-right px-4 py-3.5 text-xs text-gray-500 font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center py-16 text-gray-600 text-sm">
                          {search ? "Tidak ada akun yang cocok." : "Belum ada akun. Tambah sekarang!"}
                        </td>
                      </tr>
                    )}
                    {filtered.map((a) => (
                      <tr key={a.id} className="hover:bg-white/[0.02] transition group">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-brand-red/15 border border-brand-red/20 flex items-center justify-center shrink-0">
                              <span className="text-[10px] font-black text-brand-red">{a.tierBadge}</span>
                            </div>
                            <div>
                              <p className="font-semibold text-white text-[13px] leading-tight">{a.badge}</p>
                              <p className="text-[11px] text-gray-500">Lv.{a.level} · {a.legendarySkins} skins</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-xs text-gray-300">{a.rank}</span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <span className="text-sm font-bold text-white">
                            {(a.price / 1000000).toFixed(1)}jt
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <button
                            onClick={() => handleToggleSold(a.id, a.sold)}
                            title={a.sold ? "Tandai Tersedia" : "Tandai Terjual"}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition ${
                              a.sold
                                ? "bg-red-400/10 text-red-400 hover:bg-red-400/20"
                                : "bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/20"
                            }`}
                          >
                            {a.sold
                              ? <><EyeOff className="w-3 h-3" /> Terjual</>
                              : <><Eye className="w-3 h-3" /> Tersedia</>}
                          </button>
                        </td>
                        {/* Featured star */}
                        <td className="px-5 py-4 text-center">
                          <button
                            onClick={() => handleToggleFeatured(a.id, a.featured)}
                            title={a.featured ? "Hapus dari homepage" : "Tampilkan di homepage"}
                            className={`p-1.5 rounded-lg transition ${
                              a.featured
                                ? "text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20"
                                : "text-gray-600 hover:text-yellow-400 hover:bg-yellow-400/10"
                            }`}
                          >
                            <Star className={`w-4 h-4 ${a.featured ? "fill-yellow-400" : ""}`} />
                          </button>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition">
                            <Link
                              href={`/admin/accounts/${a.id}/edit`}
                              className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              onClick={() => handleDelete(a.id)}
                              disabled={deleting === a.id}
                              className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition disabled:opacity-40"
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

            {/* Right panel */}
            <div className="space-y-4">
              {/* Revenue */}
              <div className="border border-white/8 rounded-2xl p-5 bg-white/[0.02]">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold text-gray-400">Total Revenue</p>
                  <ShoppingBag className="w-4 h-4 text-gray-600" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">
                  Rp {(revenue / 1000000).toFixed(1)}jt
                </p>
                <p className="text-[11px] text-gray-500">Dari {sold} akun terjual</p>
              </div>

              {/* Quick actions */}
              <div className="border border-white/8 rounded-2xl p-5 bg-white/[0.02]">
                <p className="text-xs font-semibold text-gray-400 mb-3">Quick Actions</p>
                <div className="space-y-2">
                  <Link href="/admin/accounts/new"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition border border-white/8 group">
                    <div className="flex items-center gap-2.5">
                      <Plus className="w-4 h-4 text-brand-red" />
                      <span className="text-xs text-gray-300 font-medium">Tambah Akun Baru</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-400 transition" />
                  </Link>
                  <a href="/" target="_blank"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition border border-white/8 group">
                    <div className="flex items-center gap-2.5">
                      <ExternalLink className="w-4 h-4 text-brand-red" />
                      <span className="text-xs text-gray-300 font-medium">Lihat Storefront</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-400 transition" />
                  </a>
                </div>
              </div>

              {/* Recent activity */}
              <div className="border border-white/8 rounded-2xl p-5 bg-white/[0.02]">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold text-gray-400">Akun Terbaru</p>
                  <MoreHorizontal className="w-4 h-4 text-gray-600" />
                </div>
                <div className="space-y-3">
                  {accounts.slice(0, 4).map((a) => (
                    <div key={a.id} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-red/10 border border-brand-red/20 flex items-center justify-center shrink-0">
                        <span className="text-[9px] font-black text-brand-red">{a.tierBadge}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white truncate">{a.badge}</p>
                        <p className="text-[10px] text-gray-500">{(a.price / 1000000).toFixed(1)}jt</p>
                      </div>
                      <div className={`w-1.5 h-1.5 rounded-full ${a.sold ? "bg-red-400" : "bg-emerald-400"}`} />
                    </div>
                  ))}
                  {accounts.length === 0 && (
                    <p className="text-xs text-gray-600 text-center py-2">Belum ada akun</p>
                  )}
                </div>
              </div>

              {/* Status summary */}
              <div className="border border-white/8 rounded-2xl p-5 bg-white/[0.02]">
                <p className="text-xs font-semibold text-gray-400 mb-4">Komposisi</p>
                <div className="space-y-3">
                  {[
                    { label: "Tersedia", count: available, total: accounts.length, color: "bg-emerald-400" },
                    { label: "Terjual", count: sold, total: accounts.length, color: "bg-red-400" },
                    { label: "Featured", count: featured, total: accounts.length, color: "bg-brand-red" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${item.color}`} />
                          <span className="text-xs text-gray-400">{item.label}</span>
                        </div>
                        <span className="text-xs font-semibold text-white">{item.count}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.color} transition-all duration-500`}
                          style={{ width: accounts.length ? `${(item.count / accounts.length) * 100}%` : "0%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timer-style card — last online indicator */}
              <div className="border border-white/8 rounded-2xl p-5 bg-gradient-to-br from-brand-red/20 to-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-brand-red" />
                  <p className="text-xs font-semibold text-gray-300">Status Toko</p>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-bold text-white">Online & Aktif</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">Storefront berjalan normal</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
