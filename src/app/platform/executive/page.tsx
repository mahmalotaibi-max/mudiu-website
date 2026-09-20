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
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Five questions, answered from the data provided — enough to understand where things
          stand in under a minute.
        </p>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            1. Where are we aligned?
          </h2>
          <ul className="mt-3 space-y-1.5 text-base text-ink">
            <li>{summary.alignedGoals} goals fully connected</li>
            <li>{summary.needsAttentionGoals} goals need attention</li>
            <li>{summary.requiresReviewGoals} goals require review</li>
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-muted">{summary.alignmentMessage}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            2. Where are the biggest gaps?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink">{summary.biggestGapsMessage}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            3. Which initiatives are creating measurable value?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink">{summary.measurableValueMessage}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            4. Where is evidence missing?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink">{summary.missingEvidenceMessage}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            5. What needs leadership attention?
          </h2>
          <ol className="mt-3 space-y-3">
            {summary.attentionActions.map((action, i) => (
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
