# 08 — Data Model

> Dokumen ini `[PROPOSAL]` untuk backend; implementasi v1 memakai file
> TypeScript sebagai sumber data. Skema di bawah menjadi acuan bila data
> dipindah ke database di v2.

## 8.1 ERD (ringkas)

```
[Product] 1 ──── n [ProductImage]
   │
   1
   │
   n
[Category] n ─── 1 [ProductCategory] (many-to-many)
```

## 8.2 Entitas & Atribut

### Product

| Kolom | Tipe | Null | Keterangan |
|---|---|---|---|
| `id` | string (UUID) | No | PK |
| `name` | string | No | Nama produk |
| `slug` | string | No | Unique, untuk URL |
| `price` | int | Yes | Harga (Rp). Null = hubungi admin |
| `stockStatus` | enum | Yes | `in_stock` / `sold_out` / `preorder` |
| `description` | string | Yes | Deskripsi ringkas |
| `categoryId` | FK | Yes | Kategori |
| `createdAt` | datetime | No | Waktu dibuat |
| `updatedAt` | datetime | No | Waktu update |

### ProductImage

| Kolom | Tipe | Null | Keterangan |
|---|---|---|---|
| `id` | string | No | PK |
| `productId` | FK | No | Produk pemilik gambar |
| `src` | string | No | Path aset (mis. `/frames/frame-0001.jpg`) |
| `alt` | string | Yes | Teks alternatif |
| `sortOrder` | int | No | Urutan tampil |

### Category (opsional v2)

| Kolom | Tipe | Null | Keterangan |
|---|---|---|---|
| `id` | string | No | PK |
| `name` | string | No | Nama kategori |
| `slug` | string | No | Unique |

## 8.3 Indeks (proposal DB)

- `Product.slug` → unique index.
- `ProductImage.productId` → index untuk eager fetch.

## 8.4 Tipe TypeScript (v1, file `src/types`)

```ts
export type StockStatus = "in_stock" | "sold_out" | "preorder";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number | null; // null => "Hubungi Admin"
  stockStatus?: StockStatus;
  description?: string;
  image: string; // path ke public/frames/
  alt?: string;
}
```

## 8.5 Sumber Data v1 (`src/data`)

- Ekspor array `Product[]` statis.
- Komponen `catalog/` membaca dari berkas ini via `src/lib`.
- Perubahan produk = edit berkas data lalu deploy ulang (lihat ADR-001).