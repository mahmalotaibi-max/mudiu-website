"use client";

import { useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { PlatformButton } from "@/components/platform/PlatformButton";
import { useOrgDiagnosis } from "@/components/platform/OrgDiagnosisProvider";
import { computeDimensionResults, computeFindings } from "@/lib/platform/orgDiagnosis";
import { dimensionKeys } from "@/lib/platform/orgDiagnosisTypes";
import { dimensionLabels } from "@/lib/platform/orgDiagnosisQuestions";
import type { DimensionStatus } from "@/lib/platform/orgDiagnosisTypes";
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
    openFindings: (n: number) => `${n} open ${n === 1 ? "finding" : "findings"}`,
    roadmapTitle: "What this workspace will hold as it grows",
    roadmapBody:
      "This is a working prototype, not a live database yet - your answers are saved only in this browser. The sections below are the architecture this profile is designed to grow into.",
    resultsCta: "Back to results",
    resultsHref: "/platform/ar/diagnostic/results",
    roadmapItems: [
      "Organization Profile",
      "Goals",
      "KPIs",
      "Diagnostic Results",
      "Findings",
      "Priorities",
      "Improvement Plans",
      "Initiatives",
      "Products & Services",
      "Processes",
      "Procedures",
      "Benefits",
      "Impact",
      "Progress History",
    ],
  },
  ar: {
    gateTitle: "لا توجد مؤسسة بعد",
    gateBody: "شغّل التشخيص المجاني لإنشاء ملف مؤسستك في MUDIU.",
    gateCta: "ابدأ التشخيص المجاني",
    diagnosticHref: "/platform/ar/diagnostic",
    eyebrow: "مؤسستي",
    lastRun: (date: string) => `آخر تشخيص: ${date}`,
    openFindings: (n: number) => `${n} ${n === 1 ? "ملاحظة مفتوحة" : "ملاحظات مفتوحة"}`,
    roadmapTitle: "ما الذي ستحفظه هذه المساحة مع نموها",
    roadmapBody:
      "هذا نموذج أولي يعمل فعليًا، وليس قاعدة بيانات حية بعد - إجاباتك محفوظة في هذا المتصفح فقط. الأقسام أدناه هي البنية التي صُمم هذا الملف ليتوسع إليها لاحقًا.",
    resultsCta: "العودة إلى النتيجة",
    resultsHref: "/platform/ar/diagnostic/results",
    roadmapItems: [
      "ملف المؤسسة",
      "الأهداف",
      "المؤشرات",
      "نتائج التشخيص",
      "الملاحظات (Findings)",
      "الأولويات",
      "خطط التحسين",
      "المبادرات",
      "المنتجات والخدمات",
      "العمليات",
      "الإجراءات",
      "المنافع",
      "الأثر",
      "سجل التقدم عبر الوقت",
    ],
  },
};

const dotClass: Record<DimensionStatus, string> = {
  strong: "bg-ink",
  "needs-attention": "bg-navy",
  critical: "bg-orange",
  "insufficient-data": "bg-line",
};

export function MyOrganizationView({ locale = "en" }: { locale?: Locale }) {
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
      <p className="mt-3 text-sm text-muted">
        {t.lastRun(date)} · {t.openFindings(findings.length)}
      </p>

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

      <div className="mt-6">
        <PlatformButton href={t.resultsHref} locale={locale} variant="secondary">
          {t.resultsCta}
        </PlatformButton>
      </div>

      <div className="mt-14 border-t border-line pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-ink">{t.roadmapTitle}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{t.roadmapBody}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {t.roadmapItems.map((item) => (
            <div key={item} className="rounded-xl border border-dashed border-line px-4 py-3 text-sm text-muted">
              {item}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
