import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { AccountRow } from "@/lib/supabase/types";

// Map DB snake_case → app camelCase
export function toAccount(row: AccountRow) {
  const images = (row.images as string[]) ?? [];
  const mainImage = images.length > 0 ? images[0] : undefined;
  return {
    id: row.id,
    rank: row.rank,
    tierBadge: row.tier_badge,
    badge: row.badge,
    price: row.price,
    level: row.level,
    badgesTokens: row.crafting_materials, // backward compat alias
    craftingMaterials: row.crafting_materials,
    craftingMaterialsLegends: row.crafting_materials_legends,
    coins: row.coins,
    skins: row.legendary_skins,
    legendarySkins: row.legendary_skins,
    featured: row.featured,
    sold: row.sold,
    platform: row.platform ?? undefined,
    description: row.description ?? undefined,
    tags: row.tags ?? [],
    mainImage,
    images,
  };
}

export type Account = ReturnType<typeof toAccount>;

/** All accounts, unsold first */
export async function getAccounts(): Promise<Account[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .order("sold", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) return [];
    return (data ?? []).map(toAccount);
  } catch {
    return [];
  }
}

/** Featured accounts for homepage spotlight */
export async function getFeaturedAccounts(limit = 3): Promise<Account[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .eq("sold", false)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) return [];
    return (data ?? []).map(toAccount);
  } catch {
    return [];
  }
}

/** Single account by id */
export async function getAccount(id: string): Promise<Account | null> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return toAccount(data);
  } catch {
    return null;
  }
}

/** All account IDs (for generateStaticParams) */
export async function getAccountIds(): Promise<string[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("accounts")
      .select("id");

    if (error) return [];
    return (data ?? []).map((r) => r.id);
  } catch {
    return [];
  }
}
