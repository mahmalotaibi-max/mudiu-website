import { PlatformShell } from "@/components/platform/PlatformShell";
import { RequireDiagnostic } from "@/components/platform/RequireDiagnostic";
import { ComingSoon } from "@/components/platform/ComingSoon";

export default function InitiativesPageAr() {
  return (
    <RequireDiagnostic locale="ar">
      <PlatformShell active="initiatives" locale="ar" />
      <ComingSoon section="المبادرات" locale="ar" />
    </RequireDiagnostic>
  );
}
