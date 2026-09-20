"use client";

import { useRouter } from "next/navigation";
import { usePlatform } from "@/components/platform/PlatformProvider";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/platform/types";

const strings = {
  en: { label: "Explore Sample Organization", overviewHref: "/platform/overview" },
  ar: { label: "استكشف مؤسسة تجريبية", overviewHref: "/platform/ar/overview" },
};

// Skips the upload/mapping wizard entirely and drops the visitor straight
// into a live diagnostic built from the sample organization - the fastest
// path to the "magic moment" for someone who just wants to see the product
// work before feeding it real data.
export function ExploreSampleButton({ className, locale = "en" }: { className?: string; locale?: Locale }) {
  const { runDiagnostic } = usePlatform();
  const router = useRouter();
  const t = strings[locale];

  return (
    <button
      type="button"
      onClick={() => {
        runDiagnostic();
        router.push(t.overviewHref);
      }}
      className={cn(
        "text-sm font-medium text-muted transition-colors hover:text-ink",
        className
      )}
    >
      {t.label}
    </button>
  );
}
