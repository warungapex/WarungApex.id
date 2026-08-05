# 06 — Architecture

## 6.1 Konteks (C4 Level 1 — System Context)

```
+----------------+      HTTP      +---------------------------------+
|   Pengunjung   | <------------> |          Warung Apex            |
|  (Browser,     |                |   (Next.js 16 SPA/SSR landing)  |
|   Mobile/PC)   |                +---------------------------------+
+----------------+                       |
                                         | static gain (vercel/cloudflare)
                                         v
                                   +-----------------+
                                   |  Aset Gambar    |
                                   |  public/frames/ |
                                   +-----------------+
```

- Pada v1 tidak ada backend eksternal. Data produk bersumber dari file
  TypeScript di sisi aplikasi (front-end).
- Deploy statis/JAMstack di host CDN (mis. Vercel).

## 6.2 Container (C4 Level 2)

```
+---------------------------------- Next.js App ------------------------------+
|                                                                              |
|   Next.js (App Router)                                                       |
|   +-----------------------------------------------------------------------+  |
|   | Page: Home (`src/app/page.tsx`)                                        |  |
|   |     └── Server Component (render cepat, data dibundel)                 |  |
|   |                                                                        |  |
|   | Komponen UI (client)                                                   |  |
|   |   - hero/        (hero + CTA)                                          |  |
|   |   - catalog/     (grid produk, kartu)                                  |  |
|   |   - sections/    (keunggulan, footer/kontak)                           |  |
|   |   - ui/          (button, card, container)                             |  |
|   +-----------------------------------------------------------------------+  |
|                                                                              |
|   Data layer                                                                |
|   +-----------------------------------------------------------------------+  |
|   | src/lib/  → fungsi data produk                                         |  |
|   | src/data/ → katalog produk (TypeScript array)     [PROPOSAL]           |  |
|   | src/types/→ tipe Product, CatalogItem                                   |  |
|   +-----------------------------------------------------------------------+  |
|   Aset: public/frames/*.jpg                                                 |  |
+-------------------------------------------------------------------------------+
```

## 6.3 Komponen (C4 Level 3 — ringkas)

| Komponen | Jenis | Tanggung jawab |
|---|---|---|
| `page.tsx` | Server | Rangka page, komposisi section. |
| `hero/*` | Client/Server | Hero, tagline, CTA. |
| `catalog/*` | Client | Grid + kartu produk, animasi entry. |
| `sections/*` | Client/Server | Keunggulan, footer/kontak. |
| `ui/*` | Server | Button, Card, Container reusable. |
| `lib/*` | Server | Akses data produk. |
| `data/*` | — | Sumber data produk. |
| `types/*` | — | Tipe data (Product, dll). |

## 6.4 Keputusan Arsitektur (ADR)

### ADR-001 — Data front-end vs backend di v1
- Keputusan: gunakan file TypeScript sebagai sumber data di v1.
- Alasan: tidak ada backend; kebutuhan v1 read-only, data kecil, cepat.
- Konsekuensi: update produk butuh deploy ulang. Ini diterima di v1.
- Upgrade: ganti sumber menjadi API/database saat backend hadir (lihat ADR-002).

### ADR-002 — Backend `[PROPOSAL]`
- Keputusan: ditunda ke v2.
- Alasan: ceruk fitur v2 (keranjang, pencarian) belum butuh back-end mandiri.
- Upgrade path: pindahkan `data/` ke API REST (spesifikasi di `09-api-spec.md`).

### ADR-003 — Server Components sebagai default
- Keputusan: gunakan Server Components; Client hanya bila butuh interaktivitas.
- Alasan: payload JS lebih kecil, performa lebih baik (NFR-001/002).

### ADR-004 — Styling memakai Tailwind v4 + token tema
- Keputusan: token warna/font terpusat di `globals.css` & `tailwind.config.ts`.
- Alasan: konsisten (US-007), mudah dimodifikasi.

### ADR-005 — Hanya satu page (single page landing)
- Keputusan: v1 adalah satu halaman; route tambahan menyusul bila dibutuhkan.
- Alasan: memenuhi scope v1 dengan effort terkecil.

## 6.5 Struktur Folder Sasaran

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── catalog/   # grid + card
│   ├── hero/      # hero
│   ├── sections/  # keunggulan, footer
│   └── ui/        # button, card, container
├── hooks/         # custom hooks (animasi, scroll)
├── lib/           # akses data produk
├── data/          # katalog produk (JS/TS array)  [PROPOSAL]
└── types/         # Product, CatalogItem
```