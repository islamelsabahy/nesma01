import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLanguage } from "@/hooks/useLanguage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const schema = z.object({
  email: z.string().email(),
});

type FormData = z.infer<typeof schema>;

export function NewsletterSection() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.children[0].children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      }
    );
  }, []);

  const onSubmit = () => {
    setSubmitted(true);
  };

  return (
    <section ref={sectionRef} className="bg-deep-black py-20 lg:py-24">
      <div className="container-main max-w-2xl text-center">
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white">
          {t("newsletter.title")}
        </h2>
        <p className="text-white/60 text-base md:text-lg mt-4">
          {t("newsletter.subtitle")}
        </p>

        {submitted ? (
          <p className="text-success mt-8 text-lg font-medium">
            {t("newsletter.success")}
          </p>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <div className="flex-1">
              <input
                {...register("email")}
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="w-full px-5 py-3.5 bg-transparent border border-gold text-white placeholder:text-white/40 rounded focus:border-gold-bright focus:outline-none transition-colors"
              />
              {errors.email && (
                <p className="text-error text-xs mt-1 text-left">
                  Invalid email address
                </p>
              )}
            </div>
            <button
              type="submit"
              className="px-8 py-3.5 bg-gold text-oud font-bold rounded hover:bg-[#B89850] transition-colors whitespace-nowrap"
            >
              {t("newsletter.button")}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
