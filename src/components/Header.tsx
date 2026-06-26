import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Heart, Search, Menu, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useCartStore } from "@/stores/useCartStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { useUIStore } from "@/stores/useUIStore";

export function Header() {
  const { lang, toggle, isRTL, t } = useLanguage();
  const { openDrawer, getTotalQuantity } = useCartStore();
  const { productIds } = useWishlistStore();
  const { openSearch, mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/shop", label: t("nav.perfumes") },
    { path: "/#bestsellers", label: t("nav.bestsellers") },
    { path: "/about", label: t("nav.ourStory") },
    { path: "/#giftsets", label: t("nav.giftSets") },
    { path: "/contact", label: t("nav.contact") },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-header transition-all duration-300 ${
          scrolled
            ? "bg-ivory/95 backdrop-blur-md shadow-[0_2px_12px_rgba(26,26,26,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="container-main h-20 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-oud hover:text-gold transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex flex-col items-center lg:items-start">
            <span className="font-display text-2xl font-bold text-gold tracking-wider">
              NESMA
            </span>
            <span className="text-[11px] text-oud/60 uppercase tracking-[3px] -mt-1">
              Perfumes
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors hover:text-gold ${
                  isActive(link.path) ? "text-gold" : "text-oud"
                } group`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-gold transition-transform duration-300 origin-${
                    isRTL ? "right" : "left"
                  } ${
                    isActive(link.path)
                      ? "w-full scale-x-100"
                      : "w-full scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggle}
              className="w-9 h-9 rounded-full border border-gold/40 text-gold text-xs font-bold hover:bg-gold hover:text-oud transition-all duration-300"
              aria-label="Toggle Language"
            >
              {lang === "ar" ? "EN" : "AR"}
            </button>

            {/* Search */}
            <button
              onClick={openSearch}
              className="p-2 text-oud hover:text-gold transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-oud hover:text-gold transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {productIds.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-oud text-[10px] font-bold rounded-full flex items-center justify-center">
                  {productIds.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={openDrawer}
              className="relative p-2 text-oud hover:text-gold transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {getTotalQuantity() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-oud text-[10px] font-bold rounded-full flex items-center justify-center">
                  {getTotalQuantity()}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[999] lg:hidden">
          <div
            className="absolute inset-0 bg-deep-black/50"
            onClick={closeMobileMenu}
          />
          <div
            className={`absolute top-0 ${
              isRTL ? "left-0" : "right-0"
            } h-full w-80 max-w-[85vw] bg-ivory shadow-2xl transform transition-transform duration-300`}
          >
            <div className="p-6 pt-20">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={closeMobileMenu}
                    className={`text-lg font-medium py-2 border-b border-gold/20 transition-colors hover:text-gold ${
                      isActive(link.path) ? "text-gold" : "text-oud"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
