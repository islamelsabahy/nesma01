import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";
import { products } from "@/data/products";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleDrawer: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  getTotalQuantity: () => number;
  getTotalPrice: () => number;
  getItemCount: () => number;
  getCartProducts: () => { product: (typeof products)[0]; quantity: number }[];
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (productId, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.productId === productId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === productId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, { productId, quantity }] };
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      toggleDrawer: () => set((s) => ({ isOpen: !s.isOpen })),
      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),
      getTotalQuantity: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
      getTotalPrice: () => {
        return get().items.reduce((sum, item) => {
          const product = products.find((p) => p.id === item.productId);
          return sum + (product ? product.price * item.quantity : 0);
        }, 0);
      },
      getItemCount: () => get().items.length,
      getCartProducts: () =>
        get().items
          .map((item) => ({
            product: products.find((p) => p.id === item.productId)!,
            quantity: item.quantity,
          }))
          .filter((i) => i.product),
    }),
    {
      name: "nesma-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
