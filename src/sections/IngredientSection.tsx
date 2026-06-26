import { useRef, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function IngredientSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imgRef.current || !textRef.current) return;

    gsap.to(imgRef.current, {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.fromTo(
      textRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%", once: true },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <div ref={imgRef} className="absolute inset-0 -top-[10%] -bottom-[10%]">
        <img
          src="/images/sections/ingredients-bg.jpg"
          alt="Ingredients"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-deep-black/55" />

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-10 text-center px-4 max-w-2xl mx-auto"
      >
        <span className="font-display text-[100px] md:text-[140px] text-gold/20 font-light leading-none select-none">
          {t("process.ingredient.step")}
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white -mt-8">
          {t("process.ingredient.title")}
        </h2>
        <p className="text-white/80 text-base md:text-lg mt-6 leading-relaxed">
          {t("process.ingredient.desc")}
        </p>
      </div>
    </section>
  );
}
