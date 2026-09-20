import type { OrganizationDataset } from "@/lib/platform/types";

// Arabic-language mirror of sampleData.ts: same IDs and the exact same
// relationships (and the same deliberate gaps), only the human-readable
// text is translated. Keeping the IDs identical means the diagnostics
// engine, gap detection, and scoring work unchanged for either language -
// only the message templates need a locale.

export const sampleOrganizationAr: OrganizationDataset = {
  name: "مؤسسة افتراضية",

  goals: [
    { id: "g1", title: "تحسين الوصول إلى الخدمات الصحية", ownerDept: "قطاع الخدمات الصحية" },
    { id: "g2", title: "زيادة تبني الخدمات الرقمية", ownerDept: "التحول الرقمي" },
    { id: "g3", title: "تعزيز الاستدامة المالية", ownerDept: "المالية" },
    { id: "g4", title: "تحسين تجربة الموظف", ownerDept: "الموارد البشرية" },
    { id: "g5", title: "تعزيز رضا العملاء", ownerDept: "تجربة العملاء" },
    { id: "g6", title: "تقليل زمن تقديم الخدمة", ownerDept: "العمليات" },
    { id: "g7", title: "توسيع برامج التواصل المجتمعي", ownerDept: "التنمية المجتمعية" },
    { id: "g8", title: "تحسين جودة البيانات وحوكمتها", ownerDept: "تقنية المعلومات" },
    { id: "g9", title: "زيادة نسبة التوطين في القوى العاملة", ownerDept: "الموارد البشرية" },
  ],

  indicators: [
    { id: "ind1", goalId: "g1", name: "متوسط وقت انتظار الموعد", unit: "دقيقة", baseline: 48, current: 35.4, target: 30 },
    { id: "ind2", goalId: "g2", name: "نسبة المعاملات الرقمية", unit: "٪", baseline: 40, current: 55, target: 70 },
    { id: "ind3", goalId: "g3", name: "نسبة التكاليف التشغيلية", unit: "٪", baseline: null, current: 62, target: 55 },
    { id: "ind4", goalId: "g5", name: "مؤشر رضا العملاء", unit: "٪", baseline: 68, current: 71, target: 80 },
    { id: "ind5", goalId: "g6", name: "متوسط زمن تقديم الخدمة", unit: "يوم", baseline: 9, current: 7, target: 5 },
    { id: "ind6", goalId: "g8", name: "مؤشر جودة البيانات", unit: "٪", baseline: null, current: 58, target: 85 },
  ],

  priorities: [
    { id: "p1", goalId: "g1", title: "تحسين سهولة الوصول للمواعيد" },
    { id: "p2", goalId: "g2", title: "تبسيط التسجيل الرقمي" },
    { id: "p3", goalId: "g5", title: "تخصيص تجربة العميل" },
    { id: "p4", goalId: "g6", title: "أتمتة الإجراءات اليدوية" },
  ],

  initiatives: [
    { id: "i1", title: "تطوير حجز المواعيد الرقمي", department: "قطاع الخدمات الصحية", goalId: "g1", priorityId: "p1" },
    { id: "i2", title: "دمج المحفظة الرقمية", department: "التحول الرقمي", goalId: "g2", priorityId: "p2" },
    { id: "i3", title: "تطوير برنامج الولاء", department: "تجربة العملاء", goalId: "g5", priorityId: "p3" },
    { id: "i4", title: "أتمتة الإجراءات - المرحلة الأولى", department: "العمليات", goalId: "g6", priorityId: "p4" },
    { id: "i5", title: "أتمتة الإجراءات - المرحلة الثانية", department: "العمليات", goalId: "g6", priorityId: "p4" },
    { id: "i6", title: "تحديث مركز الاتصال", department: "تجربة العملاء", goalId: "g5", priorityId: null },
    { id: "i7", title: "تعزيز حوكمة البيانات", department: "تقنية المعلومات", goalId: "g8", priorityId: null },
    { id: "i15", title: "أتمتة التقارير المالية", department: "المالية", goalId: "g3", priorityId: null },
    { id: "i16", title: "تحليلات ملاحظات العملاء", department: "تجربة العملاء", goalId: "g5", priorityId: "p3" },
    { id: "i17", title: "رقمنة السجلات الصحية", department: "قطاع الخدمات الصحية", goalId: "g1", priorityId: null },
    { id: "i18", title: "خدمة تذكير المواعيد عبر الرسائل", department: "قطاع الخدمات الصحية", goalId: "g1", priorityId: "p1" },
    { id: "i8", title: "برنامج العافية الوظيفية", department: "الموارد البشرية", goalId: null, priorityId: null },
    { id: "i9", title: "إعادة تصميم النشرة الداخلية", department: "الاتصال المؤسسي", goalId: null, priorityId: null },
    { id: "i10", title: "تحديث لوحات الفروع", department: "العمليات", goalId: null, priorityId: null },
    { id: "i11", title: "إيقاف الأنظمة القديمة", department: "تقنية المعلومات", goalId: null, priorityId: null },
    { id: "i12", title: "أيام التطوع المجتمعي", department: "التنمية المجتمعية", goalId: null, priorityId: null },
    { id: "i13", title: "برنامج التوطين السريع", department: "الموارد البشرية", goalId: null, priorityId: null },
    { id: "i14", title: "تطوير بوابة الموردين", department: "المالية", goalId: null, priorityId: null },
  ],

  outputs: [
    { id: "o1", initiativeId: "i1", title: "منصة حجز مواعيد محسّنة" },
    { id: "o2", initiativeId: "i2", title: "وحدة محفظة رقمية متكاملة" },
    { id: "o3", initiativeId: "i3", title: "قواعد برنامج ولاء معاد تصميمها" },
    { id: "o4", initiativeId: "i4", title: "مسار اعتماد آلي" },
    { id: "o5", initiativeId: "i5", title: "مسار تقارير آلي" },
    { id: "o6", initiativeId: "i6", title: "نظام مركز اتصال موحّد" },
    { id: "o7", initiativeId: "i7", title: "سياسة وأدوات حوكمة البيانات" },
    { id: "o8", initiativeId: "i15", title: "تقارير مالية آلية" },
    { id: "o9", initiativeId: "i16", title: "مسار بيانات ملاحظات العملاء" },
    { id: "o10", initiativeId: "i17", title: "سجلات مرضى رقمية" },
    { id: "o11", initiativeId: "i18", title: "مسار تذكير آلي" },
  ],

  productsServices: [
    { id: "ps1", outputId: "o1", title: "خدمة حجز المواعيد", kind: "service" },
    { id: "ps2", outputId: "o2", title: "تطبيق المحفظة الرقمية", kind: "product" },
    { id: "ps3", outputId: "o3", title: "منصة مكافآت الولاء", kind: "product" },
    { id: "ps4", outputId: "o4", title: "أداة مسار الاعتماد", kind: "product" },
    { id: "ps6", outputId: "o6", title: "منصة مركز الاتصال الموحّدة", kind: "service" },
    { id: "ps9", outputId: "o9", title: "لوحة تحليلات الملاحظات", kind: "product" },
    { id: "ps10", outputId: "o10", title: "نظام السجلات الصحية الرقمية", kind: "product" },
    { id: "ps11", outputId: "o11", title: "خدمة التذكير عبر الرسائل", kind: "service" },
  ],

  benefits: [
    { id: "b1", productServiceId: "ps1", initiativeId: "i1", title: "تقليل وقت الانتظار", ownerRole: "مدير تجربة المريض", measurable: true, hasBaseline: true },
    { id: "b2", productServiceId: "ps2", initiativeId: "i2", title: "معاملات أسرع وبدون نقد", ownerRole: "مدير المنتجات الرقمية", measurable: true, hasBaseline: true },
    { id: "b3", productServiceId: "ps3", initiativeId: "i3", title: "زيادة معدل تكرار الشراء", ownerRole: "مدير تجربة العملاء", measurable: true, hasBaseline: true },
    { id: "b4", productServiceId: "ps4", initiativeId: "i4", title: "تقليل أخطاء المعالجة اليدوية", ownerRole: "مدير العمليات", measurable: false, hasBaseline: false },
    { id: "b6", productServiceId: "ps6", initiativeId: "i6", title: "تقليل زمن حل المكالمات", ownerRole: "مدير مركز الاتصال", measurable: true, hasBaseline: false },
    { id: "b9", productServiceId: "ps9", initiativeId: "i16", title: "اكتشاف وحل أسرع للمشكلات", ownerRole: "مدير تجربة العملاء", measurable: true, hasBaseline: true },
    { id: "b11", productServiceId: "ps11", initiativeId: "i18", title: "تقليل المواعيد الفائتة", ownerRole: "مدير تجربة المريض", measurable: true, hasBaseline: true },
  ],

  impacts: [
    {
      id: "im1",
      benefitId: "b1",
      title: "تحسّن وصول المستفيدين وتجربتهم",
      status: "expected",
      evidenceStatus: "partial",
      indicatorName: "متوسط وقت انتظار الموعد",
    },
    {
      id: "im2",
      benefitId: "b2",
      title: "ثقة أعلى في القنوات الرقمية",
      status: "observed",
      evidenceStatus: "partial",
      indicatorName: "نسبة المعاملات الرقمية",
    },
    {
      id: "im4",
      benefitId: "b4",
      title: "عمليات خدمة أكثر موثوقية",
      status: "observed",
      evidenceStatus: "none",
      indicatorName: "متوسط زمن تقديم الخدمة",
    },
    {
      id: "im9",
      benefitId: "b9",
      title: "تحسّن ثقة العملاء واستمراريتهم",
      status: "verified",
      evidenceStatus: "verified",
      indicatorName: "مؤشر رضا العملاء",
    },
  ],
};
