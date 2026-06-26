import { useRef, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { SectionTitle } from "@/components/SectionTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const gifts = [
  { key: "birthday", img: "/images/sections/gift-birthday.jpg" },
  { key: "wedding", img: "/images/sections/gift-wedding.jpg" },
  { key: "engagement", img: "/images/sections/gift-engagement.jpg" },
  { key: "corporate", img: "/images/sections/gift-corporate.jpg" },
];

export function GiftSetsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".gift-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="giftsets" className="section-padding bg-ivory">
      <div className="container-main">
        <SectionTitle eyebrow={t("giftSets.eyebrow")} title={t("giftSets.title")} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gifts.map((gift) => (
            <div
              key={gift.key}
              className="gift-card bg-ivory border border-gold-light rounded-lg overflow-hidden group hover:border-gold-dark hover:shadow-[0_8px_24px_rgba(26,26,26,0.08)] transition-all duration-300"
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={gift.img}
                  alt={t(`giftSets.${gift.key}.title` as const)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-display text-lg font-bold text-oud">
                  {t(`giftSets.${gift.key}.title` as const)}
                </h3>
                <p className="text-sm text-oud/60 mt-2">
                  {t(`giftSets.${gift.key}.desc` as const)}
                </p>
                <span className="inline-block mt-3 text-sm text-gold font-medium hover:underline cursor-pointer">
                  {t("giftSets.cta")} →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
