import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PlatformButton } from "@/components/platform/PlatformButton";
import { ExploreSampleButton } from "@/components/platform/ExploreSampleButton";
import { ChainTeaser } from "@/components/platform/ChainTeaser";

export const metadata: Metadata = {
  title: "منصة MUDIU",
  description:
    "تربط MUDIU بين الأهداف الاستراتيجية والأداء والمبادرات والمنافع والأثر - ليرى القادة أين تتحقق القيمة وأين تنقطع.",
};

const principles = [
  { title: "افهم", body: "اطّلع على كيفية ترابط أهدافك وأدائك وتنفيذك فعليًا اليوم." },
  { title: "اربط", body: "اربط كل مبادرة بالهدف الذي تخدمه والقيمة التي يُفترض أن تحققها." },
  { title: "قِس", body: "اعرف أي المنافع محددة وقابلة للقياس ومدعومة بأدلة." },
  { title: "طوّر", body: "اكتشف بالضبط أين تنقطع السلسلة، قبل أن تلتزم بمزيد من الموارد." },
];

export default function PlatformHomePageAr() {
  return (
    <>
      <section className="pt-20 pb-16 md:pt-28 md:pb-20">
        <Container className="max-w-3xl text-center">
          <RevealOnScroll>
            <Eyebrow className="justify-center">منصة MUDIU</Eyebrow>
            <h1 className="mt-6 text-3xl font-semibold leading-[1.15] tracking-tight text-ink md:text-5xl">
              افهم أعمالك.
              <br />
              اربط استراتيجيتك بالقيمة.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              تربط MUDIU بين الاستراتيجية والأداء والمبادرات والخدمات والمنافع والأثر - ليرى
              القادة أين تُصنع القيمة، وأين تنقطع.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <PlatformButton href="/platform/ar/diagnostic" locale="ar">
                شغّل التشخيص التنظيمي
              </PlatformButton>
              <ExploreSampleButton locale="ar" />
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <section id="how-it-works" className="border-t border-line py-16 md:py-24">
        <Container className="max-w-4xl">
          <RevealOnScroll>
            <Eyebrow>كيف تعمل المنصة</Eyebrow>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              سلسلة واحدة، من النية إلى الدليل
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              لا تطلب MUDIU منك تعلّم منهجية جديدة. فهي تقرأ البيانات التي تملكها مؤسستك أصلًا،
              وتُظهر لك أين تتصل هذه السلسلة - وأين تنقطع بصمت.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={100} className="mt-10 overflow-x-auto">
            <ChainTeaser locale="ar" />
          </RevealOnScroll>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {principles.map((p, i) => (
              <RevealOnScroll key={p.title} delay={150 + i * 80}>
                <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={450} className="mt-14 flex flex-wrap items-center justify-center gap-4">
            <PlatformButton href="/platform/ar/diagnostic" locale="ar">
              شغّل التشخيص التنظيمي
            </PlatformButton>
            <ExploreSampleButton locale="ar" />
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
