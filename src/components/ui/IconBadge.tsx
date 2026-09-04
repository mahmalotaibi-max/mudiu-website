import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const tones = {
  orange: "bg-orange/10 text-orange",
  navy: "bg-navy/10 text-navy",
  ink: "bg-ink text-paper",
};

const sizes = {
  md: { wrap: "size-12 rounded-2xl", icon: "size-6" },
  lg: { wrap: "size-16 rounded-3xl", icon: "size-8" },
};

export function IconBadge({
  icon: Icon,
  tone = "orange",
  size = "md",
  className,
}: {
  icon: LucideIcon;
  tone?: keyof typeof tones;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        sizes[size].wrap,
        tones[tone],
        className
      )}
    >
      <Icon className={sizes[size].icon} strokeWidth={1.75} aria-hidden />
    </span>
  );
}
