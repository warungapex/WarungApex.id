"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/auth";
import type { Database } from "@/lib/supabase/types";

type AccountUpdate = Database["public"]["Tables"]["accounts"]["Update"];

function formToAccountData(formData: FormData): Omit<AccountUpdate, "id"> {
  const tagsRaw = (formData.get("tags") as string) ?? "";
  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return {
    rank: formData.get("rank") as string,
    tier_badge: formData.get("tier_badge") as string,
    badge: formData.get("badge") as string,
    price: parseInt(formData.get("price") as string),
    level: parseInt(formData.get("level") as string),
    badges_tokens: parseInt((formData.get("badges_tokens") as string) || "0"),
    coins: parseInt(formData.get("coins") as string),
    skins: parseInt(formData.get("skins") as string),
    featured: formData.get("featured") === "true",
    sold: formData.get("sold") === "true",
    platform: (formData.get("platform") as string) || null,
    description: (formData.get("description") as string) || null,
    tags,
  };
}

export async function createAccount(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;
  if (!id) return { error: "ID wajib diisi" };

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("accounts")
    .insert({ id, ...formToAccountData(formData) });

  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath("/catalog");
  revalidatePath("/");
  redirect("/admin");
}

export async function updateAccount(id: string, formData: FormData) {
  await requireAdmin();

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("accounts")
    .update(formToAccountData(formData))
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath(`/catalog/${id}`);
  revalidatePath("/catalog");
  revalidatePath("/");
  redirect("/admin");
}

export async function deleteAccount(id: string) {
  await requireAdmin();

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("accounts").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath("/catalog");
  revalidatePath("/");
}

export async function toggleSold(id: string, sold: boolean) {
  await requireAdmin();

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("accounts")
    .update({ sold })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath("/catalog");
  revalidatePath(`/catalog/${id}`);
}
