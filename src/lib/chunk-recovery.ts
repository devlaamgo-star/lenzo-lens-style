// Recovery for script files that fail to download, e.g. a tab opened before a new
// deployment asks for a file that no longer exists, or a flaky mobile connection.

const RELOAD_KEY = "skinup-chunk-reload-at";
/** At most one automatic reload in this window, so a permanent failure can never loop. */
export const AUTO_RELOAD_WINDOW_MS = 5 * 60 * 1000;

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
 */
export function claimAutoReload(storage: StorageLike | null | undefined, now: number): boolean {
  if (!storage) return false;
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
  if (typeof window === "undefined") return false;
  if (!claimAutoReload(sessionStore(), Date.now())) return false;
  window.location.reload();
  return true;
}

let installed = false;
/** Vite reports failed script preloads through this event; recover before React sees the error. */
export function installChunkRecovery() {
  if (installed || typeof window === "undefined") return;
  installed = true;
  window.addEventListener("vite:preloadError", (event) => {
    if (reloadOnceForChunkError()) event.preventDefault();
  });
}
