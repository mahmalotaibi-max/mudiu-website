function tone(score: number) {
  if (score >= 65) return "text-ink";
  if (score >= 45) return "text-navy";
  return "text-orange";
}

export function ScoreCard({
  label,
  score,
  qualifier,
  description,
}: {
  label: string;
  score: number;
  /** e.g. "Connected", "Data-supported", "Evidenced" - keeps the number from reading as a success rate. */
  qualifier: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-line p-6">
      <p className="text-sm font-medium text-muted">{label}</p>
      <div className={tone(score)}>
        <p className="mt-3 flex items-baseline gap-2 tracking-tight">
          <span className="text-4xl font-semibold">{score}%</span>
          <span className="text-sm font-medium">{qualifier}</span>
        </p>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-paper-alt">
          <div
            className="h-full rounded-full bg-current transition-all duration-700"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted">{description}</p>
    </div>
  );
}
