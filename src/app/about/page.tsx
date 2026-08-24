import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Button } from "@/components/ui/Button";
import { PathMotif } from "@/components/sections/PathMotif";
import { MethodologyPath } from "@/components/sections/MethodologyPath";
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

      <section className="relative overflow-hidden py-20 md:py-28">
        <PathMotif />
        <Container className="relative">
          <RevealOnScroll className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              {philosophy.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink md:text-xl">{philosophy.body}</p>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
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
                className="group flex flex-col gap-2 overflow-hidden py-10 md:flex-row md:items-center md:gap-16"
              >
                <span
                  className="pointer-events-none select-none text-[6.5rem] font-bold leading-none text-ink/[0.06] transition-colors duration-500 group-hover:text-orange/10 md:w-44 md:shrink-0 md:text-[8.5rem]"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                    {v.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                    {v.body}
                  </p>
                </div>
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

          <MethodologyPath steps={wayOfWork.steps} />
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container className="flex flex-col items-start gap-6 rounded-3xl border border-line px-8 py-14 md:flex-row md:items-center md:justify-between md:px-14">
          <h2 className="max-w-md text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            جاهز لتبدأ رحلتك مع مُضيّ؟
          </h2>
          <Button href="/contact#booking">احجز جلسة تعريفية</Button>
        </Container>
      </section>
    </>
  );
}
