// Knowledge / blog content. Structured as typed blocks (not raw markdown) so it
// stays consistent with the rest of the content layer and the article template
// can render it with the site's own styling.
//
// To publish a new article: add an entry to `articles` below — the listing
// page and /knowledge/[slug] pick it up automatically.

import type { KnowledgeType } from "@/content/knowledge";

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type Article = {
  slug: string;
  type: KnowledgeType;
  title: string;
  summary: string;
  date: string; // ISO date
  readMinutes: number;
  blocks: ArticleBlock[];
};

export const articles: Article[] = [
  {
    slug: "kpis-that-actually-move-performance",
    type: "رؤية",
    title: "لماذا تفشل أغلب مؤشرات الأداء في تغيير أي شيء؟",
    summary:
      "أغلب لوحات المؤشرات في المؤسسات موجودة، لكنها لا تُستخدم لاتخاذ قرار واحد. إليك الفرق بين مؤشر يُقاس ومؤشر يُحرّك الأداء فعليًا.",
    date: "2026-06-02",
    readMinutes: 6,
    blocks: [
      {
        type: "paragraph",
        text: "في أغلب المؤسسات التي عملنا معها، المشكلة ليست غياب المؤشرات — بل وجود عدد كبير منها بلا أثر. تقرير شهري يُرسل، يُقرأ، ثم لا يتغير شيء في القرار التالي.",
      },
      {
        type: "heading",
        text: "الفرق بين مؤشر للعرض ومؤشر للقرار",
      },
      {
        type: "paragraph",
        text: "المؤشر المصمم جيدًا يجيب على سؤال قرار محدد: هل نستمر بهذا المسار أم نغيّره؟ أما المؤشر المصمم للعرض فيصف الوضع فقط دون أن يقود إلى فعل.",
      },
      {
        type: "list",
        items: [
          "اربط كل مؤشر بقرار سيُتخذ بناءً عليه، لا بمجرد رغبة في القياس.",
          "قلّل العدد — عشرة مؤشرات تُستخدم أفضل من خمسين تُقرأ فقط.",
          "حدّد ملّاك واضحين لكل مؤشر يتابعون تحركه، لا فريقًا جماعيًا لا أحد فيه مسؤول.",
        ],
      },
      {
        type: "quote",
        text: "المؤشر الذي لا يغيّر قرارًا واحدًا هو رقم إضافي في تقرير، لا أداة إدارة.",
      },
      {
        type: "paragraph",
        text: "في مُضيّ، نبدأ عملنا مع المؤسسات من هذه النقطة تحديدًا: تقليص عدد المؤشرات إلى ما يخدم القرار الفعلي، ثم بناء نظام متابعة بسيط يمكن للفرق الالتزام به دون إرهاق.",
      },
    ],
  },
  {
    slug: "from-training-to-capability",
    type: "مقال",
    title: "الفرق بين \"حضور دورة\" و\"اكتساب قدرة\"",
    summary:
      "التدريب وحده لا يبني قدرة. هذا ما تعلمناه من بناء برامج تطبيقية للأفراد والمؤسسات، وكيف نصمم البرامج لتترك أثرًا يبقى بعد انتهاء الجلسة.",
    date: "2026-04-18",
    readMinutes: 5,
    blocks: [
      {
        type: "paragraph",
        text: "كثير من البرامج التدريبية تُقاس بعدد ساعات الحضور، لا بما تغيّر فعليًا في أداء الشخص بعدها بشهر. هذا الفرق هو ما يحدد إن كان التدريب استثمارًا أم مجرد نشاط.",
      },
      {
        type: "heading",
        text: "ثلاثة عناصر تحوّل التدريب إلى قدرة",
      },
      {
        type: "list",
        items: [
          "تطبيق فعلي أثناء البرنامج على مشكلة حقيقية من بيئة عمل المتدرب.",
          "أداة أو قالب يأخذه المتدرب معه ليستخدمه بعد انتهاء البرنامج مباشرة.",
          "متابعة قصيرة بعد أسابيع للتأكد من أن الأثر لم يتبخر مع الوقت.",
        ],
      },
      {
        type: "paragraph",
        text: "لهذا صُمم برنامج \"التميز الوظيفي\" وبقية منتجات مُضيّ حول التطبيق العملي أولًا — وليس فقط نقل المعرفة.",
      },
    ],
  },
];

export function getAllArticles() {
  return [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}
