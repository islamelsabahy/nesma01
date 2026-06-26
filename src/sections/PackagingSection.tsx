import { useRef, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    img: "/images/sections/bottle-filling.jpg",
    titleKey: "process.filling.title" as const,
    descKey: "process.filling.desc" as const,
    step: "04",
  },
  {
    img: "/images/sections/packaging.jpg",
    titleKey: "process.packaging.title" as const,
    descKey: "process.packaging.desc" as const,
    step: "05",
  },
];

export function PackagingSection() {
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
    <section ref={sectionRef} className="section-padding bg-sand">
      <div className="container-main space-y-16 lg:space-y-24">
        {steps.map((step, idx) => (
          <div
            key={step.step}
            className={`process-block flex flex-col ${
              idx % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"
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
