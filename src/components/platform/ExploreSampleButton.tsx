"use client";

import { useRouter } from "next/navigation";
import { usePlatform } from "@/components/platform/PlatformProvider";
import { cn } from "@/lib/utils";

// Skips the upload/mapping wizard entirely and drops the visitor straight
// into a live diagnostic built from the sample organization - the fastest
// path to the "magic moment" for someone who just wants to see the product
// work before feeding it real data.
export function ExploreSampleButton({ className }: { className?: string }) {
  const { runDiagnostic } = usePlatform();
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        runDiagnostic();
        router.push("/platform/overview");
      }}
      className={cn(
        "text-sm font-medium text-muted transition-colors hover:text-ink",
        className
      )}
    >
      Explore Sample Organization
    </button>
  );
}
