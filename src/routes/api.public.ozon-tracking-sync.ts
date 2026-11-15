import { createFileRoute } from "@tanstack/react-router";
import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";

// Called every 10 minutes by the backend scheduler. Refreshes the latest Ozon
// status of every order that has a tracking number; failures keep old statuses.
export const Route = createFileRoute("/api/public/ozon-tracking-sync")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const denied = await authenticateCronRequest(request);
        if (denied) return denied;
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { loadOzonTargets, syncOzonTargets } = await import("@/lib/ozon-sync.server");
        try {
          const targets = await loadOzonTargets(supabaseAdmin);
          const { checked, updated, failedBatches } = await syncOzonTargets(supabaseAdmin, targets);
          return Response.json({ ok: failedBatches === 0, checked, updated, failedBatches });
        } catch (e) {
          const error = e instanceof Error ? e.message : "SYNC_FAILED";
          return Response.json({ ok: false, error }, { status: 500 });
        }
      },
    },
  },
});
