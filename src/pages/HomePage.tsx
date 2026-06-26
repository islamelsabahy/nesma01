import { SEO } from "@/components/SEO";
import { HeroSection } from "@/sections/HeroSection";
import { OurStorySection } from "@/sections/OurStorySection";
import { BestSellersSection } from "@/sections/BestSellersSection";
import { IngredientSection } from "@/sections/IngredientSection";
import { BlendingSection } from "@/sections/BlendingSection";
import { PackagingSection } from "@/sections/PackagingSection";
import { GiftSetsSection } from "@/sections/GiftSetsSection";
import { WhyChooseSection } from "@/sections/WhyChooseSection";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { NewsletterSection } from "@/sections/NewsletterSection";

export function HomePage() {
  return (
    <>
      <SEO
        title="NESMA Perfumes — Feel the Breeze"
        description="Luxury Arabian fragrances, elegant gift sets, and long-lasting perfumes crafted for memorable moments across Egypt."
        canonical="/"
      />
      <HeroSection />
      <OurStorySection />
      <BestSellersSection />
      <IngredientSection />
      <BlendingSection />
      <PackagingSection />
      <GiftSetsSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
