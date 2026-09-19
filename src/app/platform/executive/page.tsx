import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { RequireDiagnostic } from "@/components/platform/RequireDiagnostic";
import { sampleOrganization } from "@/lib/platform/sampleData";
import { computeExecutiveSummary } from "@/lib/platform/diagnostics";

export const metadata: Metadata = {
  title: "Executive Strategic View | MUDIU Platform",
};

export default function ExecutivePage() {
  const summary = computeExecutiveSummary(sampleOrganization);

  return (
    <RequireDiagnostic>
      <PlatformShell active="executive" />
      <Container className="max-w-3xl py-12 md:py-16">
        <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          Executive Strategic View
        </h1>

        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Where are we?
          </h2>
          <ul className="mt-4 space-y-2 text-base text-ink">
            <li>{summary.onTrack} goals on track</li>
            <li>{summary.needsAttention} goals need attention</li>
            <li>{summary.requiresReview} goals require review</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            What is driving the risk?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink">{summary.topRiskMessage}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            What needs attention?
          </h2>
          <ol className="mt-4 space-y-3">
            {summary.actions.map((action, i) => (
              <li key={i} className="flex gap-3 text-base text-ink">
                <span className="font-semibold text-orange">{i + 1}.</span>
                <span>{action}</span>
              </li>
            ))}
          </ol>
        </section>

        <Link
          href="/platform/overview"
          className="mt-12 inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy"
        >
          View Full Diagnostic
        </Link>
      </Container>
    </RequireDiagnostic>
  );
}
