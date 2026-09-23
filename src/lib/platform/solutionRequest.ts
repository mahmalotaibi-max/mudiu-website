import type { Finding, MockSolution } from "@/lib/platform/orgDiagnosisTypes";
import type { Locale } from "@/lib/platform/types";

export function buildRequestHref({
  organizationName,
  solution,
  finding,
  locale,
  verificationNote,
}: {
  organizationName?: string;
  solution: MockSolution;
  finding: Finding;
  locale: Locale;
  /** The optional free-text Verification note, if the visitor filled one in.
   * Never scored, never affects Confidence - only carried along as context. */
  verificationNote?: string;
}) {
  const params = new URLSearchParams();
  params.set("source", "diagnostic");
  if (organizationName && organizationName.trim().length > 0) {
    params.set("organization", organizationName.trim());
  }
  params.set("solution", solution.title[locale]);
  params.set("problem", finding.whatWeFound[locale]);
  if (verificationNote && verificationNote.trim().length > 0) {
    params.set("verification", verificationNote.trim());
  }
  return `/contact?${params.toString()}#booking`;
}
