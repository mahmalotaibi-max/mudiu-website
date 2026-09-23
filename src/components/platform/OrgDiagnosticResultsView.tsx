"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { PlatformButton } from "@/components/platform/PlatformButton";
import { DimensionCard } from "@/components/platform/DimensionCard";
import { FindingCard } from "@/components/platform/FindingCard";
import { useOrgDiagnosis } from "@/components/platform/OrgDiagnosisProvider";
import { computeDimensionResults, computeFindings } from "@/lib/platform/orgDiagnosis";
import { solutionById } from "@/lib/platform/orgDiagnosisSolutions";
import { dimensionKeys } from "@/lib/platform/orgDiagnosisTypes";
import { dimensionLabels } from "@/lib/platform/orgDiagnosisQuestions";
import type { DimensionStatus } from "@/lib/platform/orgDiagnosisTypes";
import type { Locale } from "@/lib/platform/types";

const strings = {
  en: {
    gateTitle: "Start your free diagnostic first",
    gateBody: "This view is built from your organization's diagnostic answers.",
    gateCta: "Start Free Diagnostic",
    diagnosticHref: "/platform/ar/diagnostic",
    viewTitle: "Your MUDIU Organizational View",
    viewBody: (org: string) => `${org} - based on the information provided by the organization. This is not a benchmark or a maturity score.`,
    attentionTitle: "What needs attention?",
    attentionBody: "A short list, on purpose - the items most worth your attention right now, not everything MUDIU noticed.",
    noFindings: "No area needs attention based on what was answered - a strong, well-connected profile.",
    ctaTitle: "Continue to your organization",
    ctaBody: "Create your MUDIU workspace to keep this diagnostic, track improvement, and build on it over time.",
    ctaButton: "Create Account / Continue",
    myOrgHref: "/platform/ar/my-organization",
  },
  ar: {
    gateTitle: "ابدأ التشخيص المجاني أولًا",
    gateBody: "هذه الشاشة مبنية على إجابات تشخيص مؤسستك.",
    gateCta: "ابدأ التشخيص المجاني",
    diagnosticHref: "/platform/ar/diagnostic",
    viewTitle: "نظرة MUDIU على مؤسستك",
    viewBody: (org: string) => `${org} - استنادًا إلى المعلومات التي قدّمتها المؤسسة. هذه ليست معيارًا عالميًا (Benchmark) ولا مقياس نضج.`,
    attentionTitle: "ما الذي يحتاج انتباه؟",
    attentionBody: "قائمة قصيرة عن قصد - أهم ما يستحق انتباهك الآن، لا كل ما لاحظته MUDIU.",
    noFindings: "لا يوجد مجال يحتاج انتباهًا بناءً على الإجابات - وضع قوي ومترابط.",
    ctaTitle: "تابع إلى مؤسستك",
    ctaBody: "أنشئ مساحة عمل MUDIU الخاصة بك لحفظ هذا التشخيص، ومتابعة التحسن، والبناء عليه لاحقًا.",
    ctaButton: "أنشئ حسابك / تابع",
    myOrgHref: "/platform/ar/my-organization",
  },
};

const statusLabel: Record<DimensionStatus, Record<Locale, string>> = {
  strong: { en: "Strong", ar: "قوي" },
  "needs-attention": { en: "Needs Attention", ar: "يحتاج انتباهًا" },
  critical: { en: "Critical", ar: "حرج" },
  "insufficient-data": { en: "Insufficient Data", ar: "بيانات غير كافية" },
};

const statusDescription: Record<DimensionStatus, Record<Locale, string>> = {
  strong: {
    en: "The answers given here point to a solid, connected picture.",
    ar: "الإجابات في هذا الجزء تشير إلى صورة قوية ومترابطة.",
  },
  "needs-attention": {
    en: "There are real gaps here worth a closer look.",
    ar: "توجد فجوات حقيقية هنا تستحق نظرة أقرب.",
  },
  critical: {
    en: "This is one of the areas most worth addressing next.",
    ar: "هذا من أكثر المجالات التي تستحق المعالجة القادمة.",
  },
  "insufficient-data": {
    en: "Not enough was answered here to assess this area yet.",
    ar: "لم تتم الإجابة بما يكفي لتقييم هذا المجال بعد.",
  },
};

export function OrgDiagnosticResultsView({ locale = "en" }: { locale?: Locale }) {
  const { profile } = useOrgDiagnosis();
  const t = strings[locale];

  const dimensionResults = useMemo(() => (profile ? computeDimensionResults(profile) : null), [profile]);
  const findings = useMemo(() => (profile ? computeFindings(profile) : []), [profile]);

  if (!profile || !dimensionResults) {
    return (
      <Container className="max-w-2xl py-24 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{t.gateTitle}</h1>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted">{t.gateBody}</p>
        <div className="mt-8 flex justify-center">
          <PlatformButton href={t.diagnosticHref} locale={locale}>
            {t.gateCta}
          </PlatformButton>
        </div>
      </Container>
    );
  }

  const orgName = profile.organizationName || (locale === "ar" ? "مؤسستك" : "Your organization");

  return (
    <Container className="max-w-5xl py-12 md:py-16">
      <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">{t.viewTitle}</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{t.viewBody(orgName)}</p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {dimensionKeys.map((dimension) => {
          const result = dimensionResults[dimension];
          return (
            <DimensionCard
              key={dimension}
              label={dimensionLabels[dimension][locale]}
              status={result.status}
              statusLabel={statusLabel[result.status][locale]}
              description={statusDescription[result.status][locale]}
            />
          );
        })}
      </div>

      <div className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight text-ink">{t.attentionTitle}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{t.attentionBody}</p>

        {findings.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-line p-6 text-sm text-muted">{t.noFindings}</p>
        ) : (
          <div className="mt-6 space-y-3">
            {findings.map((finding, i) => (
              <FindingCard key={finding.id} index={i} finding={finding} solution={solutionById(finding.solutionId)} locale={locale} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-14 rounded-2xl border border-line bg-paper-alt p-6 md:p-8">
        <h2 className="text-lg font-semibold tracking-tight text-ink">{t.ctaTitle}</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{t.ctaBody}</p>
        <div className="mt-5">
          <Link
            href={t.myOrgHref}
            className="inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy hover:shadow-[0_16px_32px_-16px_rgba(30,47,82,0.5)]"
          >
            {t.ctaButton}
          </Link>
        </div>
      </div>
    </Container>
  );
}
