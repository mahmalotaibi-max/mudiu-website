export function PathMotif() {
  return (
    <svg
      viewBox="0 0 1200 300"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute inset-x-0 top-0 h-28 w-full md:h-36"
      aria-hidden
    >
      <defs>
        <linearGradient id="pathMotifGradient" x1="1150" y1="230" x2="50" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--color-ink)" />
          <stop offset="55%" stopColor="var(--color-navy)" />
          <stop offset="100%" stopColor="var(--color-orange)" />
        </linearGradient>
      </defs>

      <path
        d="M1150,230 C980,260 940,150 800,140 C620,127 600,220 420,190 C260,163 220,90 50,60"
        stroke="url(#pathMotifGradient)"
        strokeOpacity="0.16"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        pathLength={1}
        className="mudiu-motif-draw"
      />

      <circle cx="1150" cy="230" r="4" fill="var(--color-ink)" opacity="0.3" />
      <circle cx="50" cy="60" r="6" fill="var(--color-orange)" opacity="0.5" />

      <style>{`
        .mudiu-motif-draw {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: mudiu-motif-in 2.2s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
        }
        @keyframes mudiu-motif-in {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  );
}
