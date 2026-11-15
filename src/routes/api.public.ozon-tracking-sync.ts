import { createFileRoute } from "@tanstack/react-router";
import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";
import { chunk, isOzonShipment, parseOzonTracking } from "@/lib/ozon-tracking";

const OZON_CUSTOMER_ID = "99373";
const BATCH_SIZE = 50;

// Called every 10 minutes by the backend scheduler. Refreshes the latest Ozon
// status of every order that has a tracking number; failures keep old statuses.
export const Route = createFileRoute("/api/public/ozon-tracking-sync")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const denied = await authenticateCronRequest(request);
        if (denied) return denied;

        const apiKey = process.env["OZON_API_KEY"]?.trim();
        if (!apiKey) return Response.json({ ok: false, error: "OZON_API_KEY_MISSING" }, { status: 500 });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const tables = ["orders", "design_requests"] as const;
        const rows: { table: (typeof tables)[number]; id: string; tracking: string }[] = [];
        for (const table of tables) {
          const { data, error } = await supabaseAdmin
            .from(table)
            .select("id, tracking_number, shipping_carrier")
            .neq("tracking_number", "");
          if (error) return Response.json({ ok: false, error: "DB_READ_FAILED" }, { status: 500 });
          for (const r of data ?? []) {
            if (isOzonShipment(r.tracking_number, r.shipping_carrier)) {
              rows.push({ table, id: r.id, tracking: r.tracking_number });
            }
          }
        }

        const numbers = [...new Set(rows.map((r) => r.tracking))];
        const url = `https://api.ozonexpress.ma/customers/${OZON_CUSTOMER_ID}/${encodeURIComponent(apiKey)}/tracking`;
        let updated = 0;
        let failedBatches = 0;
        const now = new Date().toISOString();

        for (const batch of chunk(numbers, BATCH_SIZE)) {
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
            continue; // keep previous statuses
          }
          for (const item of latest) {
            if (!batch.includes(item.trackingNumber)) continue;
            // Exact tracking-number match only.
            for (const r of rows.filter((x) => x.tracking === item.trackingNumber)) {
              const { error } = await supabaseAdmin
                .from(r.table)
                .update({ ozon_status: item.status, ozon_status_at: item.at, ozon_synced_at: now })
                .eq("id", r.id)
                .eq("tracking_number", item.trackingNumber);
              if (!error) updated++;
            }
          }
        }

        return Response.json({ ok: failedBatches === 0, checked: numbers.length, updated, failedBatches });
      },
    },
  },
});
