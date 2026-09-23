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

export const questions: DiagnosticQuestion[] = [
  // A. Direction
  { id: "dir-1", dimension: "direction", text: { en: "Does the organization have clear goals?", ar: "هل لدى المؤسسة أهداف واضحة؟" } },
  { id: "dir-2", dimension: "direction", text: { en: "Are those goals linked to clear priorities?", ar: "هل الأهداف مرتبطة بأولويات واضحة؟" } },
  { id: "dir-3", dimension: "direction", text: { en: "Do decision-makers agree on what needs to be achieved?", ar: "هل يعرف أصحاب القرار ما الذي يجب تحقيقه؟" } },

  // B. Performance
  { id: "perf-1", dimension: "performance", text: { en: "Do the goals have indicators?", ar: "هل توجد مؤشرات لقياس الأهداف؟" } },
  { id: "perf-2", dimension: "performance", text: { en: "Is there a recorded baseline for these indicators?", ar: "هل توجد قيمة أساس (Baseline) لهذه المؤشرات؟" } },
  { id: "perf-3", dimension: "performance", text: { en: "Are there clear numeric targets?", ar: "هل توجد أهداف رقمية واضحة (Targets)؟" } },
  { id: "perf-4", dimension: "performance", text: { en: "Are the trends tracked regularly?", ar: "هل تتم متابعة اتجاه المؤشرات بشكل دوري؟" } },

  // C. Growth
  { id: "gro-1", dimension: "growth", text: { en: "Are there clear growth targets?", ar: "هل توجد أهداف واضحة للنمو؟" } },
  { id: "gro-2", dimension: "growth", text: { en: "Is customer growth measured?", ar: "هل يتم قياس نمو العملاء؟" } },
  { id: "gro-3", dimension: "growth", text: { en: "Is revenue measured regularly?", ar: "هل يتم قياس الإيرادات بشكل منتظم؟" } },
  { id: "gro-4", dimension: "growth", text: { en: "Does the organization know its main growth drivers?", ar: "هل تعرف المؤسسة أهم محركات النمو لديها؟" } },

  // D. Operations
  { id: "ops-1", dimension: "operations", text: { en: "Are the organization's core processes known and clear?", ar: "هل العمليات الأساسية معروفة وواضحة؟" } },
  { id: "ops-2", dimension: "operations", text: { en: "Are critical processes documented?", ar: "هل العمليات الحرجة موثقة؟" } },
  { id: "ops-3", dimension: "operations", text: { en: "Are responsibilities clear across teams?", ar: "هل المسؤوليات واضحة بين الفرق؟" } },
  {
    id: "ops-4",
    dimension: "operations",
    text: { en: "Do the same operational problems keep recurring?", ar: "هل تتكرر مشاكل تشغيلية معينة باستمرار؟" },
    reverse: true,
  },

  // E. Knowledge
  {
    id: "know-1",
    dimension: "knowledge",
    text: { en: "Does critical knowledge depend on specific individuals?", ar: "هل تعتمد المعرفة الحرجة على أفراد معينين؟" },
    reverse: true,
  },
  { id: "know-2", dimension: "knowledge", text: { en: "Are documents and procedures available to whoever needs them?", ar: "هل الوثائق والإجراءات متاحة لمن يحتاجها؟" } },
  { id: "know-3", dimension: "knowledge", text: { en: "Is there one approved, unified version of the procedures?", ar: "هل توجد نسخة معتمدة وموحدة للإجراءات؟" } },

  // F. Value
  { id: "val-1", dimension: "value", text: { en: "Does the organization know what value it should be producing?", ar: "هل تعرف المؤسسة ما القيمة التي يجب أن تحققها؟" } },
  { id: "val-2", dimension: "value", text: { en: "Are the results of initiatives measured after they run?", ar: "هل تقيس المؤسسة نتائج المبادرات بعد تنفيذها؟" } },
  { id: "val-3", dimension: "value", text: { en: "Can the organization connect its initiatives to their actual results?", ar: "هل تستطيع المؤسسة الربط بين مبادراتها ونتائجها الفعلية؟" } },
];

export function questionsFor(dimension: DimensionKey) {
  return questions.filter((q) => q.dimension === dimension);
}
