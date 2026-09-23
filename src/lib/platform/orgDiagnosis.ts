// MUDIU Core Diagnostic Engine.
//
// Two pure functions, no backend: `computeDimensionResults` turns a
// profile's answers into a status per dimension, and `computeFindings`
// turns the same answers into a short, explained list of what needs
// attention - never a bare score. Every value below is derived from the
// profile passed in; nothing here is a hardcoded example number, so the
// exact same functions produce Riwaa's specific findings and a real
// visitor's very different ones.

import type {
  AnswerValue,
  DimensionKey,
  DimensionResult,
  DimensionStatus,
  Finding,
  OrgDiagnosticProfile,
  Priority,
} from "@/lib/platform/orgDiagnosisTypes";
import { dimensionKeys } from "@/lib/platform/orgDiagnosisTypes";
import { dimensionLabels, questionsFor } from "@/lib/platform/orgDiagnosisQuestions";

function answerScore(value: AnswerValue, reverse: boolean | undefined): number {
  const base = value === "yes" ? 1 : value === "partial" ? 0.5 : 0;
  return reverse ? 1 - base : base;
}

export function computeDimensionResults(profile: OrgDiagnosticProfile): Record<DimensionKey, DimensionResult> {
  const result = {} as Record<DimensionKey, DimensionResult>;

  for (const dimension of dimensionKeys) {
    const qs = questionsFor(dimension);
    const answeredQuestions = qs.filter((q) => profile.answers[q.id]);
    const answeredCount = answeredQuestions.length;
    const scored: number[] = answeredQuestions.map((q) => answerScore(profile.answers[q.id]!, q.reverse));

    // When an organization has supplied an actual growth figure against its
    // own target, that outcome is stronger evidence than a yes/no answer
    // about whether growth is *tracked* - so it folds into the same average
    // instead of sitting outside the model as a special case. It affects the
    // score, not the answered/total question count shown in the UI.
    if (dimension === "growth" && profile.growthMetrics) {
      const { currentGrowthPct, targetGrowthPct } = profile.growthMetrics;
      if (targetGrowthPct > 0) {
        scored.push(Math.max(0, Math.min(1, currentGrowthPct / targetGrowthPct)));
      }
    }

    let status: DimensionStatus;
    let score: number | null = null;
    if (answeredCount === 0 && !(dimension === "growth" && profile.growthMetrics)) {
      status = "insufficient-data";
    } else {
      score = scored.reduce((a, b) => a + b, 0) / scored.length;
      status = score >= 0.75 ? "strong" : score >= 0.4 ? "needs-attention" : "critical";
    }

    result[dimension] = {
      dimension,
      status,
      score,
      answeredCount,
      totalCount: qs.length,
    };
  }

  return result;
}

function priorityFor(status: DimensionStatus): Priority {
  return status === "critical" ? "high" : "medium";
}

/** Evidence built from the actual weak answers in a dimension - e.g. "نمو
 * العملاء: غير مقاس" - so a finding is always traceable to specific
 * questions, not an opaque score. */
function answerEvidence(profile: OrgDiagnosticProfile, dimension: DimensionKey, locale: "en" | "ar"): string[] {
  const answerLabel: Record<AnswerValue, Record<"en" | "ar", string>> = {
    yes: { en: "Yes", ar: "نعم" },
    partial: { en: "Partial", ar: "جزئي" },
    no: { en: "No", ar: "لا" },
  };
  const lines: string[] = [];
  for (const q of questionsFor(dimension)) {
    const answer = profile.answers[q.id];
    if (!answer) continue;
    const weak = answerScore(answer, q.reverse) < 1;
    if (weak) lines.push(`${q.text[locale]}: ${answerLabel[answer][locale]}`);
  }
  return lines;
}

function missingDataFor(profile: OrgDiagnosticProfile, dimension: DimensionKey, locale: "en" | "ar"): string[] {
  return questionsFor(dimension)
    .filter((q) => !profile.answers[q.id])
    .map((q) => q.text[locale]);
}

