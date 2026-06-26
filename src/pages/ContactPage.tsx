import { useState, type FormEvent } from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/hooks/useLanguage";
import { buildWhatsAppUrl } from "@/utils/whatsapp";
import { trackEvent } from "@/utils/tracking";

export function ContactPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = `Hello NESMA Perfumes,\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;
    trackEvent("contact_whatsapp_submit", { source: "contact_page" });
    window.open(buildWhatsAppUrl(text), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <SEO
        title={isAr ? "تواصل معنا" : "Contact NESMA Perfumes"}
        description={isAr ? "تواصل مع نسمة للعطور للاستفسار عن المنتجات، الهدايا، الشحن، وطلبات الشركات." : "Contact NESMA Perfumes for products, gifts, shipping, and corporate orders."}
        canonical="/contact"
      />
      <main className="bg-ivory pt-28">
        <section className="container-main section-padding grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
          <div>
            <p className="text-gold text-xs uppercase tracking-[4px] mb-4">{isAr ? "تواصل" : "Contact"}</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-oud">
              {isAr ? "نساعدك تختار العطر المناسب" : "We help you choose the right scent"}
            </h1>
            <p className="mt-5 text-oud/70 leading-8">
              {isAr
                ? "ابعتلنا طلبك أو المناسبة المطلوبة، وفريق نسمة هيرشح لك الاختيار الأنسب بسرعة."
                : "Send us your request or occasion, and the NESMA team will recommend the best option quickly."}
            </p>

            <div className="mt-8 space-y-4">
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 rounded-xl bg-white border border-gold/20 p-4 text-oud hover:border-gold transition-colors">
                <Phone className="text-gold" size={20} /> {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 rounded-xl bg-white border border-gold/20 p-4 text-oud hover:border-gold transition-colors">
                <Mail className="text-gold" size={20} /> {siteConfig.email}
              </a>
              <a href={buildWhatsAppUrl("Hello NESMA Perfumes, I need help choosing a perfume.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl bg-white border border-gold/20 p-4 text-oud hover:border-gold transition-colors">
                <MessageCircle className="text-gold" size={20} /> WhatsApp
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl bg-white border border-gold/20 p-6 md:p-8 shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-bold text-oud mb-2">{isAr ? "الاسم" : "Name"}</label>
              <input required value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-lg border border-gold/25 bg-ivory px-4 py-3 outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block text-sm font-bold text-oud mb-2">{isAr ? "رقم الموبايل" : "Phone"}</label>
              <input required value={phone} onChange={(event) => setPhone(event.target.value)} className="w-full rounded-lg border border-gold/25 bg-ivory px-4 py-3 outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block text-sm font-bold text-oud mb-2">{isAr ? "رسالتك" : "Message"}</label>
              <textarea required rows={5} value={message} onChange={(event) => setMessage(event.target.value)} className="w-full rounded-lg border border-gold/25 bg-ivory px-4 py-3 outline-none focus:border-gold" />
            </div>
            <button className="w-full rounded-lg bg-gold py-3 font-bold text-oud hover:bg-[#B89850] transition-colors" type="submit">
              {isAr ? "إرسال عبر واتساب" : "Send via WhatsApp"}
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
