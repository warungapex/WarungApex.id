# 09 — API Spec

> `[PROPOSAL]` — diterapkan pada v2 saat backend hadir. v1 memakai fungsi
> lokal (`lib/`) sebagai ganti API. Semua contoh memakai JSON.

Base URL asumsi: `https://api.warungapex.example/v1` (placeholder).

## 9.1 Konvensi Umum

- Format: JSON.
- Error format: `{ "error": { "code": "...", "message": "..." } }`.
- HTTP status: 200 (ok), 201 (created), 400 (bad request), 404 (not found),
  500 (server error).
- Auth `[PROPOSAL]`: header `Authorization: Bearer <token>` untuk endpoint admin.

## 9.2 Endpoint — Katalog

### GET `/products`
Menampilkan daftar produk (terdapat opsi pagination).

| Param (query) | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `limit` | int | No | Jumlah per halaman (default 24, max 100) |
| `offset` | int | No | Posisi awal (default 0) |
| `category` | string | No | Filter slug kategori |
| `search` | string | No | Pencarian nama (v2) |

**Response 200**
```json
{
  "data": [
    {
      "id": "p-001",
      "name": "Nama Produk",
      "slug": "nama-produk",
      "price": 1500000,
      "stockStatus": "in_stock",
      "image": "/frames/frame-0001.jpg"
    }
  ],
  "meta": { "limit": 24, "offset": 0, "total": 42 }
}
```

### GET `/products/:slug`
Detail satu produk.

**Response 200**
```json
{
  "data": {
    "id": "p-001",
    "name": "Nama Produk",
    "slug": "nama-produk",
    "price": 1500000,
    "stockStatus": "in_stock",
    "description": "Deskripsi produk.",
    "images": [
      { "src": "/frames/frame-0001.jpg", "alt": "Foto utama" }
    ]
  }
}
```

**Error** — `404` bila produk tak ada.

## 9.3 Endpoint — Kategori

### GET `/categories`
```json
{
  "data": [ { "id": "c-1", "name": "Aksesoris", "slug": "aksesoris" } ]
}
```

## 9.4 Endpoint — Admin `[PROPOSAL]`

| Method | Path | Keterangan |
|---|---|---|
| POST | `/products` | Buat produk baru (201) |
| PUT | `/products/:slug` | Perbarui produk (200) |
| DELETE | `/products/:slug` | Hapus produk (204) |

> Didelegasikan ke v2/v3 (panel admin) — lihat `11-roadmap.md`.

## 9.5 Kode Error Umum

| Code | Status | Keterangan |
|---|---|---|
| `NOT_FOUND` | 404 | Sumber daya tidak ditemukan. |
| `VALIDATION_ERROR` | 400 | Field tidak valid/empty. |
| `UNAUTHORIZED` | 401 | Token tidak valid (admin v2). |
| `INTERNAL` | 500 | Kesalahan server. |