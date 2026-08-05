# 01 — Overview

## 1.1 Latar Belakang

Warung Apex adalah brand toko digital yang menjual produk akun game Apex Legends
melalui website. Saat ini proyek berada di tahap awal: scaffolding Next.js
sudah siap, tema visual sudah ditentukan (dark, aksen merah `#FF2A44` dan
cyan `#00F0FF`), serta aset gambar produk (frame) sudah tersedia di
`public/frames/`.

Masih belum ada halaman katalog yang lengkap, data produk, maupun bagian
penunjang (hero, keunggulan, kontak). PRD ini menjadi acuan pengembangan
versi 1 (v1).

## 1.2 Vision

Menjadi warung digital yang dipercaya untuk produk akun game Apex Legends,
dengan pengalaman belanja yang cepat, jelas, dan terasa modern.

## 1.3 Mission

- Menyajikan katalog produk yang lengkap, akurat, dan mudah dijelajahi.
- Memberikan performa tinggi terutama di perangkat mobile.
- Menjaga konsistensi identitas visual di seluruh halaman.
- Membangun fondasi teknis yang siap dikembangkan (keranjang, checkout).

## 1.4 Goals (v1)

| ID | Goal |
|---|---|
| G-01 | Meluncurkan landing page + katalog produk dalam bentuk single page. |
| G-02 | Menampilkan seluruh produk dari data (bukan hardcode per item). |
| G-03 | Mencapai skor Lighthouse Performance & SEO ≥ 90. |
| G-04 | Halaman termuat < 3 detik di koneksi rata-rata. |
| G-05 | Tema dan aset visual konsisten di semua breakpoint. |

## 1.5 Problem Statement

Pengunjung yang membuka Warung Apex saat ini hanya melihat teks "WARUNG APEX"
tanpa informasi produk, tanpa navigasi, dan tanpa bukti visual katalog.
Akibatnya: tidak ada alasan bagi pengunjung untuk tinggal, menjelajah, atau
mempercayai toko. Produk perlu menyajikan katalog yang informatif dan
menarik segera.

## 1.6 Stakeholder

| Stakeholder | Peran | Kebutuhan |
|---|---|---|
| Owner Warung Apex | Pemilik bisnis | Katalog online sebagai etalase & channel penjualan. |
| Pengembang | Implementasi | Spesifikasi jelas, scope terbatas, fondasi rapi. |
| Pengunjung | End user | Informasi produk cepat & jelas dari mobile. |

## 1.7 Scope Ringkas

| Termasuk v1 | Di luar v1 |
|---|---|
| Hero, keunggulan, katalog grid, kontak/footer | Autentikasi, keranjang, checkout, admin, backend |

## 1.8 Asumsi & Dependensi

- Aset frame produk tersedia lengkap di `public/frames/` (frame-0001 s/d dst).
- Data produk awal disimpan di sisi front-end (file TypeScript); backend
  menjadi `[PROPOSAL]` di versi lanjutan.
- Target utama adalah pengguna mobile di Indonesia.
