import { createFileRoute } from "@tanstack/react-router";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { TrustSection } from "@/components/sections/BenefitsTrust";
import { StickyPackBar } from "@/components/StickyPackBar";

export const Route = createFileRoute("/avis")({
  head: () => ({
    meta: [
      { title: "Avis clients — LENZO Maroc" },
      {
        name: "description",
        content:
          "Ce que nos clients marocains pensent des skins d’objectif LENZO : qualité, pose facile et livraison rapide partout au Maroc.",
      },
      { property: "og:title", content: "Avis clients — LENZO Maroc" },
      {
        property: "og:description",
        content: "Les retours de nos clients au Maroc sur les skins d’objectif LENZO.",
      },
    ],
  }),
  component: () => (
    <>
      <ReviewsSection />
      <TrustSection />
      <StickyPackBar />
    </>
  ),
});
