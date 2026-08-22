const tops = [
  { x: 80, y: 40 },
  { x: 240, y: 40 },
  { x: 400, y: 40 },
];

const merge = { x: 240, y: 190 };
const impact = { x: 240, y: 340 };

export function InstitutionsSystemMark() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div
        className="pointer-events-none absolute inset-[10%] -z-10 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 75%, color-mix(in srgb, var(--color-orange) 12%, transparent), transparent 55%), radial-gradient(circle at 50% 15%, color-mix(in srgb, var(--color-navy) 10%, transparent), transparent 55%)",
        }}
        aria-hidden
      />

      <svg
        viewBox="0 0 480 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        role="img"
        aria-label="رمز يعبر عن جمع أطراف المؤسسة المتفرقة في مسار واحد نحو الأثر"
      >
        {tops.map((t, i) => (
          <line
            key={`in-${i}`}
            x1={t.x}
            y1={t.y}
            x2={merge.x}
            y2={merge.y}
            stroke="var(--color-navy)"
            strokeWidth="1.5"
            pathLength={1}
            className="mudiu-converge"
            style={{ animationDelay: `${200 + i * 160}ms` }}
          />
        ))}

        <line
          x1={merge.x}
          y1={merge.y}
          x2={impact.x}
          y2={impact.y}
          stroke="url(#institutionsGradient)"
          strokeWidth="2.5"
          pathLength={1}
          className="mudiu-converge"
          style={{ animationDelay: "760ms" }}
        />

        <defs>
          <linearGradient id="institutionsGradient" x1={merge.x} y1={merge.y} x2={impact.x} y2={impact.y} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-navy)" />
            <stop offset="100%" stopColor="var(--color-orange)" />
          </linearGradient>
        </defs>

        {tops.map((t, i) => (
          <circle key={`dot-${i}`} cx={t.x} cy={t.y} r="4.5" fill="var(--color-ink)" />
        ))}
        <circle cx={merge.x} cy={merge.y} r="4.5" fill="var(--color-navy)" />

        <circle cx={impact.x} cy={impact.y} r="18" fill="var(--color-orange)" opacity="0.15" />
        <circle cx={impact.x} cy={impact.y} r="8" fill="var(--color-orange)" />
      </svg>

      <style>{`
        .mudiu-converge {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: mudiu-converge-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes mudiu-converge-in {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
