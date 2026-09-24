"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";
import type { AnswerValue, FindingProgress, OrgDiagnosticProfile } from "@/lib/platform/orgDiagnosisTypes";

// Independent from `PlatformProvider` (the old Goal->Impact engine's
// hasRun flag) on purpose: this stores an actual profile (org name +
// answers), not just a boolean, and the two engines must not share state.
const STORAGE_KEY = "mudiu-org-diagnosis-profile";
// My Organization's local Finding tracker - never a backend record, and
// never used to compute Confidence or scores, only to remember what the
// visitor has already done with each finding on this device.
const FINDING_PROGRESS_KEY = "mudiu-org-diagnosis-finding-status";

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
const EMPTY_FINDING_PROGRESS: Record<string, FindingProgress> = {};

let cachedProgressRaw: string | null = null;
let cachedProgress: Record<string, FindingProgress> = EMPTY_FINDING_PROGRESS;
function readFindingProgress(): Record<string, FindingProgress> {
  try {
    const raw = window.localStorage.getItem(FINDING_PROGRESS_KEY);
    if (raw !== cachedProgressRaw) {
      cachedProgressRaw = raw;
      cachedProgress = raw ? (JSON.parse(raw) as Record<string, FindingProgress>) : EMPTY_FINDING_PROGRESS;
    }
    return cachedProgress;
  } catch {
    return EMPTY_FINDING_PROGRESS;
  }
}
function getFindingProgressServerSnapshot(): Record<string, FindingProgress> {
  return EMPTY_FINDING_PROGRESS;
}

function writeFindingProgress(findingId: string, patch: Partial<FindingProgress>) {
  try {
    const current = readFindingProgress();
    const updated: Record<string, FindingProgress> = {
      ...current,
      [findingId]: { ...current[findingId], ...patch },
    };
    window.localStorage.setItem(FINDING_PROGRESS_KEY, JSON.stringify(updated));
  } catch {
    // Ignore - nothing to persist, but we still notify for this session.
  }
  notify();
}

interface OrgDiagnosisContextValue {
  profile: OrgDiagnosticProfile | null;
  complete: (organizationName: string, answers: Partial<Record<string, AnswerValue>>) => void;
  completeWithProfile: (profile: OrgDiagnosticProfile) => void;
  reset: () => void;
  findingProgress: Record<string, FindingProgress>;
  /** Marks a finding as opened (drives "pending-verification" display) - a no-op past that point. */
  openFinding: (findingId: string) => void;
  /** "Does this signal reflect reality?" - never affects Confidence or Priority. */
  setValidation: (findingId: string, outcome: "validated" | "not-validated", note?: string) => void;
  /** "Do you see this as worth working on?" - only meaningful once Validation
   * is "validated". "needs-validation" is a distinct decision outcome, not a
   * Validation failure - it never touches the `validation` field. */
  setAdoption: (findingId: string, outcome: "adopted" | "deferred" | "needs-validation", changeStatement?: string) => void;
  /** "What would success look like?" - only meaningful once Adoption is "adopted". */
  setObjective: (findingId: string, objective: string) => void;
  /** The existing solution-request shortcut - independent of Validation/Adoption/Objective. */
  markHelpRequested: (findingId: string) => void;
}

const OrgDiagnosisContext = createContext<OrgDiagnosisContextValue | null>(null);

export function OrgDiagnosisProvider({ children }: { children: React.ReactNode }) {
  const profile = useSyncExternalStore(subscribe, readProfile, getServerSnapshot);
  const findingProgress = useSyncExternalStore(subscribe, readFindingProgress, getFindingProgressServerSnapshot);

  const completeWithProfile = useCallback((next: OrgDiagnosticProfile) => {
    const withTimestamp: OrgDiagnosticProfile = { ...next, completedAt: new Date().toISOString() };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(withTimestamp));
      window.localStorage.removeItem(FINDING_PROGRESS_KEY);
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
      window.localStorage.removeItem(FINDING_PROGRESS_KEY);
    } catch {
      // Ignore.
    }
    notify();
  }, []);

  const openFinding = useCallback((findingId: string) => {
    if (readFindingProgress()[findingId]?.opened) return;
    writeFindingProgress(findingId, { opened: true });
  }, []);

  const setValidation = useCallback((findingId: string, outcome: "validated" | "not-validated", note?: string) => {
    writeFindingProgress(findingId, { validation: outcome, validationNote: note });
  }, []);

  const setAdoption = useCallback(
    (findingId: string, outcome: "adopted" | "deferred" | "needs-validation", changeStatement?: string) => {
      // changeStatement/objective are only meaningful once adopted - clear them
      // on any other outcome so a finding can't show a stale "objective-set"
      // stage after the visitor changes their mind away from "adopted".
      writeFindingProgress(
        findingId,
        outcome === "adopted"
          ? { adoption: outcome, changeStatement }
          : { adoption: outcome, changeStatement: undefined, objective: undefined }
      );
    },
    []
  );

  const setObjective = useCallback((findingId: string, objective: string) => {
    writeFindingProgress(findingId, { objective });
  }, []);

  const markHelpRequested = useCallback((findingId: string) => {
    writeFindingProgress(findingId, { helpRequested: true });
  }, []);

  return (
    <OrgDiagnosisContext.Provider
      value={{
        profile,
        complete,
        completeWithProfile,
        reset,
        findingProgress,
        openFinding,
        setValidation,
        setAdoption,
        setObjective,
        markHelpRequested,
      }}
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
