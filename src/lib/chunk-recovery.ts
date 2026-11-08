// Recovery for site files that fail to download, e.g. a tab opened before a new
// deployment asks for a file that no longer exists, or a flaky mobile connection.
//
// The inline boot guard (src/lib/boot-guard.ts) owns the shared reload budget so the
// startup path, the router's retry path and the page error screen can never add up
// to more than one automatic reload per tab per five minutes.

import { AUTO_RELOAD_WINDOW_MS, RELOAD_KEY } from "./boot-guard";

export { AUTO_RELOAD_WINDOW_MS };

type BootReportKind =
  | "entry_script_failed"
  | "entry_preload_failed"
  | "startup_timeout"
  | "route_import_failed"
  | "hydration_error"
  | "storage_unavailable";

type SkinupBoot = {
  ready: boolean;
  failed: boolean;
  markReady: () => void;
  showRetry: () => void;
  claim: () => boolean;
  reloadOnce: (kind: BootReportKind) => boolean;
  report: (kind: BootReportKind, detail: unknown, extra?: Record<string, unknown> | null, severity?: "error" | "warning" | "info") => void;
};

declare global {
  interface Window {
    __skinupBoot?: SkinupBoot;
    /** True while an order is being sent: automatic reloads are refused so nothing is resubmitted or lost mid-request. */
    __skinupSubmitting?: boolean;
  }
}

const CHUNK_ERROR_PATTERNS = [
  "failed to fetch dynamically imported module",
  "error loading dynamically imported module",
  "importing a module script failed",
  "failed to load module script",
  "loading chunk",
  "loading css chunk",
  "unable to preload css",
  "is not a valid javascript mime type",
];

export function isChunkLoadError(error: unknown): boolean {
  const message =
    error instanceof Error ? error.message : typeof error === "string" ? error : "";
  if (!message) return false;
  const lower = message.toLowerCase();
  return CHUNK_ERROR_PATTERNS.some((pattern) => lower.includes(pattern));
}

type StorageLike = Pick<Storage, "getItem" | "setItem">;

/**
 * Decides whether an automatic reload is allowed now and records it.
 * Returns false when storage is unavailable: without a record we cannot rule out a loop.
 * Mirrors the boot guard's rule; used only if the boot guard did not run.
 */
export function claimAutoReload(storage: StorageLike | null | undefined, now: number): boolean {
  if (!storage || (storage as { __skinupMemory?: boolean }).__skinupMemory) return false;
  try {
    const last = Number(storage.getItem(RELOAD_KEY) || 0);
    if (Number.isFinite(last) && last > 0 && now - last >= 0 && now - last < AUTO_RELOAD_WINDOW_MS) {
      return false;
    }
    storage.setItem(RELOAD_KEY, String(now));
    return storage.getItem(RELOAD_KEY) === String(now);
  } catch {
    return false;
  }
}

function sessionStore(): StorageLike | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

/** Reloads the page once to fetch the current site files. Returns true if a reload started. */
export function reloadOnceForChunkError(): boolean {
  if (typeof window === "undefined" || window.__skinupSubmitting) return false;
  try {
    const boot = window.__skinupBoot;
    if (boot) return boot.reloadOnce("route_import_failed");
  } catch {
    return false;
  }
  if (!claimAutoReload(sessionStore(), Date.now())) return false;
  window.location.reload();
  return true;
}

/** Classified report through the boot guard; never throws. */
export function reportBootIssue(kind: BootReportKind, detail: unknown, extra?: Record<string, unknown>) {
  try { window.__skinupBoot?.report(kind, detail, extra ?? null); } catch { /* reporting must never break the page */ }
}

/** The app rendered (either the page or its own error screen): hide the startup retry bar. */
export function markAppStarted() {
  try { window.__skinupBoot?.markReady(); } catch { /* ignore */ }
}
