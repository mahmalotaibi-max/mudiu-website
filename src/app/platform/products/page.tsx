import { PlatformShell } from "@/components/platform/PlatformShell";
import { RequireDiagnostic } from "@/components/platform/RequireDiagnostic";
import { ComingSoon } from "@/components/platform/ComingSoon";

export default function ProductsPage() {
  return (
    <RequireDiagnostic>
      <PlatformShell active="products" />
      <ComingSoon section="Products & Services" />
    </RequireDiagnostic>
  );
}
