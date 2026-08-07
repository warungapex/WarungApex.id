export type Account = {
  id: string;
  rank: string;
  tierBadge: string;
  badge: string;
  price: number;
  level: number;
  badgesTokens: number;
  coins: number;
  skins: number;
  featured?: boolean;
  sold: boolean;
  tags?: string[];
  platform?: string;
  description?: string;
};

export const accounts: Account[] = [
  {
    id: "a1", rank: "Master", tierBadge: "MAST", badge: "Master 4K", price: 3100000,
    level: 290, badgesTokens: 12, coins: 12200, skins: 144, featured: true, sold: false,
    platform: "PC / PS4 / Xbox",
    tags: ["Level 290", "Heirloom Wraith", "Heirloom Karambit"],
    description: "✅ Setelah pembayaran kamu akan menerima:\n🏆 Full Access\n⭐ Tidak ada cheat atau bug\n⭐ Aman & Terpercaya\n\n✅ Informasi Tambahan:\n⭐ Level 290+\n⭐ Heirloom Wraith & Karambit\n⭐ 144 Skins Lengkap\n⭐ 12.200 Apex Coins",
  },
  {
    id: "a2", rank: "Master", tierBadge: "MAST", badge: "Heirloom Wraith", price: 6200000,
    level: 555, badgesTokens: 9, coins: 14700, skins: 266, sold: false,
    platform: "PC / PS4 / Xbox",
    tags: ["Level 555", "Heirloom Wraith", "Heirloom Loba", "Heirloom BloodHound", "Heirloom Gibraltar"],
    description: "✅ Setelah pembayaran kamu akan menerima:\n🏆 Full Access\n⭐ Tidak ada cheat atau bug\n⭐ Aman & Terpercaya\n\n✅ Informasi Tambahan:\n⭐ Level 555+\n⭐ 5 Heirloom Lengkap\n⭐ 266 Skins\n⭐ 14.700 Apex Coins",
  },
  {
    id: "a3", rank: "Diamond III", tierBadge: "D3", badge: "Heirloom Power Sword", price: 1300000,
    level: 443, badgesTokens: 6, coins: 72100, skins: 144, sold: false,
    platform: "PC / PS4 / Xbox",
    tags: ["Level 443", "Heirloom Power Sword"],
    description: "✅ Setelah pembayaran kamu akan menerima:\n🏆 Full Access\n⭐ Tidak ada cheat atau bug\n⭐ Aman & Terpercaya\n\n✅ Informasi Tambahan:\n⭐ Level 443+\n⭐ Heirloom Power Sword\n⭐ 144 Skins\n⭐ 72.100 Apex Coins",
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
  const colors: Record<string, string> = {
    PRED: "from-red-500 to-rose-700",
    MAST: "from-violet-500 to-purple-700",
    D3: "from-cyan-400 to-blue-600",
  };
  return colors[badge] ?? "from-gray-400 to-gray-600";
};

export function rankTier(badge: string): string {
  return ["PRED", "MAST"].includes(badge) ? "HIGH" : "MID";
}