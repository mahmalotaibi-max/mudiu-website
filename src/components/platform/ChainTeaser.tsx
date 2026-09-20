import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/platform/types";

const stagesByLocale: Record<Locale, string[]> = {
  en: [
    "Strategic Goal",
    "Indicator",
    "Gap",
    "Priority",
    "Initiative",
    "Output",
    "Product / Service",
    "Benefit",
    "Impact",
  ],
  ar: [
    "الهدف الاستراتيجي",
    "المؤشر",
    "الفجوة",
    "الأولوية",
    "المبادرة",
    "المخرج",
    "المنتج / الخدمة",
    "المنفعة",
    "الأثر",
  ],
};

export function ChainTeaser({ className, locale = "en" }: { className?: string; locale?: Locale }) {
  const stages = stagesByLocale[locale];
  const Chevron = locale === "ar" ? ChevronLeft : ChevronRight;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-1.5 gap-y-3 rounded-2xl border border-line bg-paper-alt p-5",
        className
      )}
    >
      {stages.map((stage, i) => (
        <div key={stage} className="flex items-center gap-1.5">
          <span
            className={cn(
              "whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium md:text-sm",
              i === 0
                ? "bg-ink text-paper"
                : i === stages.length - 1
                  ? "bg-orange text-paper"
                  : "border border-line bg-paper text-ink"
            )}
          >
            {stage}
          </span>
          {i < stages.length - 1 && (
            <Chevron className="size-3.5 shrink-0 text-muted md:size-4" aria-hidden />
          )}
        </div>
      ))}
    </div>
  );
}
