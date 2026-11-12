import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Start installs this automatically when src/start.ts is absent; defining the
// file opts out, so re-add it explicitly to keep server functions protected
// from cross-site requests.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

// Same job as the generated attachSupabaseAuth (bearer token on server-function calls),
// but the sign-in library is loaded only when a server function is actually called.
// Shoppers' first page load therefore no longer downloads or starts it, which keeps
// the startup file smaller on slow mobile connections and in-app browsers.
const attachSupabaseAuthLazy = createMiddleware({ type: "function" }).client(async ({ next }) => {
  let token: string | undefined;
  try {
    const { supabase } = await import("@/integrations/supabase/client");
    const { data } = await supabase.auth.getSession();
    token = data.session?.access_token;
  } catch {
    // Signed-out or storage-blocked visitors still reach public server functions.
  }
  return next({ headers: token ? { Authorization: `Bearer ${token}` } : {} });
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuthLazy],
  requestMiddleware: [errorMiddleware, csrfMiddleware],
}));
