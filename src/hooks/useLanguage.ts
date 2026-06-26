import { useLanguageStore } from "@/stores/useLanguageStore";
import { translations } from "@/data/translations";

export function useLanguage() {
  const { lang, toggle, isRTL } = useLanguageStore();
  const safeLang = lang as keyof typeof translations;

  const t = (path: string): string => {
    const keys = path.split(".");
    let value: unknown = translations[safeLang];
    for (const key of keys) {
      if (value && typeof value === "object" && key in value) {
        value = (value as Record<string, unknown>)[key];
      } else {
        return path;
      }
    }
    return typeof value === "string" ? value : path;
  };

  return { lang: safeLang, toggle, isRTL: isRTL(), t, dir: isRTL() ? "rtl" : ("ltr" as "rtl" | "ltr") };
}
