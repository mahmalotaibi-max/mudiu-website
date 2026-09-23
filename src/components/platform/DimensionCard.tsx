import { cn } from "@/lib/utils";
import type { DimensionStatus } from "@/lib/platform/orgDiagnosisTypes";

const toneClass: Record<DimensionStatus, string> = {
  "no-signal": "text-ink",
  signal: "text-orange",
  "insufficient-data": "text-muted",
};

const dotClass: Record<DimensionStatus, string> = {
  "no-signal": "bg-ink",
  signal: "bg-orange",
  "insufficient-data": "bg-line",
};

export function DimensionCard({
  label,
  statusLabel,
  status,
  description,
}: {
  label: string;
  statusLabel: string;
  status: DimensionStatus;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-line p-6">
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className={cn("mt-3 flex items-center gap-2 text-lg font-semibold tracking-tight", toneClass[status])}>
        <span className={cn("size-2 rounded-full", dotClass[status])} aria-hidden />
        {statusLabel}
      </p>
      <p className="mt-3 text-xs leading-relaxed text-muted">{description}</p>
    </div>
  );
}
