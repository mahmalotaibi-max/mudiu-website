"use client";

import { useState } from "react";
import Link from "next/link";
import { buildRequestHref } from "@/lib/platform/solutionRequest";
import type { Finding, MockSolution } from "@/lib/platform/orgDiagnosisTypes";
import type { Locale } from "@/lib/platform/types";

const strings = {
  en: {
    whenToUse: "Good fit when",
    helpsWith: "What it helps with",
    expectedOutcome: "Expected outcome",
    exploreSolution: "Explore solution",
    requestSolution: "Request this solution",
  },
  ar: {
    whenToUse: "مناسب عندما",
    helpsWith: "ما الذي يساعد عليه؟",
    expectedOutcome: "المخرج المتوقع",
    exploreSolution: "استكشف الحل",
    requestSolution: "اطلب هذا الحل",
  },
};

function SolutionRecapCard({
  solution,
  finding,
  organizationName,
  locale,
}: {
  solution: MockSolution;
  finding: Finding;
  organizationName?: string;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const t = strings[locale];
  const requestHref = buildRequestHref({ organizationName, solution, finding, locale });

  return (
    <div className="rounded-2xl border border-line p-5">
      <p className="text-sm font-semibold text-ink">{solution.title[locale]}</p>

      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-3 inline-flex items-center rounded-full border border-line px-4 py-2 text-xs font-medium text-ink transition-colors hover:border-ink"
        >
          {t.exploreSolution}
        </button>
      ) : (
        <div className="mt-3">
          <p className="text-xs font-semibold text-muted">{t.whenToUse}</p>
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
            href={requestHref}
            className="mt-4 inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-navy"
          >
            {t.requestSolution}
          </Link>
        </div>
      )}
    </div>
  );
}

export function SolutionsRecap({
  items,
  organizationName,
  locale,
}: {
  items: { finding: Finding; solution: MockSolution }[];
  organizationName?: string;
  locale: Locale;
}) {
  const seen = new Set<string>();
  const unique = items.filter(({ solution }) => {
    if (seen.has(solution.id)) return false;
    seen.add(solution.id);
    return true;
  });

  if (unique.length === 0) return null;

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {unique.map(({ finding, solution }) => (
        <SolutionRecapCard
          key={solution.id}
          solution={solution}
          finding={finding}
          organizationName={organizationName}
          locale={locale}
        />
      ))}
    </div>
  );
}
