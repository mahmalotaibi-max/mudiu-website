const rings = [60, 110, 165, 225];

export function IndividualsGrowthMark() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div
        className="pointer-events-none absolute inset-[8%] -z-10 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle at 65% 30%, color-mix(in srgb, var(--color-orange) 16%, transparent), transparent 60%)",
        }}
        aria-hidden
      />

      <svg
        viewBox="0 0 480 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        role="img"
        aria-label="رمز يعبر عن رحلة تطور فردية تنمو تدريجيًا"
      >
        <defs>
          <linearGradient id="growthGradient" x1="90" y1="360" x2="380" y2="130" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-ink)" />
            <stop offset="65%" stopColor="var(--color-navy)" />
            <stop offset="100%" stopColor="var(--color-orange)" />
          </linearGradient>
        </defs>

        {rings.map((r, i) => (
          <circle
            key={r}
            cx="240"
            cy="240"
            r={r}
            stroke="var(--color-line)"
            strokeWidth="1"
            strokeDasharray={i === rings.length - 1 ? undefined : "1 6"}
          />
        ))}

        <path
          d="M110,360 C130,300 160,270 210,255 C280,235 300,190 380,130"
          stroke="url(#growthGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          pathLength={1}
          className="mudiu-growth-draw"
        />

        <circle cx="110" cy="360" r="4" fill="var(--color-ink)" />
        <circle cx="210" cy="255" r="3.5" fill="var(--color-navy)" opacity="0.85" />

        <circle cx="380" cy="130" r="16" fill="var(--color-orange)" opacity="0.16" />
        <circle cx="380" cy="130" r="8" fill="var(--color-orange)" />

        <line x1="110" y1="392" x2="110" y2="364" stroke="var(--color-line)" strokeWidth="1" />
        <text
          x="110"
          y="412"
          textAnchor="middle"
          className="fill-muted"
          style={{ font: "500 12px var(--font-sans)" }}
        >
          التحدي
        </text>

        <text
          x="380"
          y="100"
          textAnchor="middle"
          className="fill-ink"
          style={{ font: "600 13px var(--font-sans)" }}
        >
          الأثر
        </text>
      </svg>

      <style>{`
        .mudiu-growth-draw {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: mudiu-growth-in 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
        }
        @keyframes mudiu-growth-in {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
