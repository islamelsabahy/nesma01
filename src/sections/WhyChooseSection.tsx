import { useRef, useEffect } from "react";
import { Leaf, Star, Heart, Truck } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { SectionTitle } from "@/components/SectionTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { key: "premium", icon: Leaf },
  { key: "lasting", icon: Star },
  { key: "handcrafted", icon: Heart },
  { key: "delivery", icon: Truck },
];

export function WhyChooseSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".feature-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-sand">
      <div className="container-main">
        <SectionTitle eyebrow={t("whyChoose.eyebrow")} title={t("whyChoose.title")} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.key}
                className="feature-card bg-ivory rounded-lg p-8 text-center hover:-translate-y-2 hover:shadow-[0_12px_32px_rgba(26,26,26,0.1)] transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-gold/10 flex items-center justify-center">
                  <Icon size={26} className="text-gold" />
                </div>
                <h3 className="font-display text-lg font-bold text-oud mt-5">
                  {t(`whyChoose.cards.${feature.key}.title` as const)}
                </h3>
                <p className="text-sm text-oud/60 mt-3 leading-relaxed">
                  {t(`whyChoose.cards.${feature.key}.desc` as const)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
