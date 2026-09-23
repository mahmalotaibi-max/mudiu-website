"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { PlatformButton } from "@/components/platform/PlatformButton";
import { DimensionCard } from "@/components/platform/DimensionCard";
import { FindingCard } from "@/components/platform/FindingCard";
import { SolutionsRecap } from "@/components/platform/SolutionsRecap";
import { useOrgDiagnosis } from "@/components/platform/OrgDiagnosisProvider";
import { computeDimensionResults, computeFindings } from "@/lib/platform/orgDiagnosis";
import { selectPriorityFinding } from "@/lib/platform/orgDiagnosisPriority";
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
    viewIntro: (org: string) => `Based on ${org}'s answers.`,
    disclaimer: "These results are built from the information you provided about your organization, not a benchmark against the market.",
    overviewEyebrow: "Quick overview of the six dimensions",
    overviewNote: "This is an early snapshot, not a final verdict - the detail behind it is below.",
    transitionLead: "Now, what's worth starting with?",
    transitionSub: "The diagnostic surfaced a number of areas worth attention. Here's how we've ranked them for you.",
    priorityTitle: "What's worth your attention first",
    priorityBody: "Based on your answers, some areas show up as priorities to verify and act on before others.",
    ambiguousTitle: "No single priority is clear yet",
    ambiguousBody: "There are areas worth verifying, but the current information isn't enough to rank them with confidence.",
    otherAreasTitle: "Other areas worth attention",
    strongTitle: "No signal requiring a closer look appeared",
    strongBody: "Based on the initial answers, nothing across the dimensions currently calls for a deeper review.",
    insufficientTitle: "Not enough information yet",
    insufficientBody: "Several dimensions don't have enough answers yet to know whether they need attention. Complete more of the diagnostic for a fuller picture.",
    nextStepTitle: "From diagnosis to next step",
    nextStepBody: "The diagnostic shows where the organization is worth looking first. The next step is turning that observation into an actionable move.",
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
    viewIntro: (org: string) => `استنادًا إلى إجابات ${org}.`,
    disclaimer: "النتائج مبنية على المعلومات التي قدمتها عن مؤسستك، وليست مقارنة معيارية بالسوق.",
    overviewEyebrow: "نظرة سريعة على الأبعاد الستة",
    overviewNote: "هذه لمحة أولية، وليست حكمًا نهائيًا - التفاصيل الفعلية أدناه.",
    transitionLead: "الآن، ما الذي يستحق أن تبدأ به؟",
    transitionSub: "حدد التشخيص عددًا من المجالات التي تستحق الانتباه. نرتبها لك لتعرف أين تبدأ.",
    priorityTitle: "ما يستحق انتباهك أولًا",
    priorityBody: "بناءً على إجاباتك، تظهر بعض المجالات كأولوية للتحقق والعمل قبل غيرها.",
    ambiguousTitle: "لم تتضح أولوية واحدة بعد",
    ambiguousBody: "توجد مجالات تستحق التحقق، لكن المعلومات الحالية لا تكفي لترتيبها بثقة.",
    otherAreasTitle: "مجالات أخرى تستحق الانتباه",
    strongTitle: "لم تظهر أي إشارة تستدعي التعمق الآن",
    strongBody: "بناءً على الإجابات الأولية، لم يتضح ما يستدعي فحصًا أعمق في أي من الأبعاد حاليًا.",
    insufficientTitle: "المعلومات غير كافية بعد",
    insufficientBody: "عدة أبعاد لا تملك إجابات كافية لمعرفة ما إذا كانت تحتاج انتباهًا. أكمل جزءًا أكبر من التشخيص للحصول على صورة أوضح.",
    nextStepTitle: "من التشخيص إلى الخطوة التالية",
    nextStepBody: "التشخيص يوضح أين تستحق المؤسسة أن تنظر أولًا. أما الخطوة التالية فهي تحويل هذه الملاحظة إلى إجراء قابل للتنفيذ.",
    ctaTitle: "تابع إلى مؤسستك",
    ctaBody: "أنشئ مساحة عمل MUDIU الخاصة بك لحفظ هذا التشخيص، ومتابعة التحسن، والبناء عليه لاحقًا.",
    ctaButton: "أنشئ حسابك / تابع",
    myOrgHref: "/platform/ar/my-organization",
  },
};

