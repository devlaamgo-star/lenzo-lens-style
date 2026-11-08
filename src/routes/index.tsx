import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, Wallet, Scissors, Sparkles } from "lucide-react";
import heroJpg1122 from "@/assets/hero-three-iphones-1122.jpg.asset.json";
import heroWebp560 from "@/assets/hero-three-iphones-560.webp.asset.json";
import heroWebp840 from "@/assets/hero-three-iphones-840.webp.asset.json";
import heroWebp1122 from "@/assets/hero-three-iphones-1122.webp.asset.json";

// Same hero photo, re-encoded at phone/tablet/desktop widths (24–69 KB instead of 1.8 MB).
const HERO_WEBP_SRCSET = `${heroWebp560.url} 560w, ${heroWebp840.url} 840w, ${heroWebp1122.url} 1122w`;
const HERO_SIZES = "(min-width: 1024px) 600px, 100vw";

import { useI18n } from "@/lib/i18n";
import { CAMERA_LENS_SKINS, PACK_OLD_PRICE, PACK_PRICE } from "@/lib/catalog";
import { LensSkinCard } from "@/components/LensSkinCard";
import { BackLensSkinCard } from "@/components/BackLensSkinCard";
import { BACK_LENS_SKINS, IPHONE_AIR_SKINS } from "@/lib/catalog";
import { AirSkinCard } from "@/components/AirSkinCard";
import { SectionHeading } from "@/components/SectionHeading";
import { CustomSkinCard } from "@/components/CustomSkinCard";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { BenefitsSection, TrustSection } from "@/components/sections/BenefitsTrust";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { CustomDesignCta } from "@/components/sections/CustomDesignCta";
import { FaqSection } from "@/components/sections/FaqSection";
import { StickyPackBar } from "@/components/StickyPackBar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SKINUP — 3 stickers caméra iPhone pour 149 MAD" },
      {
        name: "description",
        content:
          "Personnalisez le module caméra de votre iPhone avec les stickers décoratifs SKINUP. 3 stickers au choix à 149 MAD, livraison gratuite au Maroc et paiement à la livraison.",
      },
      { property: "og:title", content: "SKINUP — 3 stickers caméra iPhone pour 149 MAD" },
      {
        property: "og:description",
        content:
          "3 stickers décoratifs pour module caméra iPhone à 149 MAD. Livraison gratuite au Maroc, paiement à la livraison.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
            <picture className="contents">
              <source type="image/webp" srcSet={HERO_WEBP_SRCSET} sizes={HERO_SIZES} />
              <img
                src={heroJpg1122.url}
                alt="Stickers décoratifs SKINUP appliqués sur trois iPhone, designs colorés sur le module caméra"
                width={1122}
                height={1402}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-contain object-center lg:object-cover"
              />
            </picture>

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

  return (
    <>
      <Hero />





      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionHeading title="lens.title" subtitle="lens.sub" />
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            <CustomSkinCard />
            {CAMERA_LENS_SKINS.slice(0, 3).map((s) => (
              <LensSkinCard key={s.id} skin={s} />
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Link
              to="/objectifs"
              className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-8 text-sm font-semibold text-ink-foreground transition-colors hover:bg-primary"
            >
              {t("lens.viewAll")}
            </Link>
          </div>
        </div>
      </section>



      <section className="section-y">
        <div className="container-page">
          <SectionHeading title="air.title" subtitle="air.sub" />
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {IPHONE_AIR_SKINS.slice(0, 4).map((s) => (
              <AirSkinCard key={s.id} skin={s} />
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Link
              to="/iphone-air"
              className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-8 text-sm font-semibold text-ink-foreground transition-colors hover:bg-primary"
            >
              {t("air.viewAll")}
            </Link>
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionHeading title="backlens.title" subtitle="backlens.sub" />
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            <CustomSkinCard />
            {BACK_LENS_SKINS.slice(0, 3).map((s) => (
              <BackLensSkinCard key={s.id} skin={s} />
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Link
              to="/dos-camera"
              className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-8 text-sm font-semibold text-ink-foreground transition-colors hover:bg-primary"
            >
              {t("backlens.viewAll")}
            </Link>
          </div>
        </div>
      </section>

      <HowItWorks />
      <BenefitsSection />
      <TrustSection />
      <CustomDesignCta />
      <ReviewsSection />
      <FaqSection />
      <StickyPackBar />
    </>
  );
}
