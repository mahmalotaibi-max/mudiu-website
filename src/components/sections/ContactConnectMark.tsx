export function ContactConnectMark() {
  return (
    <svg
      viewBox="0 0 480 140"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute inset-x-0 -bottom-6 -z-10 h-20 w-full opacity-[0.14] md:h-28"
      aria-hidden
    >
      <defs>
        <linearGradient id="connectGradient" x1="20" y1="110" x2="460" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--color-ink)" />
          <stop offset="100%" stopColor="var(--color-orange)" />
        </linearGradient>
      </defs>

      <path
        d="M20,110 C120,90 160,50 240,60 C320,70 360,30 460,30"
        stroke="url(#connectGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        pathLength={1}
        className="mudiu-connect-draw"
      />

      <circle cx="20" cy="110" r="6" fill="var(--color-ink)" />
      <circle cx="460" cy="30" r="9" fill="var(--color-orange)" />

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
