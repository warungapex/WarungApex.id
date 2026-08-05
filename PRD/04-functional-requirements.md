# 04 — Functional Requirements

Setiap kebutuhan memiliki ID `FR-xxx` dengan prioritas MoSCoW.
Status: `Draft`.

## 4.1 Daftar Kebutuhan Fungsional

| ID | Prioritas | Deskripsi |
|---|---|---|
| FR-001 | Must | Halaman utama menampilkan hero berisi nama "WARUNG APEX", tagline, dan tombol CTA yang menggulir ke katalog. |
| FR-002 | Must | Bagian katalog merender seluruh produk dari sumber data terpusat (file data), bukan hardcode per item. |
| FR-003 | Must | Setiap kartu produk menampilkan gambar frame, nama produk, dan harga. |
| FR-004 | Should | Terdapat bagian keunggulan toko (min. 3 poin) dengan ikon. |
| FR-005 | Should | Footer berisi informasi kontak (WhatsApp/telepon/alamat). |
| FR-006 | Must | Tema gelap diterapkan konsisten di seluruh halaman. |
| FR-007 | Must | Sumber data produk berada di satu file (`src/lib` atau `src/data`) agar mudah diubah tanpa menyentuh komponen. |
| FR-008 | Should | CTA dan elemen interaktif memiliki state hover/focus yang jelas. |
| FR-009 | Could | Animasi halus (framer-motion) saat elemen masuk viewport. |
| FR-010 | Could | Menampilkan badge/sistem status stok pada kartu produk. |

## 4.2 Aturan Bisnis (Business Rules)

| ID | Aturan |
|---|---|
| BR-001 | Semua produk harus memiliki gambar frame yang valid; produk tanpa gambar tidak dirender. |
| BR-002 | Harga ditampilkan dalam format Rupiah (Rp) dengan pemisah ribuan. |
| BR-003 | Produk tanpa harga ditandai "Hubungi Admin" alih-alih kolom kosong. |

## 4.3 Traceability Matrix

| FR | US terkait | Komponen terkait |
|---|---|---|
| FR-001 | US-001 | `hero/` |
| FR-002 | US-002 | `catalog/`, `lib/` |
| FR-003 | US-003 | `catalog/`, `types/` |
| FR-004 | US-004 | `sections/` |
| FR-005 | US-005 | `sections/` |
| FR-006 | US-007 | `globals.css`, `tailwind.config.ts` |
| FR-007 | US-007 | `lib/`, `types/` |
| FR-008 | US-001 | `ui/` |
| FR-009 | — | `hooks/`, `ui/` |
| FR-010 | — | `catalog/` |

## 4.4 Kriteria Selesai (Definition of Done)

- Kode mengikuti lint (`npm run lint` lolos) dan typecheck TypeScript.
- Fitur dirender benar di mobile & desktop (diuji manual).
- Tidak ada warning/error konsol pada saat build.
- Komponen menggunakan token tema, bukan warna hardcode (FR-006/FR-007).
