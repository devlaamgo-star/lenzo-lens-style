import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronRight, Plus, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { usePack } from "@/lib/pack";
import { DESIGNS, designById, IPHONE_MODELS } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { cameraDeliveryFee } from "@/lib/pricing";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/pack")({
  head: () => ({
    meta: [
      { title: "Composer mon pack — 3 designs SKINUP pour 149 MAD" },
      {
        name: "description",
        content:
          "Choisissez votre modèle d’iPhone puis 3 designs de stickers caméra. 149 MAD, livraison gratuite au Maroc, paiement à la livraison.",
      },
      { property: "og:title", content: "Composer mon pack — SKINUP" },
      {
        property: "og:description",
        content: "Modèle d’iPhone + 3 designs = 149 MAD, livré gratuitement au Maroc.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PackPage,
});

function PackSummary({ compact = false }: { compact?: boolean }) {
  const { t, lang } = useI18n();
  const pack = usePack();
  const b = pack.breakdown;
  const cart = useCart();
  const shipping = cameraDeliveryFee(cart.items, b.count);
  const canOrder = b.count > 0 && pack.model !== "";

  return (
    <div className={cn("rounded-2xl border border-border bg-card p-5 shadow-soft", compact && "p-4")}>
      <h3 className="text-base font-bold">{t("pack.summary")}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{t("pack.packLabel")}</p>


      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex items-start justify-between gap-3">
          <dt className="text-muted-foreground">{t("pack.model")}</dt>
          <dd className="min-w-0 truncate text-end font-medium">
            {pack.model || "—"}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">{t("pack.designs")}</dt>
          <dd className="mt-2 space-y-2">
            {pack.designs.length === 0 && (
              <p className="text-xs text-muted-foreground">{t("pack.empty")}</p>
            )}
            {pack.designs.map((id, index) => {
              const d = designById(id);
              if (!d) return null;
              return (
                <div key={`${id}-${index}`} className="flex items-center gap-3 rounded-xl bg-surface p-2">
                  <img src={d.image} alt="" loading="lazy" className="h-10 w-10 rounded-lg object-cover" />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">{d.name[lang]}</span>
                  <button
                    type="button"
                    aria-label={t("pack.remove")}
                    onClick={() => pack.removeAt(index)}
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full hover:bg-card"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </dd>
        </div>
      </dl>

      <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">{t("pack.delivery")}</span>
          <span className={shipping ? "font-medium" : "font-medium text-success"}>{shipping ? `${shipping} MAD` : t("pack.free")}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">{t("pack.payment")}</span>
          <span className="font-medium">{t("pack.cod")}</span>
        </div>
        {b.promoApplies && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t("pack.promoLine")}</span>
            <span className="font-medium">{b.promoTotal} MAD</span>
          </div>
        )}
        {b.extraCount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              {t("pack.extraLine")} × {b.extraCount}
            </span>
            <span className="font-medium">{b.extraTotal} MAD</span>
          </div>
        )}
        {!b.promoApplies && b.count > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              {t("pack.orderItems")} × {b.count}
            </span>
            <span className="font-medium">{b.promoTotal} MAD</span>
          </div>
        )}
        <div className="flex items-baseline justify-between pt-2">
          <span className="font-semibold">{t("pack.total")}</span>
          <span className="text-xl font-extrabold">{b.total + shipping} MAD</span>
        </div>
        <p className="pt-1 text-xs text-muted-foreground">{t("pack.promoNote")}</p>
      </div>

      {canOrder ? (
        <Link
          to="/commande"
          className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01]"
        >
          {t("pack.order")}
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="mt-5 inline-flex h-12 w-full cursor-not-allowed items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground"
        >
          {pack.model === "" ? t("pack.needModel") : t("pack.needOne")}
        </button>
      )}

      {pack.designs.length > 0 && (
        <button
          type="button"
          onClick={pack.clear}
          className="mt-3 w-full text-xs font-medium text-muted-foreground underline-offset-4 hover:underline"
        >
          {t("pack.clear")}
        </button>
      )}
    </div>
  );
}

function PackPage() {
  const { t, lang } = useI18n();
  const pack = usePack();

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="container-page py-8 lg:py-12">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              {t("breadcrumb.home")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 flip-rtl" />
            <span className="text-foreground">{t("pack.title")}</span>
          </nav>
          <h1 className="mt-3 text-2xl font-bold sm:text-3xl lg:text-[2.1rem]">{t("pack.title")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("pack.sub")}</p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10">
          <div className="min-w-0 space-y-10">
            <div>
              <h2 className="text-lg font-bold">{t("pack.step1")}</h2>
              <div className="mt-4 max-w-md">
                <Select {...(pack.model ? { value: pack.model } : {})} onValueChange={pack.setModel}>
                  <SelectTrigger className="h-12 rounded-full">
                    <SelectValue placeholder={t("pack.modelPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent className="max-h-72">
                    {IPHONE_MODELS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <h2 className="min-w-0 text-lg font-bold">{t("pack.step2")}</h2>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1.5 text-xs font-bold",
                    pack.breakdown.promoApplies
                      ? "bg-success text-success-foreground"
                      : "bg-accent text-accent-foreground",
                  )}
                >
                  {pack.designs.length} {t("pack.selectedCount")}
                  {pack.breakdown.promoApplies ? ` — ${t("pack.promoApplied")}` : ""}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{t("pack.sameAllowed")}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t("pack.promoNote")}</p>

              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-5">
                {DESIGNS.map((d) => {
                  const count = pack.countOf(d.id);
                  return (
                    <div
                      key={d.id}
                      className={cn(
                        "overflow-hidden rounded-2xl border bg-card shadow-soft transition-all",
                        count > 0 ? "border-primary ring-2 ring-primary/25" : "border-border",
                      )}
                    >
                      <div className="relative aspect-square bg-surface">
                        <img
                          src={d.image}
                          alt={d.name[lang]}
                          width={1024}
                          height={1024}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                        {count > 0 && (
                          <span className="absolute top-2.5 end-2.5 grid h-7 min-w-7 place-items-center rounded-full bg-primary px-2 text-xs font-bold text-primary-foreground">
                            ×{count}
                          </span>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="truncate text-sm font-semibold">{d.name[lang]}</p>
                        <div className="mt-2.5 grid grid-cols-[auto_minmax(0,1fr)] gap-2">
                          <button
                            type="button"
                            disabled={count === 0}
                            onClick={() => pack.removeOne(d.id)}
                            aria-label={t("pack.remove")}
                            className="grid h-10 w-10 place-items-center rounded-full border border-border disabled:opacity-40"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => pack.add(d.id)}
                            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-ink text-xs font-semibold text-ink-foreground hover:bg-primary"
                          >
                            {count > 0 ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                            {count > 0 ? t("card.added") : t("card.add")}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:hidden">
              <h2 className="text-lg font-bold">{t("pack.step3")}</h2>
              <div className="mt-4">
                <PackSummary />
              </div>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <PackSummary />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