interface FindingTemplate {
  id: string;
  dimension: DimensionKey;
  title: Record<"en" | "ar", string>;
  whatWeFound: Record<"en" | "ar", string>;
  whyItMatters: Record<"en" | "ar", string>;
  potentialDriver?: Record<"en" | "ar", string>;
  solutionId: string;
  /** Extra evidence lines beyond the answer-driven ones - this is where Riwaa's
   * exact demo numbers (8% vs. a 15% target) come from; a real visitor's
   * finding simply has none of these. */
  extraEvidence?: (profile: OrgDiagnosticProfile, locale: "en" | "ar") => string[];
}

const findingTemplates: FindingTemplate[] = [
  {
    id: "direction-gap",
    dimension: "direction",
    title: { en: "Direction Gap", ar: "فجوة الاتجاه" },
    whatWeFound: {
      en: "The organization's goals are not yet clear or agreed on across decision-makers.",
      ar: "أهداف المؤسسة غير واضحة أو غير متفق عليها بعد بين أصحاب القرار.",
    },
    whyItMatters: {
      en: "Without a shared direction, every other decision - what to measure, prioritize, or build - has no anchor.",
      ar: "بدون اتجاه مشترك، كل قرار آخر - ماذا تقيس، أو تُولوّي، أو تبني - يفقد نقطة ارتكازه.",
    },
    potentialDriver: {
      en: "Goals may exist informally but were never written down or agreed on together.",
      ar: "قد توجد أهداف بشكل غير رسمي لكنها لم تُكتب أو يُتفق عليها معًا.",
    },
    solutionId: "strategic-direction-setup",
  },
  {
    id: "measurement-gap",
    dimension: "performance",
    title: { en: "Measurement Gap", ar: "فجوة القياس" },
    whatWeFound: {
      en: "Some strategic goals do not have a measurable indicator, baseline, or target.",
      ar: "بعض الأهداف الاستراتيجية لا تملك مؤشرًا قابلًا للقياس أو خط أساس أو هدفًا رقميًا.",
    },
    whyItMatters: {
      en: "Without a baseline and a target, the organization cannot tell whether it is actually making progress.",
      ar: "بدون خط أساس وهدف رقمي، لا تستطيع المؤسسة معرفة ما إذا كانت تتقدم فعليًا أم لا.",
    },
    solutionId: "kpi-performance-setup",
  },
  {
    id: "growth-gap",
    dimension: "growth",
    title: { en: "Growth Gap", ar: "فجوة النمو" },
    whatWeFound: {
      en: "Customer or revenue growth is not clearly measured against a stated target.",
      ar: "نمو العملاء أو الإيرادات غير مقاس بوضوح مقابل هدف محدد.",
    },
    whyItMatters: {
      en: "Without visibility into growth drivers, the organization cannot tell which efforts are actually paying off.",
      ar: "بدون رؤية واضحة لمحركات النمو، لا تستطيع المؤسسة معرفة أي الجهود تُجدي فعلًا.",
    },
    potentialDriver: {
      en: "Low conversion rate.",
      ar: "انخفاض معدل التحويل.",
    },
    solutionId: "growth-improvement",
    extraEvidence: (profile, locale) => {
      if (!profile.growthMetrics) return [];
      const { currentGrowthPct, targetGrowthPct } = profile.growthMetrics;
      return locale === "ar"
        ? [`نمو العملاء الحالي: ${currentGrowthPct}%`, `الهدف: ${targetGrowthPct}%`]
        : [`Current customer growth: ${currentGrowthPct}%`, `Target: ${targetGrowthPct}%`];
    },
  },
  {
    id: "operating-gap",
    dimension: "operations",
    title: { en: "Operating Gap", ar: "فجوة التشغيل" },
    whatWeFound: {
      en: "Critical business processes are not consistently documented or clearly owned.",
      ar: "العمليات التشغيلية الحرجة غير موثقة بشكل ثابت أو غير واضحة المسؤولية.",
    },
    whyItMatters: {
      en: "Undocumented processes tend to break the same way repeatedly, and depend on whoever happens to remember them.",
      ar: "العمليات غير الموثقة تتعطل بنفس الطريقة بشكل متكرر، وتعتمد على مَن يتذكرها فقط.",
    },
    solutionId: "process-improvement",
  },
  {
    id: "knowledge-risk",
    dimension: "knowledge",
    title: { en: "Knowledge Risk", ar: "مخاطرة معرفية" },
    whatWeFound: {
      en: "Critical knowledge appears to depend on specific individuals rather than a shared, approved reference.",
      ar: "المعرفة الحرجة تعتمد على أفراد معينين بدلًا من مرجع موحّد ومعتمد.",
    },
    whyItMatters: {
      en: "If a key person leaves or is unavailable, that knowledge - and the ability to run the process - can leave with them.",
      ar: "إذا غاب شخص رئيسي أو ترك المؤسسة، قد تغيب معه هذه المعرفة والقدرة على تشغيل العملية.",
    },
    solutionId: "knowledge-sop-documentation",
  },
  {
    id: "value-gap",
    dimension: "value",
    title: { en: "Value Gap", ar: "فجوة القيمة" },
    whatWeFound: {
      en: "It is not clear whether the organization's initiatives are producing the value they were meant to.",
      ar: "غير واضح ما إذا كانت مبادرات المؤسسة تُحقق القيمة التي وُجدت من أجلها.",
    },
    whyItMatters: {
      en: "Effort spent on initiatives that are never checked against results is effort spent without proof of return.",
      ar: "الجهد المبذول في مبادرات لا تُقارَن نتائجها لاحقًا هو جهد بلا دليل على عائده.",
    },
    solutionId: "value-realization-review",
  },
];

