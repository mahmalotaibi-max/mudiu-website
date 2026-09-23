import type { MockSolution } from "@/lib/platform/orgDiagnosisTypes";

// Mock only (spec item 8): these prove the Problem -> Recommended Solution
// relationship. There is no purchase/subscription flow behind them yet.
export const mockSolutions: MockSolution[] = [
  {
    id: "strategic-direction-setup",
    title: { en: "Strategic Direction Setup", ar: "بناء الاتجاه الاستراتيجي" },
    summary: {
      en: "Turn a general sense of direction into goals decision-makers actually agree on.",
      ar: "تحويل الاتجاه العام إلى أهداف واضحة يتفق عليها أصحاب القرار فعليًا.",
    },
    includes: {
      en: ["Goal-setting workshop", "Priority mapping", "A one-page strategic direction brief"],
      ar: ["ورشة تحديد الأهداف", "ترتيب الأولويات", "ملخص استراتيجي من صفحة واحدة"],
    },
  },
  {
    id: "kpi-performance-setup",
    title: { en: "KPI & Performance Setup", ar: "بناء مؤشرات الأداء" },
    summary: {
      en: "Give every strategic goal a measurable indicator, a baseline, and a target.",
      ar: "إعطاء كل هدف استراتيجي مؤشرًا قابلًا للقياس، وخط أساس، وهدفًا رقميًا.",
    },
    includes: {
      en: ["Indicator design per goal", "Baseline data collection", "A simple tracking cadence"],
      ar: ["تصميم مؤشر لكل هدف", "جمع بيانات خط الأساس", "آلية متابعة دورية بسيطة"],
    },
  },
  {
    id: "growth-improvement",
    title: { en: "Growth Improvement", ar: "تحسين النمو" },
    summary: {
      en: "Diagnose why customer or revenue growth is lagging, and fix the highest-leverage driver.",
      ar: "تشخيص سبب تراجع نمو العملاء أو الإيرادات، ومعالجة أكثر المحركات تأثيرًا.",
    },
    includes: {
      en: ["Growth driver assessment", "Customer journey & conversion review", "A focused improvement plan"],
      ar: ["تقييم محركات النمو", "مراجعة رحلة العميل ومعدل التحويل", "خطة تحسين مركّزة"],
    },
  },
  {
    id: "process-improvement",
    title: { en: "Process Improvement", ar: "تحسين العمليات" },
    summary: {
      en: "Document the critical processes that keep breaking down and clarify who owns them.",
      ar: "توثيق العمليات الحرجة التي تتعطل باستمرار، وتوضيح المسؤول عن كل منها.",
    },
    includes: {
      en: ["Critical process mapping", "Ownership & handoff review", "Documented SOPs for priority processes"],
      ar: ["رسم العمليات الحرجة", "مراجعة المسؤوليات ونقاط التسليم", "إجراءات موثقة للعمليات الأولى بالتوثيق"],
    },
  },
  {
    id: "knowledge-sop-documentation",
    title: { en: "Knowledge & SOP Documentation", ar: "توثيق المعرفة والإجراءات" },
    summary: {
      en: "Move critical knowledge out of individual people's heads and into one approved reference.",
      ar: "نقل المعرفة الحرجة من رؤوس الأفراد إلى مرجع واحد معتمد.",
    },
    includes: {
      en: ["Critical-knowledge inventory", "SOP writing & approval", "A single source of truth for procedures"],
      ar: ["حصر المعرفة الحرجة", "كتابة الإجراءات واعتمادها", "مرجع واحد موحّد للإجراءات"],
    },
  },
  {
    id: "value-realization-review",
    title: { en: "Value Realization Review", ar: "مراجعة تحقق القيمة" },
    summary: {
      en: "Connect initiatives to the results they were meant to produce, and start measuring the gap.",
      ar: "ربط المبادرات بالنتائج التي وُجدت من أجلها، والبدء بقياس الفجوة بينهما.",
    },
    includes: {
      en: ["Initiative-to-result mapping", "Benefit measurement design", "A value-tracking starting point"],
      ar: ["ربط المبادرات بنتائجها", "تصميم طريقة قياس المنفعة", "نقطة انطلاق لتتبع القيمة"],
    },
  },
  {
    id: "market-product-validation",
    title: { en: "Market & Product Validation", ar: "التحقق من السوق والمنتج" },
    summary: {
      en: "Test a growth or product opportunity against real customer demand before investing further.",
      ar: "اختبار فرصة نمو أو منتج مقابل طلب العملاء الفعلي قبل مزيد من الاستثمار.",
    },
    includes: {
      en: ["Opportunity framing", "Lightweight market validation", "A go / no-go recommendation"],
      ar: ["تأطير الفرصة", "تحقق سريع من السوق", "توصية بالمضي أو التوقف"],
    },
  },
];

export function solutionById(id: string): MockSolution | undefined {
  return mockSolutions.find((s) => s.id === id);
}
