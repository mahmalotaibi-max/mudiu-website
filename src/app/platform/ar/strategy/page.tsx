import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { RequireDiagnostic } from "@/components/platform/RequireDiagnostic";
import { StrategyExplorer } from "@/components/platform/StrategyExplorer";
import { sampleOrganizationAr } from "@/lib/platform/sampleData.ar";
import { buildAllChains } from "@/lib/platform/diagnostics";

export const metadata: Metadata = {
  title: "من الهدف إلى الأثر | منصة MUDIU",
};

export default function StrategyPageAr() {
  const chains = buildAllChains(sampleOrganizationAr, "ar");

  return (
    <RequireDiagnostic locale="ar">
      <PlatformShell active="strategy" locale="ar" />
      <Container className="max-w-6xl py-12 md:py-16">
        <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          من الهدف إلى الأثر
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          اختر هدفًا استراتيجيًا لتتبع مساره - من النية، مرورًا بالتنفيذ، وصولًا إلى المنفعة
          والأثر الذي وُضع من أجله. انقر على أي خطوة لعرض تفاصيلها.
        </p>

        <div className="mt-10">
          <StrategyExplorer chains={chains} locale="ar" />
        </div>
      </Container>
    </RequireDiagnostic>
  );
}
