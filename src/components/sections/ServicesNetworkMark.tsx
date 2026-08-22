const nodes = [
  { x: 240, y: 60, label: "الاستراتيجية" },
  { x: 380, y: 145, label: "الأداء والمؤشرات" },
  { x: 380, y: 290, label: "التطوير المؤسسي" },
  { x: 240, y: 375, label: "القيادة وبناء القدرات" },
  { x: 100, y: 290, label: "التحول والتغيير" },
  { x: 100, y: 145, label: "التقييم والتحسين" },
];

const center = { x: 240, y: 218 };

export function ServicesNetworkMark() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div
        className="pointer-events-none absolute inset-[10%] -z-10 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--color-orange) 12%, transparent), transparent 60%)",
        }}
        aria-hidden
      />

      <svg
        viewBox="0 0 480 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        role="img"
        aria-label="رمز يعبر عن ربط ست ركائز الخدمات في نظام واحد متكامل"
      >
        {nodes.map((n, i) => (
          <line
            key={`ring-${i}`}
            x1={n.x}
            y1={n.y}
            x2={nodes[(i + 1) % nodes.length].x}
            y2={nodes[(i + 1) % nodes.length].y}
            stroke="var(--color-line)"
            strokeWidth="1"
            strokeDasharray="1 6"
          />
        ))}

        {nodes.map((n, i) => (
          <line
            key={`spoke-${i}`}
            x1={center.x}
            y1={center.y}
            x2={n.x}
            y2={n.y}
            stroke="var(--color-navy)"
            strokeWidth="1.5"
            pathLength={1}
            className="mudiu-spoke"
            style={{ animationDelay: `${300 + i * 140}ms` }}
          />
        ))}

        {nodes.map((n, i) => (
          <circle
            key={`dot-${i}`}
            cx={n.x}
            cy={n.y}
            r="5"
            fill="var(--color-ink)"
            className="mudiu-node"
            style={{ animationDelay: `${300 + i * 140}ms` }}
          />
        ))}

        <circle cx={center.x} cy={center.y} r="20" fill="var(--color-orange)" opacity="0.15" />
        <circle cx={center.x} cy={center.y} r="9" fill="var(--color-orange)" />
      </svg>

      <style>{`
        .mudiu-spoke {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: mudiu-spoke-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .mudiu-node {
          opacity: 0;
          transform-origin: center;
          transform-box: fill-box;
          animation: mudiu-node-in 0.5s ease forwards;
        }
        @keyframes mudiu-spoke-in {
          to { stroke-dashoffset: 0; }
        }
        @keyframes mudiu-node-in {
          from { opacity: 0; transform: scale(0.4); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
