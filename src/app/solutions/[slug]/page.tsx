import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import {
  getServiceBySlug,
  getServicesByCategory,
  serviceCategories,
  services,
} from "@/content/solutions";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return { title: service.name, description: service.summary };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const category = serviceCategories.find((c) => c.key === service.category)!;
  const related = getServicesByCategory(service.category).filter((s) => s.slug !== slug);

  return (
    <>
      <section className="pt-16 pb-16 md:pt-24 md:pb-20">
        <Container className="max-w-3xl">
          <RevealOnScroll>
            <Eyebrow>{category.label}</Eyebrow>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink md:text-5xl">
              {service.name}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
              {service.description}
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="border-t border-line py-16 md:py-20">
        <Container className="max-w-3xl">
          <RevealOnScroll>
            <h2 className="text-lg font-semibold text-ink">لمن هذه الخدمة؟</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {service.forWhom.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-muted">
                  <span className="h-1 w-1 rounded-full bg-navy" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          <RevealOnScroll delay={100} className="mt-14 rounded-2xl border border-line p-8">
            <p className="text-sm leading-relaxed text-muted">
              كل مشاركة تبدأ من جلسة تعريفية نفهم فيها التحدي الفعلي قبل اقتراح أي حل، دون
              التزام مسبق.
            </p>
            <div className="mt-6">
              <Button href="/contact#booking">احجز جلسة تعريفية</Button>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-paper-alt py-16 md:py-20">
          <Container>
            <RevealOnScroll>
              <h2 className="text-lg font-semibold text-ink">خدمات ذات صلة</h2>
            </RevealOnScroll>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.slice(0, 3).map((s, i) => (
                <RevealOnScroll key={s.slug} delay={i * 80}>
                  <a
                    href={`/solutions/${s.slug}`}
                    className="block rounded-2xl border border-line bg-paper p-6 transition-colors hover:border-ink"
                  >
                    <p className="text-sm font-semibold text-ink">{s.name}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{s.summary}</p>
                  </a>
                </RevealOnScroll>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
