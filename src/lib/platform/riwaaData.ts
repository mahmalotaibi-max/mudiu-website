// A curated, hand-written demo (not derived from the generic diagnostics
// engine) for a fictional healthy-food company - "رِواء للأغذية". Its job is
// narrative: let a first-time visitor see, in under a minute, how MUDIU
// walks the full chain for one initiative that's working end to end, and
// how it flags a second initiative whose expected benefit was never
// defined. Numbers and copy are fixed mock data, not computed.

export type BadgeTone = "navy" | "orange" | "muted";

export interface RiwaaNode {
  key: string;
  label: string;
  title: string;
  metrics?: { label: string; value: string }[];
  note?: string;
  badge?: { text: string; tone: BadgeTone };
  missing?: boolean;
  missingReason?: string;
  gapWarning?: { title: string; body: string };
}

export interface RiwaaChain {
  id: string;
  tabLabel: string;
  nodes: RiwaaNode[];
}

const sharedGoal = "زيادة مبيعات المنتجات الصحية وتحسين تجربة العميل";

export const riwaaChains: RiwaaChain[] = [
  {
    id: "bundle",
    tabLabel: "باقة \"اختيارات صحية\" - سلسلة مكتملة",
    nodes: [
      { key: "goal", label: "الهدف الاستراتيجي", title: sharedGoal },
      {
        key: "indicator",
        label: "المؤشر",
        title: "نسبة المبيعات من المنتجات الصحية",
        metrics: [
          { label: "خط الأساس", value: "22%" },
          { label: "المستهدف", value: "35%" },
          { label: "الحالي", value: "29%" },
        ],
      },
      { key: "gap", label: "الفجوة", title: "انخفاض تبني المنتجات الصحية مقارنة بالمستهدف." },
      { key: "priority", label: "الأولوية", title: "زيادة تبني المنتجات الصحية." },
      {
        key: "initiative",
        label: "المبادرة",
        title: "إطلاق باقة \"اختيارات صحية\" مع توصيات شخصية داخل التطبيق.",
        badge: { text: "قيد التنفيذ", tone: "navy" },
      },
      { key: "output", label: "المخرج", title: "إطلاق الباقة وتفعيل التوصيات الشخصية." },
      { key: "product", label: "المنتج / الخدمة", title: "خدمة التوصيات والشراء للمنتجات الصحية." },
      {
        key: "benefit",
        label: "المنفعة",
        title: "زيادة شراء المنتجات الصحية وتحسين سهولة اكتشافها",
        metrics: [
          { label: "المقياس", value: "نسبة شراء المنتجات الصحية" },
          { label: "خط الأساس", value: "22%" },
          { label: "المستهدف", value: "35%" },
          { label: "الحالي", value: "29%" },
          { label: "الدليل", value: "متوفر" },
        ],
        note: "المنفعة قابلة للقياس، لكن الأثر لم يُثبَت بعد.",
      },
      {
        key: "impact",
        label: "الأثر المتوقع",
        title: "تحسّن سلوك العملاء نحو خيارات غذائية صحية.",
        badge: { text: "متوقع - غير مُثبَت بعد", tone: "muted" },
      },
    ],
  },
  {
    id: "app",
    tabLabel: "تطبيق العملاء الجديد - فجوة منفعة",
    nodes: [
      { key: "goal", label: "الهدف الاستراتيجي", title: sharedGoal },
      { key: "initiative", label: "المبادرة", title: "إطلاق تطبيق جديد للعملاء." },
      { key: "output", label: "المخرج", title: "إطلاق النسخة الأولى من التطبيق." },
      {
        key: "benefit",
        label: "المنفعة",
        title: "",
        missing: true,
        gapWarning: {
          title: "⚠️ فجوة منفعة",
          body: "هذه المبادرة مرتبطة بهدف استراتيجي، لكن لم يتم تحديد المنفعة المتوقعة منها بشكل قابل للقياس.",
        },
      },
      {
        key: "impact",
        label: "الأثر",
        title: "",
        missing: true,
        missingReason: "لا يمكن تحديد الأثر المتوقع قبل تحديد منفعة قابلة للقياس أولًا.",
      },
    ],
  },
];
