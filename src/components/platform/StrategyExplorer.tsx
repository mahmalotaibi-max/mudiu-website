"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Chain, ChainNode } from "@/lib/platform/types";

export function StrategyExplorer({ chains }: { chains: Chain[] }) {
  const [selectedGoalId, setSelectedGoalId] = useState(chains[0]?.goalId ?? "");
  const chain = chains.find((c) => c.goalId === selectedGoalId) ?? chains[0];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedNode = chain?.nodes[selectedIndex] ?? null;

  function selectGoal(goalId: string) {
    setSelectedGoalId(goalId);
    setSelectedIndex(0);
  }

  if (!chain) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr_320px]">
      <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {chains.map((c) => {
          const missingCount = c.nodes.filter((n) => n.missing).length;
          return (
            <button
              key={c.goalId}
              type="button"
              onClick={() => selectGoal(c.goalId)}
              className={cn(
                "shrink-0 rounded-xl border px-4 py-3 text-start text-sm transition-colors lg:shrink",
                c.goalId === chain.goalId
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink hover:border-ink"
              )}
            >
              <span className="block max-w-56 truncate font-medium lg:whitespace-normal">
                {c.goalTitle}
              </span>
              <span
                className={cn(
                  "mt-1 block text-xs",
                  c.goalId === chain.goalId ? "text-paper/70" : "text-muted"
                )}
              >
                {missingCount === 0 ? "Chain complete" : `${missingCount} link${missingCount > 1 ? "s" : ""} need attention`}
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
                  : node.missing
                    ? "border-dashed border-line bg-paper-alt/60 hover:border-ink"
                    : "border-line bg-paper hover:border-ink"
              )}
            >
              <span>
                <span className="text-xs font-medium text-muted">{node.label}</span>
                <span className="mt-0.5 block text-sm font-medium text-ink">
                  {node.missing ? `${node.label} — Missing` : node.title}
                </span>
              </span>
              {node.missing && <CircleAlert className="size-4 shrink-0 text-orange" aria-hidden />}
            </button>
            {i < chain.nodes.length - 1 && (
              <div className="flex justify-start py-1 ps-5">
                <ChevronDown className="size-4 text-muted" aria-hidden />
              </div>
            )}
          </div>
        ))}
      </div>

      <NodeDetail node={selectedNode} />
    </div>
  );
}

function NodeDetail({ node }: { node: ChainNode | null }) {
  if (!node) return null;

  return (
    <aside className="h-fit rounded-2xl border border-line p-6 lg:sticky lg:top-24">
      <span className="text-xs font-medium text-muted">{node.label}</span>
      {node.missing ? (
        <>
          <h3 className="mt-2 text-lg font-semibold text-ink">{node.label} — Missing</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{node.missingReason}</p>
          <Link
            href="/platform/insights"
            className="mt-5 inline-flex items-center rounded-full border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-paper-alt"
          >
            Explore What Is Needed
          </Link>
        </>
      ) : (
        <>
          <h3 className="mt-2 text-lg font-semibold text-ink">{node.title}</h3>
          {node.detail && <p className="mt-3 text-sm leading-relaxed text-muted">{node.detail}</p>}
        </>
      )}
    </aside>
  );
}
