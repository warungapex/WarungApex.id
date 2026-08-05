# 07 — UI/UX Spec

## 7.1 Design Tokens (Brand)

| Token | Nilai | Penggunaan |
|---|---|---|
| `brand-dark` | `#08080c` | Latar utama |
| `brand-surface` | `#12131a` | Kartu / panel |
| `brand-red` | `#FF2A44` | Aksen utama, CTA |
| `brand-cyan` | `#00F0FF` | Aksen sekunder, highlight |
| `--background` | `#08080c` | body |
| `--foreground` | `#f0f2f5` | teks utama |
| Font display | Geist | Headline |
| Font sans | System UI | Body |

## 7.2 Tipografi

| Jenis | Font | Ukuran (kisaran) | Ketebalan |
|---|---|---|---|
| H1 Hero | display | clamp(2rem, 6vw, 4rem) | Bold |
| H2 Section | display | 1.75–2.25rem | Bold |
| H3 Kartu/Kecil | sans | 1–1.125rem | Semibold |
| Body | sans | 0.875–1rem | Normal |
| Harga | sans | 1rem | Bold |
| Kecil / meta | sans | 0.75–0.8rem | Normal |

## 7.3 Wireframe (ASCII) — Mobile (1 kolom)

```
┌─────────────────────────────┐
│  WARUNG APEX                │  <- H1, brand-red, tracking-widest
│  tagline singkat            │  <- H2, foreground
│  [ Lihat Katalog ▾ ]        │  <- CTA, brand-red bg
├─────────────────────────────┤
│  KEUNGGULAN                 │  <- H2 section
│  [icon] Harga bersaing      │
│  [icon] Barang original     │
│  [icon] Pelayanan ramah     │
├─────────────────────────────┤
│  KATALOG                    │
│  ┌───────────┐ ┌───────────┐│
│  │  frame    │ │  frame    ││  <- 2 kolom (mobile)
│  │  Nama     │ │  Nama     ││
│  │  Rp...    │ │  Rp...    ││
│  └───────────┘ └───────────┘│
│  ┌───────────┐ ┌───────────┐│
│  │  frame    │ │  frame    ││
├─────────────────────────────┤
│  footer: kontak WA, alamat  │
└─────────────────────────────┘
```

## 7.4 Wireframe — Desktop (2–4 kolom katalog)

```
┌──────────────────────────────────────────────┐
│  WARUNG APEX       [tajuk]     [CTA]          │
├──────────────────────────────────────────────┤
│  KATALOG  (grid 4 kolom di ≥1024px)          │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐             │
│  │frame│ │frame│ │frame│ │frame│             │
│  │Nama │ │Nama │ │Nama │ │Nama │             │
│  │ Rp  │ │ Rp  │ │ Rp  │ │ Rp  │             │
│  └─────┘ └─────┘ └─────┘ └─────┘             │
│  ...                                          │
├──────────────────────────────────────────────┤
│  footer: kontak                               │
└──────────────────────────────────────────────┘
```

## 7.5 Copy Deck

| Elemen | Copy (Draft) |
|---|---|
| Judul Hero | WARUNG APEX |
| Tagline | Solusi perangkat terpercaya, harga bersaing. |
| CTA | Lihat Katalog |
| Keunggulan 1 | Harga bersaing |
| Keunggulan 2 | Barang original & bergaransi |
| Keunggulan 3 | Pelayanan ramah & responsif |
| Judul Katalog | Katalog Produk |
| Footer note | Hubungi kami untuk pemesanan & info stok. |

## 7.6 Micro-interactions & State

| Elemen | Interaksi |
|---|---|
| CTA / Button | Hover: terang (brightness + tint), focus ring cyan. |
| Kartu produk | Hover: surface naik + border aksen; entry animasi fade-up (framer-motion). |
| Scroll (US-001 CTA) | Smooth scroll ke `#katalog`. |

## 7.7 Aksesibilitas Visual

- Kontras: teks foreground di atas brand-dark harus ≥ 4.5:1 (NFR-012).
- Label ikon dengan teks (tidak hanya ikon) bila perlu.
- `alt` bermakna pada semua gambar frame (NFR-014).