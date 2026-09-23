import { PlatformShell } from "@/components/platform/PlatformShell";
import { ComingSoon } from "@/components/platform/ComingSoon";

export default function InitiativesPage() {
  return (
    <>
      <PlatformShell active="initiatives" />
      <ComingSoon section="Initiatives" />
    </>
  );
}
