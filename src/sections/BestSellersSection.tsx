import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { SectionTitle } from "@/components/SectionTitle";
import { ProductCard } from "@/components/ProductCard";
import { bestsellers } from "@/data/products";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function BestSellersSection() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = scrollRef.current?.children;
    if (!cards) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      }
    );
  }, []);

  const scroll = (dir: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.children[0]?.clientWidth || 300;
    scrollRef.current.scrollBy({
      left: dir * (cardWidth + 24),
      behavior: "smooth",
    });
  };

  return (
    <section ref={sectionRef} id="bestsellers" className="section-padding bg-ivory">
      <div className="container-main">
        <SectionTitle eyebrow={t("bestsellers.eyebrow")} title={t("bestsellers.title")} />

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll(isRTL ? 1 : -1)}
            className="absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gold bg-ivory/90 flex items-center justify-center hover:bg-gold hover:text-oud transition-all shadow-md"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll(isRTL ? -1 : 1)}
            className="absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gold bg-ivory/90 flex items-center justify-center hover:bg-gold hover:text-oud transition-all shadow-md"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>

          {/* Cards */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-4 pb-4 scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {bestsellers.map((product) => (
              <div
                key={product.id}
                className="min-w-[260px] md:min-w-[300px] lg:min-w-[320px] snap-start"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
