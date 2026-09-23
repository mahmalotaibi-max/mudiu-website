"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildRequestHref } from "@/lib/platform/solutionRequest";
import { useOrgDiagnosis } from "@/components/platform/OrgDiagnosisProvider";
import type { Confidence, Finding, Priority } from "@/lib/platform/orgDiagnosisTypes";
import type { MockSolution } from "@/lib/platform/orgDiagnosisTypes";
import type { Locale } from "@/lib/platform/types";

const strings = {
  en: {
    evidence: "Evidence",
    affectedArea: "Affected area",
    priority: "Priority",
    confidence: "Confidence",
    whyItMatters: "Why it matters",
    whatToValidate: "What's worth validating",
    missingData: "Missing data",
    recommendedSolution: "Recommended solution",
    whenToUse: "Good fit when",
    helpsWith: "What it helps with",
    expectedOutcome: "Expected outcome",
    explore: "Explore what we found",
    exploreSolution: "Explore solution",
    requestSolution: "Request this solution",
    verificationTitle: "Want to check this more deeply?",
    verificationPlaceholder: "Optional - your answer is only shared if you request help below.",
    priorityBadge: "Priority to verify",
    priorityLabel: { high: "High", medium: "Medium", low: "Low" } as Record<Priority, string>,
    confidenceLabel: { low: "Low", medium: "Medium", high: "High" } as Record<Confidence, string>,
  },
  ar: {
    evidence: "الدليل",
    affectedArea: "المجال",
    priority: "الأولوية",
    confidence: "درجة الثقة",
    whyItMatters: "لماذا تستحق الانتباه",
    whatToValidate: "ما الذي يستحق التحقق منه",
    missingData: "بيانات ناقصة",
    recommendedSolution: "الحل المقترح",
    whenToUse: "مناسب عندما",
    helpsWith: "ما الذي يساعد عليه؟",
    expectedOutcome: "المخرج المتوقع",
    explore: "استكشف ما اكتشفناه",
    exploreSolution: "استكشف الحل",
    requestSolution: "اطلب هذا الحل",
    verificationTitle: "هل تريد التحقق بشكل أعمق؟",
    verificationPlaceholder: "اختياري - لا تُشارَك إجابتك إلا إذا طلبت المساعدة أدناه.",
    priorityBadge: "الأولوية للتحقق",
    priorityLabel: { high: "عالية", medium: "متوسطة", low: "منخفضة" } as Record<Priority, string>,
    confidenceLabel: { low: "منخفضة", medium: "متوسطة", high: "عالية" } as Record<Confidence, string>,
  },
};

const priorityDot: Record<Priority, string> = {
  high: "bg-orange",
  medium: "bg-navy",
  low: "bg-line",
};

