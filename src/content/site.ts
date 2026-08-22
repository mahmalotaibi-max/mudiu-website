// Site-wide content: brand strings, navigation, footer.
// Kept separate from components so copy can be edited without touching UI code.

export const brand = {
  nameAr: "مُضيّ",
  nameEn: "Mudiu",
  tagline: "نمضي بالفكرة نحو أثر.",
  taglineFull:
    "حلول استراتيجية وتطويرية تساعد الأفراد والمؤسسات على بناء القدرات، تحسين الأداء، وتحويل الطموح إلى نتائج قابلة للقياس.",
};

export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "الرئيسية", href: "/" },
  { label: "من نحن", href: "/about" },
  { label: "الخدمات", href: "/solutions" },
  { label: "المنتجات", href: "/products" },
  { label: "للأفراد", href: "/individuals" },
  { label: "للمؤسسات", href: "/institutions" },
  { label: "المعرفة", href: "/knowledge" },
  { label: "تواصل معنا", href: "/contact" },
];

export const primaryCta: NavItem = {
  label: "ابدأ رحلتك نحو الأثر",
  href: "/contact#booking",
};

export const footerNav: NavItem[] = primaryNav;

export const legalNav: NavItem[] = [
  { label: "الشروط والأحكام", href: "/legal/terms" },
  { label: "شروط وأحكام الشراء", href: "/legal/purchase-terms" },
  { label: "سياسة الخصوصية", href: "/legal/privacy" },
];

export const contact = {
  phoneDisplay: "+966 53 981 3233",
  phoneE164: "+966539813233",
  whatsappUrl: "https://wa.me/966539813233",
};

export const siteMeta = {
  title: "مُضيّ | Mudiu — استشارات استراتيجية وبناء قدرات مؤسسية",
  description:
    "مُضيّ علامة سعودية متخصصة في الاستشارات الاستراتيجية، تطوير القدرات المؤسسية، والتدريب المهني التطبيقي — نساعد الأفراد والمؤسسات على تحويل الفكرة إلى أثر قابل للقياس.",
  url: "https://mudiu.co",
};
