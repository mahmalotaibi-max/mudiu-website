import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { whyMudiu } from "@/content/home";

// x positions run right-to-left to match RTL reading order (step 01 sits at the right).
const nodeX = [560, 448, 336, 224, 112, 40];
const nodeY = [150, 78, 150, 78, 150, 58];

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

export function WhyMudiu() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <RevealOnScroll>
          <Eyebrow>{whyMudiu.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {whyMudiu.title}
          </h2>
        </RevealOnScroll>

        {/* Desktop: one continuous flowing path through all six stages */}
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
              <circle key={i} cx={x} cy={nodeY[i]} r={i === nodeX.length - 1 ? 6 : 3.5} fill={i === nodeX.length - 1 ? "var(--color-orange)" : "var(--color-navy)"} />
            ))}
          </svg>

          <div className="relative flex justify-between">
            {whyMudiu.steps.map((step, i) => (
              <RevealOnScroll
                key={step.index}
                delay={i * 100}
                className="w-[15%] text-center"
                style={{ marginTop: i % 2 === 0 ? "5.5rem" : "0.5rem" }}
              >
                <span className="text-xs font-medium text-orange">{step.index}</span>
                <p className="mt-2 text-lg font-semibold text-ink">{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.detail}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        {/* Mobile / tablet: vertical connected path */}
        <div className="relative mt-16 flex flex-col gap-10 lg:hidden">
          <div className="absolute top-2 bottom-2 right-[7px] w-px bg-line" aria-hidden />
          {whyMudiu.steps.map((step, i) => (
            <RevealOnScroll key={step.index} delay={i * 80} className="relative pr-8">
              <span
                className="absolute top-1.5 right-0 h-[7px] w-[7px] rounded-full"
                style={{
                  background:
                    i === whyMudiu.steps.length - 1 ? "var(--color-orange)" : "var(--color-navy)",
                }}
                aria-hidden
              />
              <span className="text-xs font-medium text-orange">{step.index}</span>
              <p className="mt-1 text-lg font-semibold text-ink">{step.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.detail}</p>
            </RevealOnScroll>
          ))}
        </div>
      </Container>

      <style>{`
        .mudiu-path-draw {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: mudiu-path-in 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
        }
        @keyframes mudiu-path-in {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
}
