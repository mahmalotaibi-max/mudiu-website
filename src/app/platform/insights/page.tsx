import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { RequireDiagnostic } from "@/components/platform/RequireDiagnostic";
import { AskMudiu } from "@/components/platform/AskMudiu";

export const metadata: Metadata = {
  title: "Ask MUDIU | MUDIU Platform",
};

export default function InsightsPage() {
  return (
    <RequireDiagnostic>
      <PlatformShell active="insights" />
      <Container className="max-w-4xl py-12 md:py-16">
        <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">Ask MUDIU</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Ask a question about this organization&apos;s diagnostic data in plain language.
        </p>
        <div className="mt-10">
          <AskMudiu />
        </div>
      </Container>
    </RequireDiagnostic>
  );
}
