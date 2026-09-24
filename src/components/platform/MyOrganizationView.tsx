"use client";

import { useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { PlatformButton } from "@/components/platform/PlatformButton";
import { useOrgDiagnosis } from "@/components/platform/OrgDiagnosisProvider";
import { computeDimensionResults, computeFindings } from "@/lib/platform/orgDiagnosis";
import { deriveFindingStage, dimensionKeys } from "@/lib/platform/orgDiagnosisTypes";
import { dimensionLabels } from "@/lib/platform/orgDiagnosisQuestions";
import type { DimensionStatus, FindingDisplayStage } from "@/lib/platform/orgDiagnosisTypes";
import type { Locale } from "@/lib/platform/types";
import { cn } from "@/lib/utils";

const strings = {
  en: {
    gateTitle: "No organization yet",
    gateBody: "Run the free diagnostic to create your MUDIU organizational profile.",
    gateCta: "Start Free Diagnostic",
    diagnosticHref: "/platform/ar/diagnostic",
    eyebrow: "My Organization",
    lastRun: (date: string) => `Last diagnostic: ${date}`,
    findingsTitle: "Findings",
    findingsBody: "The signals from your last diagnostic, and where each one stands.",
    noFindings: "No findings are tracked yet - nothing surfaced, or the diagnostic hasn't been completed.",
    resultsCta: "Open in results",
    resultsHref: "/platform/ar/diagnostic/results",
    helpRequestedTag: "Help requested",
    changeLabel: "Change: ",
    objectiveLabel: "Objective: ",
    statusLabel: {
      new: "New signal",
      "pending-verification": "Pending verification",
      validated: "Validated",
      "not-validated": "Signal didn't hold up",
      deferred: "Deferred",
      "needs-validation": "Needs more validation",
      adopted: "Worth working on",
      "objective-set": "Objective set",
    } as Record<FindingDisplayStage, string>,
  },
  ar: {
    gateTitle: "لا توجد مؤسسة بعد",
    gateBody: "شغّل التشخيص المجاني لإنشاء ملف مؤسستك في MUDIU.",
    gateCta: "ابدأ التشخيص المجاني",
    diagnosticHref: "/platform/ar/diagnostic",
    eyebrow: "مؤسستي",
    lastRun: (date: string) => `آخر تشخيص: ${date}`,
    findingsTitle: "الملاحظات (Findings)",
    findingsBody: "الإشارات التي ظهرت في آخر تشخيص، وحالة كل واحدة منها.",
    noFindings: "لا توجد ملاحظات متتبَّعة بعد - إما لم تظهر أي إشارة، أو لم يُكمَل التشخيص بعد.",
    resultsCta: "فتح في صفحة النتيجة",
    resultsHref: "/platform/ar/diagnostic/results",
    helpRequestedTag: "طلب مساعدة",
    changeLabel: "التغيير المطلوب: ",
    objectiveLabel: "الهدف: ",
    statusLabel: {
      new: "إشارة جديدة",
      "pending-verification": "بانتظار التحقق",
      validated: "تم التحقق",
      "not-validated": "لم تثبت الإشارة",
      deferred: "مؤجل",
      "needs-validation": "يحتاج مزيدًا من التحقق",
      adopted: "يستحق العمل عليه",
      "objective-set": "هدف محدد",
    } as Record<FindingDisplayStage, string>,
  },
};

const dotClass: Record<DimensionStatus, string> = {
  "no-signal": "bg-ink",
  signal: "bg-orange",
  "insufficient-data": "bg-line",
};

const trackingDotClass: Record<FindingDisplayStage, string> = {
  new: "bg-line",
  "pending-verification": "bg-navy",
  validated: "bg-ink",
  "not-validated": "bg-line",
  deferred: "bg-line",
  "needs-validation": "bg-navy",
  adopted: "bg-orange",
  "objective-set": "bg-orange",
};

export function MyOrganizationView({ locale = "en" }: { locale?: Locale }) {
  const { profile, findingProgress } = useOrgDiagnosis();
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
  const date = profile.completedAt
    ? new Date(profile.completedAt).toLocaleDateString(locale === "ar" ? "ar-SA-u-ca-gregory" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "-";

  return (
    <Container className="max-w-4xl py-12 md:py-16">
      <p className="text-xs font-medium text-muted">{t.eyebrow}</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink md:text-3xl">{orgName}</h1>
      <p className="mt-3 text-sm text-muted">{t.lastRun(date)}</p>

      <div className="mt-8 flex flex-wrap gap-2">
        {dimensionKeys.map((dimension) => (
          <span
            key={dimension}
            className="flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-sm text-ink"
          >
            <span className={cn("size-1.5 rounded-full", dotClass[dimensionResults[dimension].status])} aria-hidden />
            {dimensionLabels[dimension][locale]}
          </span>
        ))}
      </div>

      <div className="mt-14 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink">{t.findingsTitle}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{t.findingsBody}</p>

        {findings.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-line p-6 text-sm text-muted">{t.noFindings}</p>
        ) : (
          <div className="mt-6 divide-y divide-line rounded-2xl border border-line">
            {findings.map((finding) => {
              const progress = findingProgress[finding.id];
              const stage = deriveFindingStage(progress);
              return (
                <div key={finding.id} className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm text-ink">{finding.whatWeFound[locale]}</p>
                    {progress?.changeStatement && (
                      <p className="mt-1 text-xs text-muted">
                        {t.changeLabel}
                        {progress.changeStatement}
                      </p>
                    )}
                    {progress?.objective && (
                      <p className="mt-1 text-xs text-muted">
                        {t.objectiveLabel}
                        {progress.objective}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-1.5">
                    <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
                      <span className={cn("size-1.5 rounded-full", trackingDotClass[stage])} aria-hidden />
                      {t.statusLabel[stage]}
                    </span>
                    {progress?.helpRequested && (
                      <span className="whitespace-nowrap rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
                        {t.helpRequestedTag}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6">
          <PlatformButton href={t.resultsHref} locale={locale} variant="secondary">
            {t.resultsCta}
          </PlatformButton>
        </div>
      </div>
    </Container>
  );
}
