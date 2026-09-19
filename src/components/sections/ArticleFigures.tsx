// Simplified human-figure illustrations for article covers, drawn in the
// same abstract line/gradient language used across the site (see HeroMark,
// IndividualsGrowthMark): a rounded silhouette + the ink → navy → orange
// path gradient, instead of literal or photographic figures. Swapped in for
// the generic centered icon so knowledge covers read as more human without
// breaking the site's existing visual identity.

type Tone = "ink" | "navy" | "orange";

function Person({
  x,
  y,
  scale = 1,
  tone = "navy",
  opacity = 1,
}: {
  x: number;
  y: number;
  scale?: number;
  tone?: Tone;
  opacity?: number;
}) {
  const color = `var(--color-${tone})`;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
      <circle cx="0" cy="-46" r="13" fill={color} />
      <path d="M-24,28 C-24,-3 -13,-20 0,-20 C13,-20 24,-3 24,28 Z" fill={color} />
    </g>
  );
}

const sceneProps = {
  viewBox: "0 0 480 220",
  fill: "none" as const,
  xmlns: "http://www.w3.org/2000/svg",
  role: "img" as const,
};

/** قياس المنفعة: المنفعة تنتقل من المشروع إلى المستفيد */
export function GrowthScene({ className }: { className?: string }) {
  return (
    <svg {...sceneProps} className={className} aria-label="شخصان يتبادلان أثرًا يترجم إلى منفعة متحققة">
      <defs>
        <linearGradient id="growthSceneGradient" x1="150" y1="140" x2="330" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--color-navy)" />
          <stop offset="100%" stopColor="var(--color-orange)" />
        </linearGradient>
      </defs>
      <path
        d="M170,120 C210,95 250,95 290,100"
        stroke="url(#growthSceneGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        pathLength={1}
        className="mudiu-scene-draw"
      />
      <circle cx="230" cy="88" r="14" fill="var(--color-orange)" opacity="0.16" />
      <circle cx="230" cy="88" r="6" fill="var(--color-orange)" />
      <Person x={160} y={150} tone="navy" />
      <Person x={320} y={150} tone="orange" opacity={0.9} />
      <style>{`
        .mudiu-scene-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: mudiu-scene-in 1.6s cubic-bezier(0.22,1,0.36,1) 0.2s forwards; }
        @keyframes mudiu-scene-in { to { stroke-dashoffset: 0; } }
      `}</style>
    </svg>
  );
}

/** مؤشرات الأداء: شخص يصوّب نحو هدف واضح */
export function TargetScene({ className }: { className?: string }) {
  return (
    <svg {...sceneProps} className={className} aria-label="شخص يصوّب نحو هدف محدد">
      <circle cx="330" cy="105" r="34" stroke="var(--color-line)" strokeWidth="1" strokeDasharray="1 6" />
      <circle cx="330" cy="105" r="20" stroke="var(--color-navy)" strokeWidth="1.5" opacity="0.5" />
      <circle cx="330" cy="105" r="7" fill="var(--color-orange)" />
      <path
        d="M195,135 C245,120 280,115 305,108"
        stroke="var(--color-ink)"
        strokeWidth="1.5"
        strokeDasharray="1 5"
        strokeLinecap="round"
      />
      <Person x={180} y={150} tone="ink" />
    </svg>
  );
}

/** التحليل الاستراتيجي والدليل: شخص يمسك بوصلة على مسار */
export function CompassScene({ className }: { className?: string }) {
  return (
    <svg {...sceneProps} className={className} aria-label="شخص يمسك بوصلة يهتدي بها في مساره">
      <defs>
        <linearGradient id="compassSceneGradient" x1="60" y1="170" x2="360" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--color-ink)" />
          <stop offset="100%" stopColor="var(--color-navy)" />
        </linearGradient>
      </defs>
      <path
        d="M60,175 C140,160 180,140 230,120 C280,100 320,90 360,78"
        stroke="url(#compassSceneGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <Person x={230} y={150} tone="navy" />
      <circle cx="230" cy="95" r="17" stroke="var(--color-orange)" strokeWidth="2" fill="var(--color-paper)" />
      <path d="M230,86 L235,97 L230,104 L225,97 Z" fill="var(--color-orange)" />
    </svg>
  );
}

/** اختبار الفكرة: شخص يفحص فكرة صغيرة قبل الاستثمار فيها */
export function TestIdeaScene({ className }: { className?: string }) {
  return (
    <svg {...sceneProps} className={className} aria-label="شخص يفحص فكرة صغيرة داخل أنبوب اختبار">
      <Person x={200} y={150} tone="navy" />
      <path
        d="M262,95 L262,112 L250,135 C247,141 251,146 257,146 L281,146 C287,146 291,141 288,135 L276,112 L276,95"
        stroke="var(--color-orange)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M260,95 L278,95" stroke="var(--color-orange)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="269" cy="132" r="7" fill="var(--color-orange)" opacity="0.85" />
      <circle cx="308" cy="70" r="3" fill="var(--color-line)" />
      <circle cx="320" cy="90" r="2" fill="var(--color-line)" />
    </svg>
  );
}

