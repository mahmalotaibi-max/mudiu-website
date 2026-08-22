import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-medium tracking-wide",
        tone === "light" ? "text-muted" : "text-muted-on-dark",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden />
      {children}
    </span>
  );
}
