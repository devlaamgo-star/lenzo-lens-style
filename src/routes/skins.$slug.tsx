import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/skins/$slug")({
  beforeLoad: () => {
    throw redirect({ to: "/collection", statusCode: 301 });
  },
});
