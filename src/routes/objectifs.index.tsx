import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CAMERA_LENS_SKINS } from "@/lib/catalog";
import { LensSkinCard } from "@/components/LensSkinCard";
import { CustomSkinCard } from "@/components/CustomSkinCard";
import { CameraOfferBanner } from "@/components/CameraOfferBanner";

export const Route = createFileRoute("/objectifs/")({
  head: () => ({
    meta: [
      { title: "Stickers pour objectifs caméra iPhone 17 Pro Max — SKINUP" },
      {
        name: "description",
        content:
          "Stickers décoratifs SKINUP pour la zone des objectifs caméra de l’iPhone 17 Pro Max. Découpe précise, livraison gratuite au Maroc et paiement à la livraison.",
      },
      {
        property: "og:title",
        content: "Stickers pour objectifs caméra iPhone 17 Pro Max — SKINUP",
      },
      {
        property: "og:description",
        content: "Personnalisez chaque détail autour des objectifs de votre iPhone.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LensCollectionPage,
});

function LensCollectionPage() {
  const { t } = useI18n();

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="container-page py-8 lg:py-12">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              {t("breadcrumb.home")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 flip-rtl" />
            <span className="text-foreground">{t("lens.title")}</span>
          </nav>
          <h1 className="mt-3 text-2xl font-bold sm:text-3xl lg:text-[2.1rem]">{t("lens.title")}</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">{t("lens.sub")}</p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <CameraOfferBanner />
          <p className="mt-6 text-xs text-muted-foreground">
            {CAMERA_LENS_SKINS.length} {t("col.results")}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            <CustomSkinCard priority />
            {CAMERA_LENS_SKINS.map((s, i) => (
              <LensSkinCard key={s.id} skin={s} priority={i < 4} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
