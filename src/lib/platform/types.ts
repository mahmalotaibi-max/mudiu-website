// Data model for the MUDIU Platform prototype: a single chain that
// connects strategic intent to delivered value.
//
//   Goal -> Indicator -> Gap -> Priority -> Initiative -> Output
//        -> Product/Service -> Benefit -> Impact
//
// Every relationship below is optional on purpose — the sample dataset
// leaves some links unset so the diagnostics engine has real gaps to find,
// instead of a hand-picked list of findings.

export type Locale = "en" | "ar";

export type ImpactStatus = "expected" | "observed" | "verified";
export type EvidenceStatus = "none" | "partial" | "verified";

export interface StrategicGoal {
  id: string;
  title: string;
  ownerDept: string;
}

export interface Indicator {
  id: string;
  goalId: string;
  name: string;
  unit: string;
  baseline: number | null;
  current: number | null;
  target: number | null;
}

export interface Priority {
  id: string;
  goalId: string;
  title: string;
}

export interface Initiative {
  id: string;
  title: string;
  department: string;
  goalId: string | null;
  priorityId: string | null;
}

export interface Output {
  id: string;
  initiativeId: string;
  title: string;
}

export interface ProductService {
  id: string;
  outputId: string;
  title: string;
  kind: "product" | "service";
}

export interface Benefit {
  id: string;
  productServiceId: string;
  initiativeId: string;
  title: string;
  ownerRole: string;
  measurable: boolean;
  hasBaseline: boolean;
}

export interface Impact {
  id: string;
  benefitId: string;
  title: string;
  status: ImpactStatus;
  evidenceStatus: EvidenceStatus;
  indicatorName: string;
}

export interface OrganizationDataset {
  name: string;
  goals: StrategicGoal[];
  indicators: Indicator[];
  priorities: Priority[];
  initiatives: Initiative[];
  outputs: Output[];
  productsServices: ProductService[];
  benefits: Benefit[];
  impacts: Impact[];
}

export type GapType =
  | "alignment"
  | "measurement"
  | "baseline"
  | "benefit-definition"
  | "benefit-measurement"
  | "impact-evidence"
  | "overlap";

export interface Finding {
  id: string;
  type: GapType;
  severity: "high" | "medium" | "low";
  entityIds: string[];
  count: number;
  message: string;
}

export interface ReadinessScores {
  strategicAlignment: number;
  performanceReadiness: number;
  benefitReadiness: number;
  impactReadiness: number;
}

/** One fully-resolved (or partially-resolved) walk through the chain, used by the Strategy map. */
export interface ChainNode {
  key:
    | "goal"
    | "indicator"
    | "gap"
    | "priority"
    | "initiative"
    | "output"
    | "product"
    | "benefit"
    | "impact";
  label: string;
  title: string | null;
  detail: string | null;
  missing: boolean;
  missingReason?: string;
  /** Structured key/value pairs (e.g. Baseline / Current / Target) shown as a small table instead of one run-on sentence. */
  metrics?: { label: string; value: string }[];
  /** A short, plain-language evidence sentence, e.g. "Benefit is measurable, but evidence is incomplete." */
  note?: string;
}

export interface Chain {
  goalId: string;
  goalTitle: string;
  nodes: ChainNode[];
  complete: boolean;
}
