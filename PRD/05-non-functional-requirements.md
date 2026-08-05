# 05 — Non-Functional Requirements

## 5.1 Performa

| ID | Kebutuhan | Target |
|---|---|---|
| NFR-001 | Waktu muat halaman utama (koneksi rata-rata 4G) | < 3 detik |
| NFR-002 | Skor Lighthouse Performance | ≥ 90 |
| NFR-003 | Skor Lighthouse SEO | ≥ 90 |
| NFR-004 | Gambar dioptimalkan via `next/image` (lazy load + format modern) | Wajib |
| NFR-005 | Skor Lighthouse Accessibility | ≥ 90 |

## 5.2 Ketersediaan & Keandalan

| ID | Kebutuhan | Target |
|---|---|---|
| NFR-006 | Uptime halaman statis | SLO 99.9% (bergantung hosting) |
| NFR-007 | Build produksi bebas error | 100% |
| NFR-008 | Rollback mudah (deploy ulang commit sebelumnya) | Didukung |

## 5.3 Keamanan

| ID | Kebutuhan |
|---|---|
| NFR-009 | Tidak ada rahasia/kunci di repositori (cek `.gitignore`). |
| NFR-010 | Semua aset & navigasi internal memakai protokol yang sama (tidak ada http campuran). |
| NFR-011 | `npm audit` bebas vulnerability berisiko tinggi/rendah yang tak termitigasi. |

## 5.4 Aksesibilitas (WCAG 2.1 AA)

| ID | Kebutuhan |
|---|---|
| NFR-012 | Kontras teks vs latar memenuhi rasio ≥ 4.5:1 untuk teks normal. |
| NFR-013 | Semua elemen interaktif dapat diakses dan difokuskan via keyboard. |
| NFR-014 | Gambar memiliki `alt` yang bermakna. |
| NFR-015 | Struktur heading berurutan (`h1` → `h2` → `h3`). |

## 5.5 Responsivitas & Kompatibilitas

| ID | Kebutuhan |
|---|---|
| NFR-016 | Mendukung breakpoint: mobile (<640px), tablet, desktop (≥1024px). |
| NFR-017 | Tidak ada scroll horizontal di semua breakpoint. |
| NFR-018 | Browser: Chrome, Edge, Firefox, Safari (2 versi terbaru). |

## 5.6 Maintainability & Kualitas Kode

| ID | Kebutuhan |
|---|---|
| NFR-019 | Data produk terpusat di satu file (FR-007). |
| NFR-020 | Komponen terorganisir per domain (`catalog`, `hero`, `sections`, `ui`). |
| NFR-021 | Nilai warna/font memakai token tema (`globals.css`, `tailwind.config.ts`). |
| NFR-022 | Lint & typecheck dijalankan sebelum merge (CI `[PROPOSAL]`). |

## 5.7 Privasi

| ID | Kebutuhan |
|---|---|
| NFR-023 | Tidak ada pelacakan/pihak ketiga tanpa persetujuan. |
| NFR-024 | Tidak mengumpulkan data pribadi pengunjung pada v1. |

## 5.8 Catatan

- Item bertanda `[PROPOSAL]` (mis. CI, analytics) diadopsi pada versi lanjutan
  sesuai roadmap (dokumen `11-roadmap.md`).
