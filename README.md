# NESMA Perfumes Store

A launch-ready React/Vite storefront for **NESMA Perfumes** with bilingual Arabic/English UI, product catalog, wishlist, cart drawer, product details, WhatsApp checkout, SEO pages, policy pages, analytics hooks, and Vercel deployment config.

## What was added

- WhatsApp checkout flow with customer details and order summary.
- Product detail pages: `/product/:id` with fragrance notes and Product structured data.
- Search modal connected to the header search icon.
- Static legal/service pages: shipping, returns, privacy, terms, and FAQ.
- About and Contact pages.
- SEO component for dynamic title, meta description, Open Graph, canonical, Twitter cards, and JSON-LD.
- `robots.txt`, `sitemap.xml`, `site.webmanifest`, and Vercel SPA rewrites.
- GA4 and Meta Pixel injection via environment variables.
- Optimized hero video fallback: WebM version plus poster image.
- Fixed `.gitignore` and added `.env.example`.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Environment variables

Copy `.env.example` to `.env.local` and update:

```bash
VITE_SITE_URL=https://nesmaperfumes.com
VITE_CONTACT_PHONE=+20 127 292 0643
VITE_WHATSAPP_NUMBER=201272920643
VITE_CONTACT_EMAIL=hello@nesmaperfumes.com
VITE_INSTAPAY_HANDLE=nesmaperfumes@instapay
VITE_GA_MEASUREMENT_ID=
VITE_META_PIXEL_ID=
```

## Deployment

Recommended: Vercel.

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Add the environment variables above in Vercel Project Settings.

## Next backend step

This build is a strong WhatsApp-commerce MVP. For full e-commerce operations, connect Supabase/Firebase/Strapi and replace static `src/data/products.ts` with database-backed products, inventory, orders, promo codes, and admin panel permissions.
