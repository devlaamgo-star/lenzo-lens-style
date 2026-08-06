import { createFileRoute } from "@tanstack/react-router";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { BenefitsSection, TrustSection } from "@/components/sections/BenefitsTrust";
import { FaqSection } from "@/components/sections/FaqSection";
import { StickyPackBar } from "@/components/StickyPackBar";

export const Route = createFileRoute("/comment-ca-marche")({
  head: () => ({
    meta: [
      { title: "Comment ça marche — Poser vos stickers LENZO" },
      {
        name: "description",
        content:
          "Choisissez votre iPhone, sélectionnez 3 designs, commandez et payez à la livraison. La pose des stickers LENZO prend moins d’une minute.",
      },
      { property: "og:title", content: "Comment ça marche — LENZO" },
      {
        property: "og:description",
        content: "3 designs, une commande, paiement à la livraison. Pose en moins d’une minute.",
      },
    ],
  }),
  component: () => (
    <>
      <HowItWorks />
      <BenefitsSection />
      <TrustSection />
      <FaqSection />
      <StickyPackBar />
    </>
  ),
});
