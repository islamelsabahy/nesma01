import { create } from "zustand";

interface UIStore {
  quickViewProductId: string | null;
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  easterEggActive: boolean;
  toast: { message: string; type: "success" | "error" } | null;
  setQuickView: (id: string | null) => void;
  openSearch: () => void;
  closeSearch: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  activateEasterEgg: () => void;
  deactivateEasterEgg: () => void;
  showToast: (message: string, type?: "success" | "error") => void;
  clearToast: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  quickViewProductId: null,
  searchOpen: false,
  mobileMenuOpen: false,
  easterEggActive: false,
  toast: null,
  setQuickView: (id) => set({ quickViewProductId: id }),
  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),
  toggleMobileMenu: () =>
    set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  activateEasterEgg: () => set({ easterEggActive: true }),
  deactivateEasterEgg: () => set({ easterEggActive: false }),
  showToast: (message, type = "success") => set({ toast: { message, type } }),
  clearToast: () => set({ toast: null }),
}));
