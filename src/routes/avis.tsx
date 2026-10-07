import { createFileRoute } from "@tanstack/react-router";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { TrustSection } from "@/components/sections/BenefitsTrust";
import { StickyPackBar } from "@/components/StickyPackBar";

export const Route = createFileRoute("/avis")({
  head: () => ({
    meta: [
      { title: "Avis clients — SKINUP Maroc" },
      {
        name: "description",
        content:
          "Ce que nos clients marocains pensent des stickers caméra SKINUP : qualité, pose facile et livraison rapide partout au Maroc.",
      },
      { property: "og:title", content: "Avis clients — SKINUP Maroc" },
      {
        property: "og:description",
        content: "Les retours de nos clients au Maroc sur les stickers caméra SKINUP.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
