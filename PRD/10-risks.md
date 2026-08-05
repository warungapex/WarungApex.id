# 10 — Risk Register

Matriks risiko dengan skala **P** (probabilitas 1–5) dan **D** (dampak 1–5)
serta tingkat **P×D**. Mitigasi diutamakan berprioritas.

## 10.1 Matriks Risiko

| # | Risiko | P | D | P×D | Tingkat | Mitigasi | Owner |
|---|---|---|---|---|---|---|---|
| R-01 | Aset frame tidak lengkap/rusak untuk sebagian produk | 3 | 3 | 9 | Medium | Validasi keberadaan file saat render (BR-001); fallback placeholder. | Pengembang |
| R-02 | Katalog besar membuat halaman lambat (NFR-001 gagal) | 3 | 4 | 12 | High | `next/image` lazy-load, format modern, pagination bila data banyak. | Pengembang |
| R-03 | Data produk tercecer (hardcode) membuat update sulit | 4 | 3 | 12 | High | Sumber data terpusat di `src/data` (FR-007, ADR-001). | Pengembang |
| R-04 | Performa buruk di perangkat mobile low-end | 3 | 3 | 9 | Medium | Server Components, minimalkan JS client, optimasi gambar. | Pengembang |
| R-05 | Kontras warna gagal aksesibilitas (NFR-012) | 3 | 3 | 9 | Medium | Audit kontras token tema sebelum rilis. | Pengembang |
| R-06 | Dependency berisiko keamanan (NFR-011) | 2 | 4 | 8 | Medium | `npm audit` rutin, update dependency minor. | Pengembang |
| R-07 | Tidak ada backend → data statis cepat usang | 3 | 2 | 6 | Low | Terima di v1; migrasi ke API disiapkan (ADR-002, 09). | Owner |

## 10.2 Tindak Lanjut

- Risiko High (P×D ≥ 12): must be mitigated sebelum rilis.
- Risiko Medium: mitigasi dijadwalkan per milestone.
- Review register setiap perubahan scope signifikan.