// MUDIU Core Diagnostic Engine.
//
// Signal -> (conditional) Deep Dive -> Finding -> Evidence -> Confidence ->
// What to validate -> Next Step. No backend, no AI - two pure functions
// derived entirely from the profile passed in.
//
// `computeDimensionResults` only ever answers "does this dimension show a
// signal worth a closer look, or not enough data to say?" - a clean Signal
// is never treated as proof of a "strong" or mature dimension, only as
// nothing surfacing that calls for Evidence-level follow-up.
//
// `computeFindings` turns every dimension with a signal into a Finding:
// always phrased as a hedged signal ("a signal worth checking appeared
// in..."), never a verdict, with Confidence describing how much Evidence
// backs it - not how bad the gap is.

import type {
  AnswerValue,
  Confidence,
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

/** Signal-only: whether a dimension shows anything worth a deeper look.
 * Deliberately requires a perfect Signal to call it "no-signal" - any
 * partial/no answer is enough to warrant Evidence-level follow-up. */
export function computeDimensionResults(profile: OrgDiagnosticProfile): Record<DimensionKey, DimensionResult> {
  const result = {} as Record<DimensionKey, DimensionResult>;

  for (const dimension of dimensionKeys) {
    const signalQuestions = questionsFor(dimension, "signal");
    const answeredSignal = signalQuestions.filter((q) => profile.answers[q.id]);
    const answeredCount = answeredSignal.length;
    const scored: number[] = answeredSignal.map((q) => answerScore(profile.answers[q.id]!, q.reverse));

    // A supplied growth figure against its own target is stronger evidence
    // than a yes/no answer about whether growth is *tracked* - it folds
    // into the same Signal average instead of sitting outside the model.
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
      // A perfect Signal only means nothing surfaced yet - never "strong".
      status = score >= 1 ? "no-signal" : "signal";
    }

    result[dimension] = {
      dimension,
      status,
      score,
      answeredCount,
      totalCount: signalQuestions.length,
    };
  }

  return result;
}

/** Weak (non-"yes", reverse-adjusted) answers across a dimension's Signal
 * and Evidence questions - always traceable to specific questions, never
 * an opaque score. */
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

/** Unanswered Evidence-level questions only - Signal is always fully
 * answered by the time a Finding exists, so only the deep-dive questions
 * can still be "missing". */
function missingDataFor(profile: OrgDiagnosticProfile, dimension: DimensionKey, locale: "en" | "ar"): string[] {
  return questionsFor(dimension, "evidence")
    .filter((q) => !profile.answers[q.id])
    .map((q) => q.text[locale]);
}

function confidenceFor(profile: OrgDiagnosticProfile, dimension: DimensionKey): Confidence {
  const evidenceQuestions = questionsFor(dimension, "evidence");
  if (evidenceQuestions.length === 0) return "high";
  const answered = evidenceQuestions.filter((q) => profile.answers[q.id]);
  if (answered.length === 0) return "low";
  if (answered.length < evidenceQuestions.length) return "medium";
  return "high";
}

function priorityFor(weakEvidenceCount: number): Priority {
  return weakEvidenceCount >= 3 ? "high" : weakEvidenceCount >= 2 ? "medium" : "low";
}

