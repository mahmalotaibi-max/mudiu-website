"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";

const STORAGE_KEY = "mudiu-platform-diagnostic-run";

// A tiny pub/sub so same-tab updates (calling runDiagnostic()) notify any
// subscribed component immediately - the native "storage" event only fires
// in *other* tabs, never the one that made the change.
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
function getSnapshot() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}
function getServerSnapshot() {
  return false;
}

interface PlatformContextValue {
  hasRun: boolean;
  runDiagnostic: () => void;
  reset: () => void;
}

const PlatformContext = createContext<PlatformContextValue | null>(null);

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  const hasRun = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const runDiagnostic = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore - nothing to persist, but we still notify for this session.
    }
    notify();
  }, []);

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore.
    }
    notify();
  }, []);

  return (
    <PlatformContext.Provider value={{ hasRun, runDiagnostic, reset }}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const ctx = useContext(PlatformContext);
  if (!ctx) throw new Error("usePlatform must be used within PlatformProvider");
  return ctx;
}
