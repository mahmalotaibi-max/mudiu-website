import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { solutionsPreview } from "@/content/home";

export function SolutionsPreview() {
  return (
    <section className="bg-paper-alt py-20 md:py-28">
      <Container>
        <RevealOnScroll>
          <Eyebrow>{solutionsPreview.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {solutionsPreview.title}
          </h2>
        </RevealOnScroll>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {solutionsPreview.tracks.map((track, i) => (
            <RevealOnScroll key={track.key} delay={i * 120}>
              <Link
                href={track.href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-8 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.01] hover:border-ink hover:shadow-[0_28px_56px_-28px_rgba(13,27,51,0.4)] md:p-10"
              >
                <span className="text-sm font-medium text-orange">{track.label}</span>
                <p className="mt-4 text-lg leading-relaxed text-ink">{track.description}</p>

                <ul className="mt-8 flex flex-1 flex-col gap-3">
                  {track.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-muted">
                      <span className="h-1 w-1 rounded-full bg-navy" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>

                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink">
                  اطّلع على التفاصيل
                  <ArrowLeft
                    className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
