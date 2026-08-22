export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  // Commerce/curriculum details are optional — a product can be listed in
  // the portfolio before its full offer (price, duration, curriculum) is defined.
  price?: number;
  currency?: "SAR";
  duration?: string;
  forWhom?: string[];
  whatYouLearn?: string[];
  whatYouGet?: string[];
  howItWorks?: { title: string; detail: string }[];
  faq?: { question: string; answer: string }[];
};

export const products: Product[] = [
  {
    slug: "professional-excellence",
    name: "التميز الوظيفي",
    tagline: "برنامج عملي لتطوير الأداء والتميز المهني في بيئة الرعاية الصحية.",
    description:
      "برنامج تطبيقي مكثف يبني قدرتك على التميز الوظيفي داخل بيئة الرعاية الصحية — من إدارة الأداء اليومي إلى بناء حضور مهني يُحدث فرقًا فعليًا في فريقك ومؤسستك.",
    price: 1200,
    currency: "SAR",
    duration: "٦ أسابيع — جلسات أسبوعية عن بُعد",
    forWhom: [
      "الممارسون الصحيون الراغبون في تطوير أدائهم المهني",
      "القيادات الإشرافية في القطاع الصحي",
      "من يستعد لخطوة قيادية جديدة في مساره المهني",
    ],
    whatYouLearn: [
      "أسس التميز الوظيفي وقياسه في بيئة الرعاية الصحية",
      "إدارة الأداء الشخصي تحت الضغط",
      "بناء حضور مهني وتأثير داخل الفريق",
      "أدوات عملية للتطوير الذاتي المستمر",
    ],
    whatYouGet: [
      "٦ جلسات تدريبية تطبيقية عن بُعد",
      "دليل عملي وأدوات تقييم ذاتي قابلة لإعادة الاستخدام",
      "شهادة إتمام من مُضيّ",
      "متابعة فردية بعد انتهاء البرنامج",
    ],
    howItWorks: [
      { title: "التسجيل", detail: "تسجّل في البرنامج وتحصل على تأكيد فوري عبر البريد الإلكتروني." },
      { title: "الجلسات", detail: "جلسة أسبوعية تفاعلية عن بُعد لمدة ٦ أسابيع." },
      { title: "التطبيق", detail: "تمارين وأدوات عملية تطبّقها في بيئة عملك بين الجلسات." },
      { title: "الإتمام", detail: "شهادة إتمام ومتابعة فردية لضمان استمرار الأثر." },
    ],
    faq: [
      {
        question: "هل البرنامج مناسب لغير العاملين في القطاع الصحي؟",
        answer: "البرنامج مصمم خصيصًا لبيئة الرعاية الصحية، وأمثلته وأدواته مبنية على سياقها.",
      },
      {
        question: "هل الجلسات مباشرة أم مسجّلة؟",
        answer: "الجلسات مباشرة وتفاعلية عبر الإنترنت، مع إتاحة التسجيل للمشتركين بعد كل جلسة.",
      },
      {
        question: "ماذا لو فاتتني إحدى الجلسات؟",
        answer: "ستحصل على تسجيل الجلسة وملخصًا عمليًا لضمان عدم فقدان أي جزء من المحتوى.",
      },
    ],
  },
  {
    slug: "research",
    name: "البحث",
    tagline: "منتج متخصص في دعم البحث وتطوير المخرجات البحثية.",
    description: "منتج متخصص في دعم البحث وتطوير المخرجات البحثية.",
  },
  {
    slug: "indicators",
    name: "المؤشرات",
    tagline: "منتج متخصص في المؤشرات وقياس الأداء.",
    description: "منتج متخصص في المؤشرات وقياس الأداء.",
  },
  {
    slug: "institutional-performance-evaluation",
    name: "تقييم الأداء المؤسسي",
    tagline: "منتج متخصص في تقييم الأداء المؤسسي.",
    description: "منتج متخصص في تقييم الأداء المؤسسي.",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
