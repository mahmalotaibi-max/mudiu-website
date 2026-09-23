import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PlatformButton } from "@/components/platform/PlatformButton";
import { ChainTeaser } from "@/components/platform/ChainTeaser";

export const metadata: Metadata = {
  title: "منصة MUDIU",
  description:
    "MUDIU تشخّص وضع مؤسستك، تكشف ما يعيق تقدمها، وتقترح ما تحتاج العمل عليه بعد ذلك.",
};

const journey = [
  { title: "شخّص", body: "أجب على أسئلة قصيرة عن مؤسستك - بلا حاجة لرفع بيانات." },
  { title: "افهم", body: "اعرف أين مؤسستك قوية، وأين تحتاج انتباهًا." },
  { title: "طوّر", body: "لكل ملاحظة حل مقترح، لا مجرد رقم بلا تفسير." },
  { title: "تابع وحقّق القيمة", body: "ابنِ على التشخيص بمرور الوقت، بدلًا من تكراره من الصفر." },
];

export default function PlatformHomePageAr() {
  return (
    <>
      <section className="pt-20 pb-16 md:pt-28 md:pb-20">
        <Container className="max-w-3xl text-center">
          <RevealOnScroll>
            <Eyebrow className="justify-center">منصة MUDIU</Eyebrow>
            <h1 className="mt-6 text-3xl font-semibold leading-[1.15] tracking-tight text-ink md:text-5xl">
              اعرف أين أنت.
              <br />
              اكتشف ما يعيقك.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              تشخيص مؤسسي مجاني يوضح لك أين تقف مؤسستك اليوم، وما الذي يعيق تقدمها، وما الذي
              يستحق العمل عليه بعد ذلك.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <PlatformButton href="/platform/ar/diagnostic" locale="ar">
                ابدأ التشخيص المجاني
              </PlatformButton>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <section id="how-it-works" className="border-t border-line py-16 md:py-24">
        <Container className="max-w-4xl">
          <RevealOnScroll>
            <Eyebrow>كيف تعمل MUDIU</Eyebrow>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              رحلة واحدة: من التشخيص إلى القيمة
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              MUDIU ليست لوحة مؤشرات ولا أداة إدارة مشاريع - هي رحلة تبدأ بتشخيص قصير، وتنتهي
              بمعرفة واضحة بما تحتاج مؤسستك العمل عليه.
            </p>
          </RevealOnScroll>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {journey.map((p, i) => (
              <RevealOnScroll key={p.title} delay={100 + i * 80}>
                <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={450} className="mt-14 flex flex-wrap items-center justify-center gap-4">
            <PlatformButton href="/platform/ar/diagnostic" locale="ar">
              ابدأ التشخيص المجاني
            </PlatformButton>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="border-t border-line py-16 md:py-24">
        <Container className="max-w-4xl">
          <RevealOnScroll>
            <Eyebrow>بعد التشخيص</Eyebrow>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              كيف تتصل استراتيجيتك بالتنفيذ والأثر
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              بعد التشخيص، تساعدك MUDIU على تتبع سلسلة واحدة - من الهدف إلى الأثر - لترى أين
              تتصل، وأين تنقطع بصمت.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={100} className="mt-10 overflow-x-auto">
            <ChainTeaser locale="ar" />
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
