import { createFileRoute } from "@tanstack/react-router";
import { Check, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { whatsappLink } from "@/lib/catalog";
import { CD, CD_EXAMPLES } from "@/lib/custom-design";
import { HOME_CTA, WIZ } from "@/lib/custom-design-wizard";
import { CustomDesignWizard } from "@/components/CustomDesignWizard";
import { CustomExamplesSection } from "@/components/sections/CustomExamplesSection";
import {
  CustomGallerySection,
  FileQualitySection,
  IdeaToSkinSection,
  YouSendSection,
} from "@/components/sections/CustomDesignSections";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/design-personnalise")({
  head: () => ({
    meta: [
      { title: "Design personnalisé — Skin sur mesure SKINUP" },
      {
        name: "description",
        content:
          "Envoyez votre photo, logo ou idée : notre équipe crée un skin arrière et un sticker caméra personnalisés pour votre téléphone. Aperçu avant impression, paiement à la livraison.",
      },
      { property: "og:title", content: "Design personnalisé — SKINUP" },
      {
        property: "og:description",
        content:
          "Photo, logo ou idée : on transforme votre inspiration en skin unique. Aperçu validé avant impression.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CustomDesignPage,
});

function CustomDesignPage() {
  const { lang } = useI18n();

  return (
    <>
      {/* HERO */}
      <section className="border-b border-border bg-surface">
        <div className="container-page grid items-center gap-8 py-10 lg:grid-cols-2 lg:gap-12 lg:py-16">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold text-primary sm:text-xs">
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span className="min-w-0">{CD.badge[lang]}</span>
            </span>
            <h1 className="mt-4 text-[1.75rem] font-bold leading-tight sm:text-4xl lg:text-[2.6rem]">
              {CD.heroTitle[lang]}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {CD.heroSub[lang]}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#wizard"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                {CD.ctaPrimary[lang]}
              </a>
              <a
                href="#exemples"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-card px-6 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                {CD.ctaSecondary[lang]}
              </a>
            </div>
          </div>
          <div className="min-w-0">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {CD_EXAMPLES.slice(0, 2).map((ex) => (
                <div
                  key={ex.label.en}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-lift"
                >
                  <img
                    src={ex.image}
                    alt={ex.label[lang]}
                    className="aspect-[4/5] w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="section-y">
        <div className="container-page">
          <h2 className="mx-auto max-w-2xl text-center text-2xl font-bold sm:text-3xl lg:text-[2.1rem]">
            {CD.stepsTitle[lang]}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {CD.steps.map((s, i) => (
              <div key={s.t.en} className="rounded-2xl border border-border bg-card p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold">{s.t[lang]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILD YOUR DESIGN — WIZARD */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl lg:text-[2.1rem]">{WIZ.title[lang]}</h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">{WIZ.sub[lang]}</p>
          </div>
          <div className="mt-8">
            <CustomDesignWizard />
          </div>
        </div>
      </section>

      {/* IDEA → SKIN */}
      <IdeaToSkinSection />

      {/* YOU SEND THE IDEA */}
      <YouSendSection />

      {/* WHAT WE CREATE */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <h2 className="mx-auto max-w-2xl text-center text-2xl font-bold sm:text-3xl lg:text-[2.1rem]">
            {CD.createTitle[lang]}
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {CD.createItems.map((c) => (
              <div
                key={c.en}
                className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3.5 text-sm font-medium"
              >
                <Check className="h-4 w-4 shrink-0 text-primary" />
                <span className="min-w-0">{c[lang]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <CustomGallerySection />

      {/* EXAMPLES */}
      <CustomExamplesSection />

      {/* FILE QUALITY + TRUST POINTS */}
      <FileQualitySection />

      {/* FAQ */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <h2 className="mx-auto max-w-2xl text-center text-2xl font-bold sm:text-3xl lg:text-[2.1rem]">
            {CD.faqTitle[lang]}
          </h2>
          <div className="mx-auto mt-8 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {CD.faq.map((f, i) => (
                <AccordionItem key={f.q.en} value={`cd-${i}`} className="border-b border-border">
                  <AccordionTrigger className="py-5 text-start text-sm font-semibold hover:no-underline sm:text-base">
                    {f.q[lang]}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    {f.a[lang]}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-y">
        <div className="container-page">
          <div className="rounded-3xl border border-border bg-card px-6 py-10 text-center sm:px-10 lg:py-14">
            <h2 className="text-2xl font-bold sm:text-3xl">{CD.finalTitle[lang]}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
              {CD.finalText[lang]}
            </p>
            <p className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium sm:text-sm">
              <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
              {CD.trustText[lang]}
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#wizard"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                {CD.ctaPrimary[lang]}
              </a>
              <a
                href={whatsappLink(CD.waMsg[lang])}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border px-6 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" />
                {CD.whatsapp[lang]}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE STICKY CTA */}
      <div className="sticky bottom-0 z-40 border-t border-border bg-card/95 px-4 py-3 backdrop-blur md:hidden">
        <a
          href="#wizard"
          className="flex h-12 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
        >
          {CD.ctaPrimary[lang]}
        </a>
        <p className="mt-1.5 text-center text-[11px] text-muted-foreground">{HOME_CTA.note[lang]}</p>
      </div>
    </>
  );
}
