// MUDIU Core Diagnostic Engine - data model.
//
// This is a second, independent diagnostic model from the one in
// `types.ts`/`diagnostics.ts` (the Goal->Impact value chain used by the
// Strategy/Overview/Insights/Executive pages). That engine answers "is our
// strategy connected to delivered value?". This one answers a broader,
// earlier question - "where does this organization stand, and what should
// it work on next?" - across six organizational dimensions, before a chain
// like that even exists. The two engines are kept separate on purpose: they
// model different questions, and merging them would force one to distort
// the other's rules.
//
// Sector-neutral by design (spec item 10): the same six dimensions, the
// same question bank, and the same engine serve both a government
// department and a commercial business. What can eventually vary per
// sector is copy/wording and which mock solution a finding maps to - not
// a second engine.

import type { Locale } from "@/lib/platform/types";

export type DimensionKey = "direction" | "performance" | "growth" | "operations" | "knowledge" | "value";

export const dimensionKeys: DimensionKey[] = [
  "direction",
  "performance",
  "growth",
  "operations",
  "knowledge",
  "value",
];

/** A visitor's answer to one question - kept as a tri-state rather than a free-text
 * or numeric field so the same question bank works before any real organizational
 * data exists yet, and so answers stay easy to aggregate into a dimension status. */
export type AnswerValue = "yes" | "partial" | "no";

export interface DiagnosticQuestion {
  id: string;
  dimension: DimensionKey;
  text: Record<Locale, string>;
  /** True for a question where "yes" is the *bad* answer (e.g. "do the same
   * operational problems keep recurring?") so scoring can invert it instead
   * of every dimension having to special-case its own questions. */
  reverse?: boolean;
}

export type DimensionStatus = "strong" | "needs-attention" | "critical" | "insufficient-data";

export interface DimensionResult {
  dimension: DimensionKey;
  status: DimensionStatus;
  /** 0-1 average of this dimension's answered questions (reverse-adjusted); null when insufficient-data. */
  score: number | null;
  answeredCount: number;
  totalCount: number;
}

export type Priority = "high" | "medium" | "low";

export interface MockSolution {
  id: string;
  title: Record<Locale, string>;
  /** "Good fit when..." - a short, generic description of the kind of finding this solution answers. */
  whenToUse: Record<Locale, string>;
  /** "What it helps with" - exactly 3 points. */
  includes: Record<Locale, string[]>;
  /** "Expected outcome" - one plain, non-inflated sentence. */
  expectedOutcome: Record<Locale, string>;
}

export interface Finding {
  id: string;
  dimension: DimensionKey;
  title: Record<Locale, string>;
  whatWeFound: Record<Locale, string>;
  evidence: Record<Locale, string[]>;
  affectedArea: Record<Locale, string>;
  priority: Priority;
  whyItMatters: Record<Locale, string>;
  potentialDriver?: Record<Locale, string>;
  missingData?: Record<Locale, string[]>;
  solutionId: string;
}

/** Optional, org-specific numeric evidence that supplements (never replaces)
 * the answer-driven evidence - this is how the Riwaa demo can show real
 * numbers (8% vs a 15% target) while a real visitor's diagnostic, which has
 * no such figures yet, still produces a fully-formed finding from their
 * answers alone. */
export interface OrgDiagnosticProfile {
  organizationName: string;
  sector: "government" | "business";
  answers: Partial<Record<string, AnswerValue>>;
  growthMetrics?: { currentGrowthPct: number; targetGrowthPct: number };
  /** ISO timestamp set when the diagnostic was completed - not user-provided. */
  completedAt?: string;
}
