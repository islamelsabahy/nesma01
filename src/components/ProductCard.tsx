import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/types";
import { useLanguage } from "@/hooks/useLanguage";
import { useCartStore } from "@/stores/useCartStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { useUIStore } from "@/stores/useUIStore";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/utils/tracking";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { lang, t } = useLanguage();
  const { addItem, openDrawer } = useCartStore();
  const { isWishlisted, toggle } = useWishlistStore();
  const { setQuickView, showToast } = useUIStore();
  const [qty, setQty] = useState(1);
  const [flipped, setFlipped] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleAdd = () => {
    addItem(product.id, qty);
    setFlipped(false);
    showToast(t("toast.addedToCart"));
    trackEvent("add_to_cart", { item_id: product.id, value: product.price * qty, currency: siteConfig.currency });
    setTimeout(() => openDrawer(), 300);
  };

  const handleWishlist = () => {
    toggle(product.id);
    showToast(
      wishlisted ? t("toast.removedFromWishlist") : t("toast.addedToWishlist")
    );
    trackEvent("wishlist_toggle", { item_id: product.id, active: !wishlisted });
  };

  return (
    <div className="group" style={{ perspective: "1000px" }}>
      <div className="bg-ivory border border-gold-light rounded-lg overflow-hidden transition-all duration-300 hover:border-gold-dark hover:shadow-[0_8px_24px_rgba(26,26,26,0.08)]">
        {/* Image Area */}
        <div className="relative aspect-[3/4] overflow-hidden bg-sand/30">
          {!imgLoaded && (
            <div className="absolute inset-0 animate-pulse bg-sand/50" />
          )}
          <img
            src={product.image}
            alt={lang === "ar" ? product.nameAr : product.name}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
          />

          {/* Fragrance Color Dot */}
          <div
            className="absolute top-3 left-3 w-3 h-3 rounded-full border border-white/50 shadow-sm"
            style={{ backgroundColor: product.color }}
          />

          {/* Wishlist Button */}
          <motion.button
            whileTap={{ scale: 1.3 }}
            onClick={handleWishlist}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-ivory/80 backdrop-blur-sm flex items-center justify-center shadow-sm transition-colors hover:bg-ivory"
            aria-label="Wishlist"
          >
            <Heart
              size={18}
              className={
                wishlisted ? "fill-gold text-gold" : "text-oud/60"
              }
            />
          </motion.button>

          {/* Overlay on hover */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={() => setQuickView(product.id)}
              className="w-full py-2 bg-white/90 text-oud text-sm font-medium rounded hover:bg-white transition-colors"
            >
              {t("shop.quickView")}
            </button>
          </div>
        </div>

        {/* Info Area */}
        <div className="p-4">
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-display text-lg font-bold text-oud text-center hover:text-gold transition-colors">
              {lang === "ar" ? product.nameAr : product.name}
            </h3>
          </Link>
          <p className="text-xs text-sand text-center mt-1">
            {t("shop.size")}
          </p>
          <p className="text-xs text-oud/50 text-center mt-0.5">
            {t("shop.brand")}
          </p>
          <p className="text-xs text-gold text-center mt-0.5 flex items-center justify-center gap-1">
            {t("shop.tagline")} 🌬️
          </p>
          <p className="text-sm font-bold text-gold text-center mt-2">
            EGP {product.price.toLocaleString()}
          </p>

          {/* Actions */}
          <div className="mt-3">
            <AnimatePresence mode="wait">
              {!flipped ? (
                <motion.button
                  key="add-btn"
                  initial={{ rotateY: 0 }}
                  exit={{ rotateY: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setFlipped(true)}
                  className="w-full py-2.5 bg-gold text-oud font-bold text-sm rounded hover:bg-[#B89850] transition-colors duration-300"
                >
                  {t("shop.addToCart")}
                </motion.button>
              ) : (
                <motion.div
                  key="qty-panel"
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <div className="flex items-center border border-gold/40 rounded overflow-hidden">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-8 h-8 flex items-center justify-center text-oud hover:bg-sand/50 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 h-8 flex items-center justify-center text-sm font-bold text-oud">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="w-8 h-8 flex items-center justify-center text-oud hover:bg-sand/50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAdd}
                    className="flex-1 py-2 bg-gold text-oud font-bold text-sm rounded hover:bg-[#B89850] transition-colors"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => setFlipped(false)}
                    className="w-8 h-8 flex items-center justify-center text-oud/60 hover:text-oud transition-colors"
                  >
                    ✕
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
