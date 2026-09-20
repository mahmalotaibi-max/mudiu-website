"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Chain } from "@/lib/platform/types";
import { RiwaaShowcase } from "@/components/platform/RiwaaShowcase";
import { StrategyExplorer } from "@/components/platform/StrategyExplorer";

type OrgKey = "riwaa" | "health" | "digital";

const orgs: { key: OrgKey; label: string; enabled: boolean }[] = [
  { key: "riwaa", label: "رِواء للأغذية", enabled: true },
  { key: "health", label: "مؤسسة صحية تجريبية", enabled: true },
  { key: "digital", label: "شركة خدمات رقمية", enabled: false },
];

export function SampleOrgExplorer({ healthChains }: { healthChains: Chain[] }) {
  const [org, setOrg] = useState<OrgKey>("riwaa");

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted">المؤسسة التجريبية:</span>
        <div className="flex flex-wrap gap-2">
          {orgs.map((o) => (
            <button
              key={o.key}
              type="button"
              disabled={!o.enabled}
              onClick={() => setOrg(o.key)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                !o.enabled
                  ? "cursor-not-allowed border-line text-muted/60"
                  : org === o.key
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-ink hover:border-ink"
              )}
            >
              {o.label}
              {!o.enabled && <span className="ms-1.5 text-xs text-muted/70">(قريبًا)</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {org === "riwaa" && <RiwaaShowcase />}
        {org === "health" && <StrategyExplorer chains={healthChains} locale="ar" />}
      </div>
    </div>
  );
}
