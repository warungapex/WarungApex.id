# 11 — Roadmap

Prioritas memakai MoSCoW. Horizon direncanakan per kuartal.

## 11.1 Filosofi Prioritas

- **Must**: wajib pada versi terkait (blokir).
- **Should**: penting, dikerjakan jika sumber daya memungkinkan.
- **Could**: nice-to-have.
- **Won't**: eksplisit tidak dikerjakan pada horizon tsb.

## 11.2 Q1 — Landasan & Katalog (v1)

| ID | Item | Prioritas |
|---|---|---|
| MS-01 | Setup tema, token, font | Must |
| MS-02 | Hero + CTA | Must |
| MS-03 | Sumber data produk terpusat (`src/data`) | Must |
| MS-04 | Katalog grid + kartu produk | Must |
| MS-05 | Responsivitas & optimasi gambar | Must |
| MS-06 | Bagian keunggulan | Should |
| MS-07 | Footer kontak | Should |
| MS-08 | Animasi entry (framer-motion) | Should |
| MS-09 | Badge status stok | Could |
| MS-10 | Deploy produksi | Must |

**Keluar Q1** = rilis v1 (kriteria: `npm run build` lolos, NFR terpenuhi).

## 11.3 Q2 — Interaksi Lanjutan (v2)

| ID | Item | Prioritas |
|---|---|---|
| MS-11 | Halaman detail produk | Should |
| MS-12 | Pencarian produk (US-008) | Should |
| MS-13 | Filter kategori | Should |
| MS-14 | Backend API dasar `[PROPOSAL]` (ADR-002) | Could |

## 11.4 Q3 — Transaksi (v3)

| ID | Item | Prioritas |
|---|---|---|
| MS-15 | Keranjang & pemesanan (US-009) | Must |
| MS-16 | Integrasi pembayaran/WhatsApp order | Should |
| MS-17 | Panel admin manajemen produk (FR admin 09) | Should |

## 11.5 Dependencies

- MS-03 harus mendahului MS-04 (katalog membaca data).
- MS-14 (API) memungkinkan MS-15–17.
- MS-06/07/08 dependen pada basis `components/ui` yang solid (MS-01).

## 11.6 Keputusan Tertunda

| Topik | Keputusan | Kapan diputus |
|---|---|---|
| Backend & DB | proposal (ADR-002) | Awal Q2 |
| Hosting final | proposal (Vercel/Cloudflare) | Sebelum MS-10 deploy |
| Auth & admin | proposal | Sebelum Q3 |