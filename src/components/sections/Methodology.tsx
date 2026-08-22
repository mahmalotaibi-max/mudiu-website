import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { methodology } from "@/content/home";

export function Methodology() {
  return (
    <section className="py-20 md:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <RevealOnScroll>
          <FrameworkMark />
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <Eyebrow>{methodology.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold leading-snug tracking-tight text-ink md:text-4xl">
            {methodology.title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            {methodology.body}
          </p>

          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            {methodology.points.map((point) => (
              <div key={point.label} className="border-t border-line pt-4">
                <dt className="text-sm font-semibold text-ink">{point.label}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{point.detail}</dd>
              </div>
            ))}
          </dl>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

function FrameworkMark() {
  return (
    <svg
      viewBox="0 0 360 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto w-full max-w-sm"
      role="img"
      aria-label="رمز يعبر عن بناء منهجيات وأدوات"
    >
      <rect x="20" y="20" width="140" height="100" rx="14" stroke="var(--color-line)" strokeWidth="1.5" />
      <rect x="200" y="20" width="140" height="100" rx="14" stroke="var(--color-navy)" strokeWidth="1.5" />
      <rect x="20" y="160" width="140" height="100" rx="14" stroke="var(--color-navy)" strokeWidth="1.5" />
      <rect x="200" y="160" width="140" height="100" rx="14" stroke="var(--color-line)" strokeWidth="1.5" />

      <circle cx="90" cy="70" r="4" fill="var(--color-ink)" />
      <circle cx="270" cy="70" r="4" fill="var(--color-navy)" />
      <circle cx="90" cy="210" r="4" fill="var(--color-navy)" />
      <circle cx="270" cy="210" r="4" fill="var(--color-orange)" />

      <line x1="160" y1="70" x2="200" y2="70" stroke="var(--color-line)" strokeWidth="1.5" />
      <line x1="90" y1="120" x2="90" y2="160" stroke="var(--color-line)" strokeWidth="1.5" />
      <line x1="270" y1="120" x2="270" y2="160" stroke="var(--color-line)" strokeWidth="1.5" />
      <line x1="160" y1="210" x2="200" y2="210" stroke="var(--color-line)" strokeWidth="1.5" />
    </svg>
  );
}
