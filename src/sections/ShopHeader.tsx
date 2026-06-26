import { useLanguage } from "@/hooks/useLanguage";

export function ShopHeader() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-deep-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <p className="text-white/60 text-xs tracking-wider mb-3">
          <span className="text-gold">{t("nav.home")}</span>
          <span className="mx-2">/</span>
          <span>{t("nav.perfumes")}</span>
        </p>
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          {t("shop.title")}
        </h1>
      </div>
    </section>
  );
}
