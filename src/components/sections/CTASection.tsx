import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ctaSection } from "@/content/home";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-24 text-paper md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-paper) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
        aria-hidden
      />
      <Container className="relative text-center">
        <RevealOnScroll>
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
            {ctaSection.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-on-dark md:text-lg">
            {ctaSection.body}
          </p>
          <div className="mt-10 flex justify-center">
            <Button href={ctaSection.cta.href} variant="ghost-on-dark">
              {ctaSection.cta.label}
            </Button>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
