import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import { useLanguage } from "@/hooks/useLanguage";
import { useUIStore } from "@/stores/useUIStore";
import { trackEvent } from "@/utils/tracking";

export function SearchModal() {
  const { lang, isRTL } = useLanguage();
  const { searchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!searchOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen, closeSearch]);

  const results = useMemo(() => {
    const cleaned = query.trim().toLowerCase();
    if (!cleaned) return products.slice(0, 6);
    return products.filter((product) => {
      const searchable = [
        product.name,
        product.nameAr,
        product.category,
        product.categoryAr,
        product.description.en,
        product.description.ar,
        ...product.notes.top,
        ...product.notes.middle,
        ...product.notes.base,
      ]
        .join(" ")
        .toLowerCase();
      return searchable.includes(cleaned);
    });
  }, [query]);

  const title = lang === "ar" ? "ابحث عن عطرك" : "Find your fragrance";
  const placeholder = lang === "ar" ? "اكتب اسم العطر أو النوتة..." : "Search by perfume or note...";
  const empty = lang === "ar" ? "لا توجد نتائج مطابقة" : "No matching results";

  return (
    <AnimatePresence>
      {searchOpen && (
        <div className="fixed inset-0 z-search flex items-start justify-center px-4 pt-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-deep-black/70 backdrop-blur-sm"
            onClick={closeSearch}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="relative w-full max-w-3xl rounded-2xl bg-ivory shadow-2xl border border-gold/30 overflow-hidden"
            dir={isRTL ? "rtl" : "ltr"}
          >
            <div className="flex items-center justify-between p-5 border-b border-gold/20">
              <h2 className="font-display text-xl font-bold text-oud">{title}</h2>
              <button onClick={closeSearch} className="p-2 text-oud hover:text-gold transition-colors" aria-label="Close search">
                <X size={20} />
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 rounded-xl border border-gold/30 bg-white px-4 py-3">
                <Search size={20} className="text-gold" />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    trackEvent("search", { search_term: event.target.value });
                  }}
                  placeholder={placeholder}
                  className="w-full bg-transparent outline-none text-oud placeholder:text-oud/40"
                />
              </div>

              <div className="mt-5 max-h-[55vh] overflow-y-auto space-y-3">
                {results.length === 0 ? (
                  <p className="text-center text-oud/50 py-8">{empty}</p>
                ) : (
                  results.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={closeSearch}
                      className="flex items-center gap-4 rounded-xl bg-white p-3 border border-gold/10 hover:border-gold/40 transition-colors"
                    >
                      <img src={product.image} alt={product.name} className="h-16 w-16 rounded-lg object-cover" loading="lazy" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-oud truncate">{lang === "ar" ? product.nameAr : product.name}</h3>
                        <p className="text-xs text-oud/50 truncate">{lang === "ar" ? product.categoryAr : product.category}</p>
                      </div>
                      <span className="text-sm font-bold text-gold">EGP {product.price.toLocaleString()}</span>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
