"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

const BUCKET = "avatars";

export async function uploadAvatar(
  formData: FormData,
): Promise<{ url: string } | { error: string }> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return { error: "File tidak ditemukan" };

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  if (!["jpg", "jpeg", "png", "webp"].includes(ext))
    return { error: "Format harus JPG, PNG, atau WebP" };
  if (file.size > 2 * 1024 * 1024) return { error: "Ukuran maksimal 2MB" };

  const filename = `${user.id}/avatar.${ext}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, file, { contentType: file.type, upsert: true });
  if (error) return { error: error.message };

  // Cache-busting: URL sama setelah upsert, tambah timestamp agar browser
  // tidak menampilkan foto lama.
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
  const url = `${data.publicUrl}?v=${Date.now()}`;

  const { error: updateError } = await supabase.auth.updateUser({
    data: { avatar_url: url },
  });
  if (updateError) return { error: updateError.message };

  return { url };
}
