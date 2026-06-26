import { useMemo } from "react";
import { SEO } from "@/components/SEO";
import { Heart } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { ProductCard } from "@/components/ProductCard";
import { Footer } from "@/components/Footer";
import { products } from "@/data/products";
import { useWishlistStore } from "@/stores/useWishlistStore";

export function WishlistPage() {
  const { t, lang } = useLanguage();
  const { productIds } = useWishlistStore();

  const wishlistedProducts = useMemo(
    () => products.filter((p) => productIds.includes(p.id)),
    [productIds]
  );

  return (
    <>
      <SEO title={lang === "ar" ? "المفضلة" : "Wishlist"} description="Saved NESMA Perfumes wishlist." canonical="/wishlist" />
      <div className="pt-24 pb-20 bg-ivory min-h-screen">
        <div className="container-main">
          <div className="text-center mb-12">
            <Heart size={32} className="text-gold mx-auto mb-4" />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-oud">
              {t("nav.perfumes")} — {t("nav.bestsellers")}
            </h1>
            <p className="text-oud/60 mt-2">
              {wishlistedProducts.length} {t("shop.results")}
            </p>
          </div>

          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-20">
              <Heart size={48} className="text-gold/30 mx-auto mb-4" />
              <p className="text-oud/50 text-lg">
                {t("toast.removedFromWishlist")}
              </p>
              <p className="text-oud/40 mt-2">{lang === "ar" ? "قائمة المفضلة فارغة" : "Your wishlist is empty"}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
              {wishlistedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
