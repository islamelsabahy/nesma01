import { siteConfig } from "@/config/site";
import type { Product } from "@/types";

export interface CustomerOrderDetails {
  name: string;
  phone: string;
  address: string;
  governorate: string;
  paymentMethod: string;
  notes?: string;
}

export interface CartProductLine {
  product: Product;
  quantity: number;
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function createCartMessage(
  lines: CartProductLine[],
  total: number,
  lang: "ar" | "en",
  customer?: CustomerOrderDetails
) {
  const productLines = lines
    .map(({ product, quantity }, index) => {
      const name = lang === "ar" ? product.nameAr : product.name;
      const lineTotal = product.price * quantity;
      return `${index + 1}) ${name} - ${quantity} x ${product.price.toLocaleString()} EGP = ${lineTotal.toLocaleString()} EGP`;
    })
    .join("\n");

  const customerBlock = customer
    ? `\n\nCustomer Details:\nName: ${customer.name}\nPhone: ${customer.phone}\nGovernorate: ${customer.governorate}\nAddress: ${customer.address}\nPayment: ${customer.paymentMethod}${customer.notes ? `\nNotes: ${customer.notes}` : ""}`
    : "";

  return `Hello NESMA Perfumes,\nI would like to place this order:\n\n${productLines}\n\nTotal: ${total.toLocaleString()} EGP${customerBlock}`;
}
