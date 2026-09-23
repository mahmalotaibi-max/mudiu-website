import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { StrategyExplorer } from "@/components/platform/StrategyExplorer";
import { sampleOrganization } from "@/lib/platform/sampleData";
import { buildAllChains } from "@/lib/platform/diagnostics";

export const metadata: Metadata = {
  title: "From Goal to Impact | MUDIU Platform",
};

export default function StrategyPage() {
  const chains = buildAllChains(sampleOrganization);

  return (
    <>
      <PlatformShell active="strategy" />
      <Container className="max-w-6xl py-12 md:py-16">
        <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          From Goal to Impact
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Pick a strategic goal to follow its path — from intent, through delivery, to the
          benefit and impact it was meant to create. Click any step for detail.
        </p>

        <div className="mt-10">
          <StrategyExplorer chains={chains} />
        </div>
      </Container>
    </>
  );
}
