import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroMark } from "@/components/sections/HeroMark";
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
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl lg:aspect-[3/4]">
            <Image
              src="/images/hero-riyadh.jpg"
              alt="طريق منحني يؤدي نحو أفق مدينة الرياض عند الشروق"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 45%, color-mix(in srgb, var(--color-ink) 60%, transparent) 100%), linear-gradient(0deg, color-mix(in srgb, var(--color-navy) 22%, transparent) 0%, transparent 45%)",
              }}
              aria-hidden
            />
          </div>

          <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl border border-white/15 bg-paper/95 p-3 shadow-xl backdrop-blur-sm sm:inset-x-6 sm:bottom-6 sm:gap-4 sm:p-4">
            <div className="w-20 shrink-0 sm:w-24">
              <HeroMark showLabels={false} />
            </div>
            <div className="border-r border-line pr-3 sm:pr-4">
              <p className="text-sm font-semibold text-ink sm:text-base">{whyMudiu.title}</p>
              <p className="mt-1 text-xs text-muted sm:text-sm">{hero.eyebrow}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
