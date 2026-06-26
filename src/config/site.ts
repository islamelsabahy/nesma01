export const siteConfig = {
  brand: "NESMA Perfumes",
  brandAr: "نسمة للعطور",
  tagline: "Feel the Breeze",
  url: import.meta.env.VITE_SITE_URL || "https://nesmaperfumes.com",
  phone: import.meta.env.VITE_CONTACT_PHONE || "+20 127 292 0643",
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "201272920643",
  email: import.meta.env.VITE_CONTACT_EMAIL || "hello@nesmaperfumes.com",
  instaPay: import.meta.env.VITE_INSTAPAY_HANDLE || "nesmaperfumes@instapay",
  currency: "EGP",
  deliveryEstimateAr: "من 2 إلى 5 أيام عمل داخل مصر",
  deliveryEstimateEn: "2 to 5 business days across Egypt",
} as const;
