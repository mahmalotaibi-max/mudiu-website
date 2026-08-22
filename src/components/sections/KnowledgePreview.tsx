import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { knowledgePreview } from "@/content/home";
import { getAllArticles } from "@/content/articles";

export function KnowledgePreview() {
  const latest = getAllArticles().slice(0, 2);

  return (
    <section className="py-20 md:py-28">
      <Container>
        <RevealOnScroll className="flex flex-col gap-10 rounded-3xl border border-line px-8 py-14 md:flex-row md:justify-between md:px-14">
          <div className="max-w-lg">
            <Eyebrow>{knowledgePreview.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              {knowledgePreview.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {knowledgePreview.body}
            </p>
            <Button href={knowledgePreview.cta.href} variant="secondary" className="mt-8">
              {knowledgePreview.cta.label}
            </Button>
          </div>

          {latest.length > 0 && (
            <ul className="flex w-full max-w-sm flex-col gap-5 border-t border-line pt-6 md:w-80 md:border-t-0 md:border-r md:border-line md:pt-0 md:pr-10">
              {latest.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/knowledge/${article.slug}`}
                    className="group block"
                  >
                    <span className="text-xs font-medium text-orange">{article.type}</span>
                    <p className="mt-1.5 text-sm font-medium leading-relaxed text-ink group-hover:text-navy">
                      {article.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </RevealOnScroll>
      </Container>
    </section>
  );
}
