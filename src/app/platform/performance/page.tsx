import { PlatformShell } from "@/components/platform/PlatformShell";
import { RequireDiagnostic } from "@/components/platform/RequireDiagnostic";
import { ComingSoon } from "@/components/platform/ComingSoon";

export default function PerformancePage() {
  return (
    <RequireDiagnostic>
      <PlatformShell active="performance" />
      <ComingSoon section="Performance" />
    </RequireDiagnostic>
  );
}
