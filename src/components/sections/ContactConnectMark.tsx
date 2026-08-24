export function ContactConnectMark() {
  return (
    <svg
      viewBox="0 0 420 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute -inset-x-6 -top-10 -z-10 h-[420px] w-[420px] opacity-[0.14]"
      aria-hidden
    >
      <defs>
        <linearGradient id="connectGradient" x1="40" y1="360" x2="360" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--color-ink)" />
          <stop offset="100%" stopColor="var(--color-orange)" />
        </linearGradient>
      </defs>

      <path
        d="M40,360 C120,320 160,280 200,220 C250,150 280,110 360,60"
        stroke="url(#connectGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        pathLength={1}
        className="mudiu-connect-draw"
      />

      <circle cx="40" cy="360" r="6" fill="var(--color-ink)" />
      <circle cx="360" cy="60" r="9" fill="var(--color-orange)" />

      <style>{`
        .mudiu-connect-draw {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: mudiu-connect-in 1.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
        }
        @keyframes mudiu-connect-in {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  );
}
