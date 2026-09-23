import { PlatformProvider } from "@/components/platform/PlatformProvider";
import { OrgDiagnosisProvider } from "@/components/platform/OrgDiagnosisProvider";

// The rest of mudiu.co is Arabic/RTL; the Platform prototype's copy is
// English throughout (per the product spec), so this subtree flips
// direction locally instead of the whole site.
export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="ltr" lang="en" className="min-h-full text-start">
      <PlatformProvider>
        <OrgDiagnosisProvider>{children}</OrgDiagnosisProvider>
      </PlatformProvider>
    </div>
  );
}
