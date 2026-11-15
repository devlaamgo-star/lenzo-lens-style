import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Admin-only: fetch the latest Ozon status now for the given orders. */
export const refreshOzonTracking = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        targets: z
          .array(z.object({ kind: z.enum(["order", "design"]), id: z.string().uuid() }))
          .min(1)
          .max(50),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (error || !isAdmin) throw new Error("Forbidden");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { loadOzonTargets, syncOzonTargets } = await import("./ozon-sync.server");
    const targets = await loadOzonTargets(supabaseAdmin, data.targets);
    if (targets.length === 0) return { results: {} as Record<string, string> };
    const { results } = await syncOzonTargets(supabaseAdmin, targets);
    return { results: results as Record<string, string> };
  });
