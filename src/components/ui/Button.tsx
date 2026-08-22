import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost-on-dark";
  className?: string;
};

const variants = {
  primary:
    "bg-ink text-paper hover:bg-navy focus-visible:outline-orange",
  secondary:
    "border border-line text-ink hover:border-ink focus-visible:outline-orange",
  "ghost-on-dark":
    "border border-white/25 text-paper hover:border-orange hover:text-orange focus-visible:outline-orange",
};

export function Button({ href, children, variant = "primary", className }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 outline-offset-4",
        variants[variant],
        className
      )}
    >
      <span>{children}</span>
      <ArrowLeft
        className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
        aria-hidden
      />
    </Link>
  );
}
