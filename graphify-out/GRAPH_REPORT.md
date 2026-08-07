# Graph Report - src  (2026-08-07)

## Corpus Check
- Corpus is ~7,296 words - fits in a single context window. You may not need a graph.

## Summary
- 120 nodes · 191 edges · 7 communities
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Auth & Login
- App Shell & I18n
- Home & Interactive Sections
- Buttons & Footer UI
- Catalog & Pricing
- CTA & Trust Sections
- Testimonials & Spotlights

## God Nodes (most connected - your core abstractions)
1. `ProductCard()` - 6 edges
2. `useUsdIdrRate()` - 5 edges
3. `Reveal()` - 5 edges
4. `formatPrice()` - 5 edges
5. `SectionHeading()` - 4 edges
6. `routing` - 4 edges
7. `cn()` - 4 edges
8. `StickyCard()` - 3 edges
9. `Component()` - 3 edges
10. `Stagger()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `RootLayout()` --calls--> `getUsdIdrRate()`  [EXTRACTED]
  app/[locale]/layout.tsx → lib/exchange.ts
- `StickyCard()` --calls--> `formatPrice()`  [EXTRACTED]
  components/sections/Catalog.tsx → lib/accounts.ts
- `ProductCard()` --calls--> `formatPrice()`  [EXTRACTED]
  components/ui/product-card.tsx → lib/accounts.ts
- `ProductCard()` --calls--> `rankColor()`  [EXTRACTED]
  components/ui/product-card.tsx → lib/accounts.ts
- `ProductCard()` --calls--> `rankTier()`  [EXTRACTED]
  components/ui/product-card.tsx → lib/accounts.ts

## Import Cycles
- None detected.

## Communities (7 total, 0 thin omitted)

### Community 0 - "Auth & Login"
Cohesion: 0.09
Nodes (16): metadata, AuthContentProps, AuthUI(), AuthUIProps, Button, ButtonProps, buttonVariants, defaultSignInContent (+8 more)

### Community 1 - "App Shell & I18n"
Cohesion: 0.14
Nodes (12): inter, metadata, orbitron, RootLayout(), RateContext, RateProvider(), SmoothScroll(), {Link, redirect, usePathname, useRouter, getPathname} (+4 more)

### Community 2 - "Home & Interactive Sections"
Cohesion: 0.16
Nodes (9): Faq(), Marquee(), Component(), FaqArticle(), cn(), HowItWorks(), StepCard(), StepCardProps (+1 more)

### Community 3 - "Buttons & Footer UI"
Cohesion: 0.15
Nodes (10): Button, ButtonProps, buttonVariants, AnimatedContainer(), AnimatedContainerProps, socialLinks, StickyFooter(), StickyFooterProps (+2 more)

### Community 4 - "Catalog & Pricing"
Cohesion: 0.25
Nodes (11): metadata, CatalogGrid(), tiers, useUsdIdrRate(), StickyCard(), ProductCard(), Account, accounts (+3 more)

### Community 5 - "CTA & Trust Sections"
Cohesion: 0.19
Nodes (11): Cta(), Guarantee(), items, AnimatedNumber(), easeOutExpo(), Stats, faqs, fadeUp (+3 more)

### Community 6 - "Testimonials & Spotlights"
Cohesion: 0.28
Nodes (6): Catalog(), spot, keys, positions, Testimonials(), SectionHeading()

## Knowledge Gaps
- **35 isolated node(s):** `metadata`, `inter`, `orbitron`, `metadata`, `metadata` (+30 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `StickyFooter()` connect `Buttons & Footer UI` to `Home & Interactive Sections`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `metadata`, `inter`, `orbitron` to the rest of the system?**
  _35 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Auth & Login` be split into smaller, more focused modules?**
  _Cohesion score 0.09057971014492754 - nodes in this community are weakly interconnected._
- **Should `App Shell & I18n` be split into smaller, more focused modules?**
  _Cohesion score 0.1368421052631579 - nodes in this community are weakly interconnected._
- **Should `Buttons & Footer UI` be split into smaller, more focused modules?**
  _Cohesion score 0.14705882352941177 - nodes in this community are weakly interconnected._