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

/** Signal: a small, always-asked entry check per dimension. Evidence: only asked
 * when Signal indicates something worth a closer look, scoped to that dimension. */
export type QuestionLevel = "signal" | "evidence";

/** What kind of organizational practice a question actually tests - not every
 * question needs to test every level (existence -> clarity -> use -> behavior ->
 * improvement); each question picks the level that reveals the most for its
 * specific capability instead of running the full ladder everywhere. */
export type QuestionType =
  | "existence"
  | "clarity"
  | "accessibility"
  | "consistency"
  | "measurement"
  | "ownership"
  | "improvement";

export interface DiagnosticQuestion {
  id: string;
  dimension: DimensionKey;
  level: QuestionLevel;
  type: QuestionType;
  text: Record<Locale, string>;
  /** True for a question where "yes" is the *bad* answer (e.g. "do the same
   * operational problems keep recurring?") so scoring can invert it instead
   * of every dimension having to special-case its own questions. */
  reverse?: boolean;
}

// A clean Signal (e.g. every Signal question answered "yes") only means
// nothing surfaced that calls for a closer look - it is never treated as
// proof the dimension is "strong" or mature. "signal" means Signal (and,
// where collected, Evidence) indicate something worth checking; it is a
// gate for attention, not a verdict on organizational maturity.
export type DimensionStatus = "no-signal" | "signal" | "insufficient-data";

export interface DimensionResult {
  dimension: DimensionKey;
  status: DimensionStatus;
  /** 0-1 average of this dimension's answered Signal questions (reverse-adjusted); null when insufficient-data. */
  score: number | null;
  answeredCount: number;
  totalCount: number;
}

export type Priority = "high" | "medium" | "low";

/** How much corroborating Evidence backs a Finding - never a maturity score
 * or a "how bad is it" measure, only a statement of how sure MUDIU is that
 * this Finding reflects reality: low = Signal alone, medium = Evidence
 * collected but incomplete, high = Evidence collected and complete. */
export type Confidence = "low" | "medium" | "high";

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
  /** Always phrased as a hedged signal, never a verdict - e.g. "A signal
   * worth checking appeared in..." never "The organization lacks...". */
  whatWeFound: Record<Locale, string>;
  evidence: Record<Locale, string[]>;
  affectedArea: Record<Locale, string>;
  priority: Priority;
  confidence: Confidence;
  whyItMatters: Record<Locale, string>;
  /** "What to validate" - a distinct, always-hedged next question, separate
   * from whyItMatters (which explains consequence, not what to check). */
  whatToValidate: Record<Locale, string>;
  /** Prompt for the optional Verification field shown on the results page. */
  verificationPrompt: Record<Locale, string>;
  missingData?: Record<Locale, string[]>;
  solutionId: string;
}

/** Local-only tracking record for one Finding - never a backend record, never
 * a score. Validation ("does this signal reflect reality?") and Adoption
 * ("do we choose to act on it?") are deliberately separate questions/fields,
 * not one collapsed step - see the Phase 2 UX spec. Independent optional
 * fields (rather than one linear status) because the two decisions can
 * change independently and either can be revisited without losing the
 * other's answer. */
export interface FindingProgress {
  /** Set once the visitor has expanded "explore what we found" at least once. */
  opened?: boolean;
  /** "Does this signal reflect your organization's reality?" */
  validation?: "validated" | "not-validated";
  /** Optional detail volunteered alongside the Validation answer - never scored. */
  validationNote?: string;
  /** "Is this worth acting on now?" - only meaningful once validation is "validated". */
  adoption?: "adopted" | "not-adopted";
  /** "What do you want to change?" - captured only when adoption is "adopted". */
  changeStatement?: string;
  /** "What would success look like?" - captured only once adoption is "adopted". */
  objective?: string;
  /** Independent of everything above: the existing "request this solution"
   * shortcut stays reachable and meaningful at any stage, unchanged. */
  helpRequested?: boolean;
}

/** The furthest point reached, derived from FindingProgress for display only
 * (e.g. in My Organization) - never stored directly, so no stage transition
 * logic can get out of sync with the fields that actually hold the answers. */
export type FindingDisplayStage =
  | "new"
  | "pending-verification"
  | "validated"
  | "not-validated"
  | "not-adopted"
  | "adopted"
  | "objective-set";

export function deriveFindingStage(progress: FindingProgress | undefined): FindingDisplayStage {
  if (!progress) return "new";
  if (progress.objective) return "objective-set";
  if (progress.adoption === "adopted") return "adopted";
  if (progress.adoption === "not-adopted") return "not-adopted";
  if (progress.validation === "validated") return "validated";
  if (progress.validation === "not-validated") return "not-validated";
  if (progress.opened) return "pending-verification";
  return "new";
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
