import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { individualsHero, individualsTracks } from "@/content/individuals";
import { productsPreview } from "@/content/home";
import { IndividualsGrowthMark } from "@/components/sections/IndividualsGrowthMark";

export const metadata: Metadata = {
  title: "للأفراد",
  description: individualsHero.body,
};

export default function IndividualsPage() {
  return (
    <>
      <section className="pt-16 pb-16 md:pt-24 md:pb-20">
        <Container className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <RevealOnScroll>
            <Eyebrow>{individualsHero.eyebrow}</Eyebrow>
            <h1 className="mt-6 text-3xl font-semibold leading-snug tracking-tight text-ink md:text-5xl">
              {individualsHero.title}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg">
              {individualsHero.body}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <IndividualsGrowthMark />
          </RevealOnScroll>
        </Container>
      </section>

      <section className="border-t border-line bg-paper-alt py-20 md:py-28">
        <Container>
          <RevealOnScroll>
            <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              مسارات التطوير
            </h2>
          </RevealOnScroll>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {individualsTracks.map((track, i) => (
              <RevealOnScroll
                key={track.title}
                delay={i * 80}
                className="rounded-2xl border border-line bg-paper p-7"
              >
                <h3 className="text-base font-semibold text-ink">{track.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{track.detail}</p>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <RevealOnScroll className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>منتجات مُضيّ</Eyebrow>
              <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                أدوات وبرامج تدعم تطورك المهني
              </h2>
            </div>
          </RevealOnScroll>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productsPreview.items.map((product, i) => (
              <RevealOnScroll key={product.slug} delay={i * 100}>
                <a
                  href={`/products/${product.slug}`}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-line p-8 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.01] hover:border-ink hover:shadow-[0_28px_56px_-28px_rgba(30,47,82,0.4)]"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{product.name}</h3>
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
                </a>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container className="flex flex-col items-start gap-6 rounded-3xl border border-line px-8 py-14 md:flex-row md:items-center md:justify-between md:px-14">
          <h2 className="max-w-md text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            جاهز تطوّر مسارك المهني؟
          </h2>
          <Button href="/contact#booking">احجز جلسة تعريفية</Button>
        </Container>
      </section>
    </>
  );
}
