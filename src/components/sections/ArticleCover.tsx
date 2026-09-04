import { FileText, Lightbulb, Compass, Wrench, FlaskConical, LayoutTemplate } from "lucide-react";
import type { KnowledgeType } from "@/content/knowledge";
import { cn } from "@/lib/utils";

const typeIcon: Record<KnowledgeType, typeof FileText> = {
  مقال: FileText,
  رؤية: Lightbulb,
  دليل: Compass,
  أداة: Wrench,
  دراسة: FlaskConical,
  قالب: LayoutTemplate,
};

const typeTone: Record<KnowledgeType, "orange" | "navy"> = {
  مقال: "orange",
  رؤية: "navy",
  دليل: "orange",
  أداة: "navy",
  دراسة: "orange",
  قالب: "navy",
};

export function ArticleCover({
  type,
  className,
  iconClassName,
}: {
  type: KnowledgeType;
  className?: string;
  iconClassName?: string;
}) {
  const Icon = typeIcon[type];
  const tone = typeTone[type];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl border border-line",
        tone === "orange" ? "bg-orange/[0.06]" : "bg-navy/[0.06]",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-ink) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full opacity-40 blur-2xl"
        style={{ background: tone === "orange" ? "var(--color-orange)" : "var(--color-navy)" }}
        aria-hidden
      />
      <Icon
        className={cn(
          "relative size-10",
          tone === "orange" ? "text-orange" : "text-navy",
          iconClassName
        )}
        strokeWidth={1.5}
        aria-hidden
      />
    </div>
  );
}
