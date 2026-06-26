import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/sections/ProductGrid";
import { SEO } from "@/components/SEO";
import { products } from "@/data/products";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { useCartStore } from "@/stores/useCartStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { useUIStore } from "@/stores/useUIStore";
import { trackEvent } from "@/utils/tracking";

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLanguage();
  const { addItem, openDrawer } = useCartStore();
  const { isWishlisted, toggle } = useWishlistStore();
  const { showToast } = useUIStore();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((item) => item.id === id);
  const relatedProducts = useMemo(() => {
    if (!product) return products.slice(0, 4);
    return products
      .filter((item) => item.id !== product.id && item.fragranceFamily === product.fragranceFamily)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <>
        <SEO title="Product not found" description="The requested NESMA perfume could not be found." canonical="/shop" />
        <main className="min-h-screen bg-ivory pt-32 pb-20">
          <div className="container-main text-center">
            <h1 className="font-display text-4xl font-bold text-oud">{lang === "ar" ? "العطر غير موجود" : "Product not found"}</h1>
            <Link to="/shop" className="inline-block mt-6 rounded bg-gold px-6 py-3 font-bold text-oud">
              {lang === "ar" ? "الرجوع للمتجر" : "Back to shop"}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const name = lang === "ar" ? product.nameAr : product.name;
  const description = lang === "ar" ? product.description.ar : product.description.en;
  const wishlisted = isWishlisted(product.id);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image: `${siteConfig.url}${product.image}`,
    description,
    brand: { "@type": "Brand", name: siteConfig.brand },
    offers: {
      "@type": "Offer",
      priceCurrency: siteConfig.currency,
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/product/${product.id}`,
    },
  };

  const addToCart = () => {
    addItem(product.id, quantity);
    trackEvent("add_to_cart", { item_id: product.id, value: product.price * quantity, currency: siteConfig.currency });
    showToast(t("toast.addedToCart"));
    openDrawer();
  };

  const noteGroups = [
    [t("quickView.top"), product.notes.top],
    [t("quickView.middle"), product.notes.middle],
    [t("quickView.base"), product.notes.base],
  ];

  return (
    <>
      <SEO title={`${name} - ${product.size}`} description={description} canonical={`/product/${product.id}`} image={product.image} schema={schema} />
      <main className="bg-ivory pt-28">
        <section className="container-main py-10 lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="rounded-3xl overflow-hidden bg-sand/30 border border-gold/20 sticky top-28">
            <img src={product.image} alt={name} className="w-full aspect-[4/5] object-cover" />
          </div>

          <div className="rounded-3xl bg-white border border-gold/20 p-6 md:p-8 shadow-sm">
            <p className="text-gold text-xs uppercase tracking-[4px] mb-3">{lang === "ar" ? product.categoryAr : product.category}</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-oud">{name}</h1>
            <p className="mt-3 text-sm text-sand">{product.size} · {siteConfig.tagline}</p>
            <p className="mt-5 font-display text-3xl text-gold font-bold">EGP {product.price.toLocaleString()}</p>
            <p className="mt-5 text-oud/70 leading-8">{description}</p>

            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              {noteGroups.map(([label, notes]) => (
                <div key={label as string} className="rounded-2xl bg-ivory border border-gold/20 p-4">
                  <h2 className="text-xs font-bold text-oud uppercase tracking-wider mb-3">{label}</h2>
                  <div className="flex flex-wrap gap-2">
                    {(notes as string[]).map((note) => (
                      <span key={note} className="text-xs px-2.5 py-1 rounded-full border border-gold/30 text-oud/70">{note}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <div className="flex items-center border border-gold/40 rounded-lg overflow-hidden bg-ivory">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-sand/50" aria-label="Decrease quantity">
                  <Minus size={16} />
                </button>
                <span className="w-12 h-12 flex items-center justify-center font-bold text-oud">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center hover:bg-sand/50" aria-label="Increase quantity">
                  <Plus size={16} />
                </button>
              </div>
              <button onClick={addToCart} className="flex-1 rounded-lg bg-gold py-3 font-bold text-oud hover:bg-[#B89850] transition-colors flex items-center justify-center gap-2">
                <ShoppingBag size={18} /> {t("shop.addToCart")}
              </button>
              <button
                onClick={() => {
                  toggle(product.id);
                  showToast(wishlisted ? t("toast.removedFromWishlist") : t("toast.addedToWishlist"));
                }}
                className="rounded-lg border-2 border-gold px-5 py-3 font-bold text-gold hover:bg-gold hover:text-oud transition-colors flex items-center justify-center gap-2"
              >
                <Heart size={18} className={wishlisted ? "fill-gold" : ""} /> {t("quickView.wishlist")}
              </button>
            </div>

            <div className="mt-6 rounded-2xl bg-ivory border border-gold/20 p-4 text-sm text-oud/70 leading-7">
              {lang === "ar" ? "التوصيل داخل مصر خلال 2 إلى 5 أيام عمل. الدفع متاح عند الاستلام أو InstaPay حسب تأكيد الطلب." : "Delivery across Egypt within 2 to 5 business days. Cash on delivery and InstaPay are available after order confirmation."}
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="container-main pb-20">
            <h2 className="font-display text-3xl font-bold text-oud mb-6">{lang === "ar" ? "عطور مشابهة" : "You may also like"}</h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
