"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";
import type { AnswerValue, FindingTrackingStatus, OrgDiagnosticProfile } from "@/lib/platform/orgDiagnosisTypes";

// Independent from `PlatformProvider` (the old Goal->Impact engine's
// hasRun flag) on purpose: this stores an actual profile (org name +
// answers), not just a boolean, and the two engines must not share state.
const STORAGE_KEY = "mudiu-org-diagnosis-profile";
// My Organization's local Finding tracker - never a backend record, and
// never used to compute Confidence or scores, only to remember what the
// visitor has already looked at on this device.
const FINDING_STATUS_KEY = "mudiu-org-diagnosis-finding-status";

const statusRank: Record<FindingTrackingStatus, number> = {
  new: 0,
  "pending-verification": 1,
  verified: 2,
  "help-requested": 3,
};

let listeners: Array<() => void> = [];
function notify() {
  for (const l of listeners) l();
}
function subscribe(callback: () => void) {
  listeners.push(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
    window.removeEventListener("storage", callback);
  };
}
// useSyncExternalStore requires getSnapshot to return a stable reference
// when the underlying value hasn't changed - JSON.parse-ing on every call
// would return a new object each render and trigger React's "getSnapshot
// should be cached" infinite-loop guard, so parsed values are cached
// against the raw string they came from.
let cachedRaw: string | null = null;
let cachedProfile: OrgDiagnosticProfile | null = null;
function readProfile(): OrgDiagnosticProfile | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedProfile = raw ? (JSON.parse(raw) as OrgDiagnosticProfile) : null;
    }
    return cachedProfile;
  } catch {
    return null;
  }
}
function getServerSnapshot(): OrgDiagnosticProfile | null {
  return null;
}

// A single stable empty object - useSyncExternalStore requires both
// getSnapshot and getServerSnapshot to return a cached reference when the
// value hasn't changed, or React throws its "getSnapshot should be cached"
// infinite-loop guard. Returning `{}` fresh on every call (even from the
// server snapshot) trips that guard just as easily as from the client one.
const EMPTY_FINDING_STATUS: Record<string, FindingTrackingStatus> = {};

let cachedStatusRaw: string | null = null;
let cachedStatus: Record<string, FindingTrackingStatus> = EMPTY_FINDING_STATUS;
function readFindingStatus(): Record<string, FindingTrackingStatus> {
  try {
    const raw = window.localStorage.getItem(FINDING_STATUS_KEY);
    if (raw !== cachedStatusRaw) {
      cachedStatusRaw = raw;
      cachedStatus = raw ? (JSON.parse(raw) as Record<string, FindingTrackingStatus>) : EMPTY_FINDING_STATUS;
    }
    return cachedStatus;
  } catch {
    return EMPTY_FINDING_STATUS;
  }
}
function getFindingStatusServerSnapshot(): Record<string, FindingTrackingStatus> {
  return EMPTY_FINDING_STATUS;
}

interface OrgDiagnosisContextValue {
  profile: OrgDiagnosticProfile | null;
  complete: (organizationName: string, answers: Partial<Record<string, AnswerValue>>) => void;
  completeWithProfile: (profile: OrgDiagnosticProfile) => void;
  reset: () => void;
  findingStatus: Record<string, FindingTrackingStatus>;
  /** Moves a finding's tracked status forward only - never downgrades it
   * (e.g. re-opening a finding already marked "verified" keeps it there). */
  advanceFindingStatus: (findingId: string, next: FindingTrackingStatus) => void;
}

const OrgDiagnosisContext = createContext<OrgDiagnosisContextValue | null>(null);

export function OrgDiagnosisProvider({ children }: { children: React.ReactNode }) {
  const profile = useSyncExternalStore(subscribe, readProfile, getServerSnapshot);
  const findingStatus = useSyncExternalStore(subscribe, readFindingStatus, getFindingStatusServerSnapshot);

  const completeWithProfile = useCallback((next: OrgDiagnosticProfile) => {
    const withTimestamp: OrgDiagnosticProfile = { ...next, completedAt: new Date().toISOString() };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(withTimestamp));
      window.localStorage.removeItem(FINDING_STATUS_KEY);
    } catch {
      // Ignore - nothing to persist, but we still notify for this session.
    }
    notify();
  }, []);

  const complete = useCallback(
    (organizationName: string, answers: Partial<Record<string, AnswerValue>>) => {
      completeWithProfile({ organizationName, sector: "business", answers });
    },
    [completeWithProfile]
  );

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(FINDING_STATUS_KEY);
    } catch {
      // Ignore.
    }
    notify();
  }, []);

  const advanceFindingStatus = useCallback((findingId: string, next: FindingTrackingStatus) => {
    try {
      const current = readFindingStatus();
      const currentStatus = current[findingId] ?? "new";
      if (statusRank[next] <= statusRank[currentStatus]) return;
      const updated = { ...current, [findingId]: next };
      window.localStorage.setItem(FINDING_STATUS_KEY, JSON.stringify(updated));
    } catch {
      // Ignore.
    }
    notify();
  }, []);

  return (
    <OrgDiagnosisContext.Provider
      value={{ profile, complete, completeWithProfile, reset, findingStatus, advanceFindingStatus }}
    >
      {children}
    </OrgDiagnosisContext.Provider>
  );
}

export function useOrgDiagnosis() {
  const ctx = useContext(OrgDiagnosisContext);
  if (!ctx) throw new Error("useOrgDiagnosis must be used within OrgDiagnosisProvider");
  return ctx;
}
