import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { BuyBox } from "@/components/BuyBox";
import { getProductBySlug, products } from "@/content/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return { title: product.name, description: product.tagline };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <section className="pt-16 pb-16 md:pt-24 md:pb-20">
        <Container className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <RevealOnScroll>
            <Eyebrow>منتجات مُضيّ</Eyebrow>
            <h1 className="mt-6 text-3xl font-semibold leading-snug tracking-tight text-ink md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
              {product.description}
            </p>
            {product.duration && (
              <p className="mt-6 text-sm text-muted">المدة: {product.duration}</p>
            )}
          </RevealOnScroll>

          <RevealOnScroll delay={100} className="rounded-3xl border border-line p-8">
            {product.price ? (
              <BuyBox
                productSlug={product.slug}
                price={product.price}
                currency={product.currency ?? "SAR"}
              />
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-sm leading-relaxed text-muted">
                  تفاصيل هذا المنتج (المدة والسعر) قيد الإعداد — تواصل معنا لمعرفة أحدث المعلومات.
                </p>
                <Button href="/contact#booking">تواصل معنا</Button>
              </div>
            )}
          </RevealOnScroll>
        </Container>
      </section>

      {product.forWhom && product.forWhom.length > 0 && (
        <section className="border-t border-line bg-paper-alt py-16 md:py-20">
          <Container className="max-w-3xl">
            <RevealOnScroll>
              <h2 className="text-lg font-semibold text-ink">لمن هذا المنتج؟</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {product.forWhom.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted">
                    <span className="h-1 w-1 rounded-full bg-navy" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </Container>
        </section>
      )}

      {(product.whatYouLearn?.length || product.whatYouGet?.length) && (
        <section className="py-16 md:py-20">
          <Container className="grid gap-14 md:grid-cols-2 max-w-3xl mx-auto">
            {product.whatYouLearn && product.whatYouLearn.length > 0 && (
              <RevealOnScroll>
                <h2 className="text-lg font-semibold text-ink">ماذا ستتعلم؟</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {product.whatYouLearn.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orange" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </RevealOnScroll>
            )}
            {product.whatYouGet && product.whatYouGet.length > 0 && (
              <RevealOnScroll delay={80}>
                <h2 className="text-lg font-semibold text-ink">ماذا ستحصل عليه؟</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {product.whatYouGet.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orange" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </RevealOnScroll>
            )}
          </Container>
        </section>
      )}

      {product.howItWorks && product.howItWorks.length > 0 && (
        <section className="border-t border-line bg-paper-alt py-16 md:py-20">
          <Container className="max-w-3xl">
            <RevealOnScroll>
              <h2 className="text-lg font-semibold text-ink">كيف يعمل البرنامج؟</h2>
            </RevealOnScroll>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {product.howItWorks.map((step, i) => (
                <RevealOnScroll key={step.title} delay={i * 80} className="border-t border-line pt-4">
                  <p className="text-sm font-semibold text-ink">{step.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.detail}</p>
                </RevealOnScroll>
              ))}
            </div>
          </Container>
        </section>
      )}

      {product.faq && product.faq.length > 0 && (
        <section className="py-16 md:py-20">
          <Container className="max-w-3xl">
            <RevealOnScroll>
              <h2 className="text-lg font-semibold text-ink">الأسئلة الشائعة</h2>
            </RevealOnScroll>
            <div className="mt-8 flex flex-col divide-y divide-line border-t border-b border-line">
              {product.faq.map((item, i) => (
                <RevealOnScroll key={item.question} delay={i * 60} className="py-5">
                  <p className="text-sm font-semibold text-ink">{item.question}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.answer}</p>
                </RevealOnScroll>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
