import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/design-personnalise")({
  beforeLoad: () => {
    throw redirect({ to: "/creer-mon-skin" });
  },
});
