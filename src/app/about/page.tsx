import type { Metadata } from "next";
import {
  Compass,
  Target,
  Flag,
  ShieldCheck,
  BadgeCheck,
  Feather,
  Search,
  ScanSearch,
  FlaskConical,
  Hammer,
  GraduationCap,
  RefreshCw,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { IconBadge } from "@/components/ui/IconBadge";
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

const visionMissionIcons = [Target, Flag] as const;
const valueIcons = [ShieldCheck, BadgeCheck, Feather] as const;
const stepIcons = [Search, ScanSearch, FlaskConical, Hammer, GraduationCap, RefreshCw] as const;
const tones = ["orange", "navy"] as const;

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, var(--color-ink) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />
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

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid items-stretch overflow-hidden rounded-3xl border border-line bg-paper-alt lg:grid-cols-[0.85fr_1.15fr]">
            <RevealOnScroll className="relative flex flex-col items-start justify-center gap-6 p-10 md:p-14">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, var(--color-ink) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
                aria-hidden
              />
              <IconBadge icon={Compass} tone="navy" size="lg" className="relative" />
              <p className="relative text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                {philosophy.title}
              </p>
            </RevealOnScroll>
            <RevealOnScroll
              delay={100}
              className="flex flex-col justify-center gap-5 p-10 md:p-14 md:pr-0"
            >
              <p className="text-lg leading-relaxed text-ink md:text-xl">{philosophy.body}</p>
              <p className="text-base leading-relaxed text-muted md:text-lg">{philosophy.lead}</p>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container className="grid gap-6 sm:grid-cols-2">
          {visionMission.map((v, i) => {
            const Icon = visionMissionIcons[i];
            return (
              <RevealOnScroll
                key={v.title}
                delay={i * 100}
                className="group rounded-3xl border border-line bg-paper p-8 transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_24px_48px_-24px_rgba(23,24,28,0.16)] md:p-10"
              >
                <IconBadge icon={Icon} tone={tones[i % tones.length]} />
                <h3 className="mt-6 text-xl font-semibold text-ink">{v.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{v.body}</p>
              </RevealOnScroll>
            );
          })}
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
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {values.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <RevealOnScroll
                  key={v.title}
                  delay={i * 100}
                  className="group rounded-3xl border border-line bg-paper p-8 transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_24px_48px_-24px_rgba(23,24,28,0.16)]"
                >
                  <div className="flex items-center justify-between">
                    <IconBadge icon={Icon} tone={tones[i % tones.length]} />
                    <span
                      className="text-3xl font-bold text-ink/[0.06] transition-colors duration-500 group-hover:text-orange/10"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-ink">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{v.body}</p>
                </RevealOnScroll>
              );
            })}
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

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {wayOfWork.steps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <RevealOnScroll
                  key={step.index}
                  delay={i * 90}
                  className="group flex items-start gap-4 rounded-2xl border border-line bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_20px_40px_-24px_rgba(23,24,28,0.16)]"
                >
                  <IconBadge icon={Icon} tone={tones[i % tones.length]} />
                  <div>
                    <span className="text-xs font-medium text-muted">{step.index}</span>
                    <h3 className="mt-1 text-lg font-semibold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{step.detail}</p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container className="flex flex-col items-start gap-6 rounded-3xl border border-line bg-paper-alt px-8 py-14 md:flex-row md:items-center md:justify-between md:px-14">
          <h2 className="max-w-md text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            جاهز لتبدأ رحلتك مع مُضيّ؟
          </h2>
          <Button href="/contact#booking">احجز جلسة تعريفية</Button>
        </Container>
      </section>
    </>
  );
}
