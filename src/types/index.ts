export type Language = "ar" | "en";

export type FragranceFamily = "floral" | "oriental" | "woody" | "sweet" | "fresh";

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  categoryAr: string;
  fragranceFamily: FragranceFamily;
  price: number;
  size: string;
  color: string;
  image: string;
  description: { en: string; ar: string };
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  isBestseller?: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: { en: string; ar: string };
  rating: number;
}

export interface GiftSet {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string;
}

export interface ProcessStep {
  number: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string;
}
