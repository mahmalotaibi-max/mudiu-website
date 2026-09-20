import { Container } from "@/components/ui/Container";
import type { Locale } from "@/lib/platform/types";

const strings = {
  en: {
    badge: "Coming in the next release",
    body: "This section isn't part of the prototype yet. Overview, Strategy, and Insights are fully explorable today.",
  },
  ar: {
    badge: "قادم في الإصدار القادم",
    body: "هذا القسم ليس جزءًا من النموذج التجريبي بعد. يمكنك استكشاف \"نظرة عامة\" و\"الاستراتيجية\" و\"الرؤى\" بالكامل اليوم.",
  },
};

export function ComingSoon({ section, locale = "en" }: { section: string; locale?: Locale }) {
  const t = strings[locale];
  return (
    <Container className="max-w-2xl py-24 text-center">
      <span className="inline-flex rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
        {t.badge}
      </span>
      <h1 className="mt-5 text-2xl font-semibold tracking-tight text-ink">{section}</h1>
      <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted">{t.body}</p>
    </Container>
  );
}
