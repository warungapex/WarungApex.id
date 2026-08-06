import type { Metadata } from "next";
import Link from "next/link";
import { accounts } from "@/lib/accounts";
import { CatalogGrid } from "@/components/catalog/catalog-grid";

export const metadata: Metadata = {
  title: "Katalog Akun | Warung Apex",
  description: "Jelajahi katalog akun Apex Legends tier tinggi di Warung Apex.",
};

export default function CatalogPage() {
  return (
    <main className="min-h-screen bg-brand-dark">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <nav className="text-xs text-gray-500 tracking-wide mb-8">
          <Link href="/" className="hover:text-brand-cyan transition">
            Beranda
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Katalog</span>
        </nav>
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-[var(--font-display)] font-bold tracking-widest text-[#f0f2f5]">
            KATALOG <span className="text-brand-red">AKUN</span>
          </h1>
          <p className="mt-3 text-sm text-gray-400">
            {accounts.filter((a) => !a.sold).length} akun tersedia. Filter berdasarkan tier &amp; fitur
            untuk menemukan yang cocok.
          </p>
        </div>
        <CatalogGrid list={accounts} />
      </div>
    </main>
  );
}