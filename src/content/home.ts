// Homepage-specific content, separated from the section components.
import { products } from "@/content/products";

export const hero = {
  eyebrow: "استشارات استراتيجية وبناء قدرات مؤسسية",
  titleLines: ["من الفكرة…", "إلى أثرٍ مُضيّ."],
  body: "حلول استراتيجية وتطويرية تساعد الأفراد والمؤسسات على بناء القدرات، تحسين الأداء، وتحويل الطموح إلى نتائج قابلة للقياس.",
  ctaPrimary: { label: "اكتشف حلولنا", href: "/solutions" },
  ctaSecondary: { label: "تعرّف على مُضيّ", href: "/about" },
};

export const whyMudiu = {
  eyebrow: "لماذا مُضيّ؟",
  title: "رحلة واضحة من الفهم إلى الأثر",
  steps: [
    { index: "01", verb: "نفهم", noun: "المشكلة", detail: "نبدأ بتشخيص دقيق للواقع قبل اقتراح أي حل." },
    { index: "02", verb: "نبني", noun: "الحل", detail: "نصمم منهجيات وأدوات عملية تناسب السياق الفعلي." },
    { index: "03", verb: "نُمكّن", noun: "الفرق", detail: "ننقل المعرفة إلى الفرق ليتمكنوا من التطبيق بأنفسهم." },
    { index: "04", verb: "نقيس", noun: "الأثر", detail: "نتابع النتائج بمؤشرات واضحة قابلة للقياس." },
  ],
};

export const solutionsPreview = {
  eyebrow: "حلولنا",
  title: "حلول مصممة لتُحرّك الأداء",
  tracks: [
    {
      key: "individuals",
      label: "للأفراد",
      href: "/individuals",
      description: "مسارات تطوير مهني تبني القدرة الفعلية لا الشهادة فقط.",
      items: ["التطوير المهني", "البرامج التدريبية", "المهارات التطبيقية", "الأدوات والمعرفة"],
    },
    {
      key: "institutions",
      label: "للمؤسسات",
      href: "/institutions",
      description: "شراكة استراتيجية تبدأ من التشخيص وتنتهي باستدامة الأثر.",
      items: [
        "الاستراتيجية",
        "تطوير الأداء المؤسسي",
        "المؤشرات وقياس الأداء",
        "بناء القدرات",
        "المنهجيات والأدوات",
        "التدريب المؤسسي",
      ],
    },
  ],
};

export const productsPreview = {
  eyebrow: "منتجات مُضيّ",
  title: "برامج تطبيقية جاهزة للانطلاق",
  items: products.map((p) => ({
    slug: p.slug,
    name: p.name,
    description: p.tagline,
    price: p.price,
    currency: p.currency,
  })),
};

export const methodology = {
  eyebrow: "المنهجيات والأدوات",
  title: "لا نبيع دورات… نبني أدوات قابلة للتطبيق",
  body: "مُضيّ تحوّل المعرفة إلى Frameworks ومنهجيات وأدوات عملية يمكن للفرق استخدامها فعليًا في عملها اليومي، وليس فقط الاستماع إليها.",
  points: [
    { label: "منهجيات عملية", detail: "مبنية على تجربة تطبيقية حقيقية، لا نظرية مجردة." },
    { label: "أدوات قابلة للتطبيق", detail: "قوالب ومقاييس جاهزة للاستخدام الفوري." },
    { label: "حلول مبنية على الواقع", detail: "مصممة حول سياق كل مؤسسة، لا حلول جاهزة موحدة." },
  ],
};

export const knowledgePreview = {
  eyebrow: "المعرفة",
  title: "مجلة مُضيّ المعرفية",
  body: "مقالات، رؤى، أدلة، وأدوات تُنشر تباعًا لدعم رحلة التطوير المهني والمؤسسي.",
  cta: { label: "استكشف المعرفة", href: "/knowledge" },
};

export const ctaSection = {
  title: "جاهز للخطوة التالية؟",
  body: "سواء كنت تطور مسارك المهني أو تعمل على تطوير مؤسستك، لنبدأ من التحدي الحقيقي.",
  cta: { label: "احجز جلسة تعريفية", href: "/contact#booking" },
};
