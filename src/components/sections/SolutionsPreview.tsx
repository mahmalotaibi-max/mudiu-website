import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { serviceCategories, getServicesByCategory } from "@/content/solutions";

export function SolutionsPreview() {
  return (
    <section className="bg-paper-alt py-24 md:py-32">
      <Container>
        <RevealOnScroll className="max-w-xl">
          <Eyebrow>الخدمات</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            محفظة مُضيّ: ست ركائز في نظام واحد
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            لا نقدّم خدمات منفصلة. كل ركيزة تُبنى على ما قبلها في رحلة واحدة نحو الأثر.
          </p>
        </RevealOnScroll>

        <div className="mt-16 flex flex-col divide-y divide-line border-t border-line">
          {serviceCategories.map((category, i) => {
            const firstService = getServicesByCategory(category.key)[0];
            return (
              <RevealOnScroll key={category.key} delay={i * 80}>
                <Link
                  href={`/solutions/${firstService.slug}`}
                  className="group flex flex-col gap-3 py-8 transition-colors md:flex-row md:items-baseline md:gap-14"
                >
                  <span className="shrink-0 text-sm font-medium text-orange md:w-16">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="shrink-0 md:w-64">
                    <h3 className="text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-navy md:text-2xl">
                      {category.label}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-orange">{category.shift}</p>
                  </div>
                  <p className="max-w-xl text-sm leading-relaxed text-muted md:text-base">
                    {category.description}
                  </p>
                  <ArrowLeft
                    className="mt-1 size-4 shrink-0 text-ink transition-transform duration-300 group-hover:-translate-x-1 md:ms-auto"
                    aria-hidden
                  />
                </Link>
              </RevealOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
