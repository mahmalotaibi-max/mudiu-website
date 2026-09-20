"use client";

import { useState } from "react";
import { ChevronDown, CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { riwaaChains, type RiwaaChain, type RiwaaNode, type BadgeTone } from "@/lib/platform/riwaaData";

const badgeToneClass: Record<BadgeTone, string> = {
  navy: "bg-navy/10 text-navy",
  orange: "bg-orange/10 text-orange",
  muted: "bg-paper-alt text-muted",
};

export function RiwaaShowcase() {
  const [chainId, setChainId] = useState<string>(riwaaChains[0]?.id ?? "");
  const chain = riwaaChains.find((c) => c.id === chainId) ?? riwaaChains[0];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedNode = chain?.nodes[selectedIndex] ?? null;

  function selectChain(c: RiwaaChain) {
    setChainId(c.id);
    setSelectedIndex(0);
  }

  if (!chain) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr_340px]">
      <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {riwaaChains.map((c) => {
          const hasGap = c.nodes.some((n) => n.missing);
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => selectChain(c)}
              className={cn(
                "shrink-0 rounded-xl border px-4 py-3 text-start text-sm transition-colors lg:shrink",
                c.id === chain.id
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink hover:border-ink"
              )}
            >
              <span className="block max-w-56 truncate font-medium lg:whitespace-normal">
                {c.tabLabel}
              </span>
              <span
                className={cn(
                  "mt-1 block text-xs",
                  c.id === chain.id ? "text-paper/70" : "text-muted"
                )}
              >
                {hasGap ? "توجد فجوة في السلسلة" : "سلسلة مكتملة من الهدف إلى الأثر"}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="flex flex-col">
        {chain.nodes.map((node, i) => (
          <div key={node.key}>
            <button
              type="button"
              onClick={() => setSelectedIndex(i)}
              className={cn(
                "flex w-full items-center justify-between rounded-xl border px-5 py-4 text-start transition-colors",
                i === selectedIndex
                  ? "border-ink bg-paper"
                  : node.gapWarning
                    ? "border-dashed border-orange/40 bg-orange/5 hover:border-orange"
                    : node.missing
                      ? "border-dashed border-line bg-paper-alt/60 hover:border-ink"
                      : "border-line bg-paper hover:border-ink"
              )}
            >
              <span>
                <span className="flex items-center gap-2">
                  <span className="rounded-full bg-paper-alt px-2 py-0.5 text-xs font-medium text-muted">
                    {node.label}
                  </span>
                  {node.badge && (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-medium",
                        badgeToneClass[node.badge.tone]
                      )}
                    >
                      {node.badge.text}
                    </span>
                  )}
                </span>
                <span className="mt-1 block text-sm font-medium text-ink">
                  {node.missing ? (node.gapWarning ? node.gapWarning.title : `${node.label} — غير محدد`) : node.title}
                </span>
              </span>
              {node.missing && (
                <CircleAlert className="size-4 shrink-0 text-orange" aria-hidden />
              )}
            </button>
            {i < chain.nodes.length - 1 && (
              <div className="flex justify-start py-1 ps-5">
                <ChevronDown className="size-4 text-muted" aria-hidden />
              </div>
            )}
          </div>
        ))}
      </div>

      <RiwaaNodeDetail node={selectedNode} />
    </div>
  );
}

function RiwaaNodeDetail({ node }: { node: RiwaaNode | null }) {
  if (!node) return null;

  if (node.gapWarning) {
    return (
      <aside className="h-fit rounded-2xl border border-orange/30 bg-orange/5 p-6 lg:sticky lg:top-24">
        <div className="flex items-center gap-2 text-orange">
          <CircleAlert className="size-4 shrink-0" aria-hidden />
          <span className="text-xs font-medium">{node.label}</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold text-ink">{node.gapWarning.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink">{node.gapWarning.body}</p>
      </aside>
    );
  }

  if (node.missing) {
    return (
      <aside className="h-fit rounded-2xl border border-line p-6 lg:sticky lg:top-24">
        <span className="text-xs font-medium text-muted">{node.label}</span>
        <h3 className="mt-2 text-lg font-semibold text-ink">{node.label} — غير محدد</h3>
        {node.missingReason && (
          <p className="mt-3 text-sm leading-relaxed text-muted">{node.missingReason}</p>
        )}
      </aside>
    );
  }

  return (
    <aside className="h-fit rounded-2xl border border-line p-6 lg:sticky lg:top-24">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted">{node.label}</span>
        {node.badge && (
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[11px] font-medium",
              badgeToneClass[node.badge.tone]
            )}
          >
            {node.badge.text}
          </span>
        )}
      </div>
      <h3 className="mt-2 text-lg font-semibold text-ink">{node.title}</h3>
      {node.metrics && (
        <dl className="mt-4 space-y-2 border-t border-line pt-4">
          {node.metrics.map((m) => (
            <div key={m.label} className="flex items-center justify-between text-sm">
              <dt className="text-muted">{m.label}</dt>
              <dd className="font-medium text-ink">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {node.note && (
        <p className="mt-4 rounded-xl bg-paper-alt p-3 text-sm leading-relaxed text-ink">{node.note}</p>
      )}
    </aside>
  );
}