export function FindingCard({
  finding,
  solution,
  organizationName,
  locale = "en",
  variant = "secondary",
}: {
  finding: Finding;
  solution: MockSolution | undefined;
  organizationName?: string;
  locale?: Locale;
  variant?: "priority" | "secondary";
}) {
  const { advanceFindingStatus } = useOrgDiagnosis();
  const [open, setOpen] = useState(false);
  const [solutionOpen, setSolutionOpen] = useState(false);
  const [verificationNote, setVerificationNote] = useState("");
  const t = strings[locale];
  const isPriority = variant === "priority";

  const requestHref = solution
    ? buildRequestHref({ organizationName, solution, finding, locale, verificationNote })
    : undefined;

  function handleToggle() {
    setOpen((v) => {
      const next = !v;
      if (next) advanceFindingStatus(finding.id, "pending-verification");
      return next;
    });
  }

  function handleVerificationBlur() {
    if (verificationNote.trim().length > 0) advanceFindingStatus(finding.id, "verified");
  }

  function handleRequestClick() {
    advanceFindingStatus(finding.id, "help-requested");
  }

  const priorityPill = (
    <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-medium text-muted">
      <span className={cn("size-1.5 rounded-full", priorityDot[finding.priority])} aria-hidden />
      {t.priorityLabel[finding.priority]}
    </span>
  );

  const confidencePill = (
    <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-medium text-muted">
      {t.confidence}: {t.confidenceLabel[finding.confidence]}
    </span>
  );

  return (
    <div
      className={cn(
        "rounded-2xl border",
        isPriority ? "border-ink/15 bg-paper-alt/60 p-6 md:p-7" : "border-line px-5 py-4",
      )}
    >
      {isPriority ? (
        <div>
          <span className="inline-flex items-center rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
            {t.priorityBadge}
          </span>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-ink md:text-xl">{finding.affectedArea[locale]}</h3>
            <div className="flex items-center gap-3">
              {priorityPill}
              {confidencePill}
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink">{finding.whatWeFound[locale]}</p>

          <div className="mt-4">
            <p className="text-xs font-semibold text-muted">{t.whyItMatters}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink">{finding.whyItMatters[locale]}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-muted">{t.affectedArea}</p>
            <p className="mt-1 text-sm font-semibold text-ink">{finding.affectedArea[locale]}</p>
            <p className="mt-1.5 text-sm text-muted">{finding.whatWeFound[locale]}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            {priorityPill}
            {confidencePill}
          </div>
        </div>
      )}

      {!isPriority && (
        <p className="mt-2 text-xs text-muted">{finding.whyItMatters[locale]}</p>
      )}

      <button
        type="button"
        onClick={handleToggle}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:text-navy"
      >
        {t.explore}
        {open ? <ChevronUp className="size-3.5" aria-hidden /> : <ChevronDown className="size-3.5" aria-hidden />}
      </button>

      {open && (
        <div className="mt-4 space-y-4 border-t border-line pt-4">
          {finding.evidence[locale].length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted">{t.evidence}</p>
              <ul className="mt-1.5 space-y-1">
                {finding.evidence[locale].map((line) => (
                  <li key={line} className="text-sm text-ink">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold text-muted">{t.whatToValidate}</p>
            <p className="mt-1 text-sm text-ink">{finding.whatToValidate[locale]}</p>
          </div>

          {finding.missingData && finding.missingData[locale].length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted">{t.missingData}</p>
              <ul className="mt-1.5 space-y-1">
                {finding.missingData[locale].map((line) => (
                  <li key={line} className="text-sm text-muted">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <p className="text-sm font-medium text-ink">{t.verificationTitle}</p>
            <p className="mt-1 text-xs text-muted">{finding.verificationPrompt[locale]}</p>
            <textarea
              value={verificationNote}
              onChange={(e) => setVerificationNote(e.target.value)}
              onBlur={handleVerificationBlur}
              placeholder={t.verificationPlaceholder}
              rows={2}
              className="mt-2 w-full resize-none rounded-xl border border-line px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-ink"
            />
          </div>

          {solution && (
            <div className="rounded-xl bg-paper-alt p-4">
              {!solutionOpen ? (
                <button
                  type="button"
                  onClick={() => setSolutionOpen(true)}
                  className="inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-navy"
                >
                  {t.exploreSolution}
                </button>
              ) : (
                <div>
                  <p className="text-xs font-semibold text-muted">{t.recommendedSolution}</p>
                  <p className="mt-1 text-sm font-semibold text-ink">{solution.title[locale]}</p>

                  <p className="mt-3 text-xs font-semibold text-muted">{t.whenToUse}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink">{solution.whenToUse[locale]}</p>

                  <p className="mt-3 text-xs font-semibold text-muted">{t.helpsWith}</p>
                  <ul className="mt-1.5 list-inside list-disc space-y-1">
                    {solution.includes[locale].map((item) => (
                      <li key={item} className="text-sm text-ink">
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-3 text-xs font-semibold text-muted">{t.expectedOutcome}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink">{solution.expectedOutcome[locale]}</p>

                  <Link
                    href={requestHref!}
                    onClick={handleRequestClick}
                    className="mt-4 inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-navy"
                  >
                    {t.requestSolution}
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
