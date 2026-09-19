import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// A left-to-right variant of the site's <Button>: same tokens and motion
// language, but the arrow points right (forward, in LTR) instead of left,
// since the platform subtree renders dir="ltr" while the rest of the site
// is RTL and its <Button> arrow points left on purpose.
type PlatformButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
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
}: PlatformButtonProps) {
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
      <ArrowRight
        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden
      />
    </Link>
  );
}
