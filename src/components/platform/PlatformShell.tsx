"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavKey =
  | "overview"
  | "strategy"
  | "performance"
  | "initiatives"
  | "products"
  | "benefits"
  | "impact"
  | "insights";

const navItems: { key: NavKey; label: string; href: string; ready: boolean }[] = [
  { key: "overview", label: "Overview", href: "/platform/overview", ready: true },
  { key: "strategy", label: "Strategy", href: "/platform/strategy", ready: true },
  { key: "performance", label: "Performance", href: "/platform/performance", ready: false },
  { key: "initiatives", label: "Initiatives", href: "/platform/initiatives", ready: false },
  { key: "products", label: "Products & Services", href: "/platform/products", ready: false },
  { key: "benefits", label: "Benefits", href: "/platform/benefits", ready: false },
  { key: "impact", label: "Impact", href: "/platform/impact", ready: false },
  { key: "insights", label: "Insights", href: "/platform/insights", ready: true },
];

export function PlatformShell({ active }: { active: NavKey | "executive" }) {
  const pathname = usePathname();

  return (
    <div className="border-b border-line bg-paper-alt/60">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 overflow-x-auto px-6 py-3 md:px-10">
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = item.key === active || pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-ink text-paper"
                    : item.ready
                      ? "text-muted hover:text-ink"
                      : "text-muted/50"
                )}
              >
                {item.label}
                {!item.ready && (
                  <span className="ms-1.5 text-[10px] font-normal text-muted/70">soon</span>
                )}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/platform/executive"
          className={cn(
            "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            active === "executive" || pathname === "/platform/executive"
              ? "border-ink bg-ink text-paper"
              : "border-line text-ink hover:border-ink"
          )}
        >
          Executive View
        </Link>
      </div>
    </div>
  );
}
