import { PlatformShell } from "@/components/platform/PlatformShell";
import { RequireDiagnostic } from "@/components/platform/RequireDiagnostic";
import { ComingSoon } from "@/components/platform/ComingSoon";

export default function ProductsPageAr() {
  return (
    <RequireDiagnostic locale="ar">
      <PlatformShell active="products" locale="ar" />
      <ComingSoon section="المنتجات والخدمات" locale="ar" />
    </RequireDiagnostic>
  );
}
