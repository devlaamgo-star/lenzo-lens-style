// Pure helpers for Ozon Express tracking sync (no network, no database).
// Statuses are stored exactly as Ozon returns them — never mapped or renamed.

export type OzonLatest = { trackingNumber: string; status: string; at: string | null };

/** Orders are synced when they carry a tracking number and the carrier is blank or Ozon. */
export function isOzonShipment(trackingNumber: unknown, carrier: unknown): boolean {
  if (typeof trackingNumber !== "string" || trackingNumber.trim() === "") return false;
  const c = typeof carrier === "string" ? carrier.trim().toLowerCase() : "";
  return c === "" || c.includes("ozon");
}

export function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

function toIso(time: unknown): string | null {
  const n = typeof time === "string" ? Number(time) : typeof time === "number" ? time : NaN;
  if (!Number.isFinite(n) || n <= 0) return null;
  return new Date(n * 1000).toISOString();
}

/**
 * Extracts each tracking number's latest status from an Ozon tracking response.
 * Only entries Ozon marks as successful with a non-empty latest status are returned,
 * so a failed lookup never overwrites the previously saved status.
 * Throws when Ozon rejects the API key itself.
 */
export function parseOzonTracking(payload: unknown): OzonLatest[] {
  if (!payload || typeof payload !== "object") throw new Error("OZON_INVALID_RESPONSE");
  const check = (payload as Record<string, any>)["CHECK_API"];
  if (!check || check["RESULT"] !== "SUCCESS") throw new Error("OZON_API_REJECTED");

  const found = new Map<string, OzonLatest>();
  const read = (fallbackNumber: string | null, entry: unknown) => {
    if (!entry || typeof entry !== "object") return;
    const obj = entry as Record<string, any>;
    const own = typeof obj["TRACKING-NUMBER"] === "string" ? obj["TRACKING-NUMBER"] : null;
    const number = own ?? fallbackNumber;
    const last = obj["LAST_TRACKING"];
    const status = typeof last?.["STATUT"] === "string" ? last["STATUT"].trim() : "";
    const ok = obj["RESULT"] === undefined || obj["RESULT"] === "SUCCESS";
    if (number && ok && status) found.set(number, { trackingNumber: number, status, at: toIso(last["TIME"]) });
  };
  const root = payload as Record<string, any>;
  // Bulk requests: {"MODE":"MULTI","TRACKING-LIST":{"<number>":{...}}}
  const list = root["TRACKING-LIST"];
  if (list && typeof list === "object") {
    if (Array.isArray(list)) list.forEach((entry) => read(null, entry));
    else for (const [number, entry] of Object.entries(list)) read(number, entry);
  }
  // Single tracking number: {"TRACKING":{"TRACKING-NUMBER":"...",...}}
  if (root["TRACKING"]) read(null, root["TRACKING"]);
  return [...found.values()];
}
