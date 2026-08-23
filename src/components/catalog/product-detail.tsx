"use client";

import Image from "next/image";
import Script from "next/script";

import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck, Zap, Headphones, CheckCircle2,
  ChevronDown, ChevronUp, CreditCard, Images, BadgeCheck, MessageCircle,
} from "lucide-react";
import type { Account } from "@/lib/supabase/accounts";
import { formatPrice } from "@/lib/accounts";
import { useLocale, useTranslations } from "next-intl";
import { useUsdIdrRate } from "@/components/rate-provider";
import { usePathname, useRouter } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/client";

/* ── Fallback images dari filesystem lokal per akun ── */
const LOCAL_IMAGES: Record<string, string[]> = {
  a1: [
    "/account/Acc1/Main.png",
    "/account/Acc1/1 - 5gSsVZe.png",
    "/account/Acc1/2 - utqCrEM.png",
    "/account/Acc1/3 - VJ9ElOw.png",
    "/account/Acc1/4 - I6xOHl4.png",
    "/account/Acc1/5 - Xq7PxbZ.png",
    "/account/Acc1/6 - 9NEtEw9.png",
    "/account/Acc1/7 - wvTUpQm.png",
  ],
  a2: [
    "/account/Acc2/Main.png",
    "/account/Acc2/1 - 8tNntAa.jpg",
    "/account/Acc2/2 - PVfpOaK.png",
    "/account/Acc2/3 - HvmHWSN.png",
    "/account/Acc2/4 - eILH6Kp.png",
    "/account/Acc2/5 - B0aOUff.png",
    "/account/Acc2/6 - Q9freOI.png",
    "/account/Acc2/7 - eq0hd5P.png",
  ],
  a3: [
    "/account/Acc3/Main.png",
    "/account/Acc3/1 - 2o4N9mk.png",
    "/account/Acc3/2 - Ib6yNpc.png",
    "/account/Acc3/3 - bOjpgfZ.png",
    "/account/Acc3/4 - q1pVNbv.png",
    "/account/Acc3/5 - PcEEuvk.png",
    "/account/Acc3/6 - 5TIAPrd.png",
    "/account/Acc3/7 - G1FTe34.png",
  ],
};

const WHATSAPP_URL = "https://wa.me/6285167202134";
const STORE_LOGO = "/logo/white/white warpex no background.svg";

/* ── Marketplace gallery: main image + thumbnail strip ── */
function Gallery({ product }: { product: Account }) {
  const t = useTranslations("product");
  // Prefer images from DB, fallback to local filesystem mapping
  const images = (product.images && product.images.length > 0)
    ? product.images
    : (LOCAL_IMAGES[product.id] ?? []);
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (!images.length) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <span className="text-5xl font-black text-white/20">{product.tierBadge}</span>
      </div>
    );
  }

  return (
    <>
      {/* Main image */}
      <button
        onClick={() => setLightbox(current)}
        className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black"
        aria-label={t("description")}
      >
        <Image
          src={images[current]}
          alt={product.badge}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className={`object-cover transition duration-500 group-hover:scale-[1.03] ${product.sold ? "opacity-40 grayscale" : ""}`}
          priority
          unoptimized
        />
        {/* expand hint */}
        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
          <Images className="h-3.5 w-3.5" />
          {images.length}
        </span>
        {product.sold && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-black/70 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gray-200 ring-1 ring-white/20 backdrop-blur">
            Sold Out
          </span>
        )}
      </button>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="scrollbar-none mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative aspect-video w-20 shrink-0 overflow-hidden rounded-lg border-2 transition sm:w-24 ${
                i === current
                  ? "border-brand-red"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="96px" className="object-cover" unoptimized />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 p-4 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[lightbox]}
              alt=""
              sizes="(max-width: 1280px) 100vw, 60vw"
              width={1200}
              height={800}
              className="max-h-[80vh] w-full rounded-xl object-contain"
              unoptimized
            />
            {/* nav */}
            <button
              onClick={() => setLightbox((l) => (l! > 0 ? l! - 1 : images.length - 1))}
              className="absolute left-3 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-black/60 text-white transition hover:bg-black/80"
            >‹</button>
            <button
              onClick={() => setLightbox((l) => (l! < images.length - 1 ? l! + 1 : 0))}
              className="absolute right-3 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-black/60 text-white transition hover:bg-black/80"
            >›</button>
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-3 top-3 h-8 w-8 rounded-full bg-black/60 text-lg leading-none text-white transition hover:bg-black/80"
            >×</button>
            <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white">
              {lightbox + 1}/{images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Spec table row ── */
function SpecRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-right text-sm font-semibold text-white">{value}</span>
    </div>
  );
}

