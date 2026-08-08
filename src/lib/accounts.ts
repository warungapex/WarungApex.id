export type Account = {
  id: string;
  rank: string;
  tierBadge: string;
  badge: string;
  price: number;
  level: number;
  craftingMaterials: number;
  craftingMaterialsLegends: number;
  coins: number;
  legendarySkins: number;
  featured?: boolean;
  sold: boolean;
  tags?: string[];
  platform?: string;
  description?: string;
};

export const accounts: Account[] = [
  {
    id: "a1", rank: "Master", tierBadge: "MAST", badge: "Master 4K", price: 3100000,
    level: 290, craftingMaterials: 12, craftingMaterialsLegends: 0, coins: 12200, legendarySkins: 144,
    featured: true, sold: false,
    platform: "PC (EA App), PlayStation 4",
    tags: ["Level 290", "Heirloom Wraith", "Heirloom Karambit"],
    description: "✅ Setelah pembayaran kamu akan menerima:\n🏆 Full Access\n⭐ Tidak ada cheat atau bug\n⭐ Aman & Terpercaya\n\n✅ Informasi Tambahan:\n⭐ Level 290+\n⭐ Heirloom Wraith & Karambit\n⭐ 144 Skin Legendary\n⭐ 12.200 Apex Coins",
  },
  {
    id: "a2", rank: "Master", tierBadge: "MAST", badge: "Heirloom Wraith", price: 6200000,
    level: 555, craftingMaterials: 9, craftingMaterialsLegends: 0, coins: 14700, legendarySkins: 266,
    sold: false,
    platform: "PC (Steam), PlayStation 4",
    tags: ["Level 555", "Heirloom Wraith", "Heirloom Loba", "Heirloom BloodHound", "Heirloom Gibraltar"],
    description: "✅ Setelah pembayaran kamu akan menerima:\n🏆 Full Access\n⭐ Tidak ada cheat atau bug\n⭐ Aman & Terpercaya\n\n✅ Informasi Tambahan:\n⭐ Level 555+\n⭐ 5 Heirloom Lengkap\n⭐ 266 Skin Legendary\n⭐ 14.700 Apex Coins",
  },
  {
    id: "a3", rank: "Diamond III", tierBadge: "D3", badge: "Heirloom Power Sword", price: 1300000,
    level: 443, craftingMaterials: 6, craftingMaterialsLegends: 0, coins: 72100, legendarySkins: 144,
    sold: false,
    platform: "PC, PlayStation 4",
    tags: ["Level 443", "Heirloom Power Sword"],
    description: "✅ Setelah pembayaran kamu akan menerima:\n🏆 Full Access\n⭐ Tidak ada cheat atau bug\n⭐ Aman & Terpercaya\n\n✅ Informasi Tambahan:\n⭐ Level 443+\n⭐ Heirloom Power Sword\n⭐ 144 Skin Legendary\n⭐ 72.100 Apex Coins",
  },
];

export const EXCHANGE_RATE = 15000;

export const formatPrice = (priceIDR: number, locale: string, rate?: number) => {
  if (locale === 'en') {
    const usd = Math.ceil(priceIDR / (rate ?? EXCHANGE_RATE));
    return usd.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  }
  return priceIDR.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
};

export const rankColor = (badge: string): string => {
  const b = badge?.toUpperCase() ?? "";
  if (b === "PRED") return "from-red-500 to-rose-700";
  if (b === "MAST") return "from-violet-500 to-purple-700";
  if (b.startsWith("D")) return "from-cyan-400 to-blue-600";
  if (b.startsWith("P")) return "from-teal-400 to-emerald-600";
  if (b.startsWith("G")) return "from-yellow-400 to-amber-600";
  if (b.startsWith("S")) return "from-slate-300 to-slate-500";
  if (b.startsWith("B")) return "from-orange-700 to-amber-900";
  if (b.startsWith("R")) return "from-gray-500 to-gray-700";
  return "from-gray-400 to-gray-600";
};

export function rankTier(badge: string): string {
  const b = badge?.toUpperCase() ?? "";
  if (["PRED", "MAST"].includes(b)) return "HIGH";
  if (b.startsWith("D") || b.startsWith("P")) return "MID";
  return "LOW";
}