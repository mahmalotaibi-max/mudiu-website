import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { getServicesByCategory, serviceCategories } from "@/content/solutions";

export const metadata: Metadata = {
  title: "الخدمات",
  description: "ست ركائز خدمية تجمع بين الاستشارات الاستراتيجية، بناء القدرات، والأدوات العملية.",
};

export default function SolutionsPage() {
  return (
    <>
      <section className="pt-16 pb-14 md:pt-24 md:pb-20">
        <Container>
          <RevealOnScroll className="max-w-2xl">
            <Eyebrow>الخدمات</Eyebrow>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink md:text-5xl">
              حلول مصممة لتُحرّك الأداء
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
              ست ركائز خدمية تجمع بين الاستشارات الاستراتيجية، بناء القدرات، والأدوات العملية —
              في منظومة واحدة متكاملة.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {serviceCategories.map((category, ci) => {
        const items = getServicesByCategory(category.key);
        return (
          <section
            key={category.key}
            className={ci % 2 === 1 ? "bg-paper-alt py-16 md:py-24" : "py-16 md:py-24"}
          >
            <Container>
              <RevealOnScroll className="flex flex-col gap-3 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                    {category.label}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-muted">{category.description}</p>
                </div>
              </RevealOnScroll>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((service, i) => (
                  <RevealOnScroll key={service.slug} delay={i * 80}>
                    <Link
                      href={`/solutions/${service.slug}`}
                      className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_20px_40px_-24px_rgba(10,10,12,0.25)]"
                    >
                      <div>
                        <h3 className="text-base font-semibold text-ink">{service.name}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted">
                          {service.summary}
                        </p>
                      </div>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-navy">
                        التفاصيل
                        <ArrowLeft
                          className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
                          aria-hidden
                        />
                      </span>
                    </Link>
                  </RevealOnScroll>
                ))}
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
}
