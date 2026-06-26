import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";

export function AboutPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <>
      <SEO
        title={isAr ? "قصة نسمة للعطور" : "About NESMA Perfumes"}
        description={isAr ? "تعرف على قصة نسمة للعطور: عطور عربية فاخرة، تعبئة راقية، وتجربة هدايا مصممة للذوق المصري والعربي." : "Discover NESMA Perfumes: luxury Arabian fragrances, elegant gifting, and long-lasting scents crafted for memorable moments."}
        canonical="/about"
      />
      <main className="bg-ivory pt-28">
        <section className="container-main section-padding grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-gold text-xs uppercase tracking-[4px] mb-4">{isAr ? "قصتنا" : "Our Story"}</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-oud leading-tight">
              {isAr ? "عطر له شخصية... وهدية لها معنى" : "A scent with character. A gift with meaning."}
            </h1>
            <p className="mt-6 text-oud/70 leading-8">
              {isAr
                ? "نسمة للعطور اتبنت على فكرة بسيطة: العميل لا يشتري رائحة فقط، بل يشتري إحساساً وتوقيعاً شخصياً يظل حاضراً. لذلك نهتم باختيار النوتات، ثبات العطر، شكل الزجاجة، وتجربة التغليف من أول لحظة حتى وصول الطلب."
                : "NESMA Perfumes was built around a simple idea: a customer does not buy a scent only, but a feeling and a personal signature. That is why we care about notes, longevity, bottle presentation, and the full gifting experience from first click to delivery."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="px-6 py-3 bg-gold text-oud rounded font-bold hover:bg-[#B89850] transition-colors">
                {isAr ? "تسوق العطور" : "Shop perfumes"}
              </Link>
              <Link to="/contact" className="px-6 py-3 border border-gold text-gold rounded font-bold hover:bg-gold hover:text-oud transition-colors">
                {isAr ? "تواصل معنا" : "Contact us"}
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="/images/sections/our-story.jpg" alt="NESMA perfume story" className="rounded-2xl object-cover h-80 w-full" loading="lazy" />
            <img src="/images/sections/packaging.jpg" alt="Luxury perfume packaging" className="rounded-2xl object-cover h-80 w-full mt-10" loading="lazy" />
          </div>
        </section>

        <section className="container-main pb-20 grid md:grid-cols-3 gap-5">
          {[
            [isAr ? "اختيار ذكي للنوتات" : "Curated notes", isAr ? "نوازن بين الفخامة، الثبات، والقبول اليومي." : "Balanced for luxury, longevity, and everyday appeal."],
            [isAr ? "تجربة هدايا" : "Gifting experience", isAr ? "تغليف مناسب للمناسبات الشخصية والشركات." : "Packaging designed for personal and corporate gifting."],
            [isAr ? "طلب سريع" : "Fast ordering", isAr ? "اطلب مباشرة عبر الموقع أو واتساب بخطوة واحدة." : "Order directly through the website or WhatsApp in one step."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl bg-white border border-gold/20 p-6">
              <h2 className="font-display text-xl font-bold text-oud">{title}</h2>
              <p className="mt-3 text-sm text-oud/65 leading-7">{body}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
