// Server-only Ozon Express sync shared by the 10-minute schedule and the
// dashboard's manual refresh. Statuses are saved verbatim; failures keep old values.
import { chunk, isOzonShipment, parseOzonTracking } from "@/lib/ozon-tracking";

const OZON_CUSTOMER_ID = "99373";
const BATCH_SIZE = 50;
const TABLES = { order: "orders", design: "design_requests" } as const;

export type OzonTarget = { kind: "order" | "design"; id: string; tracking: string };
export type OzonResult = "updated" | "no_status" | "failed";

/** Loads every Ozon shipment, or only the given records when `only` is set. */
export async function loadOzonTargets(
  admin: any,
  only?: { kind: "order" | "design"; id: string }[],
): Promise<OzonTarget[]> {
  const out: OzonTarget[] = [];
  for (const kind of ["order", "design"] as const) {
    const ids = only?.filter((t) => t.kind === kind).map((t) => t.id);
    if (ids && ids.length === 0) continue;
    let q = admin.from(TABLES[kind]).select("id, tracking_number, shipping_carrier").neq("tracking_number", "");
    if (ids) q = q.in("id", ids);
    const { data, error } = await q;
    if (error) throw new Error("DB_READ_FAILED");
    for (const r of data ?? []) {
      if (isOzonShipment(r.tracking_number, r.shipping_carrier)) {
        out.push({ kind, id: r.id, tracking: r.tracking_number });
      }
    }
  }
  return out;
}

export async function syncOzonTargets(admin: any, targets: OzonTarget[]) {
  const apiKey = process.env["OZON_API_KEY"]?.trim();
  if (!apiKey) throw new Error("OZON_API_KEY_MISSING");
  const url = `https://api.ozonexpress.ma/customers/${OZON_CUSTOMER_ID}/${encodeURIComponent(apiKey)}/tracking`;
  const numbers = [...new Set(targets.map((t) => t.tracking))];
  const results: Record<string, OzonResult> = {};
  let updated = 0;
  let failedBatches = 0;
  const now = new Date().toISOString();

  for (const batch of chunk(numbers, BATCH_SIZE)) {
    const inBatch = targets.filter((t) => batch.includes(t.tracking));
    let latest;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ "tracking-number": batch }),
        signal: AbortSignal.timeout(20_000),
      });
      if (!res.ok) throw new Error(`OZON_HTTP_${res.status}`);
      latest = parseOzonTracking(await res.json());
    } catch (e) {
      failedBatches++;
      console.error("Ozon tracking batch failed:", e instanceof Error ? e.message : "unknown");
      for (const t of inBatch) results[t.id] = "failed";
      continue; // keep previous statuses
    }
    for (const t of inBatch) {
      // Exact tracking-number match only.
      const item = latest.find((l) => l.trackingNumber === t.tracking);
      if (!item) {
        results[t.id] = "no_status";
        continue;
      }
      const { error } = await admin
        .from(TABLES[t.kind])
        .update({ ozon_status: item.status, ozon_status_at: item.at, ozon_synced_at: now })
        .eq("id", t.id)
        .eq("tracking_number", t.tracking);
      results[t.id] = error ? "failed" : "updated";
      if (!error) updated++;
    }
  }
  return { checked: numbers.length, updated, failedBatches, results };
}
