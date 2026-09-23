import type { Finding, Priority } from "@/lib/platform/orgDiagnosisTypes";

// Presentation-layer ranking for the results screen only - it does not
// change what computeFindings returns or how severity/priority are
// computed, it just decides which single finding (if any) is confident
// enough to present as "worth starting with" versus the rest.
//
// Ranked by (spec order): 1) gap severity (the finding's own priority,
// which already reflects dimension severity), 2) how much answer evidence
// supports it. A finding tied to more than one dimension isn't something
// the current engine models (each finding maps to exactly one dimension),
// so that criterion has nothing to rank on yet.

function severityWeight(priority: Priority): number {
  return priority === "high" ? 2 : priority === "medium" ? 1 : 0;
}

export interface PrioritySelection {
  /** The single finding worth starting with, or null when nothing stands out confidently. */
  top: Finding | null;
  /** Every other finding, in the same order computeFindings returned them. */
  rest: Finding[];
  /** True when the top two candidates are tied closely enough that picking one would be arbitrary. */
  ambiguous: boolean;
}

export function selectPriorityFinding(findings: Finding[]): PrioritySelection {
  if (findings.length === 0) {
    return { top: null, rest: [], ambiguous: false };
  }
  if (findings.length === 1) {
    return { top: findings[0], rest: [], ambiguous: false };
  }

  const ranked = [...findings].sort((a, b) => {
    const weightDiff = severityWeight(b.priority) - severityWeight(a.priority);
    if (weightDiff !== 0) return weightDiff;
    return b.evidence.ar.length - a.evidence.ar.length;
  });

  const [first, second] = ranked;
  const tied =
    severityWeight(first.priority) === severityWeight(second.priority) &&
    first.evidence.ar.length === second.evidence.ar.length;

  if (tied) {
    return { top: null, rest: findings, ambiguous: true };
  }

  return {
    top: first,
    rest: findings.filter((f) => f.id !== first.id),
    ambiguous: false,
  };
}
