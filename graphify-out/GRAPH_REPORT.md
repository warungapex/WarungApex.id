# Graph Report - WarungApex.id  (2026-08-09)

## Corpus Check
- 85 files · ~85,099 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 434 nodes · 589 edges · 35 communities (28 shown, 7 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `335572a7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- supabase/accounts.ts
- [locale]/page.tsx
- dependencies
- compilerOptions
- devDependencies
- catalog-grid.tsx
- Catalog.tsx
- [id]/page.tsx
- sticky-footer.tsx
- admin/layout.tsx
- opencode.json
- .opencode/opencode.json
- next.config.ts
- graphify.js
- typewriter.tsx
- eslint.config.mjs
- postcss.config.mjs
- tailwind.config.mjs
- 03 — User Stories
- 06 — Architecture
- 01 — Overview
- 05 — Non-Functional Requirements
- 08 — Data Model
- 09 — API Spec
- 07 — UI/UX Spec
- 11 — Roadmap
- Frontend Design
- PRD — Warung Apex
- 02 — User Personas
- 12 — Success Metrics
- 04 — Functional Requirements
- 10 — Risk Register
- README.md
- This is NOT the Next.js you know

## God Nodes (most connected - your core abstractions)
1. `createServerSupabaseClient()` - 20 edges
2. `requireAdmin()` - 17 edges
3. `compilerOptions` - 16 edges
4. `03 — User Stories` - 11 edges
5. `01 — Overview` - 9 edges
6. `05 — Non-Functional Requirements` - 9 edges
7. `Account` - 8 edges
8. `07 — UI/UX Spec` - 8 edges
9. `useUsdIdrRate()` - 7 edges
10. `formatPrice()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `SmoothScroll()` --references--> `lenis`  [EXTRACTED]
  src/components/smooth-scroll.tsx → package.json
- `ProductPage()` --calls--> `getAccount()`  [EXTRACTED]
  src/app/[locale]/catalog/[id]/page.tsx → src/lib/supabase/accounts.ts
- `CatalogPage()` --calls--> `getAccounts()`  [EXTRACTED]
  src/app/[locale]/catalog/page.tsx → src/lib/supabase/accounts.ts
- `Home()` --calls--> `getFeaturedAccounts()`  [EXTRACTED]
  src/app/[locale]/page.tsx → src/lib/supabase/accounts.ts
- `NewAccountPage()` --calls--> `requireAdmin()`  [EXTRACTED]
  src/app/admin/accounts/new/page.tsx → src/lib/supabase/auth.ts

## Import Cycles
- None detected.

## Communities (35 total, 7 thin omitted)

### Community 0 - "supabase/accounts.ts"
Cohesion: 0.08
Nodes (35): EditAccountPage(), NewAccountPage(), AdminLoginPage(), AdminPage(), Home(), AccountForm(), DIVISIONS, PC_LAUNCHERS (+27 more)

### Community 1 - "[locale]/page.tsx"
Cohesion: 0.11
Nodes (19): Cta(), Faq(), Guarantee(), items, Marquee(), AnimatedNumber(), easeOutExpo(), Stats (+11 more)

### Community 2 - "dependencies"
Cohesion: 0.07
Nodes (27): class-variance-authority, clsx, framer-motion, lucide-react, next, next-intl, dependencies, class-variance-authority (+19 more)

### Community 3 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 4 - "devDependencies"
Cohesion: 0.07
Nodes (27): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, supabase, tailwindcss, @tailwindcss/postcss (+19 more)

### Community 5 - "catalog-grid.tsx"
Cohesion: 0.11
Nodes (12): HEIRLOOMS, PLATFORMS, RANKS, SORT_OPTIONS, buttonVariants, getResultItemTransition(), getResultItemVariants(), GooeySearchBar() (+4 more)

### Community 6 - "Catalog.tsx"
Cohesion: 0.07
Nodes (27): lenis, lenis, inter, metadata, orbitron, RootLayout(), Props, LOCAL_IMAGES (+19 more)

### Community 7 - "[id]/page.tsx"
Cohesion: 0.14
Nodes (15): dynamic, dynamicParams, generateStaticParams(), metadata, ProductPage(), CatalogPage(), metadata, CatalogGrid() (+7 more)

### Community 8 - "sticky-footer.tsx"
Cohesion: 0.16
Nodes (10): Button, ButtonProps, buttonVariants, AnimatedContainer(), AnimatedContainerProps, socialLinks, StickyFooter(), StickyFooterProps (+2 more)

### Community 9 - "admin/layout.tsx"
Cohesion: 0.40
Nodes (3): inter, metadata, orbitron

### Community 10 - "opencode.json"
Cohesion: 0.50
Nodes (3): plugin, $schema, @dietrichgebert/ponytail

### Community 11 - ".opencode/opencode.json"
Cohesion: 0.50
Nodes (3): plugin, $schema, .opencode/plugins/graphify.js

### Community 18 - "03 — User Stories"
Cohesion: 0.17
Nodes (11): 03 — User Stories, Matriks Ringkas, US-001 — Melihat hero halaman utama, US-002 — Melihat daftar produk di katalog, US-003 — Melihat informasi tiap produk, US-004 — Melihat bagian keunggulan toko, US-005 — Menghubungi toko, US-006 — Mengakses situs dari ponsel (+3 more)

### Community 19 - "06 — Architecture"
Cohesion: 0.17
Nodes (11): 06 — Architecture, 6.1 Konteks (C4 Level 1 — System Context), 6.2 Container (C4 Level 2), 6.3 Komponen (C4 Level 3 — ringkas), 6.4 Keputusan Arsitektur (ADR), 6.5 Struktur Folder Sasaran, ADR-001 — Data front-end vs backend di v1, ADR-002 — Backend `[PROPOSAL]` (+3 more)

### Community 20 - "01 — Overview"
Cohesion: 0.20
Nodes (9): 01 — Overview, 1.1 Latar Belakang, 1.2 Vision, 1.3 Mission, 1.4 Goals (v1), 1.5 Problem Statement, 1.6 Stakeholder, 1.7 Scope Ringkas (+1 more)

### Community 21 - "05 — Non-Functional Requirements"
Cohesion: 0.20
Nodes (9): 05 — Non-Functional Requirements, 5.1 Performa, 5.2 Ketersediaan & Keandalan, 5.3 Keamanan, 5.4 Aksesibilitas (WCAG 2.1 AA), 5.5 Responsivitas & Kompatibilitas, 5.6 Maintainability & Kualitas Kode, 5.7 Privasi (+1 more)

### Community 22 - "08 — Data Model"
Cohesion: 0.20
Nodes (9): 08 — Data Model, 8.1 ERD (ringkas), 8.2 Entitas & Atribut, 8.3 Indeks (proposal DB), 8.4 Tipe TypeScript (v1, file `src/types`), 8.5 Sumber Data v1 (`src/data`), Category (opsional v2), Product (+1 more)

### Community 23 - "09 — API Spec"
Cohesion: 0.20
Nodes (9): 09 — API Spec, 9.1 Konvensi Umum, 9.2 Endpoint — Katalog, 9.3 Endpoint — Kategori, 9.4 Endpoint — Admin `[PROPOSAL]`, 9.5 Kode Error Umum, GET `/categories`, GET `/products` (+1 more)

### Community 24 - "07 — UI/UX Spec"
Cohesion: 0.22
Nodes (8): 07 — UI/UX Spec, 7.1 Design Tokens (Brand), 7.2 Tipografi, 7.3 Wireframe (ASCII) — Mobile (1 kolom), 7.4 Wireframe — Desktop (2–4 kolom katalog), 7.5 Copy Deck, 7.6 Micro-interactions & State, 7.7 Aksesibilitas Visual

### Community 25 - "11 — Roadmap"
Cohesion: 0.25
Nodes (7): 11.1 Filosofi Prioritas, 11.2 Q1 — Landasan & Katalog (v1), 11.3 Q2 — Interaksi Lanjutan (v2), 11.4 Q3 — Transaksi (v3), 11.5 Dependencies, 11.6 Keputusan Tertunda, 11 — Roadmap

### Community 26 - "Frontend Design"
Cohesion: 0.29
Nodes (6): Design principles, Frontend Design, Ground it in the subject, More on writing in design, Process: brainstorm, explore, plan, critique, build, critique again, Restraint and self-critique

### Community 27 - "PRD — Warung Apex"
Cohesion: 0.29
Nodes (6): Cara Pakai, Glossary, Konvensi Penulisan, PRD — Warung Apex, Riwayat Versi, Struktur Dokumen

### Community 28 - "02 — User Personas"
Cohesion: 0.29
Nodes (6): 02 — User Personas, 2.1 Persona 1 — "Arya", Pembeli Gadget Muda, 2.2 Persona 2 — "Bu Ratna", Pembeli Umum, 2.3 Persona 3 — "Dimas", Reseller / Dropshipper, 2.4 Persona 4 — "Pak Johan", Owner / Admin (Internal), 2.5 Prioritas Persona

### Community 29 - "12 — Success Metrics"
Cohesion: 0.29
Nodes (6): 12.1 Metrik Teknis, 12.2 Metrik Bisnis, 12.3 Metrik Kualitas Konten, 12.4 Metode & Frekuensi, 12.5 Nuansa, 12 — Success Metrics

### Community 30 - "04 — Functional Requirements"
Cohesion: 0.33
Nodes (5): 04 — Functional Requirements, 4.1 Daftar Kebutuhan Fungsional, 4.2 Aturan Bisnis (Business Rules), 4.3 Traceability Matrix, 4.4 Kriteria Selesai (Definition of Done)

### Community 31 - "10 — Risk Register"
Cohesion: 0.50
Nodes (3): 10.1 Matriks Risiko, 10.2 Tindak Lanjut, 10 — Risk Register

### Community 32 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **195 isolated node(s):** `$schema`, `.opencode/plugins/graphify.js`, `eslintConfig`, `withNextIntl`, `nextConfig` (+190 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`, `Catalog.tsx`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Why does `lenis` connect `Catalog.tsx` to `dependencies`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **What connects `$schema`, `.opencode/plugins/graphify.js`, `eslintConfig` to the rest of the system?**
  _195 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `supabase/accounts.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0750925436277102 - nodes in this community are weakly interconnected._
- **Should `[locale]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10967741935483871 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._