import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { DemoBanner } from "@/components/platform/DemoBanner";
import { SampleOrgExplorer } from "@/components/platform/SampleOrgExplorer";

export const metadata: Metadata = {
  title: "من الهدف إلى الأثر | منصة MUDIU",
};

export default function StrategyPageAr() {
  return (
    <>
      <PlatformShell active="strategy" locale="ar" />
      <DemoBanner locale="ar" />
      <Container className="max-w-6xl py-12 md:py-16">
        <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          من الهدف إلى الأثر
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          اختر هدفًا استراتيجيًا لتتبع مساره - من النية، مرورًا بالتنفيذ، وصولًا إلى المنفعة
          والأثر الذي وُضع من أجله. انقر على أي خطوة لعرض تفاصيلها.
        </p>

        <div className="mt-6 rounded-2xl border border-line bg-paper-alt p-5 md:p-6">
          <p className="text-sm font-semibold text-ink md:text-base">
            إنجاز المبادرة لا يعني بالضرورة تحقق المنفعة.
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            MUDIU يساعدك على تتبع السلسلة من النية الاستراتيجية إلى القيمة التي تحققت فعليًا.
          </p>
        </div>

        <div className="mt-10">
          <SampleOrgExplorer />
        </div>
      </Container>
    </>
  );
}
