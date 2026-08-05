import { createFileRoute } from "@tanstack/react-router";
import { FaqSection } from "@/components/sections/FaqSection";
import { StickyPackBar } from "@/components/StickyPackBar";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Questions fréquentes LENZO" },
      {
        name: "description",
        content:
          "Livraison, paiement à la livraison, compatibilité iPhone, pose et durée de vie : toutes les réponses sur les skins d’objectif LENZO.",
      },
      { property: "og:title", content: "FAQ — Questions fréquentes LENZO" },
      {
        property: "og:description",
        content: "Livraison, paiement à la livraison, compatibilité et pose des skins LENZO.",
      },
    ],
  }),
  component: () => (
    <>
      <FaqSection />
      <StickyPackBar />
    </>
  ),
});
