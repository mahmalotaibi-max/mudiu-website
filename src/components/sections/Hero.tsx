import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroLiveMark } from "@/components/sections/HeroLiveMark";
import { hero, whyMudiu } from "@/content/home";

const audiences = [
  { label: "للأفراد", href: "/individuals" },
  { label: "للمؤسسات", href: "/institutions" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-ink) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      <Container className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-fade-up lg:border-l lg:border-line lg:pl-16">
          <Eyebrow>{hero.eyebrow}</Eyebrow>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-5xl md:text-6xl">
            {hero.titleLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg">
            {hero.body}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</Button>
            <Button href={hero.ctaSecondary.href} variant="secondary">
              {hero.ctaSecondary.label}
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-4 text-sm text-muted">
            <span>مصممة لـ</span>
            <div className="flex items-center gap-2">
              {audiences.map((a, i) => (
                <span key={a.href} className="flex items-center gap-2">
                  <Link href={a.href} className="text-ink underline-offset-4 hover:text-orange hover:underline">
                    {a.label}
                  </Link>
                  {i < audiences.length - 1 && <span aria-hidden>·</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative animate-fade-in [animation-delay:200ms]">
          <HeroLiveMark />
          <p className="mt-2 text-center text-sm font-semibold text-ink">{whyMudiu.title}</p>
        </div>
      </Container>
    </section>
  );
}
