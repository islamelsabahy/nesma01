import { useRef, useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { SectionTitle } from "@/components/SectionTitle";
import { testimonials } from "@/data/testimonials";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function TestimonialsSection() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".testimonial-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      }
    );
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = 360 + 24;
    const idx = Math.round(scrollLeft / cardWidth);
    setActiveDot(Math.min(idx, testimonials.length - 1));
  };

  const scrollTo = (idx: number) => {
    if (!scrollRef.current) return;
    const cardWidth = 360 + 24;
    scrollRef.current.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="section-padding bg-ivory">
      <div className="container-main">
        <SectionTitle eyebrow={t("testimonials.eyebrow")} title={t("testimonials.title")} />

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card min-w-[300px] md:min-w-[360px] bg-white border border-gold-light rounded-lg p-8 snap-start"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-gold text-gold" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-oud/80 text-base leading-relaxed italic">
                &ldquo;{lang === "ar" ? testimonial.quote.ar : testimonial.quote.en}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-6">
                <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center text-oud font-bold text-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-oud text-sm">{testimonial.name}</p>
                  <p className="text-xs text-oud/50">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                idx === activeDot ? "bg-gold" : "bg-gold/30"
              }`}
              aria-label={`Testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
