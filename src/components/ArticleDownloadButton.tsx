"use client";

import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonClass =
  "inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-ink";

/** Prints the page by default; when `href` points at a prepared PDF, opens that file instead. */
export function ArticleDownloadButton({ className, href }: { className?: string; href?: string }) {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener" className={cn(buttonClass, className)}>
        <Download className="size-4" aria-hidden />
        المقالة كاملة (PDF)
      </a>
    );
  }

  return (
    <button type="button" onClick={() => window.print()} className={cn(buttonClass, className)}>
      <Download className="size-4" aria-hidden />
      تحميل المقالة (PDF)
    </button>
  );
}
