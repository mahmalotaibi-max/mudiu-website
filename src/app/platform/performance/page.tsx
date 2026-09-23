import { PlatformShell } from "@/components/platform/PlatformShell";
import { ComingSoon } from "@/components/platform/ComingSoon";

export default function PerformancePage() {
  return (
    <>
      <PlatformShell active="performance" />
      <ComingSoon section="Performance" />
    </>
  );
}
