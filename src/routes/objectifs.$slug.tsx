import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight, Truck, Wallet, Scissors, Check } from "lucide-react";
import { useState } from "react";
import { AddToCartBlock } from "@/components/ProductOptions";
import { useI18n } from "@/lib/i18n";
import { LENS_SKIN_PRICE, lensSkinBySlug } from "@/lib/catalog";
import { LensSkinCard } from "@/components/LensSkinCard";
import { CAMERA_LENS_SKINS } from "@/data/camera-lens-skins";

export const Route = createFileRoute("/objectifs/$slug")({
  loader: ({ params }) => {
    const skin = lensSkinBySlug(params.slug);
    if (!skin) throw notFound();
    return { skin };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Produit introuvable — LENZO" }, { name: "robots", content: "noindex" }],
      };
    }
    const { skin } = loaderData;
    const title = `${skin.name.fr} — Sticker objectifs caméra iPhone 17 Pro Max | LENZO`;
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
  component: LensProductPage,
});

function LensProductPage() {
  const { skin } = Route.useLoaderData();
  const { t, lang } = useI18n();
  const [active, setActive] = useState(0);

  const related = CAMERA_LENS_SKINS.filter((s) => s.id !== skin.id).slice(0, 4);

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="container-page py-5">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              {t("breadcrumb.home")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 flip-rtl" />
            <Link to="/objectifs" className="hover:text-primary">
              {t("lens.title")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 flip-rtl" />
            <span className="text-foreground">{skin.name[lang]}</span>
          </nav>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="overflow-hidden rounded-3xl border border-border bg-card">
              <img
                src={skin.gallery[active] ?? skin.image}
                alt={`${skin.name[lang]} — ${t("lens.category")} ${skin.device}`}
                className="aspect-square w-full object-contain p-6"
              />
            </div>
            {skin.gallery.length > 1 && (
              <div className="mt-4 flex gap-3" aria-label={t("skins.gallery")}>
                {skin.gallery.map((g: string, i: number) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`${t("skins.gallery")} ${i + 1}`}
                    className={
                      "h-20 w-20 overflow-hidden rounded-xl border bg-card p-1 " +
                      (i === active ? "border-primary" : "border-border")
                    }
                  >
                    <img src={g} alt="" className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col items-start gap-4">
            <span className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-semibold tracking-wide text-accent-foreground">
              {t("lens.category")}
            </span>
            <h1 className="text-2xl font-bold sm:text-3xl">{skin.name[lang]}</h1>
            <p className="text-sm text-muted-foreground">{t("skins.compat")}</p>
            <p className="text-2xl font-bold">{LENS_SKIN_PRICE} MAD</p>
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
                category: "lens",
                name: skin.name,
                image: skin.image,
                price: LENS_SKIN_PRICE,
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
          <h2 className="text-xl font-bold sm:text-2xl">{t("lens.title")}</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {related.map((s) => (
              <LensSkinCard key={s.id} skin={s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