interface FindingTemplate {
  id: string;
  dimension: DimensionKey;
  /** Always a hedged signal statement - "a signal worth checking appeared
   * in...", never a verdict like "the organization lacks...". */
  whatWeFound: Record<"en" | "ar", string>;
  whyItMatters: Record<"en" | "ar", string>;
  whatToValidate: Record<"en" | "ar", string>;
  verificationPrompt: Record<"en" | "ar", string>;
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
    whatWeFound: {
      en: "A signal worth checking appeared in the organization's ability to translate its goals into clear priorities and initiatives.",
      ar: "ظهرت إشارة تستحق التحقق في قدرة المؤسسة على ترجمة أهدافها إلى أولويات ومبادرات واضحة.",
    },
    whyItMatters: {
      en: "Without a shared, understood direction, every other decision - what to measure, prioritize, or build - loses its anchor.",
      ar: "بدون اتجاه مشترك ومفهوم بالشكل نفسه، كل قرار آخر - ماذا تقيس، أو تُولوّي، أو تبني - يفقد نقطة ارتكازه.",
    },
    whatToValidate: {
      en: "Worth checking how well the documented goals are actually linked to the initiatives currently running.",
      ar: "يستحق التحقق من مدى ربط الأهداف الموثقة فعليًا بالمبادرات الجارية.",
    },
    verificationPrompt: {
      en: "Name one strategic goal and the initiative actually linked to achieving it.",
      ar: "اذكر مثالًا لهدف استراتيجي واحد، والمبادرة المرتبطة فعليًا بتحقيقه.",
    },
    solutionId: "strategic-direction-setup",
  },
  {
    id: "measurement-gap",
    dimension: "performance",
    whatWeFound: {
      en: "A signal worth checking appeared in how much performance indicators are actually used when decisions are made.",
      ar: "ظهرت إشارة تستحق التحقق في مدى استخدام مؤشرات الأداء فعليًا عند اتخاذ القرار.",
    },
    whyItMatters: {
      en: "Without indicators actually used in decisions, having them adds no practical value.",
      ar: "بدون استخدام فعلي للمؤشرات في القرار، وجودها لا يضيف قيمة عملية.",
    },
    whatToValidate: {
      en: "Worth checking whether these indicators are actually used when reviewing performance or deciding, not just displayed.",
      ar: "يستحق التحقق مما إذا كانت هذه المؤشرات تُستخدم فعليًا عند اتخاذ القرار، لا الاكتفاء بعرضها.",
    },
    verificationPrompt: {
      en: "The last time management reviewed an indicator that declined, what decision or action followed because of it?",
      ar: "عندما تراجع الإدارة مؤشرًا تراجع، ما آخر قرار أو إجراء اتُّخذ بسببه؟",
    },
    solutionId: "kpi-performance-setup",
  },
  {
    id: "growth-gap",
    dimension: "growth",
    whatWeFound: {
      en: "A signal worth checking appeared in how clear the organization's commercial growth engine is.",
      ar: "ظهرت إشارة تستحق التحقق في وضوح محرك النمو التجاري لدى المؤسسة.",
    },
    whyItMatters: {
      en: "Without knowing the source of growth, it cannot be repeated or its weakness addressed with confidence.",
      ar: "بدون معرفة مصدر النمو، لا يمكن تكراره أو معالجة ضعفه بثقة.",
    },
    whatToValidate: {
      en: "Worth checking whether the channels or segments driving this number are actually known.",
      ar: "يستحق التحقق من معرفة القنوات أو الشرائح التي تساهم فعليًا في هذا الرقم.",
    },
    verificationPrompt: {
      en: "What was the biggest customer-acquisition channel behind the last noticeable period of growth, if any?",
      ar: "ما أكبر قناة اكتساب عملاء ساهمت في آخر فترة نمو ملحوظة، إن وُجدت؟",
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
    whatWeFound: {
      en: "A signal worth checking appeared in how well critical processes hold up regardless of who is executing them.",
      ar: "ظهرت إشارة تستحق التحقق في استمرارية تنفيذ العمليات الحرجة بغض النظر عن الشخص المنفّذ.",
    },
    whyItMatters: {
      en: "Processes that depend on one person tend to break the same way whenever that person is unavailable, and are harder for the team to improve.",
      ar: "العمليات التي تعتمد على شخص بعينه تتعطل بنفس الطريقة كلما غاب، وتصعب على الفريق تحسينها.",
    },
    whatToValidate: {
      en: "Worth checking whether this process can actually be run from its documentation alone, without repeatedly going back to one person.",
      ar: "يستحق التحقق مما إذا كان بالإمكان تنفيذ هذه العملية بالاعتماد على التوثيق وحده، دون الرجوع المستمر لشخص بعينه.",
    },
    verificationPrompt: {
      en: "Give an example of an operational problem that recurred more than once, and what kept it from being resolved for good.",
      ar: "اذكر مثالًا لمشكلة تشغيلية تكررت أكثر من مرة، وما الذي منع حلها نهائيًا.",
    },
    solutionId: "process-improvement",
  },
  {
    id: "knowledge-risk",
    dimension: "knowledge",
    whatWeFound: {
      en: "A signal worth checking appeared in how much the organization depends on specific individuals for some critical knowledge to continue.",
      ar: "ظهرت إشارة تستحق التحقق من مدى اعتماد المؤسسة على أفراد بعينهم لاستمرار بعض المعرفة الحرجة.",
    },
    whyItMatters: {
      en: "If the person holding this knowledge leaves, the ability to carry out the same task may leave with them.",
      ar: "إذا غاب صاحب هذه المعرفة، قد تغيب معه القدرة على تنفيذ المهمة نفسها.",
    },
    whatToValidate: {
      en: "Worth checking whether someone else can actually access what they'd need to carry out the same task.",
      ar: "يستحق التحقق من إمكانية وصول شخص آخر إلى ما يحتاجه لتنفيذ المهمة نفسها.",
    },
    verificationPrompt: {
      en: "If this person were unexpectedly unavailable for a month, what would actually stop or slow down?",
      ar: "لو غاب هذا الشخص لمدة شهر بلا سابق إنذار، ما الذي يتوقف أو يتأخر فعليًا؟",
    },
    solutionId: "knowledge-sop-documentation",
  },
  {
    id: "value-gap",
    dimension: "value",
    whatWeFound: {
      en: "A signal worth checking appeared in whether the organization's initiatives can be clearly linked to their actual results.",
      ar: "ظهرت إشارة تستحق التحقق من إمكانية ربط مبادرات المؤسسة بنتائجها الفعلية بوضوح.",
    },
    whyItMatters: {
      en: "Effort spent on initiatives that are never checked against results is effort spent without proof of return.",
      ar: "الجهد المبذول في مبادرات لا تُقارَن نتائجها لاحقًا هو جهد بلا دليل على عائده.",
    },
    whatToValidate: {
      en: "Worth checking whether the impact of the last major initiative can be pinned to one clear indicator.",
      ar: "يستحق التحقق مما إذا كان يمكن تحديد أثر آخر مبادرة كبيرة على مؤشر واضح بعينه.",
    },
    verificationPrompt: {
      en: "Name that initiative and the indicator that changed (or didn't) because of it.",
      ar: "اذكر اسم تلك المبادرة والمؤشر الذي تغيّر (أو لم يتغيّر) بسببها.",
    },
    solutionId: "value-realization-review",
  },
];

