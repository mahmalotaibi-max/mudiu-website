"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Finding, Priority } from "@/lib/platform/orgDiagnosisTypes";
import type { MockSolution } from "@/lib/platform/orgDiagnosisTypes";
import type { Locale } from "@/lib/platform/types";

const strings = {
  en: {
    evidence: "Evidence",
    affectedArea: "Affected area",
    priority: "Priority",
    whyItMatters: "Why it matters",
    potentialDriver: "Potential driver",
    missingData: "Missing data",
    recommendedSolution: "Recommended solution",
    whenToUse: "Good fit when",
    helpsWith: "What it helps with",
    expectedOutcome: "Expected outcome",
    exploreSolution: "Explore solution",
    requestSolution: "Request this solution",
    priorityLabel: { high: "High", medium: "Medium", low: "Low" } as Record<Priority, string>,
  },
  ar: {
    evidence: "الدليل",
    affectedArea: "المجال المتأثر",
    priority: "الأولوية",
    whyItMatters: "لماذا تستحق الانتباه",
    potentialDriver: "ما قد تكون مرتبطة به",
    missingData: "بيانات ناقصة",
    recommendedSolution: "الحل المقترح",
    whenToUse: "مناسب عندما",
    helpsWith: "ما الذي يساعد عليه؟",
    expectedOutcome: "المخرج المتوقع",
    exploreSolution: "استكشف الحل",
    requestSolution: "اطلب هذا الحل",
    priorityLabel: { high: "عالية", medium: "متوسطة", low: "منخفضة" } as Record<Priority, string>,
  },
};

const priorityDot: Record<Priority, string> = {
  high: "bg-orange",
  medium: "bg-navy",
  low: "bg-line",
};

export function FindingCard({
  index,
  finding,
  solution,
  organizationName,
  locale = "en",
}: {
  index: number;
  finding: Finding;
  solution: MockSolution | undefined;
  organizationName?: string;
  locale?: Locale;
}) {
  const [open, setOpen] = useState(false);
  const [solutionOpen, setSolutionOpen] = useState(false);
  const t = strings[locale];

  const requestHref = solution ? buildRequestHref({ organizationName, solution, finding, locale }) : undefined;

  return (
    <div className="rounded-2xl border border-line">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-start"
      >
        <div>
          <p className="text-xs font-semibold text-muted">{String(index + 1).padStart(2, "0")}</p>
          <p className="mt-1 text-base font-semibold text-ink">{finding.title[locale]}</p>
          <p className="mt-1 text-sm text-muted">{finding.whatWeFound[locale]}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-muted">
            <span className={cn("size-1.5 rounded-full", priorityDot[finding.priority])} aria-hidden />
            {t.priorityLabel[finding.priority]}
          </span>
          {open ? <ChevronUp className="size-4 text-muted" aria-hidden /> : <ChevronDown className="size-4 text-muted" aria-hidden />}
        </div>
      </button>

      {open && (
        <div className="space-y-4 border-t border-line px-5 py-5">
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold text-muted">{t.affectedArea}</p>
              <p className="mt-1 text-sm text-ink">{finding.affectedArea[locale]}</p>
            </div>
            {finding.potentialDriver && (
              <div>
                <p className="text-xs font-semibold text-muted">{t.potentialDriver}</p>
                <p className="mt-1 text-sm text-ink">{finding.potentialDriver[locale]}</p>
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold text-muted">{t.whyItMatters}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink">{finding.whyItMatters[locale]}</p>
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

function buildRequestHref({
  organizationName,
  solution,
  finding,
  locale,
}: {
  organizationName?: string;
  solution: MockSolution;
  finding: Finding;
  locale: Locale;
}) {
  const params = new URLSearchParams();
  params.set("source", "diagnostic");
  if (organizationName && organizationName.trim().length > 0) {
    params.set("organization", organizationName.trim());
  }
  params.set("solution", solution.title[locale]);
  params.set("problem", finding.whatWeFound[locale]);
  return `/contact?${params.toString()}#booking`;
}
