import { createFileRoute } from "@tanstack/react-router";
import { FaqSection } from "@/components/sections/FaqSection";
import { StickyPackBar } from "@/components/StickyPackBar";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Questions fréquentes SKINUP" },
      {
        name: "description",
        content:
          "Livraison, paiement à la livraison, compatibilité iPhone, pose et durée de vie : toutes les réponses sur les stickers caméra SKINUP.",
      },
      { property: "og:title", content: "FAQ — Questions fréquentes SKINUP" },
      {
        property: "og:description",
        content: "Livraison, paiement à la livraison, compatibilité et pose des stickers SKINUP.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <FaqSection />
      <StickyPackBar />
    </>
  ),
});
