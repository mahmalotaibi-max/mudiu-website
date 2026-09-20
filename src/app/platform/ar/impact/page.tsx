import { PlatformShell } from "@/components/platform/PlatformShell";
import { RequireDiagnostic } from "@/components/platform/RequireDiagnostic";
import { ComingSoon } from "@/components/platform/ComingSoon";

export default function ImpactPageAr() {
  return (
    <RequireDiagnostic locale="ar">
      <PlatformShell active="impact" locale="ar" />
      <ComingSoon section="الأثر" locale="ar" />
    </RequireDiagnostic>
  );
}
