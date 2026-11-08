import { createMiddleware } from "@tanstack/react-start";

// Same job as the generated attachSupabaseAuth (adds the signed-in admin's bearer
// token to server-function calls), but the sign-in client is loaded only when a
// server function is actually called. That keeps it out of the first download of
// every storefront page, which matters on slow mobile connections.
export const attachSupabaseAuthLazy = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    const { supabase } = await import("@/integrations/supabase/client");
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return next({
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },
);

/** Fetches the sign-in client ahead of time (e.g. on the checkout page) so submitting never waits on it. */
export function warmSupabaseClient() {
  import("@/integrations/supabase/client").catch(() => {
    /* fetched again on submit */
  });
}
