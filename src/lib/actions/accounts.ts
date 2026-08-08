"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/auth";

function rankToTierBadge(rank: string): string {
  const r = rank.toLowerCase();
  if (r.includes("predator")) return "PRED";
  if (r.includes("master")) return "MAST";
  if (r.includes("diamond iv")) return "D4";
  if (r.includes("diamond iii")) return "D3";
  if (r.includes("diamond ii")) return "D2";
  if (r.includes("diamond i")) return "D1";
  if (r.includes("platinum iv")) return "P4";
  if (r.includes("platinum iii")) return "P3";
  if (r.includes("platinum ii")) return "P2";
  if (r.includes("platinum i")) return "P1";
  if (r.includes("gold iv")) return "G4";
  if (r.includes("gold iii")) return "G3";
  if (r.includes("gold ii")) return "G2";
  if (r.includes("gold i")) return "G1";
  if (r.includes("silver iv")) return "S4";
  if (r.includes("silver iii")) return "S3";
  if (r.includes("silver ii")) return "S2";
  if (r.includes("silver i")) return "S1";
  if (r.includes("bronze iv")) return "B4";
  if (r.includes("bronze iii")) return "B3";
  if (r.includes("bronze ii")) return "B2";
  if (r.includes("bronze i")) return "B1";
  if (r.includes("rookie iv")) return "R4";
  if (r.includes("rookie iii")) return "R3";
  if (r.includes("rookie ii")) return "R2";
  if (r.includes("rookie")) return "R1";
  return "ROOK";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formToAccountData(formData: FormData): Record<string, any> {
  const tagsRaw = (formData.get("tags") as string) ?? "";
  const tags = tagsRaw.split(",").map((t) => t.trim()).filter(Boolean);

  const imagesRaw = (formData.get("images") as string) ?? "";
  const images = imagesRaw.split(",").map((i) => i.trim()).filter(Boolean);

  const rank = formData.get("rank") as string;

  return {
    rank,
    tier_badge: rankToTierBadge(rank),
    badge: formData.get("badge") as string,
    price: parseInt(formData.get("price") as string),
    level: parseInt(formData.get("level") as string),
    crafting_materials: parseInt((formData.get("crafting_materials") as string) || "0"),
    crafting_materials_legends: parseInt((formData.get("crafting_materials_legends") as string) || "0"),
    coins: parseInt(formData.get("coins") as string),
    legendary_skins: parseInt((formData.get("legendary_skins") as string) || "0"),
    platform: (formData.get("platform") as string) || null,
    description: (formData.get("description") as string) || null,
    tags,
    images,
  };
}

export async function createAccount(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;
  if (!id) return { error: "ID wajib diisi" };

  const supabase = await createServerSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("accounts")
    .insert({ id, ...formToAccountData(formData) });

  if (error) return { error: (error as { message: string }).message };

  revalidatePath("/admin");
  revalidatePath("/catalog");
  revalidatePath("/");
  redirect("/admin");
}

export async function updateAccount(id: string, formData: FormData) {
  await requireAdmin();

  const supabase = await createServerSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("accounts")
    .update(formToAccountData(formData))
    .eq("id", id);

  if (error) return { error: (error as { message: string }).message };

  revalidatePath("/admin");
  revalidatePath(`/catalog/${id}`);
  revalidatePath("/catalog");
  revalidatePath("/");
  redirect("/admin");
}

export async function deleteAccount(id: string) {
  await requireAdmin();

  const supabase = await createServerSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("accounts")
    .delete()
    .eq("id", id);

  if (error) return { error: (error as { message: string }).message };

  revalidatePath("/admin");
  revalidatePath("/catalog");
  revalidatePath("/");
}

export async function toggleSold(id: string, sold: boolean) {
  await requireAdmin();

  const supabase = await createServerSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("accounts")
    .update({ sold })
    .eq("id", id);

  if (error) return { error: (error as { message: string }).message };

  revalidatePath("/admin");
  revalidatePath("/catalog");
  revalidatePath(`/catalog/${id}`);
}

export async function toggleFeatured(id: string, featured: boolean) {
  await requireAdmin();

  const supabase = await createServerSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("accounts")
    .update({ featured })
    .eq("id", id);

  if (error) return { error: (error as { message: string }).message };

  revalidatePath("/admin");
  revalidatePath("/");
}
