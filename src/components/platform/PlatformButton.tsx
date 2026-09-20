import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/platform/types";

// A locale-aware variant of the site's <Button>: same tokens and motion
// language, but the "forward" arrow points right in the English (LTR)
// platform and left in the Arabic (RTL) platform, matching each
// direction's own reading flow instead of a single fixed icon.
type PlatformButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  locale?: Locale;
};

const variants = {
  primary:
    "bg-ink text-paper hover:bg-navy hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-16px_rgba(30,47,82,0.5)] focus-visible:outline-orange",
  secondary:
    "border border-line text-ink hover:border-ink hover:-translate-y-0.5 focus-visible:outline-orange",
};

export function PlatformButton({
  href,
  children,
  variant = "primary",
  className,
  onClick,
  locale = "en",
}: PlatformButtonProps) {
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 outline-offset-4",
        variants[variant],
        className
      )}
    >
      <span>{children}</span>
      <Arrow
        className={cn(
          "size-4 transition-transform duration-300",
          locale === "ar" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
        )}
        aria-hidden
      />
    </Link>
  );
}
