# Backend & Admin Roadmap

The current project is a static frontend with local cart/wishlist and WhatsApp ordering. To make it a full e-commerce system, add a backend.

## Recommended stack

- Supabase for database, auth, and storage.
- Vercel for frontend hosting.
- Paymob/Fawry integration when online payment is required.

## Tables

### products
- id UUID primary key
- slug text unique
- name_en text
- name_ar text
- category_en text
- category_ar text
- fragrance_family text
- price numeric
- size text
- image_url text
- description_en text
- description_ar text
- notes_top jsonb
- notes_middle jsonb
- notes_base jsonb
- is_bestseller boolean
- stock_quantity integer
- is_active boolean
- created_at timestamp
- updated_at timestamp

### orders
- id UUID primary key
- order_number text unique
- customer_name text
- customer_phone text
- governorate text
- address text
- payment_method text
- subtotal numeric
- shipping_fee numeric
- total numeric
- status text: new, confirmed, shipped, delivered, cancelled
- notes text
- created_at timestamp

### order_items
- id UUID primary key
- order_id UUID references orders(id)
- product_id UUID references products(id)
- quantity integer
- unit_price numeric
- line_total numeric

### coupons
- id UUID primary key
- code text unique
- discount_type text: percentage, fixed
- discount_value numeric
- starts_at timestamp
- ends_at timestamp
- usage_limit integer
- is_active boolean

## Admin permissions

- Admin: manage products, orders, coupons, pages, users.
- Operations: manage orders and shipping status.
- Marketing: manage product descriptions, banners, and campaigns.
- Viewer: read-only dashboard.

## Order statuses

New → Confirmed → Packed → Shipped → Delivered

Exception statuses:
Cancelled, Returned, Refunded

## Important integrations

- WhatsApp order confirmation.
- Email notification after checkout.
- GA4/Meta Pixel purchase event.
- Payment gateway webhook for online payment confirmation.
