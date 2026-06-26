import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { useCartStore } from "@/stores/useCartStore";
import { useUIStore } from "@/stores/useUIStore";
import { buildWhatsAppUrl, createCartMessage, type CartProductLine, type CustomerOrderDetails } from "@/utils/whatsapp";
import { trackEvent } from "@/utils/tracking";

export function CheckoutPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const { getCartProducts, getTotalPrice } = useCartStore();
  const { showToast } = useUIStore();
  const cartLines: CartProductLine[] = getCartProducts();
  const total = getTotalPrice();
  const [details, setDetails] = useState<CustomerOrderDetails>({
    name: "",
    phone: "",
    address: "",
    governorate: "",
    paymentMethod: isAr ? "الدفع عند الاستلام" : "Cash on Delivery",
    notes: "",
  });

  const updateField = (field: keyof CustomerOrderDetails, value: string) => {
    setDetails((current) => ({ ...current, [field]: value }));
  };

  const submitOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (cartLines.length === 0) {
      showToast(isAr ? "السلة فارغة" : "Cart is empty", "error");
      return;
    }
    const message = createCartMessage(cartLines, total, lang, details);
    trackEvent("begin_checkout_whatsapp", { value: total, currency: siteConfig.currency, items: cartLines.length });
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <SEO
        title={isAr ? "إتمام الطلب" : "Checkout"}
        description={isAr ? "أكمل طلبك من نسمة للعطور وأرسله مباشرة عبر واتساب لتأكيد التوصيل والدفع." : "Complete your NESMA Perfumes order and send it via WhatsApp for confirmation."}
        canonical="/checkout"
      />
      <main className="bg-ivory pt-28">
        <section className="container-main py-10 lg:py-16">
          <div className="mb-8">
            <p className="text-gold text-xs uppercase tracking-[4px] mb-3">{isAr ? "طلب جديد" : "New Order"}</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-oud">{isAr ? "إتمام الطلب" : "Checkout"}</h1>
          </div>

          {cartLines.length === 0 ? (
            <div className="rounded-2xl bg-white border border-gold/20 p-10 text-center">
              <ShoppingBag size={40} className="mx-auto text-gold mb-4" />
              <p className="text-oud/70">{isAr ? "السلة فارغة حالياً." : "Your cart is empty."}</p>
              <Link to="/shop" className="inline-block mt-5 rounded bg-gold px-6 py-3 font-bold text-oud">
                {isAr ? "تسوق الآن" : "Shop now"}
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
              <form onSubmit={submitOrder} className="rounded-2xl bg-white border border-gold/20 p-6 md:p-8 shadow-sm space-y-4">
                {[
                  ["name", isAr ? "الاسم بالكامل" : "Full name"],
                  ["phone", isAr ? "رقم الموبايل" : "Phone number"],
                  ["governorate", isAr ? "المحافظة / المنطقة" : "Governorate / Area"],
                  ["address", isAr ? "العنوان بالتفصيل" : "Full address"],
                ].map(([field, label]) => (
                  <div key={field}>
                    <label className="block text-sm font-bold text-oud mb-2">{label}</label>
                    <input
                      required
                      value={details[field as keyof CustomerOrderDetails] || ""}
                      onChange={(event) => updateField(field as keyof CustomerOrderDetails, event.target.value)}
                      className="w-full rounded-lg border border-gold/25 bg-ivory px-4 py-3 outline-none focus:border-gold"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-bold text-oud mb-2">{isAr ? "طريقة الدفع" : "Payment method"}</label>
                  <select
                    value={details.paymentMethod}
                    onChange={(event) => updateField("paymentMethod", event.target.value)}
                    className="w-full rounded-lg border border-gold/25 bg-ivory px-4 py-3 outline-none focus:border-gold"
                  >
                    <option>{isAr ? "الدفع عند الاستلام" : "Cash on Delivery"}</option>
                    <option>InstaPay - {siteConfig.instaPay}</option>
                    <option>{isAr ? "تحويل فودافون كاش" : "Vodafone Cash Transfer"}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-oud mb-2">{isAr ? "ملاحظات اختيارية" : "Optional notes"}</label>
                  <textarea
                    rows={4}
                    value={details.notes}
                    onChange={(event) => updateField("notes", event.target.value)}
                    className="w-full rounded-lg border border-gold/25 bg-ivory px-4 py-3 outline-none focus:border-gold"
                    placeholder={isAr ? "مثلاً: هدية / ميعاد توصيل مناسب / رسالة داخل الكارت" : "Example: gift order, preferred delivery time, card message"}
                  />
                </div>

                <button type="submit" className="w-full rounded-lg bg-green-500 py-3 font-bold text-white hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                  <MessageCircle size={18} /> {isAr ? "إرسال الطلب على واتساب" : "Send order on WhatsApp"}
                </button>
              </form>

              <aside className="rounded-2xl bg-white border border-gold/20 p-6 shadow-sm sticky top-28">
                <h2 className="font-display text-2xl font-bold text-oud mb-5">{isAr ? "ملخص الطلب" : "Order summary"}</h2>
                <div className="space-y-4">
                  {cartLines.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-3 border-b border-gold/10 pb-4">
                      <img src={product.image} alt={product.name} className="h-16 w-16 rounded object-cover" loading="lazy" />
                      <div className="flex-1">
                        <p className="font-bold text-oud text-sm">{isAr ? product.nameAr : product.name}</p>
                        <p className="text-xs text-oud/50">{quantity} × EGP {product.price.toLocaleString()}</p>
                      </div>
                      <p className="text-sm font-bold text-gold">EGP {(product.price * quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex justify-between items-center text-lg">
                  <span className="font-bold text-oud">{isAr ? "الإجمالي" : "Total"}</span>
                  <span className="font-display text-2xl font-bold text-gold">EGP {total.toLocaleString()}</span>
                </div>
                <p className="mt-4 text-xs text-oud/50 leading-6">
                  {isAr ? siteConfig.deliveryEstimateAr : siteConfig.deliveryEstimateEn}. {isAr ? "سيتم تأكيد تكلفة الشحن قبل إرسال الطلب." : "Shipping cost will be confirmed before dispatch."}
                </p>
              </aside>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
