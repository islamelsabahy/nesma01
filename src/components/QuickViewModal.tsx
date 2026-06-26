import { useState } from "react";
import { X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import { useLanguage } from "@/hooks/useLanguage";
import { useCartStore } from "@/stores/useCartStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { useUIStore } from "@/stores/useUIStore";

export function QuickViewModal() {
  const { lang, t } = useLanguage();
  const { quickViewProductId, setQuickView, showToast } = useUIStore();
  const { addItem, openDrawer } = useCartStore();
  const { isWishlisted, toggle } = useWishlistStore();
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.id === quickViewProductId);
  const wishlisted = product ? isWishlisted(product.id) : false;

  const handleClose = () => {
    setQuickView(null);
    setQty(1);
  };

  const handleAdd = () => {
    if (product) {
      addItem(product.id, qty);
      showToast(t("toast.addedToCart"));
      handleClose();
      setTimeout(() => openDrawer(), 200);
    }
  };

  const handleWishlist = () => {
    if (product) {
      toggle(product.id);
      showToast(wishlisted ? t("toast.removedFromWishlist") : t("toast.addedToWishlist"));
    }
  };

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-deep-black/70"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative bg-ivory rounded-lg overflow-hidden max-w-[900px] w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-sand flex items-center justify-center hover:bg-gold transition-colors"
              aria-label="Close"
            >
              <X size={18} className="text-oud" />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-1/2 aspect-[3/4] md:aspect-auto md:min-h-[500px] bg-sand/30">
                <img
                  src={product.image}
                  alt={lang === "ar" ? product.nameAr : product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-oud">
                  {lang === "ar" ? product.nameAr : product.name}
                </h2>
                <p className="text-sm text-sand mt-1">{t("shop.size")}</p>
                <p className="font-display text-2xl text-gold font-bold mt-3">
                  EGP {product.price.toLocaleString()}
                </p>
                <p className="text-sm text-oud/70 mt-4 leading-relaxed">
                  {lang === "ar" ? product.description.ar : product.description.en}
                </p>

                {/* Fragrance Notes */}
                <div className="mt-5">
                  <p className="text-xs font-bold text-oud uppercase tracking-wider mb-2">
                    {t("quickView.notes")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[...product.notes.top, ...product.notes.middle, ...product.notes.base].map(
                      (note) => (
                        <span
                          key={note}
                          className="text-xs px-3 py-1 border border-gold/30 rounded-full text-oud/70"
                        >
                          {note}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Quantity + Buttons */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-oud">
                      {t("quickView.quantity")}
                    </span>
                    <div className="flex items-center border border-gold/40 rounded overflow-hidden">
                      <button
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="w-9 h-9 flex items-center justify-center hover:bg-sand/50"
                      >
                        -
                      </button>
                      <span className="w-9 h-9 flex items-center justify-center font-bold text-oud">
                        {qty}
                      </span>
                      <button
                        onClick={() => setQty(qty + 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-sand/50"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAdd}
                    className="w-full py-3 bg-gold text-oud font-bold rounded hover:bg-[#B89850] transition-colors"
                  >
                    {t("quickView.addToCart")}
                  </button>

                  <button
                    onClick={handleWishlist}
                    className="w-full py-3 border-2 border-gold text-gold font-bold rounded hover:bg-gold hover:text-oud transition-colors flex items-center justify-center gap-2"
                  >
                    <Heart
                      size={18}
                      className={wishlisted ? "fill-gold" : ""}
                    />
                    {t("quickView.wishlist")}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
