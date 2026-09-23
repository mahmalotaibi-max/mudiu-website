import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { AskMudiu } from "@/components/platform/AskMudiu";
import { sampleOrganization } from "@/lib/platform/sampleData";

export const metadata: Metadata = {
  title: "Ask MUDIU | MUDIU Platform",
};

export default function InsightsPage() {
  return (
    <>
      <PlatformShell active="insights" />
      <Container className="max-w-4xl py-12 md:py-16">
        <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">Ask MUDIU</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Ask a question about this organization&apos;s diagnostic data in plain language.
        </p>
        <div className="mt-10">
          <AskMudiu dataset={sampleOrganization} locale="en" />
        </div>
      </Container>
    </>
  );
}
