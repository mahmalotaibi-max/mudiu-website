import type { MockSolution } from "@/lib/platform/orgDiagnosisTypes";

// Mock only (spec item 8): these prove the Problem -> Recommended Solution
// relationship. There is no purchase/subscription flow behind them yet -
// each one instead ends at a real "اطلب هذا الحل" request through the
// site's existing contact form.
export const mockSolutions: MockSolution[] = [
  {
    id: "strategic-direction-setup",
    title: { en: "Strategic Direction Setup", ar: "بناء الاتجاه الاستراتيجي" },
    whenToUse: {
      en: "Good fit when the organization's goals are unclear or not agreed on across decision-makers.",
      ar: "مناسب عندما تكون أهداف مؤسستك غير واضحة أو غير متفق عليها بين أصحاب القرار.",
    },
    includes: {
      en: ["Goal-setting workshop", "Priority mapping", "A one-page strategic direction brief"],
      ar: ["ورشة تحديد الأهداف", "ترتيب الأولويات", "ملخص استراتيجي من صفحة واحدة"],
    },
    expectedOutcome: {
      en: "Helps you leave with clear, agreed-on goals and one starting point everyone works from.",
      ar: "يساعدك على الخروج بأهداف واضحة ومتفق عليها، ونقطة انطلاق واحدة يعمل عليها الجميع.",
    },
  },
  {
    id: "kpi-performance-setup",
    title: { en: "KPI & Performance Setup", ar: "بناء مؤشرات الأداء" },
    whenToUse: {
      en: "Good fit when strategic goals lack a measurable indicator, baseline, or target.",
      ar: "مناسب عندما تفتقر أهدافك الاستراتيجية إلى مؤشر أو خط أساس أو هدف رقمي واضح.",
    },
    includes: {
      en: ["Indicator design per goal", "Baseline data collection", "A simple tracking cadence"],
      ar: ["تصميم مؤشر لكل هدف", "جمع بيانات خط الأساس", "آلية متابعة دورية بسيطة"],
    },
    expectedOutcome: {
      en: "Helps you build a clearer framework linking your organization's goals to indicators, and track progress.",
      ar: "يساعدك على بناء إطار أوضح لربط أهداف المؤسسة بالمؤشرات ومتابعة التقدم.",
    },
  },
  {
    id: "growth-improvement",
    title: { en: "Growth Improvement", ar: "تحسين النمو" },
    whenToUse: {
      en: "Good fit when customer or revenue growth is below target and the reason isn't clear.",
      ar: "مناسب عندما يكون نمو العملاء أو الإيرادات أقل من المستهدف، ولا يكون السبب واضحًا.",
    },
    includes: {
      en: ["Growth driver assessment", "Customer journey & conversion review", "A focused improvement plan"],
      ar: ["تقييم محركات النمو", "مراجعة رحلة العميل ومعدل التحويل", "خطة تحسين مركّزة"],
    },
    expectedOutcome: {
      en: "Helps you identify the one growth driver most worth focusing on now, instead of trying everything at once.",
      ar: "يساعدك على تحديد أكثر محرك نمو يستحق التركيز عليه الآن، بدل تجربة كل شيء دفعة واحدة.",
    },
  },
  {
    id: "process-improvement",
    title: { en: "Process Improvement", ar: "تحسين العمليات" },
    whenToUse: {
      en: "Good fit when the same operational problems keep recurring, or critical processes aren't documented.",
      ar: "مناسب عندما تتكرر نفس المشاكل التشغيلية، أو تكون العمليات الحرجة غير موثقة.",
    },
    includes: {
      en: ["Critical process mapping", "Ownership & handoff review", "Documented SOPs for priority processes"],
      ar: ["رسم العمليات الحرجة", "مراجعة المسؤوليات ونقاط التسليم", "إجراءات موثقة للعمليات الأولى بالتوثيق"],
    },
    expectedOutcome: {
      en: "Helps you document the critical processes and make clear who owns each step of them.",
      ar: "يساعدك على توثيق العمليات الحرجة وتوضيح المسؤول عن كل خطوة فيها.",
    },
  },
  {
    id: "knowledge-sop-documentation",
    title: { en: "Knowledge & SOP Documentation", ar: "توثيق المعرفة والإجراءات" },
    whenToUse: {
      en: "Good fit when critical knowledge depends on specific individuals rather than a shared, approved reference.",
      ar: "مناسب عندما تعتمد المعرفة الحرجة في مؤسستك على أفراد معينين بدل مرجع موحّد.",
    },
    includes: {
      en: ["Critical-knowledge inventory", "SOP writing & approval", "A single source of truth for procedures"],
      ar: ["حصر المعرفة الحرجة", "كتابة الإجراءات واعتمادها", "مرجع واحد موحّد للإجراءات"],
    },
    expectedOutcome: {
      en: "Helps you move that knowledge into one approved reference anyone on the team can go back to.",
      ar: "يساعدك على نقل هذه المعرفة إلى مرجع واحد معتمد يقدر يرجع له أي شخص في الفريق.",
    },
  },
  {
    id: "value-realization-review",
    title: { en: "Value Realization Review", ar: "مراجعة تحقق القيمة" },
    whenToUse: {
      en: "Good fit when initiatives run, but it isn't clear whether they produced the value they were meant to.",
      ar: "مناسب عندما تُنفَّذ المبادرات لكن لا يُعرف إن كانت حققت القيمة المرجوة منها فعليًا.",
    },
    includes: {
      en: ["Initiative-to-result mapping", "Benefit measurement design", "A value-tracking starting point"],
      ar: ["ربط المبادرات بنتائجها", "تصميم طريقة قياس المنفعة", "نقطة انطلاق لتتبع القيمة"],
    },
    expectedOutcome: {
      en: "Helps you connect each initiative to its actual result, and start measuring the gap between planned and realized.",
      ar: "يساعدك على ربط كل مبادرة بنتيجتها الفعلية، والبدء بقياس الفجوة بين المخطط والمتحقق.",
    },
  },
  {
    id: "market-product-validation",
    title: { en: "Market & Product Validation", ar: "التحقق من السوق والمنتج" },
    whenToUse: {
      en: "Good fit when the organization is considering a growth or product opportunity before investing in it.",
      ar: "مناسب عندما تفكر مؤسستك في فرصة نمو أو منتج جديد قبل الاستثمار فيه فعليًا.",
    },
    includes: {
      en: ["Opportunity framing", "Lightweight market validation", "A go / no-go recommendation"],
      ar: ["تأطير الفرصة", "تحقق سريع من السوق", "توصية بالمضي أو التوقف"],
    },
    expectedOutcome: {
      en: "Helps you know whether the opportunity is worth investing in, backed by market evidence rather than assumptions alone.",
      ar: "يساعدك على معرفة إن كانت الفرصة تستحق الاستثمار، بدليل من السوق لا افتراضات فقط.",
    },
  },
];

export function solutionById(id: string): MockSolution | undefined {
  return mockSolutions.find((s) => s.id === id);
}
