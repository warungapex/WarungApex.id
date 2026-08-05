# 03 — User Stories

Format: `Sebagai <peran>, saya ingin <fitur> sehingga <manfaat>`.
Acceptance criteria ditulis dengan pola **Given / When / Then**.

## US-001 — Melihat hero halaman utama
> Sebagai pengunjung, saya ingin melihat hero dengan nama toko dan ajakan
> bertindak sehingga saya langsung paham situs ini milik siapa dan bisa
> melanjutkan menjelajah.

- **Given** saya membuka halaman utama, **When** halaman selesai dimuat,
  **Then** saya melihat nama "WARUNG APEX", tagline, dan tombol CTA.
- CTA menggulir ke bagian katalog.

## US-002 — Melihat daftar produk di katalog
> Sebagai pengunjung, saya ingin melihat seluruh produk dalam grid sehingga
> saya bisa menjelajah pilihan dengan cepat.

- **Given** saya berada di bagian katalog, **When** halaman dimuat, **Then**
  seluruh produk dari data dirender sebagai kartu.
- Grid responsif (1 kolom di mobile, 2–4 kolom di layar lebih besar).

## US-003 — Melihat informasi tiap produk
> Sebagai pengunjung, saya ingin melihat gambar, nama, dan harga setiap
> produk sehingga saya bisa membandingkan pilihan.

- **Given** ada kartu produk, **When** saya melihatnya, **Then** kartu
  menampilkan gambar frame, nama produk, dan harga.
- Gambar menggunakan aset `public/frames/`.

## US-004 — Melihat bagian keunggulan toko
> Sebagai pengunjung, saya ingin melihat alasan memilih Warung Apex sehingga
> saya merasa percaya untuk membeli.

- **Given** saya menggulir halaman, **When** saya sampai di bagian
  keunggulan, **Then** saya melihat poin-poin keunggulan (mis. harga
  bersaing, barang original, pelayanan).

## US-005 — Menghubungi toko
> Sebagai pengunjung, saya ingin melihat informasi kontak sehingga saya bisa
> bertanya atau memesan di luar situs.

- **Given** saya menggulir ke footer, **When** saya melihatnya, **Then**
  terdapat informasi kontak (WhatsApp/telepon/alamat).

## US-006 — Mengakses situs dari ponsel
> Sebagai pengunjung mobile, saya ingin seluruh konten nyaman dibaca di layar
> kecil sehingga saya tidak perlu membuka desktop.

- **Given** saya membuka dari smartphone, **When** halaman dimuat, **Then**
  tata letak menyesuaikan tanpa pergeseran horizontal dan teks tetap terbaca.

## US-007 — Memastikan situs terasa brand yang sama (pengembang)
> Sebagai pengembang, saya ingin token warna & font terpusat sehingga
> konsistensi visual mudah dijaga.

- **Given** token tema didefinisikan, **When** komponen baru dibuat, **Then**
  token dipakai tanpa nilai hardcode warna.

## US-008 — [PROPOSAL] Mencari produk
> Sebagai pengunjung, saya ingin mencari produk berdasarkan nama sehingga
> saya cepat menemukan item tertentu. *(Dialihkan ke v2, lihat roadmap.)*

## US-009 — [PROPOSAL] Keranjang & pemesanan
> Sebagai pengunjung, saya ingin menyimpan pilihan produk dan mengirim pesan
> pemesanan sehingga transaksi lebih mudah. *(Dialihkan ke v2.)*

## Matriks Ringkas

| US | Dipenuhi oleh FR |
|---|---|
| US-001 | FR-001 |
| US-002 | FR-002 |
| US-003 | FR-003 |
| US-004 | FR-004 |
| US-005 | FR-005 |
| US-006 | NFR-006, NFR-010 |
| US-007 | NFR-011 |
| US-008 | — (v2) |
| US-009 | — (v2) |
