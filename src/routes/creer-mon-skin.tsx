import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Truck, Wallet } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CS } from "@/lib/custom-skin";
import { SkinCustomizer } from "@/components/SkinCustomizer";

export const Route = createFileRoute("/creer-mon-skin")({
  head: () => ({
    meta: [
      { title: "Créer votre skin sur mesure — SKINUP" },
      {
        name: "description",
        content:
          "Importez votre image, placez-la sur le gabarit exact de l'iPhone 17 Pro Max et commandez votre skin personnalisé. Paiement à la livraison partout au Maroc.",
      },
      { property: "og:title", content: "Créer votre skin sur mesure — SKINUP" },
      {
        property: "og:description",
        content:
          "Configurateur en direct : votre design sur le gabarit 1:1 de l'iPhone 17 Pro Max, arrière & côtés, arrière seul ou zone caméra.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CustomSkinPage,
});

function CustomSkinPage() {
  const { lang } = useI18n();
  const perks = [
    { icon: Truck, fr: "Livraison gratuite au Maroc", ar: "توصيل مجاني فالمغرب", en: "Free delivery in Morocco" },
    { icon: Wallet, fr: "Paiement à la livraison", ar: "الخلاص عند التوصيل", en: "Cash on delivery" },
    { icon: ShieldCheck, fr: "Découpe 1:1 précise", ar: "قص دقيق 1:1", en: "Precise 1:1 cut" },
  ];

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="container-page py-10 text-center lg:py-14">
          <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold text-primary sm:text-xs">
            {CS.badge[lang]}
          </span>
          <h1 className="mx-auto mt-4 max-w-2xl text-[1.75rem] font-bold leading-tight sm:text-4xl">
            {CS.title[lang]}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {CS.sub[lang]}
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
            {perks.map((p) => (
              <li
                key={p.en}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium"
              >
                <p.icon className="h-3.5 w-3.5 text-primary" />
                {p[lang]}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <SkinCustomizer />
        </div>
      </section>
    </>
  );
}