/** من التدريب إلى القدرة: شخص يحمل معرفة تتحول إلى تقدّم */
export function LearningScene({ className }: { className?: string }) {
  return (
    <svg {...sceneProps} className={className} aria-label="شخص يحمل كتابًا مفتوحًا وتظهر أمامه إشارة تقدّم">
      <Person x={195} y={150} tone="navy" />
      <path
        d="M240,118 C248,112 262,112 270,118 C278,112 292,112 300,118 L300,135 C292,129 278,129 270,135 C262,129 248,129 240,135 Z"
        fill="var(--color-paper)"
        stroke="var(--color-navy)"
        strokeWidth="1.5"
      />
      <path
        d="M300,150 C320,145 335,132 345,110"
        stroke="var(--color-orange)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 6"
      />
      <circle cx="345" cy="110" r="5" fill="var(--color-orange)" />
    </svg>
  );
}

/** التشخيص: شخص يفحص بيانات عن قرب */
export function DiagnosisScene({ className }: { className?: string }) {
  return (
    <svg {...sceneProps} className={className} aria-label="شخص يفحص لوحة بيانات بعدسة تكبير">
      <Person x={190} y={150} tone="ink" />
      <g>
        <rect x="255" y="95" width="70" height="46" rx="4" fill="var(--color-paper)" stroke="var(--color-line)" />
        <rect x="264" y="120" width="8" height="14" fill="var(--color-navy)" opacity="0.6" />
        <rect x="278" y="112" width="8" height="22" fill="var(--color-navy)" opacity="0.8" />
        <rect x="292" y="104" width="8" height="30" fill="var(--color-orange)" />
        <rect x="306" y="116" width="8" height="18" fill="var(--color-navy)" opacity="0.6" />
      </g>
      <circle cx="333" cy="128" r="14" stroke="var(--color-ink)" strokeWidth="2.5" fill="none" />
      <line x1="343" y1="138" x2="352" y2="147" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/** فريق: شخصان جنبًا إلى جنب */
export function TeamScene({ className }: { className?: string }) {
  return (
    <svg {...sceneProps} className={className} aria-label="شخصان يعملان جنبًا إلى جنب">
      <Person x={210} y={150} tone="navy" />
      <Person x={265} y={150} scale={0.92} tone="orange" opacity={0.85} />
    </svg>
  );
}

/** ثقة: شخص إلى جانب علامة ضمان */
export function TrustScene({ className }: { className?: string }) {
  return (
    <svg {...sceneProps} className={className} aria-label="شخص إلى جانب علامة ثقة وضمان">
      <Person x={200} y={150} tone="navy" />
      <path
        d="M290,88 L312,96 L312,116 C312,130 302,140 290,144 C278,140 268,130 268,116 L268,96 Z"
        stroke="var(--color-orange)"
        strokeWidth="2"
        fill="var(--color-paper)"
      />
      <path d="M280,114 L287,122 L301,104" stroke="var(--color-orange)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/** فكرة: شخص تعلو رأسه إشارة فكرة */
export function IdeaScene({ className }: { className?: string }) {
  return (
    <svg {...sceneProps} className={className} aria-label="شخص تظهر فوقه إشارة فكرة مضيئة">
      <Person x={210} y={150} tone="navy" />
      <circle cx="210" cy="82" r="15" fill="var(--color-orange)" opacity="0.9" />
      <path d="M204,100 L216,100" stroke="var(--color-orange)" strokeWidth="2" strokeLinecap="round" />
      <path d="M186,66 L176,58 M234,66 L244,58 M210,58 L210,46" stroke="var(--color-orange)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

/** أداة: شخص يحمل مفتاح ربط */
export function ToolScene({ className }: { className?: string }) {
  return (
    <svg {...sceneProps} className={className} aria-label="شخص يحمل أداة عمل">
      <Person x={210} y={150} tone="navy" />
      <path
        d="M270,100 C276,94 286,94 292,100 C297,105 297,112 293,117 L279,131 L270,122 L284,108 C280,106 274,106 270,110 C264,116 264,124 269,130"
        stroke="var(--color-orange)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/** مقال: شخص يحمل صفحة/وثيقة */
export function DocumentScene({ className }: { className?: string }) {
  return (
    <svg {...sceneProps} className={className} aria-label="شخص يحمل صفحة مكتوبة">
      <Person x={200} y={150} tone="navy" />
      <rect x="255" y="85" width="56" height="70" rx="4" fill="var(--color-paper)" stroke="var(--color-line)" />
      <line x1="266" y1="102" x2="300" y2="102" stroke="var(--color-navy)" strokeWidth="2" opacity="0.7" />
      <line x1="266" y1="114" x2="300" y2="114" stroke="var(--color-navy)" strokeWidth="2" opacity="0.5" />
      <line x1="266" y1="126" x2="288" y2="126" stroke="var(--color-orange)" strokeWidth="2" />
    </svg>
  );
}

/** قالب: شخص إلى جانب شبكة قالب جاهز */
export function TemplateScene({ className }: { className?: string }) {
  return (
    <svg {...sceneProps} className={className} aria-label="شخص إلى جانب شبكة قالب جاهز">
      <Person x={200} y={150} tone="navy" />
      <g stroke="var(--color-line)" fill="var(--color-paper)">
        <rect x="255" y="88" width="30" height="30" rx="3" />
        <rect x="291" y="88" width="30" height="30" rx="3" />
        <rect x="255" y="124" width="30" height="30" rx="3" />
        <rect x="291" y="124" width="30" height="30" rx="3" fill="var(--color-orange)" opacity="0.15" stroke="var(--color-orange)" />
      </g>
    </svg>
  );
}
