# 12 — Success Metrics

KPI untuk mengukur keberhasilan Warung Apex. Pengukuran otomatis analytics
`[PROPOSAL]`; sebagian diukur manual/lighthouse.

## 12.1 Metrik Teknis

| ID | Metrik | Target | Alat Ukur |
|---|---|---|---|
| SM-01 | Waktu muat halaman utama | < 3 detik (4G) | Lighthouse, Web Vitals |
| SM-02 | LCP (Largest Contentful Paint) | ≤ 2.5 s | Web Vitals |
| SM-03 | CLS (Cumulative Layout Shift) | ≤ 0.1 | Web Vitals |
| SM-04 | Skor Lighthouse Performance | ≥ 90 | Lighthouse CI `[PROPOSAL]` |
| SM-05 | Skor Lighthouse Accessibility | ≥ 90 | Lighthouse CI |
| SM-06 | Skor Lighthouse SEO | ≥ 90 | Lighthouse CI |
| SM-07 | Build produksi tanpa error | 100% | CI `[PROPOSAL]` |

## 12.2 Metrik Bisnis

| ID | Metrik | Target (aset awal) | Sumber |
|---|---|---|---|
| SM-08 | Kunjungan (sessions) bulanan | Bertumbuh MoM | Analytics `[PROPOSAL]` |
| SM-09 | Bounce rate | < 50% | Analytics |
| SM-10 | Waktu tinggal rata-rata | ≥ 30 detik | Analytics |
| SM-11 | Insight permintaan (kontak/WA) | Terukur manual | Kontak footer |

## 12.3 Metrik Kualitas Konten

| ID | Metrik | Target |
|---|---|---|
| SM-12 | Proporsi produk dengan gambar valid | 100% |
| SM-13 | Produk di-render dari data (bukan hardcode) | 100% |
| SM-14 | Tidak ada halaman dengan kontras gagal | 100% |

## 12.4 Metode & Frekuensi

- **Lighthouse**: dijalankan saat rilis (per milestone) secara manual; otomatisasi
  Lighthouse CI `[PROPOSAL]` di Q1/Q2.
- **Web Vitals**: dipantau dari dashboard platform host (Vercel) bila tersedia.
- **Analytics bisnis**: dipasang `[PROPOSAL]` (persetujuan pengguna — lihat
  NFR-023) dihitung bulanan.

## 12.5 Nuansa

- Target `SM-08`–`SM-11` memakai aset awal karena belum ada data historis;
  baseline 3 bulan pertama menjadi acuan perbaikan.
- Metrik teknis (SM-01–07) adalah pengukuran kuadrat yang bisa langsung
  dievaluasi pasca-rilis v1.