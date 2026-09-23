import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { DemoBanner } from "@/components/platform/DemoBanner";
import { sampleOrganizationAr } from "@/lib/platform/sampleData.ar";
import { computeExecutiveSummary } from "@/lib/platform/diagnostics";

export const metadata: Metadata = {
  title: "العرض التنفيذي الاستراتيجي | منصة MUDIU",
};

export default function ExecutivePageAr() {
  const summary = computeExecutiveSummary(sampleOrganizationAr, "ar");

  return (
    <>
      <PlatformShell active="executive" locale="ar" />
      <DemoBanner locale="ar" />
      <Container className="max-w-3xl py-12 md:py-16">
        <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          العرض التنفيذي الاستراتيجي
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          خمسة أسئلة، مُجاب عنها من البيانات المقدَّمة - تكفي لفهم الوضع في أقل من دقيقة.
        </p>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            ١. أين نحن مرتبطون؟
          </h2>
          <ul className="mt-3 space-y-1.5 text-base text-ink">
            <li>{summary.alignedGoals} أهداف متصلة بالكامل</li>
            <li>{summary.needsAttentionGoals} أهداف تحتاج انتباهًا</li>
            <li>{summary.requiresReviewGoals} أهداف تتطلب مراجعة</li>
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-muted">{summary.alignmentMessage}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            ٢. أين أكبر الفجوات؟
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink">{summary.biggestGapsMessage}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            ٣. ما المبادرات التي تصنع قيمة قابلة للقياس؟
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink">{summary.measurableValueMessage}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            ٤. أين الدليل مفقود؟
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink">{summary.missingEvidenceMessage}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            ٥. ما الذي يحتاج انتباه القيادة؟
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
          href="/platform/ar/overview"
          className="mt-12 inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy"
        >
          عرض التشخيص الكامل
        </Link>
      </Container>
    </>
  );
}
