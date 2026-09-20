import { PlatformShell } from "@/components/platform/PlatformShell";
import { RequireDiagnostic } from "@/components/platform/RequireDiagnostic";
import { ComingSoon } from "@/components/platform/ComingSoon";

export default function ImpactPage() {
  return (
    <RequireDiagnostic>
      <PlatformShell active="impact" />
      <ComingSoon section="Impact" />
    </RequireDiagnostic>
  );
}
