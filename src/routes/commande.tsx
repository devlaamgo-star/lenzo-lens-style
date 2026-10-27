import { BundleLines, SummaryItems } from "@/components/BundleLines";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { usePack } from "@/lib/pack";
import { useCart } from "@/lib/cart";
import { designById } from "@/lib/catalog";
import { DeliveryZoneSelect } from "@/components/DeliveryZoneSelect";
import { isDeliveryZone, isCompleteAddress } from "@/lib/delivery-address";
import { createOrder } from "@/lib/orders.functions";
import { ModelSelect } from "@/components/ProductOptions";
import { CodInfoCard, ReturnsPolicyCard } from "@/routes/retours";
import { LENS_UNIT_PRICE } from "@/lib/pricing";
import { readAttribution } from "@/lib/attribution";

export const Route = createFileRoute("/commande")({
  head: () => ({
    meta: [
      { title: "Finaliser ma commande — SKINUP" },
      {
        name: "description",
        content:
          "Finalisez votre commande SKINUP : paiement à la livraison, livraison gratuite partout au Maroc, confirmation par téléphone.",
      },
      { property: "og:title", content: "Finaliser ma commande — SKINUP" },
      {
        property: "og:description",
        content: "Paiement à la livraison et livraison gratuite partout au Maroc.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OrderPage,
});

const PHONE_RE = /^(?:\+212|00212|0)([5-7])\d{8}$/;

type Errors = Partial<
  Record<"name" | "phone" | "city" | "address" | "model" | "cart", string>
>;

function OrderPage() {
  const { t, lang } = useI18n();
  const pack = usePack();
  const cart = useCart();
  const navigate = useNavigate();
  const submitOrder = useServerFn(createOrder);

  const [values, setValues] = useState({ name: "", phone: "", city: "", address: "", notes: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);

  const b = pack.breakdown;
  const packReady = b.count > 0;
  const total = cart.total + b.total;
  const empty = cart.items.length === 0 && !packReady;

  const set =
    (key: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  const validate = (): boolean => {
    const next: Errors = {};
    if (values.name.trim().length < 3) next.name = t("e.name");
    if (!PHONE_RE.test(values.phone.replace(/[\s.-]/g, ""))) next.phone = t("e.phone");
    if (!isDeliveryZone(values.city)) next.city = t("e.deliveryZone");
    if (!isCompleteAddress(values.address)) next.address = t("e.fullAddress");
    if (packReady && !pack.model) next.model = t("e.modelSelect");
    if (empty) next.cart = t("e.emptyCart");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || pending) return;
    setPending(true);
    try {
      const res = await submitOrder({
        data: {
          fullName: values.name,
          phone: values.phone,
          deliveryZone: values.city,
          fullAddress: values.address,
          model: packReady ? pack.model : "",
          designs: packReady ? pack.designs : [],
          items: cart.items.map((i) => ({
            productId: i.productId,
            name: i.name.fr,
            category: i.category,
            model: i.model,
            qty: i.qty,
            image: i.image.startsWith("data:") ? "" : i.image,
            slug: i.slug,
            custom: i.custom,
          })),
          notes: values.notes,
          locale: lang,
          attribution: readAttribution(),
        },
      });
      window.skinupTikTokSubmitForm?.(res.orderNumber);
      window.skinupTikTokPurchase?.(res.orderNumber, {
        value: res.total,
        quantity: res.quantity,
        contents: [
          ...cart.items.map((i) => ({ id: i.productId, qty: i.qty })),
          ...(packReady ? pack.designs.map((d) => ({ id: d, qty: 1 })) : []),
        ],
      });
      window.sessionStorage.setItem(
        "skinup-last-order",
        JSON.stringify({
          orderNumber: res.orderNumber,
          total: res.total,
          name: values.name,
          phone: values.phone,
          city: values.city,
          address: values.address,
          model: packReady ? pack.model : "",
          designs: packReady ? pack.designs : [],
          items: cart.items.map((i) => ({
            name: i.name[lang],
            image: i.image,
            model: i.model,
            qty: i.qty,
            price: i.price,
          })),
        }),
      );
      pack.clear();
      cart.clear();
      navigate({ to: "/confirmation" });
    } catch (err) {
      console.error(err);
      toast.error(t("e.server"));
    } finally {
      setPending(false);
    }
  };

  const fieldClass =
    "h-12 w-full rounded-xl border border-input bg-card px-4 text-sm outline-none transition-colors focus:border-primary";

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="container-page py-8 lg:py-12">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              {t("breadcrumb.home")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 flip-rtl" />
            <Link to="/panier" className="hover:text-primary">
              {t("cart.title")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 flip-rtl" />
            <span className="text-foreground">{t("order.title")}</span>
          </nav>
          <h1 className="mt-3 text-2xl font-bold sm:text-3xl lg:text-[2.1rem]">{t("order.title")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("order.sub")}</p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-10">
          <form onSubmit={onSubmit} noValidate className="min-w-0 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="min-w-0">
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                  {t("f.name")}
                </label>
                <input id="name" value={values.name} onChange={set("name")} maxLength={80} className={fieldClass} />
                {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="min-w-0">
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
                  {t("f.phone")}
                </label>
                <input
                  id="phone"
                  inputMode="tel"
                  dir="ltr"
                  placeholder="06 12 34 56 78"
                  value={values.phone}
                  onChange={set("phone")}
                  maxLength={20}
                  className={fieldClass}
                />
                {errors.phone && <p className="mt-1.5 text-xs text-destructive">{errors.phone}</p>}
              </div>
              <DeliveryZoneSelect value={values.city}
                onChange={(city) => setValues((v) => ({ ...v, city }))}
                error={errors.city} className={fieldClass} />
              {packReady && (
                <div className="min-w-0">
                  <ModelSelect
                    value={pack.model}
                    onChange={pack.setModel}
                    error={errors.model}
                    className="h-12 rounded-xl"
                  />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="address" className="mb-1.5 block text-sm font-medium">
                {t("f.address")}
              </label>
              <textarea
                id="address"
                rows={3}
                required
                aria-invalid={Boolean(errors.address)}
                aria-describedby="address-help"
                placeholder={t("f.fullAddressPlaceholder")}
                value={values.address}
                onChange={set("address")}
                maxLength={300}
                className="w-full rounded-xl border border-input bg-card p-4 text-sm outline-none transition-colors focus:border-primary"
              />
              <p id="address-help" className="mt-1.5 text-xs text-muted-foreground">{t("f.fullAddressHelp")}</p>
              {errors.address && <p className="mt-1.5 text-xs text-destructive">{errors.address}</p>}
            </div>

            <div>
              <label htmlFor="notes" className="mb-1.5 block text-sm font-medium">
                {t("f.extra")} <span className="text-xs text-muted-foreground">({t("f.optional")})</span>
              </label>
              <textarea
                id="notes"
                rows={2}
                value={values.notes}
                onChange={set("notes")}
                maxLength={500}
                className="w-full rounded-xl border border-input bg-card p-4 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>

            <div className="lg:hidden">
              <OrderSummary />
            </div>

            {errors.cart && <p className="text-xs text-destructive">{errors.cart}</p>}

            <button
              type="submit"
              disabled={pending}
              className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-70"
            >
              {pending && <Loader2 className="h-4 w-4 animate-spin" />}
              {pending ? t("f.sending") : t("f.submit")}
            </button>
            <p className="text-center text-xs text-muted-foreground">{t("f.note")}</p>
            <div className="lg:hidden">
              <ReturnsPolicyCard />
            </div>
          </form>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-5">
              <OrderSummary />
              <CodInfoCard />
              <ReturnsPolicyCard />
            </div>
          </aside>
        </div>
      </section>
    </>
  );

  function OrderSummary() {
    return (
      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h2 className="text-base font-bold">{t("f.summary")}</h2>

        <div className="mt-4 space-y-3">
          {cart.items.map((i) => (
            <div key={i.key} className="flex items-center gap-3">
              <img
                src={i.image}
                alt={i.name[lang]}
                loading="lazy"
                className="h-12 w-12 shrink-0 rounded-lg bg-surface object-contain p-0.5"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{i.name[lang]}</p>
                <p className="text-xs text-muted-foreground">
                  {i.model} · {t("f.qty")} {i.qty}
                </p>
              </div>
              <span className="text-sm font-semibold">
                {(i.category === "lens" ? LENS_UNIT_PRICE : i.price) * i.qty} MAD
              </span>
            </div>
          ))}

          {packReady && (
            <div>
              {b.promoApplies ? (
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{t("pack.promoLine")}</p>
                  <span className="text-sm font-semibold">{b.promoTotal} MAD</span>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    {t("pack.orderItems")} × {b.count}
                  </p>
                  <span className="text-sm font-semibold">{b.promoTotal} MAD</span>
                </div>
              )}
              {b.extraCount > 0 && (
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-sm font-medium">
                    {t("pack.extraLine")} × {b.extraCount}
                  </p>
                  <span className="text-sm font-semibold">{b.extraTotal} MAD</span>
                </div>
              )}
              <p className="mt-1 text-xs text-muted-foreground">
                {pack.model || "—"} · {t("f.qty")} {b.count}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {pack.designs.map((id, i) => {
                  const d = designById(id);
                  return d ? (
                    <span
                      key={`${id}-${i}`}
                      className="inline-flex items-center gap-2 rounded-full bg-surface py-1 pe-2.5 ps-1 text-[11px] font-medium"
                    >
                      <img src={d.image} alt="" loading="lazy" className="h-5 w-5 rounded-full object-cover" />
                      {d.name[lang]}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {empty && (
            <p className="text-xs text-muted-foreground">{t("cart.empty")}</p>
          )}
        </div>

        <dl className="mt-4 space-y-3 border-t border-border pt-4 text-sm">
          <SummaryItems />
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">{t("f.subtotal")}</dt>
            <dd className="font-medium">{cart.subtotal + b.total} MAD</dd>
          </div>
          <BundleLines />
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">{t("pack.delivery")}</dt>
            <dd className="font-medium text-success">{t("pack.free")}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">{t("f.paymentMethod")}</dt>
            <dd className="font-medium">{t("cod.title")}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-3">
            <dt className="font-semibold">{t("pack.total")}</dt>
            <dd className="text-xl font-extrabold">{total} MAD</dd>
          </div>
        </dl>

        <Link to="/panier" className="mt-4 inline-block text-xs font-semibold text-primary hover:underline">
          {t("cart.viewCart")}
        </Link>
      </div>
    );
  }
}
