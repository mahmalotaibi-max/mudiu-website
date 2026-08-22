import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { getAllArticles, getArticleBySlug, type ArticleBlock } from "@/content/articles";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
  };
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("ar-SA", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso)
  );
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="mt-10 mb-4 text-xl font-semibold tracking-tight text-ink md:text-2xl">
          {block.text}
        </h2>
      );
    case "list":
      return (
        <ul className="my-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-base leading-relaxed text-ink/90">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-8 border-r-2 border-orange pr-6 text-lg leading-relaxed text-ink">
          {block.text}
        </blockquote>
      );
    case "paragraph":
    default:
      return <p className="my-5 text-base leading-8 text-ink/90 md:text-lg">{block.text}</p>;
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const more = getAllArticles()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);

  return (
    <article>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <Container className="max-w-3xl">
          <RevealOnScroll>
            <Link
              href="/knowledge"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
            >
              <ArrowLeft className="size-4" aria-hidden />
              المعرفة
            </Link>

            <Eyebrow className="mt-8">{article.type}</Eyebrow>
            <h1 className="mt-4 text-3xl font-semibold leading-[1.2] tracking-tight text-ink md:text-4xl">
              {article.title}
            </h1>
            <div className="mt-5 flex items-center gap-3 text-sm text-muted">
              <span>{formatDate(article.date)}</span>
              <span aria-hidden>·</span>
              <span>{article.readMinutes} دقائق قراءة</span>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="border-t border-line py-12 md:py-16">
        <Container className="max-w-3xl">
          <RevealOnScroll>
            {article.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </RevealOnScroll>
        </Container>
      </section>

      {more.length > 0 && (
        <section className="border-t border-line py-16 md:py-20">
          <Container className="max-w-3xl">
            <h3 className="text-sm font-medium text-muted">اقرأ أيضًا</h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {more.map((a) => (
                <Link
                  key={a.slug}
                  href={`/knowledge/${a.slug}`}
                  className="block rounded-2xl border border-line p-6 transition-colors hover:border-ink"
                >
                  <span className="text-xs font-medium text-orange">{a.type}</span>
                  <p className="mt-2 text-sm font-semibold leading-snug text-ink">{a.title}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