/* ── Protection panel ── */
function ProtectionPanel() {
  const t = useTranslations("product.protection");
  const [open, setOpen] = useState(true);
  const items = [
    { title: t("items.0.title"), desc: t("items.0.desc") },
    { title: t("items.1.title"), desc: t("items.1.desc") },
    { title: t("items.2.title"), desc: t("items.2.desc") },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-brand-surface/60">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/5"
      >
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="h-4 w-4 text-brand-cyan" />
          {t("title")}
        </div>
        {open
          ? <ChevronUp className="h-4 w-4 text-gray-400" />
          : <ChevronDown className="h-4 w-4 text-gray-400" />}
      </button>
      {open && (
        <div className="space-y-4 border-t border-white/8 px-5 pb-5">
          {items.map((item) => (
            <div key={item.title} className="flex gap-3 pt-4">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" />
              <div>
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-0.5 text-xs text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main ── */
type ToastKind = "info" | "error" | "success";
type Toast = { msg: string; kind: ToastKind } | null;

export function ProductDetail({
  product,
  snapUrl,
  snapClientKey,
}: {
  product: Account;
  snapUrl: string;
  snapClientKey: string;
}) {
  const locale = useLocale();
  const t = useTranslations("product");
  const tc = useTranslations("checkout");
  const tcat = useTranslations("catalog");
  const rate = useUsdIdrRate();
  const router = useRouter();
  const pathname = usePathname();

  const [buying, setBuying] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const [checkout, setCheckout] = useState<{ token: string } | null>(null);
  // true begitu Snap mengembalikan hasil final (sukses/pending/error) —
  // dipakai agar onClose yang menyusul tidak salah melepas klaim akun.
  const snapResolvedRef = useRef(false);

  const numberLocale = locale === "en" ? "en-US" : "id-ID";
  const formatStat = (n: number) =>
    n.toLocaleString(numberLocale, { maximumFractionDigits: 0 });

  function showToast(msg: string, kind: ToastKind) {
    setToast({ msg, kind });
    setTimeout(() => setToast(null), 5000);
  }

  function closeCheckout() {
    try {
      window.snap?.hide();
    } catch {
      // snap mungkin belum selesai mount — aman diabaikan
    }
    setCheckout(null);
  }

  // Render Snap embed ke dalam modal begitu token tersedia
  useEffect(() => {
    if (!checkout || !window.snap) return;
    snapResolvedRef.current = false;

    /** Buyer keluar dari Snap tanpa menyelesaikan pembayaran —
     *  batalkan order pending supaya akun tidak nyangkut "terjual". */
    async function releaseClaim() {
      try {
        const res = await fetch("/api/checkout", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ account_id: product.id }),
        });
        if (!res.ok) console.warn("[snap] gagal melepas klaim:", res.status);
      } catch {
        // gagal jaring — klaim tetap lepas sendiri via expiry 30 menit + webhook expire
      }
      router.refresh();
    }

    window.snap.embed(checkout.token, {
      embedId: "wa-snap-embed",
      onSuccess: () => {
        snapResolvedRef.current = true;
        closeCheckout();
        showToast(tc("success"), "success");
        router.push("/dashboard/orders");
      },
      onPending: () => {
        snapResolvedRef.current = true;
        closeCheckout();
        showToast(tc("pending"), "info");
      },
      onError: () => {
        snapResolvedRef.current = true;
        closeCheckout();
        showToast(tc("error"), "error");
      },
      onClose: () => {
        setCheckout(null);
        showToast(tc("closed"), "info");
        if (!snapResolvedRef.current) releaseClaim();
      },
    });
    return () => {
      try {
        window.snap?.hide();
      } catch {
        // abaikan
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- cukup re-embed saat token berubah; callback memakai setter yang stabil
  }, [checkout]);

  async function handleBuy() {
    if (product.sold || buying) return;
    setBuying(true);

    try {
      // snap.js harus sudah termuat sebelum modal dibuka
      if (!window.snap) {
        showToast(tc("error"), "error");
        return;
      }

      // Cek sesi Supabase Auth — jika belum login, redirect ke /login
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        showToast(tc("loginRequired"), "error");
        router.push(`/login?redirectTo=${encodeURIComponent(pathname)}`);
        return;
      }

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ account_id: product.id }),
      });
      const data = await res.json();

      if (!res.ok) {
        showToast(data.error ?? tc("error"), "error");
        router.refresh(); // sinkronkan status sold terbaru
        return;
      }

      // Buka modal embed — status final ditangani webhook server-side
      setCheckout({ token: data.snap_token });
    } catch {
      showToast(tc("error"), "error");
    } finally {
      setBuying(false);
    }
  }

  const heirloomTags = (product.tags ?? []).filter((tag) =>
    tag.toLowerCase().includes("heirloom"),
  );

  /* ── Buy box (dipakai di kolom kanan desktop & inline mobile) ── */
  const buyBox = (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-brand-surface/60 p-5 sm:p-6">
      {/* Price */}
      <div>
        <p className="text-xs uppercase tracking-widest text-gray-500">
          {tcat("title2")}
        </p>
        <p className="mt-1 text-3xl font-bold text-brand-red">
          {formatPrice(product.price, locale, rate)}
        </p>
        <p className={`mt-2 inline-flex items-center gap-1.5 text-xs font-semibold ${product.sold ? "text-gray-500" : "text-emerald-400"}`}>
          {!product.sold && <span className="dot-pulse inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />}
          {product.sold ? t("cta.soldOut") : tcat("inStock")}
        </p>
      </div>

      <button
        onClick={handleBuy}
        disabled={product.sold}
        className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-bold transition ${
          product.sold
            ? "cursor-not-allowed bg-white/10 text-gray-400"
            : "bg-brand-red text-white hover:bg-brand-red/90 hover:shadow-[0_0_28px_-6px_rgba(255,42,68,0.7)]"
        }`}
      >
        <CreditCard className="h-5 w-5" />
        {product.sold ? t("cta.soldOut") : buying ? tc("processing") : tc("buyNow")}
      </button>

      {/* Trust row */}
      <div className="space-y-3 border-t border-white/8 pt-4">
        {[
          { icon: <ShieldCheck className="h-4 w-4 text-brand-cyan" />, title: t("trust.moneyBackGuarantee"), sub: t("trust.moneyBackSub") },
          { icon: <Zap className="h-4 w-4 text-yellow-400" />, title: t("trust.quickCheckout"), sub: t("trust.quickCheckoutSub") },
          { icon: <Headphones className="h-4 w-4 text-brand-cyan" />, title: t("trust.support247"), sub: t("trust.support247Sub") },
        ].map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <span className="shrink-0">{item.icon}</span>
            <p className="text-xs">
              <span className="font-semibold text-white">{item.title}</span>
              <span className="text-gray-400"> {item.sub}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px] lg:gap-8 xl:grid-cols-[1fr_380px]">
      {/* ── Gallery — mobile pertama, desktop kiri atas ── */}
      <div className="order-1 lg:col-start-1 lg:row-start-1">
        <Gallery product={product} />

        {/* Mobile: title langsung di bawah galeri */}
        <h1 className="mt-4 text-xl font-bold leading-snug text-white md:text-2xl lg:hidden">
          {product.badge}
        </h1>

        {/* Mobile: buy box langsung bisa diakses */}
        <div className="mt-4 lg:hidden">{buyBox}</div>

        {/* Mobile: kartu toko */}
        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-brand-surface/60 p-4 lg:hidden">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-black ring-1 ring-white/15">
              <Image src={STORE_LOGO} alt="Warung Apex" fill sizes="40px" className="object-cover p-1.5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">Warung Apex</p>
              <p className="flex items-center gap-1 text-xs text-emerald-400">
                <BadgeCheck className="h-3 w-3" /> {t("store.verified")}
              </p>
            </div>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-400/20"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* ── Buy column — mobile kedua, desktop kanan sticky ── */}
      <div className="order-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <div className="space-y-4 lg:sticky lg:top-6">
          <div className="hidden lg:block">{buyBox}</div>

          {/* Store card — desktop */}
          <div className="hidden space-y-3 rounded-2xl border border-white/10 bg-brand-surface/60 p-5 lg:block">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-black ring-1 ring-white/15">
                <Image src={STORE_LOGO} alt="Warung Apex" fill sizes="48px" className="object-cover p-2" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">Warung Apex</p>
                <p className="flex items-center gap-1 text-xs text-emerald-400">
                  <BadgeCheck className="h-3 w-3" /> {t("store.verified")}
                  <span className="ml-1.5 flex items-center gap-1 text-gray-500">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Online
                  </span>
                </p>
              </div>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-400/10 py-2.5 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-400/20"
            >
              <MessageCircle className="h-4 w-4" />
              {t("cta.buyViaWhatsApp")}
            </a>
          </div>

          {/* Protection panel */}
          <ProtectionPanel />
        </div>
      </div>

      {/* ── Info — mobile ketiga, desktop kiri bawah ── */}
      <div className="order-3 space-y-6 lg:col-start-1 lg:row-start-2">
        {/* Desktop: title */}
        <h1 className="hidden text-2xl font-bold leading-snug text-white lg:block">
          {product.badge}
        </h1>

        {/* Spec table ala marketplace */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-brand-surface/60">
          <div className="border-b border-white/8 px-5 py-3.5 text-sm font-bold text-white">
            {t("specs")}
          </div>
          <div className="divide-y divide-white/8">
            <SpecRow label={t("stats.rank")} value={product.rank} />
            <SpecRow label={t("stats.level")} value={product.level} />
            <SpecRow label={t("stats.legendarySkins")} value={product.legendarySkins} />
            <SpecRow label={t("stats.heirloom")} value={heirloomTags.length > 0 ? String(heirloomTags.length) : "—"} />
            <SpecRow label={t("stats.apexCoins")} value={formatStat(product.coins)} />
            <SpecRow label={t("stats.craftingMaterials")} value={formatStat(product.craftingMaterials ?? 0)} />
            <SpecRow label={t("stats.greenShard")} value={formatStat(product.craftingMaterialsLegends ?? 0)} />
            <SpecRow label={t("stats.platform")} value={product.platform ?? "PC / PS4 / Xbox"} />
          </div>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap gap-2.5">
          {[
            { icon: <CheckCircle2 className="h-4 w-4" />, label: t("badges.fullEmailAccess") },
            { icon: <ShieldCheck className="h-4 w-4" />, label: t("badges.warranty5Days") },
            { icon: <Zap className="h-4 w-4" />, label: t("badges.fastDelivery") },
          ].map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-gray-200"
            >
              <span className="text-brand-cyan">{b.icon}</span>
              {b.label}
            </span>
          ))}
        </div>

        {/* Description */}
        {product.description && (
          <div className="rounded-2xl border border-white/10 bg-brand-surface/60 p-5 sm:p-6">
            <h2 className="mb-3 text-sm font-bold text-white">{t("description")}</h2>
            <p className="whitespace-pre-line text-sm leading-relaxed text-gray-300">
              {product.description}
            </p>
          </div>
        )}

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Midtrans Snap embed */}
      {snapClientKey && (
        <Script src={snapUrl} data-client-key={snapClientKey} strategy="afterInteractive" />
      )}

      {/* Checkout modal — Snap embed dengan frame brand Warung Apex */}
      {checkout && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/85 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeCheckout();
          }}
        >
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#101018] shadow-[0_0_60px_rgba(255,42,68,0.08)]">
            {/* Header branded */}
            <div className="flex items-center justify-between gap-3 border-b border-white/8 bg-gradient-to-r from-brand-red/10 via-transparent to-transparent px-5 py-4">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-red">
                  {tc("modalTitle")}
                </p>
                <p className="mt-0.5 truncate text-sm font-semibold text-white">
                  {product.badge}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="whitespace-nowrap text-sm font-bold text-white">
                  {formatPrice(product.price, locale, rate)}
                </span>
                <button
                  onClick={closeCheckout}
                  aria-label={tc("close")}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg leading-none text-gray-400 transition hover:bg-white/10 hover:text-white"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Snap iframe container */}
            <div
              id="wa-snap-embed"
              className="relative h-[70vh] min-h-[520px] w-full bg-white [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:border-0"
            />
          </div>
        </div>
      )}

      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-xl border px-5 py-3 text-sm font-semibold shadow-2xl ${
            toast.kind === "error"
              ? "border-red-400/40 bg-red-500/15 text-red-200"
              : toast.kind === "success"
                ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-200"
                : "border-cyan-400/40 bg-cyan-500/15 text-cyan-100"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}
