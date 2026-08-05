# PRD — Warung Apex

Index & panduan untuk seluruh dokumen PRD Warung Apex.

## Struktur Dokumen

| No | Dokumen | Isi |
|---|---|---|
| 00 | `00-README.md` | Index, cara pakai, glossary, konvensi |
| 01 | `01-overview.md` | Latar belakang, vision, mission, goals, problem statement |
| 02 | `02-user-personas.md` | Persona pengguna lengkap |
| 03 | `03-user-stories.md` | User stories + acceptance criteria |
| 04 | `04-functional-requirements.md` | Kebutuhan fungsional + traceability |
| 05 | `05-non-functional-requirements.md` | Kebutuhan non-fungsional (performa, keamanan, dll) |
| 06 | `06-architecture.md` | Arsitektur sistem + ADR |
| 07 | `07-ui-ux-spec.md` | Wireframe, design tokens, copy deck |
| 08 | `08-data-model.md` | ERD & skema database |
| 09 | `09-api-spec.md` | Spesifikasi endpoint REST |
| 10 | `10-risks.md` | Risk register |
| 11 | `11-roadmap.md` | Roadmap & prioritas |
| 12 | `12-success-metrics.md` | KPI & target |

## Cara Pakai

- Baca `01` dulu untuk konteks bisnis, lalu `03`–`04` untuk kebutuhan, sisanya sebagai detail pendukung.
- Perubahan kebutuhan dicatat dengan update terkait di `04` dan `03` agar traceability tetap terjaga.
- Setiap file berdiri sendiri; referensi silang memakai ID (FR-xx, US-xx, R-xx).

## Konvensi Penulisan

- Bahasa: Bahasa Indonesia.
- ID kebutuhan: `FR-001`, `NFR-001`, `US-001`.
- Status dokumen: `Draft` → `Review` → `Approved`.
- Bagian yang belum pasti ditandai `[PROPOSAL]` atau `[PLACEHOLDER]`.

## Glossary

| Istilah | Definisi |
|---|---|
| **Warung** | Toko kecil, konteks ini = brand toko digital Warung Apex. |
| **Frame** | Gambar produk di `public/frames/` yang menjadi aset visual katalog. |
| **Hero** | Bagian pertama halaman utama (headline + CTA). |
| **Katalog** | Grid daftar produk beserta data & gambarnya. |
| **ADR** | Architecture Decision Record — catatan keputusan arsitektur. |
| **MoSCoW** | Prioritas: Must, Should, Could, Won't. |
| **KPI** | Key Performance Indicator — metrik keberhasilan. |
| **SLO** | Service Level Objective — target level layanan. |

## Riwayat Versi

| Versi | Tanggal | Perubahan |
|---|---|---|
| v0.1 | 2026-08-06 | Inisialisasi semua dokumen PRD (Draft) |
