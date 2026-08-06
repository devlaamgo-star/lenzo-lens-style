import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { ANIME_SKINS } from "@/lib/catalog";
import { AnimeSkinCard } from "@/components/AnimeSkinCard";

export const Route = createFileRoute("/anime/")({
  head: () => ({
    meta: [
      { title: "Skins Anime — designs manga LENZO" },
      {
        name: "description",
        content:
          "Skins décoratifs LENZO inspirés de l’univers manga. Découpes précises, livraison gratuite au Maroc, paiement à la livraison.",
      },
      { property: "og:title", content: "Skins Anime — designs manga LENZO" },
      {
        property: "og:description",
        content: "Des designs inspirés de l’univers manga pour personnaliser votre iPhone.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AnimeCollectionPage,
});

function AnimeCollectionPage() {
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
            <span className="text-foreground">{t("anime.title")}</span>
          </nav>
          <h1 className="mt-3 text-2xl font-bold sm:text-3xl lg:text-[2.1rem]">
            {t("anime.title")}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">{t("anime.sub")}</p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <p className="text-xs text-muted-foreground">
            {ANIME_SKINS.length} {t("col.results")}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {ANIME_SKINS.map((s, i) => (
              <AnimeSkinCard key={s.id} skin={s} priority={i < 4} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
