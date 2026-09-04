import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArticleCover } from "@/components/sections/ArticleCover";
import { knowledgeTypes } from "@/content/knowledge";
import { getAllArticles } from "@/content/articles";

export const metadata: Metadata = {
  title: "المعرفة",
  description: "مقالات، رؤى، أدلة، وأدوات تدعم رحلة التطوير المهني والمؤسسي.",
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("ar-SA", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso)
  );
}

export default function KnowledgePage() {
  const articles = getAllArticles();

  return (
    <>
      <section className="pt-16 pb-14 md:pt-24 md:pb-20">
        <Container className="max-w-2xl">
          <RevealOnScroll>
            <Eyebrow>المعرفة</Eyebrow>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink md:text-5xl">
              مجلة مُضيّ المعرفية
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
              مقالات، رؤى، أدلة، دراسات، وأدوات تُنشر تباعًا لدعم رحلة التطوير المهني
              والمؤسسي.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={100} className="mt-8 flex flex-wrap gap-2">
            {knowledgeTypes.map((type) => (
              <span
                key={type}
                className="rounded-full border border-line px-4 py-1.5 text-xs text-muted"
              >
                {type}
              </span>
            ))}
          </RevealOnScroll>
        </Container>
      </section>

      <section className="border-t border-line py-16 md:py-20">
        <Container>
          {articles.length === 0 ? (
            <RevealOnScroll className="rounded-3xl border border-dashed border-line px-8 py-20 text-center">
              <p className="text-base text-muted">
                المحتوى المعرفي قيد الإعداد. أول مقالاتنا في الطريق قريبًا.
              </p>
            </RevealOnScroll>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((item, i) => (
                <RevealOnScroll key={item.slug} delay={i * 80}>
                  <Link
                    href={`/knowledge/${item.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-line p-5 transition-colors hover:border-ink"
                  >
                    <ArticleCover
                      type={item.type}
                      icon={item.icon}
                      className="aspect-video w-full transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <span className="mt-5 text-xs font-medium text-orange">{item.type}</span>
                    <h3 className="mt-3 text-base font-semibold leading-snug text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.summary}</p>
                    <div className="mt-6 flex items-center gap-3 text-xs text-muted">
                      <span>{formatDate(item.date)}</span>
                      <span aria-hidden>·</span>
                      <span>{item.readMinutes} دقائق قراءة</span>
                    </div>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
