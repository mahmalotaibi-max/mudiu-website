import { PlatformShell } from "@/components/platform/PlatformShell";
import { ComingSoon } from "@/components/platform/ComingSoon";

export default function InitiativesPageAr() {
  return (
    <>
      <PlatformShell active="initiatives" locale="ar" />
      <ComingSoon section="المبادرات" locale="ar" />
    </>
  );
}
