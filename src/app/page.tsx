import { Hero } from "@/components/sections/Hero";
import { WhyMudiu } from "@/components/sections/WhyMudiu";
import { SolutionsPreview } from "@/components/sections/SolutionsPreview";
import { ProductsPreview } from "@/components/sections/ProductsPreview";
import { Methodology } from "@/components/sections/Methodology";
import { Testimonials } from "@/components/sections/Testimonials";
import { KnowledgePreview } from "@/components/sections/KnowledgePreview";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyMudiu />
      <SolutionsPreview />
      <ProductsPreview />
      <Methodology />
      <Testimonials />
      <KnowledgePreview />
      <CTASection />
    </>
  );
}
