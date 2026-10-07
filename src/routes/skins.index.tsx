import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/skins/")({
  beforeLoad: () => {
    throw redirect({ to: "/collection", statusCode: 301 });
  },
});
