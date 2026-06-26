import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import gsap from "gsap";

export function HeroSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const els = contentRef.current.children;
    gsap.fromTo(
      els,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.25,
        ease: "power2.out",
        delay: 0.3,
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-center justify-center"
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/sections/hero-poster.webp"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-bg.webm" type="video/webm" />
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black/50 via-deep-black/40 to-deep-black/60" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-4 max-w-3xl mx-auto"
      >
        <p className="text-gold text-xs md:text-sm uppercase tracking-[4px] font-medium mb-6">
          {t("hero.eyebrow")}
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
          {t("hero.headline")}
        </h1>
        <p className="text-white/80 text-base md:text-lg lg:text-xl mt-6 max-w-xl mx-auto leading-relaxed">
          {t("hero.subheadline")}
        </p>
        <Link
          to="/shop"
          className="inline-block mt-10 px-10 py-4 bg-gold text-oud font-bold rounded hover:bg-[#B89850] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          {t("hero.cta")}
        </Link>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <ChevronDown size={28} className="text-white/60" />
      </div>
    </section>
  );
}
