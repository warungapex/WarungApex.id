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
};

export const accounts: Account[] = [
  { id: "a1", rank: "Predator", tierBadge: "PRED", badge: "Master 4K", price: 1850000, level: 340, badgesTokens: 12, coins: 500000, skins: 28, featured: true, sold: false },
  { id: "a2", rank: "Master", tierBadge: "MAST", badge: "Heirloom", price: 1250000, level: 312, badgesTokens: 9, coins: 120000, skins: 21, sold: false },
  { id: "a3", rank: "Diamond III", tierBadge: "D3", badge: "2x 4K", price: 640000, level: 278, badgesTokens: 6, coins: 80000, skins: 16, sold: false },
  { id: "a4", rank: "Diamond II", tierBadge: "D2", badge: "Heirloom", price: 780000, level: 295, badgesTokens: 7, coins: 0, skins: 19, sold: false },
  { id: "a5", rank: "Platinum I", tierBadge: "P1", badge: "4K DMG", price: 410000, level: 251, badgesTokens: 5, coins: 35000, skins: 12, sold: false },
  { id: "a6", rank: "Master", tierBadge: "MAST", badge: "3x Predator", price: 1490000, level: 366, badgesTokens: 11, coins: 200000, skins: 31, featured: true, sold: true },
  { id: "a7", rank: "Gold II", tierBadge: "G2", badge: "Wraith 4K", price: 185000, level: 214, badgesTokens: 3, coins: 40000, skins: 7, sold: false },
  { id: "a8", rank: "Diamond I", tierBadge: "D1", badge: "Prestige", price: 890000, level: 301, badgesTokens: 8, coins: 90000, skins: 22, sold: false },
];

export const formatIDR = (v: number) => v.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });

export const rankColor = (badge: string): string => {
  const colors: Record<string, string> = {
    PRED: "from-red-500 to-rose-700",
    MAST: "from-violet-500 to-purple-700",
    D3: "from-cyan-400 to-blue-600",
    D2: "from-cyan-400 to-blue-600",
    D1: "from-cyan-400 to-blue-600",
    P1: "from-emerald-400 to-teal-600",
    G2: "from-yellow-400 to-amber-600",
  };
  return colors[badge] ?? "from-gray-400 to-gray-600";
};

export function rankTier(badge: string): string {
  return ["PRED", "MAST"].includes(badge) ? "HIGH" : "MID";
}