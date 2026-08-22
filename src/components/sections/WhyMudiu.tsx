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

        <div className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <div
            className="absolute top-6 right-0 left-0 hidden h-px bg-line md:block"
            aria-hidden
          />
          {whyMudiu.steps.map((step, i) => (
            <RevealOnScroll key={step.index} delay={i * 100}>
              <div className="relative">
                <div className="flex items-center gap-3 md:block">
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-sm font-medium text-muted">
                    {step.index}
                  </span>
                  <div className="h-px flex-1 bg-line md:hidden" aria-hidden />
                </div>
                <p className="mt-5 text-xl font-semibold text-ink">
                  {step.verb} <span className="text-navy">{step.noun}</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.detail}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
