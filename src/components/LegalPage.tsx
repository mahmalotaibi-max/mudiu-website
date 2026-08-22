import { Container } from "@/components/ui/Container";

export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <section className="pt-16 pb-24 md:pt-24 md:pb-32">
      <Container className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-muted">آخر تحديث: {updated}</p>

        <div className="mt-12 flex flex-col gap-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-lg font-semibold text-ink">{s.heading}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
