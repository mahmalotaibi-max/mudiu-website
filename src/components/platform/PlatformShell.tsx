"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/platform/types";

type NavKey =
  | "overview"
  | "strategy"
  | "performance"
  | "initiatives"
  | "products"
  | "benefits"
  | "impact"
  | "insights";

const navItemsByLocale: Record<Locale, { key: NavKey; label: string; ready: boolean }[]> = {
  en: [
    { key: "overview", label: "Overview", ready: true },
    { key: "strategy", label: "Strategy", ready: true },
    { key: "performance", label: "Performance", ready: false },
    { key: "initiatives", label: "Initiatives", ready: false },
    { key: "products", label: "Products & Services", ready: false },
    { key: "benefits", label: "Benefits", ready: false },
    { key: "impact", label: "Impact", ready: false },
    { key: "insights", label: "Insights", ready: true },
  ],
  ar: [
    { key: "overview", label: "نظرة عامة", ready: true },
    { key: "strategy", label: "الاستراتيجية", ready: true },
    { key: "performance", label: "الأداء", ready: false },
    { key: "initiatives", label: "المبادرات", ready: false },
    { key: "products", label: "المنتجات والخدمات", ready: false },
    { key: "benefits", label: "المنافع", ready: false },
    { key: "impact", label: "الأثر", ready: false },
    { key: "insights", label: "الرؤى", ready: true },
  ],
};

function basePath(locale: Locale) {
  return locale === "ar" ? "/platform/ar" : "/platform";
}

const executiveLabel: Record<Locale, string> = { en: "Executive View", ar: "العرض التنفيذي" };
const soonLabel: Record<Locale, string> = { en: "soon", ar: "قريبًا" };

export function PlatformShell({
  active,
  locale = "en",
}: {
  active: NavKey | "executive";
  locale?: Locale;
}) {
  const pathname = usePathname();
  const base = basePath(locale);
  const executiveHref = `${base}/executive`;
  // The other language's equivalent page, so switching languages keeps the visitor on the same screen.
  const counterpartHref = pathname
    ? locale === "ar"
      ? pathname.replace(/^\/platform\/ar/, "/platform") || "/platform"
      : pathname.replace(/^\/platform/, "/platform/ar")
    : basePath(locale === "ar" ? "en" : "ar");

  return (
    <div className="border-b border-line bg-paper-alt/60">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 overflow-x-auto px-6 py-3 md:px-10">
        <nav className="flex items-center gap-1">
          {navItemsByLocale[locale].map((item) => {
            const href = `${base}/${item.key}`;
            const isActive = item.key === active || pathname === href;
            return (
              <Link
                key={item.key}
                href={href}
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
                  <span className="ms-1.5 text-[10px] font-normal text-muted/70">{soonLabel[locale]}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            href={executiveHref}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              active === "executive" || pathname === executiveHref
                ? "border-ink bg-ink text-paper"
                : "border-line text-ink hover:border-ink"
            )}
          >
            {executiveLabel[locale]}
          </Link>
          <Link
            href={counterpartHref}
            className="rounded-full border border-line px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-ink hover:text-ink"
            aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
          >
            {locale === "ar" ? "EN" : "عربي"}
          </Link>
        </div>
      </div>
    </div>
  );
}
