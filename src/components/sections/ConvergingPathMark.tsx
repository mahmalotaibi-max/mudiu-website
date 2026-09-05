const scatterDots = [
  { cx: 205, cy: 68, r: 3 },
  { cx: 145, cy: 100, r: 4.5 },
  { cx: 225, cy: 155, r: 4 },
  { cx: 178, cy: 197, r: 3 },
  { cx: 245, cy: 218, r: 3 },
  { cx: 188, cy: 238, r: 4 },
  { cx: 133, cy: 262, r: 5.5 },
];

const convergePoint = { x: 388, y: 175 };
const endPoint = { x: 660, y: 175 };
const mainPath = `M${convergePoint.x},${convergePoint.y} C420,150 450,200 480,178 C520,150 560,195 ${endPoint.x},${endPoint.y}`;

export function ConvergingPathMark({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 800 350"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        role="img"
        aria-label="نقاط متفرقة تمثل التحدي تتجمع في مسار واحد يقود نحو الأثر"
      >
        {scatterDots.map((dot, i) => (
          <path
            key={`line-${i}`}
            d={`M${dot.cx},${dot.cy} Q${(dot.cx + convergePoint.x) / 2},${
              (dot.cy + convergePoint.y) / 2 + (i % 2 === 0 ? 10 : -10)
            } ${convergePoint.x},${convergePoint.y}`}
            stroke="var(--color-line)"
            strokeWidth="1.25"
            fill="none"
            pathLength={1}
            className="mudiu-scatter-line"
            style={{ animationDelay: `${0.1 + i * 0.08}s` }}
          />
        ))}

        {scatterDots.map((dot, i) => (
          <circle
            key={`dot-${i}`}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r}
            fill="var(--color-muted)"
            className="mudiu-scatter-dot"
            style={{ animationDelay: `${i * 0.06}s` }}
          />
        ))}

        <circle cx={convergePoint.x} cy={convergePoint.y} r="5.5" fill="var(--color-ink)" />

        <path
          d={mainPath}
          stroke="var(--color-ink)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          pathLength={1}
          className="mudiu-converge-draw"
        />

        <circle cx={endPoint.x} cy={endPoint.y} r="26" fill="var(--color-orange)" opacity="0.08" />
        <circle cx={endPoint.x} cy={endPoint.y} r="16" fill="var(--color-orange)" opacity="0.18" />
        <circle cx={endPoint.x} cy={endPoint.y} r="8" fill="var(--color-orange)" />

        <circle r="5" fill="var(--color-orange)" className="mudiu-converge-comet" />
        <circle r="10" fill="var(--color-orange)" opacity="0.25" className="mudiu-converge-comet" />

        <text
          x={scatterDots[6].cx}
          y="300"
          textAnchor="middle"
          className="fill-muted"
          style={{ font: "500 15px var(--font-sans)" }}
        >
          التحدي
        </text>
        <text
          x={endPoint.x}
          y="300"
          textAnchor="middle"
          className="fill-orange"
          style={{ font: "600 15px var(--font-sans)" }}
        >
          الأثر
        </text>
      </svg>

      <style>{`
        .mudiu-scatter-dot {
          opacity: 0;
          animation: mudiu-scatter-fade-in 0.6s ease forwards;
        }
        @keyframes mudiu-scatter-fade-in {
          to { opacity: 1; }
        }

        .mudiu-scatter-line {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          opacity: 0.6;
          animation: mudiu-line-draw 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes mudiu-line-draw {
          to { stroke-dashoffset: 0; }
        }

        .mudiu-converge-draw {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: mudiu-line-draw 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.9s forwards;
        }

        .mudiu-converge-comet {
          opacity: 0;
          offset-path: path("${mainPath}");
          offset-distance: 0%;
          animation:
            mudiu-comet-move 3.4s cubic-bezier(0.45, 0, 0.55, 1) 2.4s infinite,
            mudiu-comet-fade 3.4s ease 2.4s infinite;
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

        @media (prefers-reduced-motion: reduce) {
          .mudiu-scatter-dot, .mudiu-scatter-line, .mudiu-converge-draw {
            opacity: 1;
            stroke-dashoffset: 0;
            animation: none;
          }
          .mudiu-converge-comet {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
