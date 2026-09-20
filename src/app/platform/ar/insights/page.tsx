import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { RequireDiagnostic } from "@/components/platform/RequireDiagnostic";
import { AskMudiu } from "@/components/platform/AskMudiu";
import { sampleOrganizationAr } from "@/lib/platform/sampleData.ar";

export const metadata: Metadata = {
  title: "اسأل MUDIU | منصة MUDIU",
};

export default function InsightsPageAr() {
  return (
    <RequireDiagnostic locale="ar">
      <PlatformShell active="insights" locale="ar" />
      <Container className="max-w-4xl py-12 md:py-16">
        <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">اسأل MUDIU</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          اطرح سؤالًا حول بيانات تشخيص هذه المؤسسة بلغة بسيطة.
        </p>
        <div className="mt-10">
          <AskMudiu dataset={sampleOrganizationAr} locale="ar" />
        </div>
      </Container>
    </RequireDiagnostic>
  );
}
