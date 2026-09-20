import { PlatformShell } from "@/components/platform/PlatformShell";
import { RequireDiagnostic } from "@/components/platform/RequireDiagnostic";
import { ComingSoon } from "@/components/platform/ComingSoon";

export default function InitiativesPage() {
  return (
    <RequireDiagnostic>
      <PlatformShell active="initiatives" />
      <ComingSoon section="Initiatives" />
    </RequireDiagnostic>
  );
}
