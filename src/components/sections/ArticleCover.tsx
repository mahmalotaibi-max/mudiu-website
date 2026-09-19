import type { ComponentType } from "react";
import type { KnowledgeType } from "@/content/knowledge";
import { cn } from "@/lib/utils";
import {
  GrowthScene,
  TargetScene,
  CompassScene,
  TestIdeaScene,
  LearningScene,
  DiagnosisScene,
  TeamScene,
  TrustScene,
  IdeaScene,
  ToolScene,
  DocumentScene,
  TemplateScene,
} from "@/components/sections/ArticleFigures";

type Scene = ComponentType<{ className?: string }>;

const typeScene: Record<KnowledgeType, Scene> = {
  مقال: DocumentScene,
  رؤية: IdeaScene,
  دليل: CompassScene,
  أداة: ToolScene,
  دراسة: TestIdeaScene,
  قالب: TemplateScene,
};

const typeTone: Record<KnowledgeType, "orange" | "navy"> = {
  مقال: "orange",
  رؤية: "navy",
  دليل: "orange",
  أداة: "navy",
  دراسة: "orange",
  قالب: "navy",
};

// Optional per-article override so a cover can reflect the article's actual
// subject instead of just its content type — pick whichever reads closest
// to what the piece is about. Each scene is a simplified human figure in the
// site's own line/gradient language, not a generic content-type icon.
export const articleCoverIcons = {
  "test-idea": TestIdeaScene,
  target: TargetScene,
  compass: CompassScene,
  growth: GrowthScene,
  learning: LearningScene,
  team: TeamScene,
  trust: TrustScene,
  idea: IdeaScene,
  tool: ToolScene,
  diagnosis: DiagnosisScene,
} as const;

export type ArticleCoverIcon = keyof typeof articleCoverIcons;

export function ArticleCover({
  type,
  icon,
  className,
  iconClassName,
}: {
  type: KnowledgeType;
  icon?: ArticleCoverIcon;
  className?: string;
  iconClassName?: string;
}) {
  const Scene = icon ? articleCoverIcons[icon] : typeScene[type];
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
      <Scene className={cn("relative h-full w-full", iconClassName)} />
    </div>
  );
}
