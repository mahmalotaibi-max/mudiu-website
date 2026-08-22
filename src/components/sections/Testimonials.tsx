import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  return (
    <section className="bg-paper-alt py-20 md:py-28">
      <Container>
        <RevealOnScroll>
          <Eyebrow>ماذا يقول عملاؤنا؟</Eyebrow>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            تجارب حقيقية مع مُضيّ
          </h2>
        </RevealOnScroll>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <RevealOnScroll key={t.name} delay={i * 100}>
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-paper p-8">
                <Quote className="size-5 text-orange" aria-hidden />
                <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-ink">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4">
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </figcaption>
              </figure>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
