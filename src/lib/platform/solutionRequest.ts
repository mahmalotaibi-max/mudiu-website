import type { Finding, MockSolution } from "@/lib/platform/orgDiagnosisTypes";
import type { Locale } from "@/lib/platform/types";

export function buildRequestHref({
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
