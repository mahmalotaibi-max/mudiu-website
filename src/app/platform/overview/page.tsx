import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { RequireDiagnostic } from "@/components/platform/RequireDiagnostic";
import { ScoreCard } from "@/components/platform/ScoreCard";
import { sampleOrganization } from "@/lib/platform/sampleData";
import { computeFindings, computeScores } from "@/lib/platform/diagnostics";
import type { Finding } from "@/lib/platform/types";

export const metadata: Metadata = {
  title: "Strategic Health | MUDIU Platform",
};

const severityLabel: Record<Finding["severity"], string> = {
  high: "Needs attention",
  medium: "Requires review",
  low: "Worth reviewing",
};

const severityDot: Record<Finding["severity"], string> = {
  high: "bg-orange",
  medium: "bg-orange/50",
  low: "bg-line",
};

export default function OverviewPage() {
  const scores = computeScores(sampleOrganization);
  const findings = computeFindings(sampleOrganization);

  return (
    <RequireDiagnostic>
      <PlatformShell active="overview" />
      <Container className="max-w-5xl py-12 md:py-16">
        <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          MUDIU Strategic Health
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          A diagnostic view of how well your organization&apos;s strategy connects to execution,
          value, and impact.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <ScoreCard
            label="Strategic Alignment"
            score={scores.strategicAlignment}
            description="Share of initiatives clearly linked to a strategic goal."
          />
          <ScoreCard
            label="Performance Readiness"
            score={scores.performanceReadiness}
            description="Share of goals with a fully defined indicator (baseline, current, target)."
          />
          <ScoreCard
            label="Benefit Readiness"
            score={scores.benefitReadiness}
            description="Share of initiatives with a clearly measurable expected benefit."
          />
          <ScoreCard
            label="Impact Readiness"
            score={scores.impactReadiness}
            description="Share of benefits backed by at least partial impact evidence."
          />
        </div>

        <p className="mt-4 text-xs text-muted">
          Diagnostic scores based on the completeness and connectivity of the submitted
          organizational data. These are prototype scores, not a scientific or universal
          benchmark.
        </p>

        <div className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-ink">What MUDIU Found</h2>
          <div className="mt-5 divide-y divide-line rounded-2xl border border-line">
            {findings.map((f) => (
              <div key={f.id} className="flex items-start gap-3 px-5 py-4">
                <span className={`mt-1.5 size-2 shrink-0 rounded-full ${severityDot[f.severity]}`} aria-hidden />
                <div>
                  <p className="text-sm text-ink">{f.message}</p>
                  <p className="mt-0.5 text-xs text-muted">{severityLabel[f.severity]}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted">
            These are not final judgments — they highlight where a link is missing, evidence is
            incomplete, or something is worth a closer look.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/platform/strategy"
            className="inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy"
          >
            Explore Goal → Impact
          </Link>
          <Link
            href="/platform/insights"
            className="inline-flex items-center rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
          >
            Ask MUDIU
          </Link>
        </div>
      </Container>
    </RequireDiagnostic>
  );
}
