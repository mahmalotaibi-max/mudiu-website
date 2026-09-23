"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";
import type { AnswerValue, OrgDiagnosticProfile } from "@/lib/platform/orgDiagnosisTypes";

// Independent from `PlatformProvider` (the old Goal->Impact engine's
// hasRun flag) on purpose: this stores an actual profile (org name +
// answers), not just a boolean, and the two engines must not share state.
const STORAGE_KEY = "mudiu-org-diagnosis-profile";

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
// should be cached" infinite-loop guard, so the parsed profile is cached
// against the raw string it came from.
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

interface OrgDiagnosisContextValue {
  profile: OrgDiagnosticProfile | null;
  complete: (organizationName: string, answers: Partial<Record<string, AnswerValue>>) => void;
  completeWithProfile: (profile: OrgDiagnosticProfile) => void;
  reset: () => void;
}

const OrgDiagnosisContext = createContext<OrgDiagnosisContextValue | null>(null);

export function OrgDiagnosisProvider({ children }: { children: React.ReactNode }) {
  const profile = useSyncExternalStore(subscribe, readProfile, getServerSnapshot);

  const completeWithProfile = useCallback((next: OrgDiagnosticProfile) => {
    const withTimestamp: OrgDiagnosticProfile = { ...next, completedAt: new Date().toISOString() };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(withTimestamp));
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
    } catch {
      // Ignore.
    }
    notify();
  }, []);

  return (
    <OrgDiagnosisContext.Provider value={{ profile, complete, completeWithProfile, reset }}>
      {children}
    </OrgDiagnosisContext.Provider>
  );
}

export function useOrgDiagnosis() {
  const ctx = useContext(OrgDiagnosisContext);
  if (!ctx) throw new Error("useOrgDiagnosis must be used within OrgDiagnosisProvider");
  return ctx;
}
