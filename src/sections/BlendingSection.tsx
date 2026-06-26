import { useRef, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    img: "/images/sections/blending.jpg",
    titleKey: "process.blending.title" as const,
    descKey: "process.blending.desc" as const,
    step: "02",
  },
  {
    img: "/images/sections/testing.jpg",
    titleKey: "process.testing.title" as const,
    descKey: "process.testing.desc" as const,
    step: "03",
  },
];

export function BlendingSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const blocks = sectionRef.current.querySelectorAll(".process-block");
    blocks.forEach((block) => {
      gsap.fromTo(
        block,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: block, start: "top 80%", once: true },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-ivory">
      <div className="container-main space-y-16 lg:space-y-24">
        {steps.map((step, idx) => (
          <div
            key={step.step}
            className={`process-block flex flex-col ${
              idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center gap-8 lg:gap-16`}
          >
            <div className="w-full lg:w-1/2">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <img
                  src={step.img}
                  alt={t(step.titleKey)}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <span className="font-display text-7xl md:text-8xl text-gold/30 font-light">
                {step.step}
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-oud -mt-4">
                {t(step.titleKey)}
              </h3>
              <p className="text-oud/70 text-base md:text-lg mt-4 leading-relaxed">
                {t(step.descKey)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
