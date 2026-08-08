"use client";

import { useState } from "react";
import {
  ShieldCheck, Zap, Headphones, CheckCircle2,
  ChevronDown, ChevronUp, MessageCircle, Images,
} from "lucide-react";
import type { Account } from "@/lib/supabase/accounts";
import { formatPrice } from "@/lib/accounts";
import { useLocale } from "next-intl";
import { useUsdIdrRate } from "@/components/rate-provider";

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

function ImageMosaic({ product }: { product: Account }) {
  // Prefer images from DB, fallback to local filesystem mapping
  const images = (product.images && product.images.length > 0)
    ? product.images
    : (LOCAL_IMAGES[product.id] ?? []);
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (!images.length) {
    return (
      <div className="w-full h-64 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
        <span className="text-5xl font-black text-white/20">{product.tierBadge}</span>
      </div>
    );
  }

  const main = images[0];
  const side = images.slice(1, 3); // 2 stacked on the right
  const remaining = images.length - 3; // how many hidden

  return (
    <>
      {/* Mosaic grid */}
      <div className="grid grid-cols-[1fr_180px] sm:grid-cols-[1fr_220px] gap-1.5 rounded-2xl overflow-hidden h-64 sm:h-80 lg:h-[360px]">
        {/* Main large image */}
        <button
          onClick={() => setLightbox(0)}
          className="relative overflow-hidden bg-black group"
        >
          <img
            src={main}
            alt={product.badge}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </button>

        {/* Two stacked thumbnails */}
        <div className="flex flex-col gap-1.5">
          {side.map((src, i) => {
            const isLast = i === side.length - 1 && remaining > 0;
            return (
              <button
                key={i}
                onClick={() => setLightbox(i + 1)}
                className="relative flex-1 overflow-hidden bg-black group"
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                {isLast && remaining > 0 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2 text-white text-sm font-semibold">
                    <Images className="w-4 h-4" />
                    +{remaining} image{remaining > 1 ? "s" : ""}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightbox]}
              alt=""
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            {/* nav */}
            <button
              onClick={() => setLightbox((l) => (l! > 0 ? l! - 1 : images.length - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
            >‹</button>
            <button
              onClick={() => setLightbox((l) => (l! < images.length - 1 ? l! + 1 : 0))}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
            >›</button>
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 text-lg leading-none"
            >×</button>
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/60 text-xs text-white">
              {lightbox + 1}/{images.length}
            </div>
            {/* thumbnail strip */}
            <div className="flex gap-2 overflow-x-auto mt-3 pb-1 justify-center">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(i)}
                  className={`shrink-0 w-14 h-10 rounded-md overflow-hidden border-2 transition ${
                    i === lightbox ? "border-brand-cyan" : "border-white/20 hover:border-white/50"
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Stat cell ── */
function StatCell({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="py-3">
      <div className="text-xs text-gray-500 mb-0.5">{label}</div>
      <div className="text-sm font-semibold text-white">{value}</div>
    </div>
  );
}

/* ── Protection panel ── */
function ProtectionPanel() {
  const [open, setOpen] = useState(true);
  const items = [
    { title: "Penjual Terverifikasi", desc: "Penjual harus konfirmasi identitas sebelum bisa berjualan." },
    { title: "Pembayaran ditahan sampai pengiriman dikonfirmasi", desc: "Penjual menerima uang hanya setelah kamu menandai pesanan diterima." },
    { title: "Garansi gratis disertakan", desc: "Jika akun tidak sesuai deskripsi, kamu berhak mendapat penggantian." },
  ];
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.03]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-white hover:bg-white/5 transition"
      >
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-brand-cyan" />
          Bagaimana kami melindungi pembelianmu
        </div>
        {open
          ? <ChevronUp className="w-4 h-4 text-gray-400" />
          : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-white/8">
          {items.map((item) => (
            <div key={item.title} className="flex gap-3 pt-4">
              <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Main ── */
export function ProductDetail({ product }: { product: Account }) {
  const locale = useLocale();
  const rate = useUsdIdrRate();

  const handleBuy = () => {
    const msg =
      `Halo, saya ingin membeli akun:\n\n` +
      `• ${product.badge} (${product.tierBadge})\n` +
      `• Rank: ${product.rank}\n` +
      `• Level: ${product.level}\n` +
      `• Coins: ${product.coins.toLocaleString("id-ID")}\n` +
      `• Skin Legendary: ${product.legendarySkins}\n` +
      `• Crafting Materials: ${product.craftingMaterials ?? 0}\n` +
      `• Harga: ${formatPrice(product.price, locale, rate)}\n\n` +
      `Apakah masih available?`;
    window.open(`https://wa.me/6285167202134?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const heirloomTags = (product.tags ?? []).filter((t) =>
    t.toLowerCase().includes("heirloom"),
  );

  return (
    <div className="space-y-6">
      {/* ── Full-width image mosaic ── */}
      <ImageMosaic product={product} />

      {/* ── Below mosaic: 2-col layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 xl:gap-10 items-start">

        {/* LEFT — info */}
        <div className="space-y-6">
          {/* Title */}
          <h1 className="text-xl md:text-2xl font-bold text-white leading-snug">
            {product.badge}
          </h1>

          {/* Stats table */}
          <div className="border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/8">
            <div className="grid grid-cols-3 divide-x divide-white/8">
              <div className="px-5"><StatCell label="Platform" value={product.platform ?? "PC / PS4 / Xbox"} /></div>
              <div className="px-5"><StatCell label="Heirloom" value={heirloomTags.length > 0 ? String(heirloomTags.length) : "—"} /></div>
              <div className="px-5"><StatCell label="Rank" value={product.rank} /></div>
            </div>
            <div className="grid grid-cols-3 divide-x divide-white/8">
              <div className="px-5"><StatCell label="Skin Legendary" value={product.legendarySkins} /></div>
              <div className="px-5"><StatCell label="Level" value={product.level} /></div>
              <div className="px-5"><StatCell label="Apex Coins" value={product.coins.toLocaleString("id-ID")} /></div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-white/8">
              <div className="px-5"><StatCell label="Crafting Materials" value={product.craftingMaterials ?? 0} /></div>
              <div className="px-5"><StatCell label="Green Shard" value={product.craftingMaterialsLegends ?? 0} /></div>
            </div>
          </div>

          {/* Feature badges */}
          <div className="flex flex-wrap gap-3">
            {[
              { icon: <CheckCircle2 className="w-4 h-4" />, label: "Full Email Access" },
              { icon: <ShieldCheck className="w-4 h-4" />, label: "Garansi 5 Hari" },
              { icon: <Zap className="w-4 h-4" />, label: "Pengiriman Cepat" },
            ].map((b) => (
              <span
                key={b.label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-xs font-semibold text-gray-200"
              >
                <span className="text-brand-cyan">{b.icon}</span>
                {b.label}
              </span>
            ))}
          </div>

          {/* Description */}
          {product.description && (
            <div className="space-y-2">
              <h2 className="text-sm font-bold text-white">Deskripsi dari penjual</h2>
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
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
                  className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — buy card */}
        <div className="sticky top-24 space-y-4">
          {/* Price + CTA */}
          <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.03] space-y-5">
            <div className="text-3xl font-bold text-white">
              {formatPrice(product.price, locale, rate)}
            </div>

            <button
              onClick={handleBuy}
              disabled={product.sold}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-base transition ${
                product.sold
                  ? "bg-white/10 text-gray-400 cursor-not-allowed"
                  : "bg-[#25D366] text-white hover:bg-[#20bd5a] hover:shadow-[0_0_24px_rgba(37,211,102,0.3)]"
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              {product.sold ? "Sold Out" : "Beli via WhatsApp"}
            </button>

            {/* Trust row */}
            <div className="space-y-3 pt-1 border-t border-white/8">
              {[
                { icon: <ShieldCheck className="w-4 h-4 text-brand-cyan" />, title: "Garansi Uang Kembali", sub: "Dilindungi oleh TradeShield" },
                { icon: <Zap className="w-4 h-4 text-yellow-400" />, title: "Checkout Cepat", sub: "Transfer & QRIS tersedia" },
                { icon: <Headphones className="w-4 h-4 text-brand-cyan" />, title: "Dukungan 24/7", sub: "Kami selalu siap membantu" },
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

          {/* Protection panel */}
          <ProtectionPanel />
        </div>
      </div>
    </div>
  );
}
