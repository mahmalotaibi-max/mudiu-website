import type { DiagnosticQuestion, DimensionKey } from "@/lib/platform/orgDiagnosisTypes";

export const dimensionLabels: Record<DimensionKey, Record<"en" | "ar", string>> = {
  direction: { en: "Direction", ar: "الاتجاه" },
  performance: { en: "Performance", ar: "الأداء" },
  growth: { en: "Growth", ar: "النمو" },
  operations: { en: "Operations", ar: "التشغيل" },
  knowledge: { en: "Knowledge", ar: "المعرفة" },
  value: { en: "Value", ar: "القيمة" },
};

export const dimensionQuestion: Record<DimensionKey, Record<"en" | "ar", string>> = {
  direction: {
    en: "Does the organization know where it wants to get to?",
    ar: "هل تعرف المؤسسة أين تريد أن تصل؟",
  },
  performance: {
    en: "Does it know whether it's making progress?",
    ar: "هل تعرف هل تتقدم؟",
  },
  growth: {
    en: "Does it know its growth drivers, customers, and revenue?",
    ar: "هل تعرف محركات النمو والعملاء والإيرادات؟",
  },
  operations: {
    en: "Does the way it works support its goals?",
    ar: "هل طريقة العمل تدعم أهداف المؤسسة؟",
  },
  knowledge: {
    en: "Is critical knowledge and process know-how kept inside the organization?",
    ar: "هل المعرفة والعمليات الحرجة محفوظة داخل المؤسسة؟",
  },
  value: {
    en: "Does what the organization does produce the value it's aiming for?",
    ar: "هل ما تقوم به المؤسسة ينتج القيمة التي تستهدفها؟",
  },
};

