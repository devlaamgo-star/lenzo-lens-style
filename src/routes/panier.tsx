import { BundleLines, SummaryItems } from "@/components/BundleLines";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Trash2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { usePack } from "@/lib/pack";
import { designById } from "@/lib/catalog";
import { QtyStepper } from "@/components/ProductOptions";
import { CodInfoCard, ReturnsPolicyCard } from "@/routes/retours";
import { LENS_UNIT_PRICE, cameraDeliveryFee } from "@/lib/pricing";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [
      { title: "Mon panier — SKINUP" },
      {
        name: "description",
        content:
          "Vérifiez vos produits SKINUP, votre modèle d’iPhone et vos quantités avant de commander en paiement à la livraison.",
      },
      { property: "og:title", content: "Mon panier — SKINUP" },
      {
        property: "og:description",
        content: "Modèle, quantité et total avant de finaliser votre commande SKINUP.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { t, lang } = useI18n();
  const cart = useCart();
  const pack = usePack();
  const b = pack.breakdown;
  const packReady = b.count > 0;
  const shipping = cameraDeliveryFee(cart.items, b.count);
  const total = cart.total + b.total + shipping;
  const empty = cart.items.length === 0 && !packReady;

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="container-page py-8 lg:py-12">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              {t("breadcrumb.home")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 flip-rtl" />
            <span className="text-foreground">{t("cart.title")}</span>
          </nav>
          <h1 className="mt-3 text-2xl font-bold sm:text-3xl lg:text-[2.1rem]">{t("cart.title")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("cod.text")}</p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10">
          <div className="min-w-0 space-y-4">
            {empty && (
              <div className="rounded-2xl border border-border bg-card p-8 text-center">
                <p className="text-sm text-muted-foreground">{t("cart.empty")}</p>
                <Link
                  to="/collection"
                  className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
                >
                  {t("cart.continue")}
                </Link>
              </div>
            )}

            {cart.items.map((item) => (
              <div
                key={item.key}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center"
              >
                <img
                  src={item.image}
                  alt={item.name[lang]}
                  loading="lazy"
                  className="h-20 w-20 shrink-0 rounded-xl bg-surface object-contain p-1"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{item.name[lang]}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t("pack.model")} : <span className="font-medium text-foreground">{item.model}</span>
                  </p>
                  <p className="mt-1 text-sm font-bold">
                    {item.category === "lens" ? LENS_UNIT_PRICE : item.price} MAD
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <QtyStepper value={item.qty} onChange={(q) => cart.setQty(item.key, q)} compact />
                  <span className="w-20 text-end text-sm font-bold">
                    {(item.category === "lens" ? LENS_UNIT_PRICE : item.price) * item.qty} MAD
                  </span>
                  <button
                    type="button"
                    aria-label={t("cart.remove")}
                    onClick={() => cart.remove(item.key)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}

            {packReady && (
              <div className="rounded-2xl border border-border bg-card p-4">
                <div className="space-y-1.5">
                  {b.promoApplies ? (
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">{t("pack.promoLine")}</p>
                      <span className="text-sm font-bold">{b.promoTotal} MAD</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">
                        {t("pack.orderItems")} × {b.count}
                      </p>
                      <span className="text-sm font-bold">{b.promoTotal} MAD</span>
                    </div>
                  )}
                  {b.extraCount > 0 && (
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">
                        {t("pack.extraLine")} × {b.extraCount}
                      </p>
                      <span className="text-sm font-bold">{b.extraTotal} MAD</span>
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("pack.model")} : <span className="font-medium text-foreground">{pack.model || "—"}</span>
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {pack.designs.map((id, i) => {
                    const d = designById(id);
                    return d ? (
                      <span
                        key={`${id}-${i}`}
                        className="inline-flex items-center gap-2 rounded-full bg-surface py-1.5 pe-3 ps-1.5 text-xs font-medium"
                      >
                        <img src={d.image} alt="" loading="lazy" className="h-6 w-6 rounded-full object-cover" />
                        {d.name[lang]}
                      </span>
                    ) : null;
                  })}
                  <Link to="/pack" className="ms-auto self-center text-xs font-semibold text-primary hover:underline">
                    {t("f.edit")}
                  </Link>
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <h2 className="text-base font-bold">{t("f.summary")}</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <SummaryItems />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">{t("cart.subtotal")}</dt>
                  <dd className="font-medium">{cart.subtotal + b.total} MAD</dd>
                </div>
                <BundleLines />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">{t("pack.delivery")}</dt>
                  <dd className={shipping ? "font-medium" : "font-medium text-success"}>{shipping ? `${shipping} MAD` : t("pack.free")}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <dt className="font-semibold">{t("pack.total")}</dt>
                  <dd className="text-xl font-extrabold">{total} MAD</dd>
                </div>
              </dl>
              {packReady && (
                <p className="mt-3 text-xs text-muted-foreground">{t("pack.promoNote")}</p>
              )}
              {!empty && (
                <Link
                  to="/commande"
                  className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01]"
                >
                  {t("cart.checkout")}
                </Link>
              )}
            </div>
            <CodInfoCard />
            <ReturnsPolicyCard />
          </aside>
        </div>
      </section>
    </>
  );
}
