import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PlatformButton } from "@/components/platform/PlatformButton";
import { ChainTeaser } from "@/components/platform/ChainTeaser";

export const metadata: Metadata = {
  title: "MUDIU Platform",
  description:
    "MUDIU helps organizations connect strategic goals to performance, initiatives, benefits, and measurable impact.",
};

const principles = [
  { title: "Understand", body: "See how your goals, performance, and delivery actually connect today." },
  { title: "Connect", body: "Link every initiative to the goal it serves and the value it is meant to create." },
  { title: "Measure", body: "Know which benefits are defined, measurable, and backed by evidence." },
  { title: "Improve", body: "See exactly where the chain breaks, before you commit more resources." },
];

export default function PlatformHomePage() {
  return (
    <>
      <section className="pt-20 pb-16 md:pt-28 md:pb-20">
        <Container className="max-w-3xl text-center">
          <RevealOnScroll>
            <Eyebrow className="justify-center">MUDIU Platform</Eyebrow>
            <h1 className="mt-6 text-3xl font-semibold leading-[1.15] tracking-tight text-ink md:text-5xl">
              Understand your business.
              <br />
              Connect strategy to value.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              MUDIU helps organizations connect strategic goals to performance, initiatives,
              benefits, and measurable impact.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <PlatformButton href="/platform/diagnostic">
                Start Your Organizational Diagnostic
              </PlatformButton>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                Explore How It Works
              </a>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <section id="how-it-works" className="border-t border-line py-16 md:py-24">
        <Container className="max-w-4xl">
          <RevealOnScroll>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              One chain, from intent to evidence
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              MUDIU doesn&apos;t ask you to learn a new methodology. It reads the data your
              organization already has, and shows you where this chain is connected — and where
              it quietly breaks.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={100} className="mt-10 overflow-x-auto">
            <ChainTeaser />
          </RevealOnScroll>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {principles.map((p, i) => (
              <RevealOnScroll key={p.title} delay={150 + i * 80}>
                <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={450} className="mt-14 text-center">
            <PlatformButton href="/platform/diagnostic">
              Start Your Organizational Diagnostic
            </PlatformButton>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
