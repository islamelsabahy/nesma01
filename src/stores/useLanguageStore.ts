import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Language } from "@/types";

interface LanguageStore {
  lang: Language;
  toggle: () => void;
  setLang: (lang: Language) => void;
  isRTL: () => boolean;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      lang: "ar",
      toggle: () => {
        const newLang = get().lang === "ar" ? "en" : "ar";
        set({ lang: newLang });
        document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = newLang;
      },
      setLang: (lang) => {
        set({ lang });
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = lang;
      },
      isRTL: () => get().lang === "ar",
    }),
    {
      name: "nesma-language",
    }
  )
);
