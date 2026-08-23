import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { products } from "@/content/products";

export const metadata: Metadata = {
  title: "المنتجات",
  description: "محفظة مُضيّ من المنتجات والأدوات المتخصصة — منفصلة عن خدماتنا الاستشارية.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="pt-16 pb-14 md:pt-24 md:pb-20">
        <Container className="max-w-2xl">
          <RevealOnScroll>
            <Eyebrow>منتجات مُضيّ</Eyebrow>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink md:text-5xl">
              أدوات وبرامج متخصصة تدعم مسيرتك
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
              منتجات مُضيّ منفصلة عن خدماتنا الاستشارية — أدوات وبرامج تطبيقية جاهزة للاستخدام
              المباشر.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="border-t border-line py-16 md:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <RevealOnScroll key={product.slug} delay={i * 80}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-line p-8 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.01] hover:border-ink hover:shadow-[0_28px_56px_-28px_rgba(63,74,60,0.4)]"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-ink">{product.name}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-sm font-semibold text-ink">
                      {product.price
                        ? `${product.price.toLocaleString("ar-SA")} ${product.currency}`
                        : ""}
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
          </div>
        </Container>
      </section>
    </>
  );
}
