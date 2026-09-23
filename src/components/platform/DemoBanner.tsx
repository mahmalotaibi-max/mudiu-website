import { Info } from "lucide-react";
import type { Locale } from "@/lib/platform/types";

const strings = {
  en: {
    title: "Riwaa Example Demo",
    body: "A fictional company used to show what the future MUDIU experience could look like - not the result of your own diagnostic.",
  },
  ar: {
    title: "مثال Riwaa التوضيحي",
    body: "تجربة افتراضية توضّح كيف يمكن أن تبدو تجربة MUDIU المستقبلية، وليست نتيجة تشخيص مؤسستك.",
  },
};

/** Permanent, unmissable demo notice for the old Goal->Impact pages
 * (Overview/Strategy/Insights/Executive) - these always show the same
 * fictional Riwaa data regardless of who visits or what they answered in
 * the real diagnostic, so this replaces any gate that implied otherwise. */
export function DemoBanner({ locale = "en" }: { locale?: Locale }) {
  const t = strings[locale];
  return (
    <div className="border-b border-orange/30 bg-orange/10">
      <div className="mx-auto flex max-w-6xl items-start gap-3 px-6 py-3 md:px-10">
        <Info className="mt-0.5 size-4 shrink-0 text-orange" aria-hidden />
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-semibold">{t.title}</span> — {t.body}
        </p>
      </div>
    </div>
  );
}
