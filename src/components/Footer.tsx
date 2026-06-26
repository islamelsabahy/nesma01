import { useState } from "react";
import { Link } from "react-router-dom";
import { Wind, Phone, Mail, MessageCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useUIStore } from "@/stores/useUIStore";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

export function Footer() {
  const { t, isRTL, lang } = useLanguage();
  const { activateEasterEgg } = useUIStore();
  const [breezeMsg, setBreezeMsg] = useState(false);

  const handleBreeze = () => {
    activateEasterEgg();
    setBreezeMsg(true);
    setTimeout(() => setBreezeMsg(false), 3000);
    setTimeout(() => useUIStore.getState().deactivateEasterEgg(), 3500);
  };

  const serviceLinks = [
    { to: "/shipping-policy", label: t("footer.shipping") },
    { to: "/return-policy", label: t("footer.returns") },
    { to: "/faq", label: t("footer.faq") },
    { to: "/terms", label: t("footer.terms") },
    { to: "/privacy-policy", label: t("footer.privacy") },
  ];

  return (
    <footer id="footer" className="bg-deep-black border-t border-gold/20">
      <div className="container-main py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div>
            <div className="flex flex-col mb-4">
              <span className="font-display text-2xl font-bold text-gold tracking-wider">NESMA</span>
              <span className="text-xs text-white/50 uppercase tracking-[3px] -mt-1">Perfumes</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-[280px]">
              {lang === "ar"
                ? "عطور عربية فاخرة مصممة لتترك أثراً راقياً وتجربة هدايا لا تُنسى."
                : "Luxury Arabian fragrances crafted to leave a lasting impression. Feel the breeze of elegance."}
            </p>
          </div>

          <div>
            <h4 className="text-xs text-white uppercase tracking-[1px] font-medium mb-5">{t("footer.quickLinks")}</h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: t("nav.home") },
                { to: "/shop", label: t("nav.perfumes") },
                { to: "/about", label: t("nav.ourStory") },
                { to: "/checkout", label: t("cart.checkout") },
                { to: "/contact", label: t("nav.contact") },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs text-white uppercase tracking-[1px] font-medium mb-5">{t("footer.customerService")}</h4>
            <ul className="space-y-3">
              {serviceLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-white/60 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs text-white uppercase tracking-[1px] font-medium mb-5">{t("footer.contactUs")}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Phone size={14} className="text-gold" />
                {siteConfig.phone}
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Mail size={14} className="text-gold" />
                <a href={`mailto:${siteConfig.email}`} className="text-xs break-all hover:text-white transition-colors">{siteConfig.email}</a>
              </li>
              <li>
                <a
                  href={buildWhatsAppUrl("Hello NESMA Perfumes, I need help choosing a perfume.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-green-400 transition-colors"
                >
                  <MessageCircle size={14} className="text-gold" />
                  WhatsApp: {siteConfig.phone}
                </a>
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 border border-gold/30 text-gold/70 rounded-full">{t("footer.payment")}</span>
              <span className="text-xs px-3 py-1 border border-gold/30 text-gold/70 rounded-full">{t("footer.instapay")}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gold/20 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">{t("footer.copyright")}</p>

          <div className="relative">
            <button onClick={handleBreeze} className="p-2 text-gold/50 hover:text-gold transition-all duration-300 hover:scale-110" aria-label="Breeze">
              <Wind size={24} />
            </button>
            {breezeMsg && (
              <div className={`absolute bottom-full mb-2 ${isRTL ? "left-1/2" : "right-1/2"} translate-x-1/2 whitespace-nowrap bg-ivory px-4 py-2 rounded-lg shadow-lg border border-gold/30`}>
                <p className="text-sm text-gold font-medium">{t("footer.breeze")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
