import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PlatformButton } from "@/components/platform/PlatformButton";
import { ChainTeaser } from "@/components/platform/ChainTeaser";

export const metadata: Metadata = {
  title: "منصة MUDIU",
  description:
    "MUDIU تشخّص وضع مؤسستك، تكشف أين تظهر الإشارات التي تستحق التحقق، وتساعدك على تحديد ما يستحق العمل عليه بعد ذلك.",
};

const journey = [
  { title: "شخّص", body: "أجب على أسئلة قصيرة عن مؤسستك - بلا حاجة لرفع بيانات." },
  { title: "افهم", body: "اعرف أين تظهر الإشارات، وما الذي يستحق التحقق منه." },
  { title: "قرر", body: "لكل ملاحظة خطوة تالية واضحة، لا مجرد رقم بلا تفسير." },
  { title: "حدد النجاح", body: "ابنِ على ما اكتشفته." },
];

const outcomes = [
  {
    index: "01",
    title: "الإشارات التي تستحق التحقق",
    body: "كل ملاحظة تظهر مصاغة بوضوح، بلا أحكام عامة على مؤسستك.",
  },
  {
    index: "02",
    title: "الأدلة المرتبطة بها",
    body: "الأدلة المبنية على إجاباتك أنت تحديدًا، لا افتراضات جاهزة.",
  },
  {
    index: "03",
    title: "درجة الثقة في النتيجة",
    body: "مدى اكتمال الأدلة خلف كل ملاحظة، لا تقييم لأداء مؤسستك.",
  },
  {
    index: "04",
    title: "ما الذي يستحق التحقق منه",
    body: "سؤال محدد يوجّهك لتتأكد أن الملاحظة تعكس واقعك فعلًا.",
  },
  {
    index: "05",
    title: "الخطوة التالية",
    body: "خطوة واضحة تعرف من خلالها ماذا تفعل بعد ظهور الملاحظة.",
  },
];

const currentJourney = [
  { title: "تشخيص", body: "اكتشف الإشارات التي تستحق الانتباه." },
  { title: "تحقق", body: "افهم ما إذا كانت الإشارة تعكس واقع المؤسسة." },
  { title: "قرر", body: "حدد ما إذا كان الأمر يستحق العمل عليه." },
  { title: "حدد النجاح", body: "حوّل ما تم اعتماده إلى هدف واضح." },
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
              تشخيص مؤسسي مجاني يوضح لك أين تقف مؤسستك اليوم، وأين تظهر الإشارات التي تستحق
              التحقق، وما الذي يستحق العمل عليه بعد ذلك.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <PlatformButton href="/platform/ar/diagnostic" locale="ar">
                ابدأ التشخيص المجاني
              </PlatformButton>
            </div>
            <p className="mt-4 text-xs text-muted">ابدأ دون رفع ملفات أو بيانات مؤسستك.</p>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="border-t border-line py-14 md:py-16">
        <Container className="max-w-3xl">
          <RevealOnScroll>
            <div className="rounded-2xl bg-[#f7f4ec] px-7 py-8 md:px-10 md:py-9">
              <Eyebrow>كيف يُبنى التشخيص</Eyebrow>
              <h2 className="mt-3 text-xl font-semibold tracking-tight text-ink md:text-2xl">
                لا تُجيب على أسئلة لا تحتاجها.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                يبدأ التشخيص بإشارات أساسية لكل بُعد من أبعاد مؤسستك، ولا يتعمق في التفاصيل إلا
                حين تظهر إشارة تستحق فحصًا أقرب. كل مؤسسة تخرج بتشخيص مختلف، بحسب ما ظهر فعليًا
                لديها.
              </p>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <section id="how-it-works" className="border-t border-line py-16 md:py-24">
        <Container className="max-w-4xl">
          <RevealOnScroll>
            <Eyebrow>كيف تعمل MUDIU</Eyebrow>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              رحلة واحدة: من التشخيص إلى هدف واضح
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
        <Container className="max-w-3xl">
          <RevealOnScroll>
            <Eyebrow>مخرجات التشخيص</Eyebrow>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              ماذا ستعرف بعد التشخيص؟
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              لكل ملاحظة تظهر، تحصل على هذه العناصر تحديدًا - لا أكثر.
            </p>
          </RevealOnScroll>

          <div className="mt-10 divide-y divide-line border-t border-line">
            {outcomes.map((item, i) => (
              <RevealOnScroll key={item.index} delay={i * 70} className="flex gap-5 py-5">
                <span className="shrink-0 text-sm font-semibold text-[#8a8055]">{item.index}</span>
                <div>
                  <p className="text-base font-semibold text-ink">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16 md:py-24">
        <Container className="max-w-2xl text-center">
          <RevealOnScroll>
            <Eyebrow className="justify-center">بعد ظهور الإشارة</Eyebrow>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              تبدأ هنا.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              هذه هي المرحلة التي تعمل عليها MUDIU اليوم - من إشارة إلى هدف واضح.
            </p>
          </RevealOnScroll>

          <div className="mx-auto mt-12 flex max-w-xs flex-col items-center">
            {currentJourney.map((step, i) => (
              <RevealOnScroll key={step.title} delay={100 + i * 90} className="flex w-full flex-col items-center">
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="flex size-9 items-center justify-center rounded-full border border-[#cdc4a0] text-sm font-semibold text-[#6b7256]">
                    {i + 1}
                  </span>
                  <p className="text-base font-semibold text-ink">{step.title}</p>
                  <p className="max-w-[15rem] text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
                {i < currentJourney.length - 1 && (
                  <span className="my-4 text-[#8a8055]" aria-hidden>
                    ↓
                  </span>
                )}
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16 md:py-24">
        <Container className="max-w-4xl">
          <RevealOnScroll>
            <Eyebrow>رحلة MUDIU نحو الأثر</Eyebrow>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              كيف تمتد رحلة MUDIU مستقبلًا
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              بعد أن يتحول ما اكتشفته إلى هدف واضح، هذا هو الاتجاه الذي تتجه إليه رحلة MUDIU
              لاحقًا - من الهدف الاستراتيجي إلى الأثر. هذا تصور لما نبنيه تباعًا، وليست كل حلقة
              فيه متاحة اليوم.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={100} className="mt-10 overflow-x-auto">
            <ChainTeaser locale="ar" />
          </RevealOnScroll>
        </Container>
      </section>

      <section className="border-t border-line py-16 md:py-24">
        <Container className="max-w-4xl">
          <div className="grid gap-10 md:grid-cols-2">
            <RevealOnScroll>
              <Eyebrow>لمن MUDIU؟</Eyebrow>
              <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                MUDIU مصممة للقيادات وفرق الاستراتيجية والتطوير المؤسسي الذين يريدون معرفة ما
                يستحق العمل عليه، قبل التفكير في الحل.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <Eyebrow>قيمة MUDIU</Eyebrow>
              <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                التشخيص مجاني، ويساعدك على اكتشاف الإشارات التي تستحق التحقق. قيمة MUDIU تبدأ
                حين تريد مؤسستك تحويل ما تم التحقق منه إلى تحسين واضح يمكن متابعته.
              </p>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16 md:py-24">
        <Container className="max-w-2xl text-center">
          <RevealOnScroll>
            <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              ابدأ من حيث تقف مؤسستك اليوم.
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <PlatformButton href="/platform/ar/diagnostic" locale="ar">
                ابدأ التشخيص المجاني
              </PlatformButton>
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
