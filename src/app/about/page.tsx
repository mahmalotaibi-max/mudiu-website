import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Button } from "@/components/ui/Button";
import {
  aboutIntro,
  philosophy,
  visionMission,
  values,
  wayOfWork,
} from "@/content/about";

export const metadata: Metadata = {
  title: "من نحن",
  description: aboutIntro.body,
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-16 pb-20 md:pt-24 md:pb-28">
        <Container>
          <RevealOnScroll className="max-w-2xl">
            <Eyebrow>{aboutIntro.eyebrow}</Eyebrow>
            <p className="mt-6 text-3xl font-semibold leading-snug tracking-tight text-ink md:text-4xl">
              {aboutIntro.lead}
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
              {aboutIntro.body}
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="bg-navy-deep py-20 text-paper md:py-28">
        <Container>
          <RevealOnScroll className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {philosophy.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed md:text-xl">{philosophy.body}</p>
            <p className="mt-5 text-base leading-relaxed text-muted-on-dark md:text-lg">
              {philosophy.lead}
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container className="grid gap-10 sm:grid-cols-2">
          {visionMission.map((v, i) => (
            <RevealOnScroll key={v.title} delay={i * 100} className="border-t border-line pt-6">
              <h3 className="text-lg font-semibold text-ink">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{v.body}</p>
            </RevealOnScroll>
          ))}
        </Container>
      </section>

      <section className="bg-paper-alt py-24 md:py-32">
        <Container>
          <RevealOnScroll>
            <Eyebrow>القيم</Eyebrow>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              من التحدي إلى الأثر
            </h2>
          </RevealOnScroll>
          <div className="mt-16 flex flex-col divide-y divide-line border-t border-line">
            {values.map((v, i) => (
              <RevealOnScroll
                key={v.title}
                delay={i * 100}
                className="flex flex-col gap-3 py-10 md:flex-row md:items-baseline md:gap-14"
              >
                <span className="shrink-0 text-sm font-medium text-orange md:w-16">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="shrink-0 text-2xl font-semibold tracking-tight text-ink md:w-56 md:text-3xl">
                  {v.title}
                </h3>
                <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
                  {v.body}
                </p>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <RevealOnScroll>
            <Eyebrow>{wayOfWork.eyebrow}</Eyebrow>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              {wayOfWork.title}
            </h2>
          </RevealOnScroll>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {wayOfWork.steps.map((step, i) => (
              <RevealOnScroll key={step.index} delay={i * 80} className="border-t border-line pt-5">
                <span className="text-xs font-medium text-orange">{step.index}</span>
                <p className="mt-2 text-lg font-semibold text-ink">{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.detail}</p>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container className="flex flex-col items-start gap-6 rounded-3xl border border-line px-8 py-14 md:flex-row md:items-center md:justify-between md:px-14">
          <h2 className="max-w-md text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            جاهز لتبدأ رحلتك مع مُضيّ؟
          </h2>
          <Button href="/contact#booking">ابدأ رحلتك نحو الأثر</Button>
        </Container>
      </section>
    </>
  );
}
