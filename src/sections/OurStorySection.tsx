import { useRef, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { SectionTitle } from "@/components/SectionTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function OurStorySection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imgRef.current || !textRef.current) return;

    gsap.fromTo(
      imgRef.current,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      }
    );
    gsap.fromTo(
      textRef.current,
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="ourstory" className="section-padding bg-ivory">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Image */}
          <div ref={imgRef} className="w-full lg:w-1/2">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <img
                src="/images/sections/our-story.jpg"
                alt="Our Story"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div ref={textRef} className="w-full lg:w-1/2">
            <SectionTitle eyebrow={t("ourStory.eyebrow")} title={t("ourStory.title")} />
            <p className="text-oud/80 text-base md:text-lg leading-[1.8] mt-4">
              {t("ourStory.body")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
