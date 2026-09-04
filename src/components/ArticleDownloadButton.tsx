"use client";

import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

export function ArticleDownloadButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink",
        className
      )}
    >
      <Download className="size-4" aria-hidden />
      تحميل المقالة (PDF)
    </button>
  );
}
