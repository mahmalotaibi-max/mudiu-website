import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { InstitutionsSystemMark } from "@/components/sections/InstitutionsSystemMark";
import { MethodologyPath } from "@/components/sections/MethodologyPath";
import { institutionsHero, institutionsJourney, institutionsWhy } from "@/content/institutions";
import { serviceCategories, getServicesByCategory } from "@/content/solutions";

export const metadata: Metadata = {
  title: "للمؤسسات",
  description: institutionsHero.body,
};

export default function InstitutionsPage() {

  return (
    <>
      <section className="pt-16 pb-16 md:pt-24 md:pb-20">
        <Container className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <RevealOnScroll>
            <Eyebrow>{institutionsHero.eyebrow}</Eyebrow>
            <h1 className="mt-6 text-3xl font-semibold leading-snug tracking-tight text-ink md:text-5xl">
              {institutionsHero.title}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg">
              {institutionsHero.body}
            </p>
            <div className="mt-10">
              <Button href="/contact#booking">تحدث مع فريقنا</Button>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <InstitutionsSystemMark />
          </RevealOnScroll>
        </Container>
      </section>

      <section className="border-t border-line bg-paper-alt py-20 md:py-28">
        <Container>
          <RevealOnScroll>
            <Eyebrow>{institutionsJourney.eyebrow}</Eyebrow>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              {institutionsJourney.title}
            </h2>
          </RevealOnScroll>

          <MethodologyPath steps={institutionsJourney.steps} />
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <RevealOnScroll>
            <Eyebrow>الخدمات</Eyebrow>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              نقطة انطلاق لكل مؤسسة
            </h2>
          </RevealOnScroll>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((category, i) => {
              const firstService = getServicesByCategory(category.key)[0];
              return (
                <RevealOnScroll key={category.key} delay={i * 80}>
                  <a
                    href={`/solutions/${firstService.slug}`}
                    className="block h-full rounded-2xl border border-line p-6 transition-colors hover:border-ink"
                  >
                    <p className="text-sm font-semibold text-ink">{category.label}</p>
                    <p className="mt-1 text-xs font-medium text-orange">{category.shift}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {category.description}
                    </p>
                  </a>
                </RevealOnScroll>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-navy-deep py-20 text-paper md:py-28">
        <Container className="grid gap-10 md:grid-cols-2">
          <RevealOnScroll>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              لماذا تعمل المؤسسات معنا؟
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <ul className="flex flex-col gap-5">
              {institutionsWhy.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-on-dark">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container className="flex flex-col items-start gap-6 rounded-3xl border border-line px-8 py-14 md:flex-row md:items-center md:justify-between md:px-14">
          <h2 className="max-w-md text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            لنبدأ من التحدي الفعلي لمؤسستكم.
          </h2>
          <Button href="/contact#booking">احجز جلسة تعريفية</Button>
        </Container>
      </section>
    </>
  );
}