const statusLabel: Record<DimensionStatus, Record<Locale, string>> = {
  "no-signal": { en: "No signal to review", ar: "لا توجد إشارة تستدعي التعمق" },
  signal: { en: "Signal worth checking", ar: "ظهرت إشارة تستحق التحقق" },
  "insufficient-data": { en: "Insufficient Data", ar: "بيانات غير كافية" },
};

const statusDescription: Record<DimensionStatus, Record<Locale, string>> = {
  "no-signal": {
    en: "The initial answers here didn't surface anything calling for a closer look yet.",
    ar: "الإجابات الأولية في هذا الجزء لم تُظهر ما يستدعي فحصًا أعمق الآن.",
  },
  signal: {
    en: "A signal appeared here that's worth a closer look.",
    ar: "ظهرت إشارة في هذا الجزء تستحق فحصًا أعمق.",
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
  const selection = useMemo(() => selectPriorityFinding(findings), [findings]);

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
  const hasInsufficientData = dimensionKeys.some((d) => dimensionResults[d].status === "insufficient-data");
  const solutionItems = findings
    .map((finding) => {
      const solution = solutionById(finding.solutionId);
      return solution ? { finding, solution } : null;
    })
    .filter((item): item is { finding: (typeof findings)[number]; solution: NonNullable<ReturnType<typeof solutionById>> } => item !== null);

  return (
    <Container className="max-w-5xl py-12 md:py-16">
      <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">{t.viewTitle}</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{t.viewIntro(orgName)}</p>
      <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-muted/80">{t.disclaimer}</p>

      <div className="mt-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">{t.overviewEyebrow}</p>
        <p className="mt-1 text-xs text-muted">{t.overviewNote}</p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-paper-alt p-6">
        <p className="text-base font-semibold text-ink">{t.transitionLead}</p>
        <p className="mt-1 text-sm font-medium text-muted">{t.transitionSub}</p>
      </div>

      <div className="mt-8">
        {findings.length === 0 ? (
          <div className="rounded-2xl border border-line p-6">
            <h2 className="text-xl font-semibold tracking-tight text-ink">
              {hasInsufficientData ? t.insufficientTitle : t.strongTitle}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              {hasInsufficientData ? t.insufficientBody : t.strongBody}
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold tracking-tight text-ink">{t.priorityTitle}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{t.priorityBody}</p>

            {selection.ambiguous || !selection.top ? (
              <div className="mt-6 space-y-6">
                <div className="rounded-2xl border border-line bg-paper-alt p-6">
                  <p className="text-base font-semibold text-ink">{t.ambiguousTitle}</p>
                  <p className="mt-1 text-sm text-muted">{t.ambiguousBody}</p>
                </div>
                <div className="space-y-3">
                  {selection.rest.map((finding) => (
                    <FindingCard
                      key={finding.id}
                      finding={finding}
                      solution={solutionById(finding.solutionId)}
                      organizationName={profile.organizationName}
                      locale={locale}
                      variant="secondary"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-6 space-y-8">
                <FindingCard
                  finding={selection.top}
                  solution={solutionById(selection.top.solutionId)}
                  organizationName={profile.organizationName}
                  locale={locale}
                  variant="priority"
                />

                {selection.rest.length > 0 && (
                  <div>
                    <h3 className="text-base font-semibold text-ink">{t.otherAreasTitle}</h3>
                    <div className="mt-4 space-y-3">
                      {selection.rest.map((finding) => (
                        <FindingCard
                          key={finding.id}
                          finding={finding}
                          solution={solutionById(finding.solutionId)}
                          organizationName={profile.organizationName}
                          locale={locale}
                          variant="secondary"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {findings.length > 0 && (
        <div className="mt-14">
          <div className="rounded-2xl border border-line bg-paper-alt p-6">
            <p className="text-base font-semibold text-ink">{t.nextStepTitle}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{t.nextStepBody}</p>
          </div>
          <SolutionsRecap items={solutionItems} organizationName={profile.organizationName} locale={locale} />
        </div>
      )}

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
