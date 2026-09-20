import { PlatformShell } from "@/components/platform/PlatformShell";
import { RequireDiagnostic } from "@/components/platform/RequireDiagnostic";
import { ComingSoon } from "@/components/platform/ComingSoon";

export default function BenefitsPageAr() {
  return (
    <RequireDiagnostic locale="ar">
      <PlatformShell active="benefits" locale="ar" />
      <ComingSoon section="المنافع" locale="ar" />
    </RequireDiagnostic>
  );
}
