import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { QuickViewModal } from "@/components/QuickViewModal";
import { WindParticleCanvas } from "@/components/WindParticleCanvas";
import { Toast } from "@/components/Toast";
import { SearchModal } from "@/components/SearchModal";
import { Analytics } from "@/components/Analytics";
import { HomePage } from "@/pages/HomePage";
import { ShopPage } from "@/pages/ShopPage";
import { WishlistPage } from "@/pages/WishlistPage";
import { ProductPage } from "@/pages/ProductPage";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { LegalPage } from "@/pages/LegalPage";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, hash]);
  return null;
}

function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppUrl("Hello NESMA Perfumes, I need help choosing a perfume.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      aria-label={`WhatsApp ${siteConfig.brand}`}
    >
      <MessageCircle size={26} className="text-white" />
    </a>
  );
}

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/:slug" element={<LegalPage />} />
        </Routes>
      </main>
      <CartDrawer />
      <QuickViewModal />
      <SearchModal />
      <Analytics />
      <WindParticleCanvas />
      <Toast />
      <FloatingWhatsApp />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
