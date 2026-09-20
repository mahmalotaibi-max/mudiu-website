"use client";

import Link from "next/link";
import { usePlatform } from "@/components/platform/PlatformProvider";
import { Container } from "@/components/ui/Container";
import { PlatformButton } from "@/components/platform/PlatformButton";

export function RequireDiagnostic({ children }: { children: React.ReactNode }) {
  const { hasRun } = usePlatform();

  if (!hasRun) {
    return (
      <Container className="max-w-2xl py-24 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Run a diagnostic first</h1>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-muted">
          This view is built from your organization&apos;s diagnostic data. Start one with the
          sample organization to explore it.
        </p>
        <div className="mt-8 flex justify-center">
          <PlatformButton href="/platform/diagnostic">Start Your Organizational Diagnostic</PlatformButton>
        </div>
        <Link href="/platform" className="mt-6 inline-block text-sm text-muted hover:text-ink">
          Back to MUDIU Platform
        </Link>
      </Container>
    );
  }

  return <>{children}</>;
}