/** 3-5 bilingual findings (spec item 6), ranked by severity, covering only
 * dimensions that are not "strong". */
export function computeFindings(profile: OrgDiagnosticProfile): Finding[] {
  const dimensionResults = computeDimensionResults(profile);

  const candidates = findingTemplates
    .map((t) => ({ template: t, result: dimensionResults[t.dimension] }))
    .filter(({ result }) => result.status === "critical" || result.status === "needs-attention");

  candidates.sort((a, b) => {
    const weight = (s: DimensionStatus) => (s === "critical" ? 2 : 1);
    return weight(b.result.status) - weight(a.result.status);
  });

  const top = candidates.slice(0, 5);

  return top.map(({ template, result }) => {
    const evidenceAr = [...answerEvidence(profile, template.dimension, "ar"), ...(template.extraEvidence?.(profile, "ar") ?? [])];
    const evidenceEn = [...answerEvidence(profile, template.dimension, "en"), ...(template.extraEvidence?.(profile, "en") ?? [])];
    const missingAr = missingDataFor(profile, template.dimension, "ar");
    const missingEn = missingDataFor(profile, template.dimension, "en");

    const finding: Finding = {
      id: template.id,
      dimension: template.dimension,
      title: template.title,
      whatWeFound: template.whatWeFound,
      evidence: { en: evidenceEn, ar: evidenceAr },
      affectedArea: { en: dimensionLabels[template.dimension].en, ar: dimensionLabels[template.dimension].ar },
      priority: priorityFor(result.status),
      whyItMatters: template.whyItMatters,
      solutionId: template.solutionId,
    };
    if (template.potentialDriver) finding.potentialDriver = template.potentialDriver;
    if (missingAr.length > 0 || missingEn.length > 0) finding.missingData = { en: missingEn, ar: missingAr };
    return finding;
  });
}

export function answeredCount(profile: OrgDiagnosticProfile): number {
  return Object.keys(profile.answers).length;
}