/** Findings, ranked by priority, covering only dimensions whose Signal (and,
 * where collected, Evidence) show something worth checking. A dimension with
 * "no-signal" or "insufficient-data" never produces a Finding. */
export function computeFindings(profile: OrgDiagnosticProfile): Finding[] {
  const dimensionResults = computeDimensionResults(profile);

  const candidates = findingTemplates.filter((t) => dimensionResults[t.dimension].status === "signal");

  const findings: Finding[] = candidates.map((template) => {
    const evidenceAr = [...answerEvidence(profile, template.dimension, "ar"), ...(template.extraEvidence?.(profile, "ar") ?? [])];
    const evidenceEn = [...answerEvidence(profile, template.dimension, "en"), ...(template.extraEvidence?.(profile, "en") ?? [])];
    const missingAr = missingDataFor(profile, template.dimension, "ar");
    const missingEn = missingDataFor(profile, template.dimension, "en");

    const finding: Finding = {
      id: template.id,
      dimension: template.dimension,
      whatWeFound: template.whatWeFound,
      evidence: { en: evidenceEn, ar: evidenceAr },
      affectedArea: { en: dimensionLabels[template.dimension].en, ar: dimensionLabels[template.dimension].ar },
      priority: priorityFor(evidenceAr.length),
      confidence: confidenceFor(profile, template.dimension),
      whyItMatters: template.whyItMatters,
      whatToValidate: template.whatToValidate,
      verificationPrompt: template.verificationPrompt,
      solutionId: template.solutionId,
    };
    if (missingAr.length > 0 || missingEn.length > 0) finding.missingData = { en: missingEn, ar: missingAr };
    return finding;
  });

  const weight = (p: Priority) => (p === "high" ? 2 : p === "medium" ? 1 : 0);
  return findings.sort((a, b) => weight(b.priority) - weight(a.priority));
}
