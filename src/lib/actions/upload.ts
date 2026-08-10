"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/auth";

const BUCKET = "account-images";

export async function uploadImage(
  formData: FormData,
  accountId: string,
  slot: "main" | number, // "main" or screenshot index
): Promise<{ url: string } | { error: string }> {
  await requireAdmin();

  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return { error: "File tidak ditemukan" };
  if (!accountId || accountId.trim() === "") return { error: "ID Akun wajib diisi sebelum upload gambar" };

  // Normalize to lowercase — DB IDs are always lowercase
  const normalizedId = accountId.trim().toLowerCase();

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const allowed = ["jpg", "jpeg", "png", "webp"];
  if (!allowed.includes(ext)) return { error: "Format harus JPG, PNG, atau WebP" };
  if (file.size > 5 * 1024 * 1024) return { error: "Ukuran maksimal 5MB" };

  const filename =
    slot === "main"
      ? `${normalizedId}/main.${ext}`
      : `${normalizedId}/${slot}.${ext}`;

  const supabase = await createServerSupabaseClient();

  // Remove existing file at same path first (upsert)
  await supabase.storage.from(BUCKET).remove([filename]);

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, file, { contentType: file.type, upsert: true });

  if (error) return { error: error.message };

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
  return { url: data.publicUrl };
}

export async function deleteImage(
  path: string,
): Promise<{ error?: string }> {
  await requireAdmin();

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) return { error: error.message };
  return {};
}
