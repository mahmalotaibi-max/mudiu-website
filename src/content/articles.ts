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
        type: "paragraph",
        text: "ونقصد بـ\"التموضع\" هنا الموقع التنافسي الذي تشغله المؤسسة في ذهن عملائها مقارنة بمنافسيها: ما الذي تقدّمه بشكل مختلف، ولمن بالتحديد، وبأي طريقة يصعب على غيرها تكرارها. هذا التموضع هو ما يحدد أين تتنافس المؤسسة فعليًا، لا فقط ماذا تبيع.",
      },
      {
        type: "heading",
        text: "لماذا تفشل الخطط الجامدة؟ ما تقوله الأدلة",
      },
      {
        type: "paragraph",
        text: "أغلب المؤسسات التي نعمل معها في مُضيّ لا تتعثر لأن استراتيجيتها كانت خاطئة من البداية، بل لأنها تمسّكت بالخطة الأصلية بعد أن تغيّر الواقع من حولها. وهذا نمط موثّق منذ عقود، لا انطباعًا عابرًا:",
      },
      {
        type: "list",
        items: [
          "مينتزبرغ وووترز أثبتا منذ عام 1985 أن أغلب الاستراتيجيات الناجحة في الواقع هي \"استراتيجيات ناشئة\": نمط يتشكّل من القرارات اليومية أثناء التنفيذ، لا تنفيذ حرفي لخطة مكتوبة سلفًا.",
          "الفجوة بين ما يُخطَّط له وما يُنفَّذ فعليًا معروفة في أدبيات الإدارة منذ عقود (تعود جذورها لعمل كابلن ونورتون على بطاقة الأداء المتوازن)، والرسالة نفسها تتكرر مهما اختلف الرقم الدقيق من مصدر لآخر: الخطة الأصلية نادرًا ما تُنفَّذ كما كُتبت، والمؤسسات التي تصرّ على ذلك هي من تدفع الثمن.",
          "ورقميًا: الشركات الأنشط في إعادة توزيع رأس مالها بين وحداتها، وفق دراسة McKinsey على 1,616 شركة أمريكية مدرجة على مدى 15 عامًا، حققت عائدًا للمساهمين أعلى بنسبة 30% من الشركات الأكثر جمودًا في تخصيص مواردها.",
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
          "التموضع: كما يقول مايكل بورتر، جوهر الاستراتيجية اختيار — أين تنافس، وما الذي لن تفعله، لتقديم قيمة فريدة يصعب على أي منافس تقليدها.",
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
        text: "بدأت Netflix عام 1997 كخدمة تأجير أقراص DVD عبر البريد، لا أكثر. لما تحسّنت سرعات الإنترنت أطلقت أول خدمة بث لها عام 2007، لكنها لم تقفز فجأة: خدمة الأقراص ظلّت تشكّل نحو ثلث إيراداتها حتى عام 2012. التحول الأكبر جاء بعدها بسنة، حين تحوّلت من موزّع للمحتوى إلى منتج له بدءًا من 2013، لتحمي موقعها التنافسي أمام استوديوهات الإنتاج الكبرى قبل أن تحتاج لذلك فعليًا. البوصلة نفسها أخطأت مرة، في محاولة فصل خدمتي الأقراص والبث في كيانين منفصلين عام 2011، وقوبلت برفض حاد من المستخدمين وتراجع في السهم — لكن الشركة تراجعت عن القرار بسرعة بدل أن تتمسّك به دفاعًا عن كرامة الخطة الأصلية.",
      },
      {
        type: "heading",
        text: "ب. إدارة المحفظة الاستراتيجية: Fujifilm مقابل Kodak",
      },
      {
        type: "paragraph",
        text: "الشركتان واجهتا نفس الصدمة: ظهور التصوير الرقمي. Kodak حاولت التنويع بعيدًا عن الأفلام عبر الاستحواذ على شركة الأدوية Sterling Drug عام 1988 بمبلغ 5.1 مليار دولار، لكنها باعتها بخسارة بعد ست سنوات فقط، بينما ظل جوهر أعمالها معلّقًا بمصير الفيلم الورقي حتى النهاية. Fujifilm سلكت طريقًا مختلفًا تمامًا: تحت قيادة رئيسها التنفيذي شيغيتاكا كوموري، دقّقت في تقنياتها الجوهرية نفسها — الكيمياء الدقيقة وطلاءات الأغشية الرقيقة — واكتشفت أكثر من 70 تقنية قابلة للنقل إلى صناعات لا علاقة لها بالتصوير: مستحضرات تجميل مبنية على أبحاثها في الكولاجين ومضادات الأكسدة، وشاشات LCD، ورعاية صحية. استثمرت 400 مليون دولار في منشأة بحثية جديدة لتُنجز هذا التحول، وسمّته \"التأسيس الثاني\" لا إعادة هيكلة. النتيجة أن إحداهما ما زالت قائمة والأخرى أفلست.",
      },
      {
        type: "heading",
        text: "أطر عمل لتحويل الاستراتيجية إلى حركة حية",
      },
      {
        type: "list",
        items: [
          "التجريب الاستراتيجي: عامِل كل خطة كفرضية تُختبر بمشروع تجريبي صغير قبل تعميمها، لا كقرار نهائي يُموَّل بالكامل من اليوم الأول. هذا ما تسمّيه ريتا ماكغراث وإيان ماكميلان \"التخطيط القائم على الاكتشاف\".",
          "المراجعة الديناميكية: انتقل من المراجعة السنوية إلى دورات أقصر وأكثر تكرارًا تكتشف الانحراف عن المسار قبل أن يتحوّل إلى أزمة. هذا جوهر مشروع \"المرونة الاستراتيجية\" الذي يقوده دونالد سُل في MIT Sloan.",
          "الإغلاق الشجاع للمبادرات: توقّف عن تمويل ما لم يعد يخدم تموضعك الحالي، مهما كان حجم ما استثمرته فيه سابقًا. ماكغراث تسمّي التمسّك بهذه المشاريع \"مشاريع زومبي\" — وهو فخ التكلفة الغارقة بعينه.",
        ],
      },
      {
        type: "quote",
        text: "ليس هناك شيء غير مجدٍ على الإطلاق مثل القيام بكفاءة عالية بما لا ينبغي القيام به على الإطلاق. — بيتر دروكر",
      },
      {
        type: "paragraph",
        text: "في مُضيّ، هذا بالضبط ما نبدأ به مع أي مؤسسة: ليس رسم خطة جديدة من الصفر، بل مراجعة الموجود ومعرفة أين توقفت البوصلة عن التحرك. الاستراتيجية الناجحة ليست الأكثر سماكة أو تعقيدًا، بل الأكثر قدرة على توجيه المؤسسة بثبات نحو رؤيتها مع مرونة كافية لإعادة التموضع. فهل تعتمد مؤسستك مراجعات استراتيجية دورية، أم تنتظر نهاية العام لتقييم الأداء؟",
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
