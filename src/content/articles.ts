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
  | { type: "quote"; text: string }
  | { type: "references"; items: { label: string; url: string }[] };

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
        text: "في أغلب المؤسسات التي عملنا معها، المشكلة ليست غياب المؤشرات، بل وجود عدد كبير منها بلا أثر. تقرير شهري يُرسل، يُقرأ، ثم لا يتغير شيء في القرار التالي.",
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
          "قلّل العدد. عشرة مؤشرات تُستخدم أفضل من خمسين تُقرأ فقط.",
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
    slug: "strategy-compass-not-map",
    type: "رؤية",
    title: "كيف تقود الاستراتيجية تموضع المؤسسة ونجاحها؟",
    summary:
      "الاستراتيجية الناجحة ليست خريطة ثابتة المسار، بل بوصلة تتحرك مع احتياج المؤسسة وهدفها وتموضعها. إليك ما تقوله الأدلة العلمية، وتجارب Netflix وFujifilm، عن قيادة التحول الاستراتيجي.",
    date: "2026-08-30",
    readMinutes: 9,
    blocks: [
      {
        type: "paragraph",
        text: "تخطئ كثير من المؤسسات عندما تتعامل مع الاستراتيجية كوثيقة صلبة تُكتب مرة واحدة لتُحفظ في الأدراج، أو كخطة خطية الثبات يجب اتباعها بحذافيرها. في عالم اليوم الموصوف ببيئة VUCA (التقلب، وعدم اليقين، والتعقيد، والغموض)، الاستراتيجية ليست خريطة بمسارات محددة لا تتغير، بل هي بوصلة ديناميكية تُعدّل اتجاهها ومسارها باستمرار وفقًا لاحتياجات المؤسسة، وأهدافها، وتموضعها في السوق.",
      },
      {
        type: "heading",
        text: "لماذا تفشل الخطط الجامدة؟ ما تقوله الأدلة",
      },
      {
        type: "paragraph",
        text: "التخطيط التقليدي الثابت لم يعد كافيًا وحده لضمان الاستدامة، وهذا ليس رأيًا بل خلاصة عقود من أبحاث الإدارة الاستراتيجية.",
      },
      {
        type: "list",
        items: [
          "الاستراتيجية الناشئة (Emergent Strategy): في ورقتهما المرجعية عام 1985، ميّز هنري مينتزبرغ وجيمس ووترز من جامعة ماكجيل بين \"الاستراتيجية المتعمّدة\" (كما خُطط لها) و\"الاستراتيجية الناشئة\" (التي تتشكّل كنمط فعلي من القرارات اليومية أثناء التنفيذ، حتى دون تخطيط مسبق لها). خلاصتهما: أغلب الاستراتيجيات الناجحة في الواقع مزيج من الاثنين، لا تنفيذ حرفي لخطة أصلية.",
          "فجوة التنفيذ: تقديرات متداولة في أدبيات الإدارة، استندت أصلًا لاستطلاع نشرته مجلة Fortune ثم استخدمه روبرت كابلن وديفيد نورتون (مؤسسا بطاقة الأداء المتوازن)، تشير إلى أن نسبة كبيرة من المؤسسات لا تنفّذ استراتيجياتها كما خُطط لها بالضبط. الرقم الدقيق مختلف عليه بين مصدر وآخر، لكن الرسالة ثابتة: الخطة الأصلية نادرًا ما تُنفَّذ حرفيًا.",
          "مرونة إعادة توزيع الموارد: دراسة أجرتها McKinsey على 1,616 شركة أمريكية مدرجة على مدى 15 عامًا وجدت أن الشركات الأكثر نشاطًا في إعادة توزيع رأس المال بين وحداتها (الثلث الأعلى) حققت عائدًا للمساهمين أعلى بنسبة 30% في المتوسط سنويًا مقارنة بالثلث الأقل نشاطًا — علمًا أن الشركة المتوسطة لا تعيد توزيع أكثر من 8% من رأس مالها سنويًا.",
        ],
      },
      {
        type: "heading",
        text: "مثلث النجاح: المواءمة بين الحاجة، الهدف، والتموضع",
      },
      {
        type: "paragraph",
        text: "كي تتحول الاستراتيجية إلى محرك فعلي للنجاح، يجب أن تدور حول ثلاثة أركان تتفاعل وتتلاءم باستمرار، لا أن تُبنى على ركن واحد بمعزل عن البقية.",
      },
      {
        type: "list",
        items: [
          "احتياجات المؤسسة: تشخيص واقعي وشفاف لمواردها، وقدراتها الداخلية، ورأس مالها البشري، قبل أي حديث عن طموحات مستقبلية.",
          "الأهداف الاستراتيجية: الغايات والنتائج الأثرية التي تسعى المؤسسة لتحقيقها لتأمين نموها واستدامتها.",
          "التموضع: هنا يتجلى مفهوم البروفيسور مايكل بورتر حول التموضع الاستراتيجي كما طرحه في مقالته المرجعية \"ما هي الاستراتيجية؟\" (Harvard Business Review، 1996): جوهر الاستراتيجية هو الاختيار — تحديد أين تنافس، وما الذي لن تفعله، لتقديم قيمة فريدة يصعب على المنافسين تقليدها.",
        ],
      },
      {
        type: "heading",
        text: "ممارسات عالمية: كيف تتحرك البوصلة في الميدان؟",
      },
      {
        type: "heading",
        text: "أ. إعادة التموضع المرن: حالة Netflix",
      },
      {
        type: "paragraph",
        text: "لم تكن Netflix لتصبح عملاق البث الرقمي اليوم لولا مرونة بوصلتها الاستراتيجية. بدأت الشركة عام 1997 كخدمة تأجير أقراص DVD عبر البريد، ثم أطلقت أول خدمة بث لها عام 2007 مع تحسّن سرعات الإنترنت، وظلت خدمة الأقراص تُشكّل نحو ثلث إيراداتها حتى عام 2012، أي أن التحول كان تدريجيًا لا قفزة مفاجئة. منذ عام 2013 تحديدًا، انتقلت الشركة من موزّع للمحتوى إلى منتج له (Original Content) لحماية موقعها التنافسي أمام استوديوهات الإنتاج الكبرى. المسار لم يكن خطيًا بالكامل: محاولة فصل خدمتي الأقراص والبث في كيانين منفصلين عام 2011 قوبلت برفض حاد من المستخدمين وتراجع في السهم، وتم التراجع عنها سريعًا، وهذا بحد ذاته درس في أن البوصلة قد تُصحّح مسارها حتى بعد خطوة خاطئة.",
      },
      {
        type: "heading",
        text: "ب. إدارة المحفظة الاستراتيجية: Fujifilm مقابل Kodak",
      },
      {
        type: "paragraph",
        text: "عند ظهور التصوير الرقمي، حاولت Kodak التنويع خارج التصوير التقليدي عبر الاستحواذ على شركة الأدوية Sterling Drug عام 1988 بمبلغ 5.1 مليار دولار، لكنها باعتها بخسارة عام 1994 بعد فشل الاستثمار، بينما ظل جوهر أعمالها معلّقًا بمصير الأفلام الورقية. في المقابل، أطلقت Fujifilm تحت قيادة رئيسها التنفيذي شيغيتاكا كوموري ما سمّته \"التأسيس الثاني\": استثمرت 400 مليون دولار في منشأة بحثية جديدة، ودقّقت في تقنياتها الجوهرية (الكيمياء الدقيقة وطلاءات الأغشية الرقيقة) لتكتشف أكثر من 70 تقنية قابلة للنقل إلى صناعات جديدة كليًا، من مستحضرات التجميل (بالاستفادة من أبحاث الكولاجين ومضادات الأكسدة) إلى شاشات LCD والرعاية الصحية. النتيجة: نمو واستدامة، حيث تعثرت منافستها الأقرب.",
      },
      {
        type: "heading",
        text: "أطر عمل لتحويل الاستراتيجية إلى حركة حية",
      },
      {
        type: "list",
        items: [
          "التجريب الاستراتيجي: منهج \"التخطيط القائم على الاكتشاف\" (Discovery-Driven Planning) الذي طرحته ريتا ماكغراث وإيان ماكميلان في Harvard Business Review عام 1995 يقترح معاملة كل خطة كمجموعة فرضيات تُختبر بمشاريع تجريبية صغيرة قبل تعميمها، بدل تمويلها بالكامل مقدّمًا.",
          "المراجعة الديناميكية: مشروع \"المرونة الاستراتيجية\" في MIT Sloan Management Review، بقيادة دونالد سُل، يدعو للانتقال من المراجعات السنوية التقليدية إلى دورات قياس واستجابة أقصر وأكثر تكرارًا، تُسرّع اكتشاف الانحرافات عن المسار.",
          "الإغلاق الشجاع للمبادرات: تحذّر ريتا ماكغراث مما تسمّيه \"المشاريع الزومبي\"، وهي مبادرات تستمر بالتمويل رغم فقدانها لجدواها، بسبب الوقوع في فخ التكلفة الغارقة (Sunk Cost Fallacy). التوقف الجريء عن تمويلها يحمي موارد المؤسسة.",
        ],
      },
      {
        type: "quote",
        text: "ليس هناك شيء غير مجدٍ على الإطلاق مثل القيام بكفاءة عالية بما لا ينبغي القيام به على الإطلاق. — بيتر دروكر",
      },
      {
        type: "paragraph",
        text: "الاستراتيجية الناجحة ليست الأكثر سماكة أو تعقيدًا، بل الأكثر قدرة على توجيه المؤسسة بثبات نحو رؤيتها، مع منح القيادة مرونة كافية لإعادة التموضع والتحرك وفقًا لمعطيات الميدان. فهل تعتمد مؤسستك مراجعات استراتيجية دورية، أم تنتظر نهاية العام لتقييم الأداء؟",
      },
      {
        type: "references",
        items: [
          {
            label: "Mintzberg, H. & Waters, J.A. (1985) — Of Strategies, Deliberate and Emergent",
            url: "https://mintzberg.org/articles/strategies-deliberate-and-emergent",
          },
          {
            label: "Hall, Lovallo & Musters (2012) — How to Put Your Money Where Your Strategy Is, McKinsey",
            url: "https://www.mckinsey.com/capabilities/strategy-and-corporate-finance/our-insights/how-to-put-your-money-where-your-strategy-is",
          },
          {
            label: "Porter, M.E. (1996) — What Is Strategy?, Harvard Business Review",
            url: "https://hbr.org/1996/11/what-is-strategy",
          },
          {
            label: "McGrath, R.G. & MacMillan, I.C. (1995) — Discovery-Driven Planning, Harvard Business Review",
            url: "https://hbr.org/1995/07/discovery-driven-planning",
          },
          {
            label: "The Strategic Agility Project — MIT Sloan Management Review",
            url: "https://sloanreview.mit.edu/big-ideas/strategic-agility/",
          },
          {
            label: "McGrath, R.G. — Knowing When to Pull the Plug (zombie projects)",
            url: "https://thoughtsparks.substack.com/p/knowing-when-to-pull-the-plug-part",
          },
          {
            label: "Harvard Business School — Netflix, Case 607-138 (Shih, Kaufman & Spinola, 2007)",
            url: "https://www.hbs.edu/faculty/Pages/item.aspx?num=34596",
          },
          {
            label: "Fujifilm's Masterclass in Corporate Rebirth: The Second Foundation — GLOBIS",
            url: "https://globis.eu/fujifilms-masterclass-in-corporate-rebirth/",
          },
          {
            label: "Vinokurova, N. — Kodak's Surprisingly Long Journey Towards Strategic Renewal, Wharton Mack Institute",
            url: "https://mackinstitute.wharton.upenn.edu/wp-content/uploads/2023/03/Vinokurova-Natalya_Kodaks-Surprisingly-Long-Journey-Towards-Strategic-Renewal.pdf",
          },
          {
            label: "Peter Drucker — quote source",
            url: "https://www.goodreads.com/quotes/348436-there-is-nothing-so-useless-as-doing-efficiently-that-which",
          },
        ],
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
        text: "لهذا صُمم برنامج \"التميز الوظيفي\" وبقية منتجات مُضيّ حول التطبيق العملي أولًا، وليس فقط نقل المعرفة.",
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