// Final question set (Phase 1 revision). Each question survived a review of
// what distinct, observable organizational capability it actually tests -
// the count (7 when every Signal is clean, up to 16 when every dimension
// needs its Evidence set) is an outcome of that review, not a target.
export const questions: DiagnosticQuestion[] = [
  // Direction - clarity of goals and whether they're shared, not just written.
  {
    id: "dir-sig-existence",
    dimension: "direction",
    level: "signal",
    type: "existence",
    text: { en: "Has the organization formally documented its strategic goals?", ar: "هل وثّقت المؤسسة أهدافها الاستراتيجية بشكل رسمي؟" },
  },
  {
    id: "dir-sig-clarity",
    dimension: "direction",
    level: "signal",
    type: "clarity",
    text: {
      en: "If we asked three employees from different departments to name the organization's top three goals, would their answers be close?",
      ar: "إذا سألنا ثلاثة موظفين من إدارات مختلفة عن أهم ثلاثة أهداف للمؤسسة، هل ستكون إجاباتهم متقاربة؟",
    },
  },
  {
    id: "dir-evi-ownership",
    dimension: "direction",
    level: "evidence",
    type: "ownership",
    text: {
      en: "Can these goals be clearly linked to the initiatives or projects currently running?",
      ar: "هل يمكن ربط هذه الأهداف بوضوح بالمبادرات أو المشاريع التي تُنفَّذ حاليًا؟",
    },
  },

  // Performance - whether indicators are actually used in decisions, not just present.
  {
    id: "perf-sig-existence",
    dimension: "performance",
    level: "signal",
    type: "existence",
    text: { en: "Are there specific indicators for tracking progress toward the main goals?", ar: "هل توجد مؤشرات محددة لقياس التقدم نحو الأهداف الرئيسية؟" },
  },
  {
    id: "perf-evi-measurement",
    dimension: "performance",
    level: "evidence",
    type: "measurement",
    text: {
      en: "Are there performance indicators that management actually uses when reviewing performance or making decisions?",
      ar: "هل توجد مؤشرات أداء تستخدمها الإدارة فعليًا عند مراجعة الأداء أو اتخاذ القرارات؟",
    },
  },
  {
    id: "perf-evi-existence",
    dimension: "performance",
    level: "evidence",
    type: "existence",
    text: {
      en: "Do these indicators have a recorded baseline and clear numeric targets?",
      ar: "هل توجد قيمة أساس (Baseline) وأهداف رقمية واضحة (Targets) لهذه المؤشرات؟",
    },
  },

  // Growth - visibility into the commercial growth engine specifically.
  {
    id: "gro-sig-measurement",
    dimension: "growth",
    level: "signal",
    type: "measurement",
    text: { en: "Is customer and revenue growth measured against a stated target?", ar: "هل يتم قياس نمو العملاء والإيرادات مقابل هدف محدد؟" },
  },
  {
    id: "gro-evi-ownership",
    dimension: "growth",
    level: "evidence",
    type: "ownership",
    text: {
      en: "Does the organization know which channels or customer segments are actually driving this growth (or its weakness)?",
      ar: "هل تعرف المؤسسة أي القنوات أو شرائح العملاء تساهم فعليًا في هذا النمو (أو ضعفه)؟",
    },
  },

  // Operations - whether execution quality survives a change of person.
  {
    id: "ops-sig-existence",
    dimension: "operations",
    level: "signal",
    type: "existence",
    text: {
      en: "Are the critical processes (the ones most affecting customers or quality) documented in a clear procedure?",
      ar: "هل العمليات الحرجة (الأكثر تأثيرًا على العميل أو الجودة) موثقة في إجراء واضح؟",
    },
  },
  {
    id: "ops-evi-accessibility",
    dimension: "operations",
    level: "evidence",
    type: "accessibility",
    text: {
      en: "Could a new employee carry out one of these processes using the documented procedure, without repeatedly going back to one specific person?",
      ar: "هل يستطيع موظف جديد تنفيذ إحدى هذه العمليات بالاعتماد على الإجراء الموثق، دون العودة المستمرة لشخص بعينه؟",
    },
  },
  {
    id: "ops-evi-improvement",
    dimension: "operations",
    level: "evidence",
    type: "improvement",
    reverse: true,
    text: { en: "Do certain operational problems keep recurring?", ar: "هل تتكرر مشاكل تشغيلية معينة باستمرار؟" },
  },
  {
    id: "ops-evi-ownership",
    dimension: "operations",
    level: "evidence",
    type: "ownership",
    text: {
      en: "When a problem occurs in one of these processes, is it immediately clear who is responsible for handling it?",
      ar: "عند حدوث مشكلة في إحدى هذه العمليات، هل من الواضح فورًا من هو المسؤول عن معالجتها؟",
    },
  },

  // Knowledge - concentration risk if a key individual is unavailable, nothing else.
  {
    id: "know-sig-existence",
    dimension: "knowledge",
    level: "signal",
    type: "existence",
    reverse: true,
    text: {
      en: "Does critical knowledge (making a certain decision, handling a key client, etc.) depend on specific individuals?",
      ar: "هل تعتمد المعرفة الحرجة (اتخاذ قرار معيّن، التعامل مع عميل رئيسي، إلخ) على أفراد معينين تحديدًا؟",
    },
  },
  {
    id: "know-evi-accessibility",
    dimension: "knowledge",
    level: "evidence",
    type: "accessibility",
    text: {
      en: "Can someone other than that individual access what they'd need to carry out the same task?",
      ar: "هل يستطيع شخص آخر غير هذا الفرد الوصول إلى ما يحتاجه لتنفيذ المهمة نفسها؟",
    },
  },

  // Value - ex-post verification that a specific initiative produced its intended benefit.
  {
    id: "val-sig-measurement",
    dimension: "value",
    level: "signal",
    type: "measurement",
    text: { en: "Does the organization measure the results of its main initiatives after they run?", ar: "هل تقيس المؤسسة نتائج المبادرات الرئيسية بعد تنفيذها؟" },
  },
  {
    id: "val-evi-measurement",
    dimension: "value",
    level: "evidence",
    type: "measurement",
    text: {
      en: "Take the last major initiative that ran - can its actual impact on a specific indicator be clearly identified?",
      ar: "خذ آخر مبادرة كبيرة نُفِّذت - هل يمكن تحديد أثرها الفعلي على مؤشر محدد بوضوح؟",
    },
  },
];

export function questionsFor(dimension: DimensionKey, level?: DiagnosticQuestion["level"]) {
  return questions.filter((q) => q.dimension === dimension && (level === undefined || q.level === level));
}
