import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type Step = { index: string; title: string; detail: string };

// x positions run right-to-left to match RTL reading order (step 01 sits at the right).
const nodeX = [560, 448, 336, 224, 112, 40];
const nodeY = [150, 78, 150, 78, 150, 58];

const DRAW_DELAY_MS = 200;
const DRAW_DURATION_MS = 2000;

function wavePath() {
  let d = `M${nodeX[0]},${nodeY[0]}`;
  for (let i = 1; i < nodeX.length; i++) {
    const prevX = nodeX[i - 1];
    const prevY = nodeY[i - 1];
    const x = nodeX[i];
    const y = nodeY[i];
    const midX = (prevX + x) / 2;
    d += ` C${midX},${prevY} ${midX},${y} ${x},${y}`;
  }
  return d;
}

// Delay each step so its word becomes sharp right as the line reaches it.
function stepDelay(i: number, total: number) {
  return DRAW_DELAY_MS + (i / Math.max(total - 1, 1)) * DRAW_DURATION_MS;
}

export function MethodologyPath({ steps }: { steps: Step[] }) {
  return (
    <>
      {/* Desktop: one continuous flowing path through all stages */}
      <div className="relative mt-20 hidden lg:block">
        <svg
          viewBox="0 0 600 200"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 -top-10 h-[220px] w-full"
          aria-hidden
        >
          <path
            d={wavePath()}
            fill="none"
            stroke="var(--color-navy)"
            strokeOpacity="0.35"
            strokeWidth="1.5"
            pathLength={1}
            className="mudiu-path-draw"
          />
          {nodeX.map((x, i) => (
            <circle
              key={i}
              cx={x}
              cy={nodeY[i]}
              r={i === nodeX.length - 1 ? 6 : 3.5}
              fill={i === nodeX.length - 1 ? "var(--color-orange)" : "var(--color-navy)"}
              className="mudiu-node-pop"
              style={{ animationDelay: `${stepDelay(i, steps.length)}ms` }}
            />
          ))}
        </svg>

        <div className="relative flex justify-between">
          {steps.map((step, i) => (
            <RevealOnScroll
              key={step.index}
              delay={stepDelay(i, steps.length)}
              className="mudiu-step w-[15%] text-center"
              style={{ marginTop: i % 2 === 0 ? "5.5rem" : "0.5rem" }}
            >
              <p className="text-lg font-semibold text-ink">{step.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.detail}</p>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      {/* Mobile / tablet: vertical connected path */}
      <div className="relative mt-16 flex flex-col gap-10 lg:hidden">
        <div className="absolute top-2 bottom-2 right-[7px] w-px bg-line" aria-hidden />
        {steps.map((step, i) => (
          <RevealOnScroll
            key={step.index}
            delay={i * 140}
            className="mudiu-step relative pr-8"
          >
            <span
              className="absolute top-1.5 right-0 h-[7px] w-[7px] rounded-full"
              style={{
                background: i === steps.length - 1 ? "var(--color-orange)" : "var(--color-navy)",
              }}
              aria-hidden
            />
            <p className="text-lg font-semibold text-ink">{step.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.detail}</p>
          </RevealOnScroll>
        ))}
      </div>

      <style>{`
        .mudiu-path-draw {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: mudiu-path-in ${DRAW_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1) ${DRAW_DELAY_MS}ms forwards;
        }
        @keyframes mudiu-path-in {
          to { stroke-dashoffset: 0; }
        }
        .mudiu-node-pop {
          opacity: 0;
          transform-origin: center;
          transform-box: fill-box;
          animation: mudiu-node-pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes mudiu-node-pop-in {
          from { opacity: 0; transform: scale(0.3); }
          to { opacity: 1; transform: scale(1); }
        }
        .mudiu-step.reveal {
          filter: blur(6px);
        }
        .mudiu-step.reveal.is-visible {
          animation: mudiu-step-in 0.85s ease forwards;
        }
        @keyframes mudiu-step-in {
          from { opacity: 0; filter: blur(6px); transform: translateY(10px); }
          to { opacity: 1; filter: blur(0); transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
