import { useRef, useEffect } from "react";
import { Diamond } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  className?: string;
  light?: boolean;
}

export function SectionTitle({ eyebrow, title, className = "", light = false }: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    gsap.fromTo(
      el.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <div ref={ref} className={`text-center mb-12 lg:mb-16 ${className}`}>
      <p
        className={`text-xs uppercase tracking-[3px] font-medium mb-4 ${
          light ? "text-gold" : "text-gold"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-display text-3xl md:text-4xl lg:text-[48px] font-bold leading-tight ${
          light ? "text-white" : "text-oud"
        }`}
      >
        {title}
      </h2>
      <div className="flex items-center justify-center gap-3 mt-5">
        <div className={`w-12 h-[2px] ${light ? "bg-white/30" : "bg-gold/40"}`} />
        <Diamond size={10} className={light ? "text-gold" : "text-gold"} />
        <div className={`w-12 h-[2px] ${light ? "bg-white/30" : "bg-gold/40"}`} />
      </div>
    </div>
  );
}
