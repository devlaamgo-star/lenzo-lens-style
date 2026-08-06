import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { FULL_BODY_SKINS } from "@/lib/catalog";
import { SkinCard } from "@/components/SkinCard";

export const Route = createFileRoute("/skins/")({
  head: () => ({
    meta: [
      { title: "Skins intégrales iPhone 17 Pro Max — LENZO" },
      {
        name: "description",
        content:
          "Découvrez les skins intégrales LENZO pour iPhone 17 Pro Max : découpe précise, rendu fin et élégant. Livraison gratuite au Maroc et paiement à la livraison.",
      },
      { property: "og:title", content: "Skins intégrales iPhone 17 Pro Max — LENZO" },
      {
        property: "og:description",
        content: "Transformez complètement le style de votre iPhone avec les skins intégrales LENZO.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SkinsPage,
});

function SkinsPage() {
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
            <span className="text-foreground">{t("skins.title")}</span>
          </nav>
          <h1 className="mt-3 text-2xl font-bold sm:text-3xl lg:text-[2.1rem]">{t("skins.title")}</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">{t("skins.sub")}</p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <p className="text-xs text-muted-foreground">
            {FULL_BODY_SKINS.length} {t("col.results")}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {FULL_BODY_SKINS.map((s, i) => (
              <SkinCard key={s.id} skin={s} priority={i < 4} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
