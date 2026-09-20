import { PlatformShell } from "@/components/platform/PlatformShell";
import { RequireDiagnostic } from "@/components/platform/RequireDiagnostic";
import { ComingSoon } from "@/components/platform/ComingSoon";

export default function BenefitsPage() {
  return (
    <RequireDiagnostic>
      <PlatformShell active="benefits" />
      <ComingSoon section="Benefits" />
    </RequireDiagnostic>
  );
}
