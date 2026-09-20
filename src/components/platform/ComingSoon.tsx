import { Container } from "@/components/ui/Container";

export function ComingSoon({ section }: { section: string }) {
  return (
    <Container className="max-w-2xl py-24 text-center">
      <span className="inline-flex rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
        Coming in the next release
      </span>
      <h1 className="mt-5 text-2xl font-semibold tracking-tight text-ink">{section}</h1>
      <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted">
        This section isn&apos;t part of the prototype yet. Overview, Strategy, and Insights are
        fully explorable today.
      </p>
    </Container>
  );
}
