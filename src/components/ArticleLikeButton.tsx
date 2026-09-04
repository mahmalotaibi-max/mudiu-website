"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "mudiu-liked-articles";

function readLiked(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function ArticleLikeButton({ slug }: { slug: string }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(readLiked().includes(slug));
  }, [slug]);

  function toggle() {
    const current = readLiked();
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // localStorage unavailable (private mode, etc.) — like still reflects for this render
    }
    setLiked(next.includes(slug));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={liked}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5",
        liked ? "border-orange bg-orange/10 text-orange" : "border-line text-ink hover:border-ink"
      )}
    >
      <Heart className={cn("size-4", liked && "fill-orange")} aria-hidden />
      {liked ? "أعجبتني" : "أعجبني"}
    </button>
  );
}
