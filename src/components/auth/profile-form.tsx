"use client";

import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { uploadAvatar } from "@/lib/actions/avatar";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-cyan/50 transition";

function SuccessMsg({ msg }: { msg: string }) {
  return (
    <p className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2.5 text-xs font-semibold text-emerald-300">
      {msg}
    </p>
  );
}

function ErrorMsg({ msg }: { msg: string }) {
  return (
    <p className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-2.5 text-xs font-semibold text-red-300">
      {msg}
    </p>
  );
}

export function ProfileForm({
  email,
  firstName: initialFirst,
  lastName: initialLast,
  avatarUrl: initialAvatar,
  isGoogle,
}: {
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  isGoogle: boolean;
}) {
  const t = useTranslations("settings");
  const ta = useTranslations("auth");
  const fileRef = useRef<HTMLInputElement>(null);

  // Avatar
  const [avatar, setAvatar] = useState(initialAvatar);
  const [uploading, setUploading] = useState(false);
  const [avatarError, setAvatarError] = useState("");

  // Nama
  const [firstName, setFirstName] = useState(initialFirst);
  const [lastName, setLastName] = useState(initialLast);
  const [savingName, setSavingName] = useState(false);
  const [nameSaved, setNameSaved] = useState(false);
  const [nameError, setNameError] = useState("");

  // Password
  const [savingPw, setSavingPw] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState("");

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarError("");
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await uploadAvatar(formData);
    if ("error" in res) {
      setAvatarError(res.error);
    } else {
      setAvatar(res.url);
    }
    setUploading(false);
    e.target.value = ""; // izinkan pilih file yang sama lagi
  }

  async function handleNameSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNameError("");
    setNameSaved(false);
    setSavingName(true);
    const { error } = await createClient().auth.updateUser({
      data: {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        full_name: [firstName.trim(), lastName.trim()].filter(Boolean).join(" "),
      },
    });
    if (error) {
      setNameError(error.message);
    } else {
      setNameSaved(true);
    }
    setSavingName(false);
  }

  async function handlePasswordSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPwError("");
    setPwSaved(false);
    const form = e.currentTarget;
    const data = new FormData(form);
    const password = data.get("password") as string;
    const confirm = data.get("confirm") as string;
    if (password !== confirm) {
      setPwError(t("passwordMismatch"));
      return;
    }
    setSavingPw(true);
    const { error } = await createClient().auth.updateUser({ password });
    if (error) {
      setPwError(error.message);
    } else {
      setPwSaved(true);
      form.reset();
    }
    setSavingPw(false);
  }

  return (
    <div className="space-y-6">
      {/* ── Avatar ── */}
      <div className="rounded-2xl border border-white/10 bg-brand-surface/60 p-6">
        <h2 className="mb-4 text-sm font-bold text-white">{t("photo")}</h2>
        <div className="flex items-center gap-5">
          <div className="relative">
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element -- avatar eksternal/storage, tanpa optimasi
              <img
                src={avatar}
                alt=""
                className="h-20 w-20 rounded-2xl object-cover ring-1 ring-white/15"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-cyan/15 text-2xl font-bold text-brand-cyan ring-1 ring-white/15">
                {(firstName || email)[0].toUpperCase()}
              </span>
            )}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              aria-label={t("changePhoto")}
              className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-red text-white shadow-lg transition hover:bg-brand-red/90 disabled:opacity-60"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Camera className="h-4 w-4" />
              )}
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-gray-200 transition hover:border-brand-cyan/50 hover:text-white disabled:opacity-60"
            >
              {uploading ? "..." : t("changePhoto")}
            </button>
            <p className="mt-2 text-[11px] text-gray-500">JPG, PNG, WebP · maks 2MB</p>
          </div>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleAvatarChange}
        />
        {avatarError && <div className="mt-3"><ErrorMsg msg={avatarError} /></div>}
      </div>

      {/* ── Nama & Email ── */}
      <div className="rounded-2xl border border-white/10 bg-brand-surface/60 p-6">
        <h2 className="mb-4 text-sm font-bold text-white">{t("title")}</h2>
        <form onSubmit={handleNameSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs text-gray-400">{t("firstName")}</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputClass}
                autoComplete="given-name"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-gray-400">{t("lastName")}</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputClass}
                autoComplete="family-name"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-gray-400">{t("email")}</label>
            <input
              value={email}
              disabled
              className={`${inputClass} cursor-not-allowed opacity-60`}
            />
            <p className="mt-1.5 text-[11px] text-gray-500">{t("emailHint")}</p>
          </div>

          {nameSaved && <SuccessMsg msg={t("saved")} />}
          {nameError && <ErrorMsg msg={nameError} />}

          <button
            type="submit"
            disabled={savingName}
            className="flex items-center gap-2 rounded-xl bg-brand-red px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-red/90 disabled:opacity-50"
          >
            {savingName && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("save")}
          </button>
        </form>
      </div>

      {/* ── Password (sembunyikan untuk user Google) ── */}
      {!isGoogle && (
        <div className="rounded-2xl border border-white/10 bg-brand-surface/60 p-6">
          <h2 className="mb-4 text-sm font-bold text-white">{t("passwordTitle")}</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs text-gray-400">{t("newPassword")}</label>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className={inputClass}
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-gray-400">{t("confirmPassword")}</label>
                <input
                  name="confirm"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className={inputClass}
                  placeholder="••••••••"
                />
              </div>
            </div>
            <p className="text-[11px] text-gray-500">{ta("passwordHelper")}</p>

            {pwSaved && <SuccessMsg msg={t("passwordUpdated")} />}
            {pwError && <ErrorMsg msg={pwError} />}

            <button
              type="submit"
              disabled={savingPw}
              className="flex items-center gap-2 rounded-xl bg-brand-red px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-red/90 disabled:opacity-50"
            >
              {savingPw && <Loader2 className="h-4 w-4 animate-spin" />}
              {t("updatePassword")}
            </button>
          </form>
        </div>
      )}
      {isGoogle && (
        <div className="rounded-2xl border border-white/10 bg-brand-surface/60 p-6">
          <h2 className="mb-2 text-sm font-bold text-white">{t("passwordTitle")}</h2>
          <p className="text-xs text-gray-400">{t("googleAccount")}</p>
        </div>
      )}
    </div>
  );
}
