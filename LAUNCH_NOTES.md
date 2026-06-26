# NESMA Perfumes Launch Notes

## Completed in this version

1. WhatsApp checkout
   - New route: `/checkout`
   - Customer fields: name, phone, governorate, address, payment method, notes
   - Order summary generated into WhatsApp message

2. Product detail pages
   - New route: `/product/:id`
   - Product SEO schema JSON-LD
   - Related products section
   - Quantity selector, add to cart, wishlist

3. Search
   - Header search button now opens a real search modal
   - Searches name, Arabic name, category, description, and fragrance notes

4. Pages
   - `/about`
   - `/contact`
   - `/shipping-policy`
   - `/return-policy`
   - `/privacy-policy`
   - `/terms`
   - `/faq`

5. SEO and launch assets
   - Dynamic SEO component
   - Canonical links
   - Open Graph and Twitter cards
   - Product structured data
   - `robots.txt`
   - `sitemap.xml`
   - `site.webmanifest`

6. Tracking
   - GA4 via `VITE_GA_MEASUREMENT_ID`
   - Meta Pixel via `VITE_META_PIXEL_ID`
   - Events added for search, wishlist, add to cart, checkout, contact

7. Performance
   - Added `hero-bg.webm` compressed version
   - Added `hero-poster.webp`
   - Hero video now loads WebM first with MP4 fallback

8. Deployment
   - Added `vercel.json` SPA rewrites and cache headers
   - Added `.env.example`
   - Fixed `gitignore` to `.gitignore`
   - Removed Kimi inspect plugin from Vite config/package

## Important production edits before going live

Update these values in `.env.local` or `src/config/site.ts`:

- `VITE_SITE_URL`
- `VITE_CONTACT_PHONE`
- `VITE_WHATSAPP_NUMBER`
- `VITE_CONTACT_EMAIL`
- `VITE_INSTAPAY_HANDLE`
- `VITE_GA_MEASUREMENT_ID`
- `VITE_META_PIXEL_ID`

## Backend/admin note

This is now a strong WhatsApp-commerce MVP. A real admin panel needs backend/database. A Supabase-ready roadmap is included in:

`docs/BACKEND_ADMIN_ROADMAP.md`
