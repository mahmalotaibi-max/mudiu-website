import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { whyMudiu } from "@/content/home";

export function WhyMudiu() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <RevealOnScroll>
          <Eyebrow>{whyMudiu.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {whyMudiu.title}
          </h2>
        </RevealOnScroll>

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 md:gap-6 lg:grid-cols-6">
          <div
            className="absolute top-6 right-0 left-0 hidden h-px bg-line lg:block"
            aria-hidden
          />
          {whyMudiu.steps.map((step, i) => (
            <RevealOnScroll key={step.index} delay={i * 100}>
              <div className="relative">
                <div className="flex items-center gap-3 lg:block">
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-sm font-medium text-muted">
                    {step.index}
                  </span>
                  <div className="h-px flex-1 bg-line lg:hidden" aria-hidden />
                </div>
                <p className="mt-5 text-lg font-semibold text-ink">{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.detail}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
