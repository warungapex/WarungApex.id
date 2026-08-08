"use client";

import { useState, useRef } from "react";
import { uploadImage } from "@/lib/actions/upload";
import { Upload, X, ImageIcon, Loader2, Star } from "lucide-react";

interface UploadedImage {
  url: string;
  slot: "main" | number;
}

export function ImageUploader({
  accountId,
  initialMain,
  initialScreenshots,
  onChange,
}: {
  accountId: string;
  initialMain?: string;
  initialScreenshots?: string[];
  onChange: (images: string[]) => void;
}) {
  const [main, setMain] = useState<string | undefined>(initialMain);
  const [shots, setShots] = useState<string[]>(initialScreenshots ?? []);
  const [uploading, setUploading] = useState<"main" | "shots" | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mainRef = useRef<HTMLInputElement>(null);
  const shotsRef = useRef<HTMLInputElement>(null);

  function notify(newMain: string | undefined, newShots: string[]) {
    const all = [newMain, ...newShots].filter(Boolean) as string[];
    onChange(all);
  }

  async function handleMain(file: File) {
    setUploading("main");
    setErrors((e) => ({ ...e, main: "" }));
    const fd = new FormData();
    fd.append("file", file);
    const result = await uploadImage(fd, accountId, "main");
    if ("error" in result) {
      setErrors((e) => ({ ...e, main: result.error }));
    } else {
      setMain(result.url);
      notify(result.url, shots);
    }
    setUploading(null);
  }

  async function handleShots(files: FileList) {
    setUploading("shots");
    setErrors((e) => ({ ...e, shots: "" }));

    const newShots = [...shots];
    const startIdx = newShots.length;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fd = new FormData();
      fd.append("file", file);
      const slot = startIdx + i + 1; // 1-based index after main
      const result = await uploadImage(fd, accountId, slot);
      if ("error" in result) {
        setErrors((e) => ({ ...e, shots: result.error }));
        break;
      } else {
        newShots.push(result.url);
      }
    }

    setShots(newShots);
    notify(main, newShots);
    setUploading(null);
  }

  function removeShot(i: number) {
    const next = shots.filter((_, idx) => idx !== i);
    setShots(next);
    notify(main, next);
  }

  function removeMain() {
    setMain(undefined);
    notify(undefined, shots);
  }

  if (!accountId) {
    return (
      <p className="text-xs text-gray-500 italic">
        Isi ID Akun terlebih dahulu sebelum upload gambar.
      </p>
    );
  }

  return (
    <div className="space-y-6">

      {/* ── Main Image ── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-3.5 h-3.5 text-brand-red" />
          <p className="text-xs font-semibold text-white">Gambar Utama</p>
          <span className="text-[11px] text-gray-500">— tampil sebagai thumbnail di katalog</span>
        </div>

        {main ? (
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black group w-full aspect-video max-w-sm">
            <img src={main} alt="main" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => mainRef.current?.click()}
                disabled={uploading !== null}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition"
              >
                Ganti
              </button>
              <button
                type="button"
                onClick={removeMain}
                disabled={uploading !== null}
                className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            {uploading === "main" && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => mainRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files[0];
              if (f) handleMain(f);
            }}
            disabled={uploading !== null}
            className="w-full max-w-sm aspect-video rounded-xl border-2 border-dashed border-white/10 bg-white/[0.02] hover:border-brand-red/40 hover:bg-brand-red/5 flex flex-col items-center justify-center gap-2 transition disabled:opacity-40"
          >
            {uploading === "main" ? (
              <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-gray-500" />
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 font-medium">Klik atau drag & drop</p>
                  <p className="text-[11px] text-gray-600 mt-0.5">JPG, PNG, WebP · maks 5MB</p>
                </div>
              </>
            )}
          </button>
        )}

        {errors.main && <p className="text-[11px] text-red-400 mt-1">{errors.main}</p>}

        <input
          ref={mainRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleMain(f);
            e.target.value = "";
          }}
        />
      </div>

      {/* ── Screenshots ── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Upload className="w-3.5 h-3.5 text-gray-400" />
          <p className="text-xs font-semibold text-white">Screenshot Akun</p>
          <span className="text-[11px] text-gray-500">— bisa pilih banyak sekaligus, tidak ada batas</span>
        </div>

        {/* Grid previews */}
        {shots.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-3">
            {shots.map((url, i) => (
              <div key={i} className="relative rounded-lg overflow-hidden border border-white/10 bg-black group aspect-video">
                <img src={url} alt={`screenshot ${i + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeShot(i)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 hover:bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            {/* Add more button */}
            <button
              type="button"
              onClick={() => shotsRef.current?.click()}
              disabled={uploading !== null}
              className="aspect-video rounded-lg border-2 border-dashed border-white/10 bg-white/[0.02] hover:border-white/20 flex items-center justify-center transition disabled:opacity-40"
            >
              {uploading === "shots" ? (
                <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
              ) : (
                <Upload className="w-4 h-4 text-gray-500" />
              )}
            </button>
          </div>
        )}

        {/* Upload zone — shown when no shots yet */}
        {shots.length === 0 && (
          <button
            type="button"
            onClick={() => shotsRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files.length) handleShots(e.dataTransfer.files);
            }}
            disabled={uploading !== null}
            className="w-full rounded-xl border-2 border-dashed border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.03] flex flex-col items-center justify-center gap-2 py-8 transition disabled:opacity-40"
          >
            {uploading === "shots" ? (
              <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-gray-500" />
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 font-medium">Klik atau drag & drop</p>
                  <p className="text-[11px] text-gray-600 mt-0.5">Pilih banyak file sekaligus · JPG, PNG, WebP</p>
                </div>
              </>
            )}
          </button>
        )}

        {errors.shots && <p className="text-[11px] text-red-400 mt-1">{errors.shots}</p>}

        <input
          ref={shotsRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) handleShots(e.target.files);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}
