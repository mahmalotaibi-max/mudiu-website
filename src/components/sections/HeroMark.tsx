export function HeroMark({ showLabels = true }: { showLabels?: boolean } = {}) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      <div
        className="pointer-events-none absolute inset-[8%] -z-10 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle at 68% 28%, color-mix(in srgb, var(--color-orange) 18%, transparent), transparent 60%), radial-gradient(circle at 28% 78%, color-mix(in srgb, var(--color-navy) 14%, transparent), transparent 55%)",
        }}
        aria-hidden
      />

      <svg
        viewBox="0 0 480 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        role="img"
        aria-label="مسار عضوي يعبر عن المضي من التحدي إلى الأثر"
      >
        <defs>
          <linearGradient id="mudiuProgress" x1="70" y1="380" x2="410" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-ink)" />
            <stop offset="60%" stopColor="var(--color-navy)" />
            <stop offset="100%" stopColor="var(--color-orange)" />
          </linearGradient>
        </defs>

        <circle cx="240" cy="240" r="238" stroke="var(--color-line)" strokeWidth="1" />

        <path
          d="M70,380 C90,280 150,262 220,240 C300,214 338,150 410,90"
          stroke="url(#mudiuProgress)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          pathLength={1}
          className="mudiu-draw"
        />

        <circle cx="70" cy="380" r="4" fill="var(--color-ink)" />
        <circle cx="205" cy="253" r="3.5" fill="var(--color-navy)" opacity="0.8" />
        <circle cx="330" cy="163" r="3.5" fill="var(--color-navy)" opacity="0.8" />

        <circle cx="410" cy="90" r="16" fill="var(--color-orange)" opacity="0.16" />
        <circle cx="410" cy="90" r="8" fill="var(--color-orange)" />

        <circle r="5" fill="var(--color-orange)" className="mudiu-comet" />
        <circle r="10" fill="var(--color-orange)" opacity="0.25" className="mudiu-comet" />

        {showLabels && (
          <>
            <line x1="70" y1="410" x2="70" y2="382" stroke="var(--color-line)" strokeWidth="1" />
            <text
              x="70"
              y="430"
              textAnchor="middle"
              className="fill-muted"
              style={{ font: "500 12px var(--font-sans)" }}
            >
              التحدي
            </text>

            <text
              x="410"
              y="60"
              textAnchor="middle"
              className="fill-ink"
              style={{ font: "600 13px var(--font-sans)" }}
            >
              الأثر
            </text>
          </>
        )}
      </svg>

      <style>{`
        .mudiu-draw {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: mudiu-draw-in 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
        }
        @keyframes mudiu-draw-in {
          to { stroke-dashoffset: 0; }
        }
        .mudiu-comet {
          opacity: 0;
          offset-path: path("M70,380 C90,280 150,262 220,240 C300,214 338,150 410,90");
          offset-distance: 0%;
          offset-rotate: 0deg;
          animation:
            mudiu-comet-move 3.2s cubic-bezier(0.45, 0, 0.55, 1) 2.1s infinite,
            mudiu-comet-fade 3.2s ease 2.1s infinite;
        }
        @keyframes mudiu-comet-move {
          from { offset-distance: 0%; }
          to { offset-distance: 100%; }
        }
        @keyframes mudiu-comet-fade {
          0%, 100% { opacity: 0; }
          8%, 85% { opacity: 1; }
          95% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
