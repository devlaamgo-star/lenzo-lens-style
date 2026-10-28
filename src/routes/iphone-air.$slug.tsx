import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight, Truck, Wallet, Scissors, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { metaTrack } from "@/lib/meta-pixel";
import { AddToCartBlock } from "@/components/ProductOptions";
import { useI18n } from "@/lib/i18n";
import { AIR_SKIN_PRICE, iphoneAirSkinBySlug } from "@/lib/catalog";
import { AirSkinCard } from "@/components/AirSkinCard";
import { IPHONE_AIR_SKINS } from "@/data/iphone-air-skins";

export const Route = createFileRoute("/iphone-air/$slug")({
  loader: ({ params }) => {
    const skin = iphoneAirSkinBySlug(params.slug);
    if (!skin) throw notFound();
    return { skin };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Produit introuvable — SKINUP" }, { name: "robots", content: "noindex" }],
      };
    }
    const { skin } = loaderData;
    const title = `${skin.name.fr} — Skin iPhone Air | SKINUP`;
    return {
      meta: [
        { title },
        { name: "description", content: skin.description.fr },
        { property: "og:title", content: title },
        { property: "og:description", content: skin.description.fr },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AirProductPage,
});

function AirProductPage() {
  const { skin } = Route.useLoaderData();
  useEffect(() => { metaTrack("ViewContent", { content_ids: [skin.id], content_type: "product", content_name: skin.name.fr, value: AIR_SKIN_PRICE, currency: "MAD" }); }, [skin.id]);
  const { t, lang } = useI18n();

  const related = IPHONE_AIR_SKINS.filter((s) => s.id !== skin.id).slice(0, 4);

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="container-page py-5">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              {t("breadcrumb.home")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 flip-rtl" />
            <Link to="/iphone-air" className="hover:text-primary">
              {t("air.title")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 flip-rtl" />
            <span className="text-foreground">{skin.name[lang]}</span>
          </nav>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <img
              src={skin.image}
              alt={`${skin.name[lang]} — ${t("air.category")} ${skin.device}`}
              className="aspect-square w-full object-contain p-6"
            />
          </div>

          <div className="flex flex-col items-start gap-4">
            <span className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-semibold tracking-wide text-accent-foreground">
              {t("air.category")}
            </span>
            <h1 className="text-2xl font-bold sm:text-3xl">{skin.name[lang]}</h1>
            <p className="text-sm text-muted-foreground">{skin.device}</p>
            <p className="text-2xl font-bold">{AIR_SKIN_PRICE} MAD</p>
            {skin.inStock && (
              <p className="inline-flex items-center gap-1.5 text-sm text-success">
                <Check className="h-4 w-4" />
                {t("skins.stock")}
              </p>
            )}
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {skin.description[lang]}
            </p>

            <AddToCartBlock
              product={{
                productId: skin.id,
                slug: skin.slug,
                category: "air",
                name: skin.name,
                image: skin.image,
                price: AIR_SKIN_PRICE,
              }}
            />
            <Link to="/retours" className="text-xs font-semibold text-primary hover:underline">
              {t("ret.title")}
            </Link>

            <ul className="mt-2 grid w-full gap-2.5">
              {[
                { icon: Truck, label: t("skins.free") },
                { icon: Wallet, label: t("skins.cod") },
                { icon: Scissors, label: t("skins.install") },
              ].map((item) => (
                <li key={item.label} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.8} />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <h2 className="text-xl font-bold sm:text-2xl">{t("air.title")}</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {related.map((s) => (
              <AirSkinCard key={s.id} skin={s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
