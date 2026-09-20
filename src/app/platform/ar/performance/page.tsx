import { PlatformShell } from "@/components/platform/PlatformShell";
import { RequireDiagnostic } from "@/components/platform/RequireDiagnostic";
import { ComingSoon } from "@/components/platform/ComingSoon";

export default function PerformancePageAr() {
  return (
    <RequireDiagnostic locale="ar">
      <PlatformShell active="performance" locale="ar" />
      <ComingSoon section="الأداء" locale="ar" />
    </RequireDiagnostic>
  );
}
