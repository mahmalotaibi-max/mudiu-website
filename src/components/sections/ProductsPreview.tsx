import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { productsPreview } from "@/content/home";

export function ProductsPreview() {
  return (
    <section className="bg-paper-alt py-20 md:py-28">
      <Container>
        <RevealOnScroll className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>{productsPreview.eyebrow}</Eyebrow>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              {productsPreview.title}
            </h2>
          </div>
          <Link
            href="/individuals"
            className="hidden shrink-0 items-center gap-2 text-sm font-medium text-ink hover:text-navy sm:inline-flex"
          >
            كل المنتجات
            <ArrowLeft className="size-4" aria-hidden />
          </Link>
        </RevealOnScroll>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productsPreview.items.map((product, i) => (
            <RevealOnScroll key={product.slug} delay={i * 100}>
              <Link
                href={`/products/${product.slug}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-paper p-8 transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_20px_40px_-24px_rgba(10,10,12,0.25)]"
              >
                <div>
                  <h3 className="text-lg font-semibold text-ink">{product.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {product.description}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink">
                    {product.price.toLocaleString("ar-SA")} {product.currency}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-navy">
                    التفاصيل
                    <ArrowLeft
                      className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            </RevealOnScroll>
          ))}

          <RevealOnScroll
            delay={productsPreview.items.length * 100}
            className="flex h-full flex-col items-start justify-center rounded-2xl border border-dashed border-line p-8 text-sm text-muted"
          >
            منتجات جديدة قادمة قريبًا.
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
