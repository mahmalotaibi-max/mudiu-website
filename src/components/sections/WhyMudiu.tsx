import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { MethodologyPath } from "@/components/sections/MethodologyPath";
import { whyMudiu } from "@/content/home";

export function WhyMudiu() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <RevealOnScroll>
          <Eyebrow>{whyMudiu.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {whyMudiu.title}
          </h2>
        </RevealOnScroll>

        <MethodologyPath steps={whyMudiu.steps} />
      </Container>
    </section>
  );
}
