export function HeroLiveMark() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      <div
        className="pointer-events-none absolute inset-[6%] -z-10 rounded-full mudiu-blob-a"
        style={{
          background:
            "radial-gradient(circle at 68% 26%, color-mix(in srgb, var(--color-orange) 22%, transparent), transparent 60%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-[10%] -z-10 rounded-full mudiu-blob-b"
        style={{
          background:
            "radial-gradient(circle at 26% 78%, color-mix(in srgb, var(--color-navy) 18%, transparent), transparent 55%)",
        }}
        aria-hidden
      />

      <svg
        viewBox="0 0 480 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        role="img"
        aria-label="مسار حي يعبر عن مسارات متعددة تمضي من التحدي إلى الأثر"
      >
        <defs>
          <linearGradient id="mudiuLiveProgress" x1="70" y1="380" x2="410" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-ink)" />
            <stop offset="60%" stopColor="var(--color-navy)" />
            <stop offset="100%" stopColor="var(--color-orange)" />
          </linearGradient>
        </defs>

        <g className="mudiu-ring-spin-slow" style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}>
          <circle cx="240" cy="240" r="150" stroke="var(--color-line)" strokeWidth="1" strokeDasharray="1 7" />
        </g>
        <g className="mudiu-ring-spin-slow-reverse" style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}>
          <circle cx="240" cy="240" r="230" stroke="var(--color-line)" strokeWidth="1" strokeDasharray="1 10" />
        </g>
        <circle cx="240" cy="240" r="238" stroke="var(--color-line)" strokeWidth="1" />

        {/* faint secondary path — a second journey moving on its own rhythm */}
        <path
          d="M55,150 C130,120 170,190 240,210 C320,235 360,180 430,240"
          stroke="var(--color-navy)"
          strokeOpacity="0.18"
          strokeWidth="1.75"
          strokeLinecap="round"
          fill="none"
          pathLength={1}
          className="mudiu-draw-secondary"
        />
        <circle r="4" fill="var(--color-navy)" opacity="0.5" className="mudiu-comet-secondary" />

        {/* primary path — التحدي to الأثر */}
        <path
          d="M70,380 C90,280 150,262 220,240 C300,214 338,150 410,90"
          stroke="url(#mudiuLiveProgress)"
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

        {/* sparkle dots — small ambient life around the mark */}
        <circle cx="120" cy="120" r="2.5" fill="var(--color-orange)" className="mudiu-sparkle" style={{ animationDelay: "0.3s" }} />
        <circle cx="360" cy="330" r="2.5" fill="var(--color-navy)" className="mudiu-sparkle" style={{ animationDelay: "1.4s" }} />
        <circle cx="300" cy="80" r="2" fill="var(--color-orange)" className="mudiu-sparkle" style={{ animationDelay: "2.5s" }} />

        <line x1="70" y1="410" x2="70" y2="382" stroke="var(--color-line)" strokeWidth="1" />
        <text x="70" y="430" textAnchor="middle" className="fill-muted" style={{ font: "500 12px var(--font-sans)" }}>
          التحدي
        </text>

        <text x="410" y="60" textAnchor="middle" className="fill-ink" style={{ font: "600 13px var(--font-sans)" }}>
          الأثر
        </text>
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

        .mudiu-draw-secondary {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: mudiu-draw-in 2.2s cubic-bezier(0.22, 1, 0.36, 1) 0.6s forwards;
        }
        .mudiu-comet-secondary {
          opacity: 0;
          offset-path: path("M55,150 C130,120 170,190 240,210 C320,235 360,180 430,240");
          offset-distance: 0%;
          animation:
            mudiu-comet-move-secondary 4.6s cubic-bezier(0.45, 0, 0.55, 1) 1.4s infinite,
            mudiu-comet-fade-secondary 4.6s ease 1.4s infinite;
        }
        @keyframes mudiu-comet-move-secondary {
          from { offset-distance: 0%; }
          to { offset-distance: 100%; }
        }
        @keyframes mudiu-comet-fade-secondary {
          0%, 100% { opacity: 0; }
          10%, 80% { opacity: 0.7; }
          95% { opacity: 0; }
        }

        .mudiu-ring-spin-slow {
          animation: mudiu-spin 50s linear infinite;
        }
        .mudiu-ring-spin-slow-reverse {
          animation: mudiu-spin-reverse 65s linear infinite;
        }
        @keyframes mudiu-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes mudiu-spin-reverse {
          to { transform: rotate(-360deg); }
        }

        .mudiu-blob-a {
          animation: mudiu-drift-a 11s ease-in-out infinite alternate;
        }
        .mudiu-blob-b {
          animation: mudiu-drift-b 14s ease-in-out infinite alternate;
        }
        @keyframes mudiu-drift-a {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(-3%, 3%) scale(1.06); }
        }
        @keyframes mudiu-drift-b {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(3%, -2%) scale(1.05); }
        }

        .mudiu-sparkle {
          opacity: 0;
          animation: mudiu-sparkle-twinkle 3.6s ease-in-out infinite;
        }
        @keyframes mudiu-sparkle-twinkle {
          0%, 100% { opacity: 0; transform: scale(0.6); }
          50% { opacity: 1; transform: scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .mudiu-comet, .mudiu-comet-secondary, .mudiu-ring-spin-slow, .mudiu-ring-spin-slow-reverse, .mudiu-blob-a, .mudiu-blob-b, .mudiu-sparkle {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
