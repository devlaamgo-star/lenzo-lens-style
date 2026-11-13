import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/storefront")({
  server: {
    handlers: {
      GET: async () => (await import("../lib/storefront-api.server")).storefrontReadiness(),
      POST: async ({ request }) => (await import("../lib/storefront-api.server")).handleStorefrontRequest(request),
    },
  },
});
