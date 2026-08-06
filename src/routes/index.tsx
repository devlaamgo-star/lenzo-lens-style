import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, Wallet, Scissors, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-lenzo-stickers.jpg";

import { useI18n } from "@/lib/i18n";
import { DESIGNS, PACK_OLD_PRICE, PACK_PRICE } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { CollectionsGrid } from "@/components/sections/CollectionsGrid";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { BenefitsSection, TrustSection } from "@/components/sections/BenefitsTrust";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { StickyPackBar } from "@/components/StickyPackBar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LENZO — 3 stickers caméra iPhone pour 99 MAD" },
      {
        name: "description",
        content:
          "Personnalisez le module caméra de votre iPhone avec les stickers décoratifs LENZO. 3 stickers au choix à 99 MAD, livraison gratuite au Maroc et paiement à la livraison.",
      },
      { property: "og:title", content: "LENZO — 3 stickers caméra iPhone pour 99 MAD" },
      {
        property: "og:description",
        content:
          "3 stickers décoratifs pour module caméra iPhone à 99 MAD. Livraison gratuite au Maroc, paiement à la livraison.",
      },

    ],
  }),
  component: HomePage,
});

function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-accent/40 to-background">
      <div className="container-page grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-14 lg:py-20">
        <div className="rise-in flex flex-col items-start gap-5">
          <span className="rounded-full border border-border bg-card px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-accent-foreground">
            {t("hero.label")}
          </span>
          <h1 className="text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-[3.1rem]">
            {t("hero.title")}
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("hero.desc")}
          </p>

          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-xl font-bold sm:text-2xl">{t("hero.offer")}</span>
            <span className="text-sm text-muted-foreground line-through">{PACK_OLD_PRICE} MAD</span>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              to="/pack"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
            >
              {t("hero.cta")}
              <ArrowRight className="h-4 w-4 flip-rtl" />
            </Link>
            <Link
              to="/collection"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card px-7 text-sm font-semibold transition-colors hover:bg-surface"
            >
              {t("hero.cta2")}
            </Link>
          </div>

          <ul className="mt-2 grid w-full gap-2.5 sm:grid-cols-2">
            {[
              { icon: Truck, label: t("hero.trust1") },
              { icon: Wallet, label: t("hero.trust2") },
              { icon: Scissors, label: t("hero.trust3") },
              { icon: Sparkles, label: t("hero.trust4") },
            ].map((item) => (
              <li key={item.label} className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
                <item.icon className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.8} />
                <span className="min-w-0">{item.label}</span>
              </li>
            ))}
          </ul>

        </div>

        <div className="relative order-first lg:order-last">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
            <img
              src={heroImage}
              alt="Stickers décoratifs LENZO appliqués sur le module caméra d’iPhone, avec découpes précises autour des objectifs"
              width={1408}
              height={1408}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 start-4 rounded-2xl border border-border bg-card px-4 py-3 shadow-lift sm:start-6">
            <p className="text-lg font-extrabold leading-none">{PACK_PRICE} MAD</p>
            <p className="mt-1 text-[11px] text-muted-foreground">{t("hero.trust1")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const { t } = useI18n();
  const newest = [...DESIGNS].sort((a, b) => Number(b.isNew) - Number(a.isNew)).slice(0, 4);

  return (
    <>
      <Hero />

      <section className="section-y">
        <div className="container-page">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
            <SectionHeading title="new.title" subtitle="new.sub" align="start" />
            <Link
              to="/collection"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:underline sm:inline-flex"
            >
              {t("common.viewAll")}
              <ArrowRight className="h-4 w-4 flip-rtl" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {newest.map((d, i) => (
              <ProductCard key={d.id} design={d} priority={i < 2} />
            ))}
          </div>
          <Link
            to="/collection"
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full border border-border bg-card text-sm font-semibold sm:hidden"
          >
            {t("common.viewAll")}
          </Link>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionHeading title="picks.title" subtitle="picks.sub" />
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {DESIGNS.slice(0, 8).map((d) => (
              <ProductCard key={d.id} design={d} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              to="/collection"
              className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-8 text-sm font-semibold text-ink-foreground transition-colors hover:bg-primary"
            >
              {t("common.viewAll")}
            </Link>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <SectionHeading title="skins.title" subtitle="skins.sub" />
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {FULL_BODY_SKINS.slice(0, 8).map((s) => (
              <SkinCard key={s.id} skin={s} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              to="/skins"
              className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-8 text-sm font-semibold text-ink-foreground transition-colors hover:bg-primary"
            >
              {t("skins.viewAll")}
            </Link>
          </div>
        </div>
      </section>

      <CollectionsGrid />

      <HowItWorks />
      <BenefitsSection />
      <TrustSection />
      <ReviewsSection />
      <FaqSection />
      <StickyPackBar />
    </>
  );
}
