import { Link } from "react-router-dom";
import { X, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { useCartStore } from "@/stores/useCartStore";

export function CartDrawer() {
  const { t, isRTL } = useLanguage();
  const { items, isOpen, closeDrawer, removeItem, updateQuantity, getTotalPrice, getCartProducts } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-backdrop bg-deep-black/50"
            onClick={closeDrawer}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: isRTL ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? "-100%" : "100%" }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className={`fixed top-0 ${
              isRTL ? "left-0" : "right-0"
            } h-full w-full max-w-[420px] bg-ivory z-cart shadow-2xl flex flex-col`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gold/20">
              <h2 className="font-display text-xl font-bold text-oud">
                {t("cart.title")}
              </h2>
              <button
                onClick={closeDrawer}
                className="p-2 text-oud hover:text-gold transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-oud/50">
                  <p className="text-lg">{t("cart.empty")}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {getCartProducts().map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex gap-4 p-3 bg-white rounded-lg border border-gold/10"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-bold text-oud text-sm truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs text-sand mt-0.5">
                          EGP {product.price.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-gold/30 rounded overflow-hidden">
                            <button
                              onClick={() =>
                                updateQuantity(product.id, quantity - 1)
                              }
                              className="w-6 h-6 flex items-center justify-center hover:bg-sand/50"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-6 h-6 flex items-center justify-center text-xs font-bold">
                              {quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(product.id, quantity + 1)
                              }
                              className="w-6 h-6 flex items-center justify-center hover:bg-sand/50"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(product.id)}
                            className="text-xs text-error hover:underline"
                          >
                            {t("cart.remove")}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t border-gold/20 bg-white/50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-oud font-medium">{t("cart.subtotal")}</span>
                  <span className="font-display font-bold text-gold text-lg">
                    EGP {getTotalPrice().toLocaleString()}
                  </span>
                </div>
                <Link to="/checkout" onClick={closeDrawer} className="block text-center w-full py-3 bg-gold text-oud font-bold rounded hover:bg-[#B89850] transition-colors">
                  {t("cart.checkout")}
                </Link>
                <button
                  onClick={() => {
                    closeDrawer();
                  }}
                  className="w-full py-2 mt-2 text-sm text-oud/60 hover:text-gold transition-colors"
                >
                  {t("cart.continue")}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
