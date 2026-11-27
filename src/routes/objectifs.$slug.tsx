import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Gift, Info, Palette, Smartphone, Truck, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { metaViewContent } from "@/lib/meta-pixel";
import { AddToCartBlock } from "@/components/ProductOptions";
import { Button } from "@/components/ui/button";
import { LENS_SKIN_PRICE, PACK_PRICE, PACK_SIZE, lensSkinBySlug } from "@/lib/catalog";
import { LensSkinCard } from "@/components/LensSkinCard";
import { CAMERA_LENS_SKINS } from "@/data/camera-lens-skins";
import { cameraDeliveryFee } from "@/lib/pricing";

export const Route = createFileRoute("/objectifs/$slug")({
  loader: ({ params }) => {
    const skin = lensSkinBySlug(params.slug);
    if (!skin) throw notFound();
    return { skin };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.skin.name.fr} | SKINUP` : "Skin caméra introuvable | SKINUP";
    const description = loaderData
      ? `${loaderData.skin.description.fr} Choisissez votre modèle d’iPhone. Paiement à la livraison au Maroc.`
      : "Découvrez la collection de skins caméra SKINUP pour iPhone.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(loaderData?.skin.image.startsWith("https://") ? [
          { property: "og:image", content: loaderData.skin.image },
          { name: "twitter:image", content: loaderData.skin.image },
        ] : []),
      ],
    };
  },
  component: LensProductPage,
});

const benefits = [
  { icon: Palette, title: "Un style qui vous ressemble", text: "Personnalisez la zone caméra de votre iPhone avec votre design préféré." },
  { icon: Smartphone, title: "Le bon modèle, la bonne découpe", text: "Sélectionnez votre modèle d’iPhone avant de commander." },
  { icon: Truck, title: "Livraison au Maroc", text: "Indiquez votre ville et votre quartier lors de la commande." },
  { icon: Wallet, title: "Paiement à la livraison", text: "Réglez votre commande à la réception." },
];

function LensProductPage() {
  const { skin } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  useEffect(() => {
    setActive(0);
    metaViewContent(skin.id, { content_ids: [skin.id], content_type: "product", content_name: skin.name.fr, value: LENS_SKIN_PRICE, currency: "MAD" });
  }, [skin.id]);
  const name = skin.name.fr.replace(/^Skin caméra\s*[–—-]\s*/i, "");
  const related = CAMERA_LENS_SKINS.filter((s) => s.id !== skin.id).slice(0, 4);
  const shipping = cameraDeliveryFee([{ category: "lens", qty: 1 }]);

  return (
    <main lang="fr" dir="ltr" className="bg-background text-foreground">
      <div className="container-page pb-12 pt-6 sm:pb-16 sm:pt-8">
        <nav aria-label="Fil d’Ariane" className="mb-6 flex items-center gap-2 text-xs font-medium text-muted-foreground sm:mb-8">
          <Link to="/" className="hover:text-primary">SKINUP</Link>
          <span aria-hidden="true">/</span>
          <Link to="/objectifs" className="hover:text-primary">SKINS CAMÉRA</Link>
        </nav>
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0 lg:sticky lg:top-28">
            <div className="aspect-square overflow-hidden bg-background">
              <img src={skin.gallery[active] ?? skin.image} alt={`Skin caméra — ${name}, photo ${active + 1}`} fetchPriority="high" className="h-full w-full object-contain object-center" />
            </div>
            {skin.gallery.length > 1 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2" aria-label="Photos du produit">
                {skin.gallery.map((image, i) => (
                  <Button key={image} variant="outline" type="button" onClick={() => setActive(i)} aria-label={`Photo ${i + 1}`} aria-pressed={i === active} className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg p-1 shadow-none ${i === active ? "border-primary ring-1 ring-primary" : "border-border"}`}>
                    <img src={image} alt="" loading="lazy" className="h-full w-full object-contain" />
                  </Button>
                ))}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold leading-snug sm:text-3xl">Skin caméra — {name}</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">Un petit détail. Un nouveau style pour votre iPhone.</p>
            <p className="mt-6 flex items-baseline gap-2"><span className="text-3xl font-bold">{LENS_SKIN_PRICE}</span><span className="text-base font-semibold">DH</span><span className="ml-2 text-xs text-muted-foreground">le skin</span></p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Un seul skin caméra : {shipping} DH de livraison · {LENS_SKIN_PRICE + shipping} DH au total.</p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{skin.description.fr}</p>
            <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"><Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /><span>{skin.scopeNote?.fr ?? "Skin pour la zone caméra uniquement. Téléphone et coque non inclus."}</span></p>
            <aside aria-label="Offre skins caméra" className="mt-6 flex gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4">
              <Gift className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div className="space-y-2">
                <p className="text-sm font-bold">{PACK_SIZE} skins caméra au choix pour {PACK_PRICE} DH</p>
                <p className="text-xs font-medium text-primary">Mixez vos designs préférés — livraison offerte !</p>
                <p className="text-xs leading-relaxed text-muted-foreground">Choisissez 3 skins identiques ou différents et ajoutez-les au panier : l’offre s’applique automatiquement.</p>
                <Link to="/objectifs" className="inline-flex items-center gap-1.5 text-xs font-semibold hover:text-primary">Choisir mes autres designs <ArrowRight className="h-3.5 w-3.5" /></Link>
              </div>
            </aside>
            <div className="mt-7">
              <AddToCartBlock key={skin.id} cameraFrench product={{ productId: skin.id, slug: skin.slug, category: "lens", name: skin.name, image: skin.image, price: LENS_SKIN_PRICE }} />
            </div>
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 border-t border-border pt-7 sm:grid-cols-2">
              {benefits.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.6} aria-hidden="true" />
                  <div><h2 className="text-sm font-semibold leading-snug">{title}</h2><p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <section className="border-t border-border py-10 sm:py-14">
        <div className="container-page">
          <h2 className="text-xl font-bold sm:text-2xl">D’autres designs, votre style</h2>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
            {related.map((s) => <LensSkinCard key={s.id} skin={s} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
