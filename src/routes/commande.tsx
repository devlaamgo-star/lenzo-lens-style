import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { usePack } from "@/lib/pack";
import { PACK_PRICE, designById, IPHONE_MODELS } from "@/lib/catalog";
import { createOrder } from "@/lib/orders.functions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/commande")({
  head: () => ({
    meta: [
      { title: "Finaliser ma commande — LENZO" },
      {
        name: "description",
        content:
          "Commandez votre pack de 3 skins LENZO à 99 MAD. Paiement à la livraison, livraison gratuite partout au Maroc.",
      },
      { property: "og:title", content: "Finaliser ma commande — LENZO" },
      {
        property: "og:description",
        content: "Pack de 3 skins à 99 MAD, paiement à la livraison partout au Maroc.",
      },
    ],
  }),
  component: OrderPage,
});

const PHONE_RE = /^(?:\+212|00212|0)([5-7])\d{8}$/;

type Errors = Partial<Record<"name" | "phone" | "city" | "address" | "model" | "designs", string>>;

function OrderPage() {
  const { t, lang } = useI18n();
  const pack = usePack();
  const navigate = useNavigate();
  const submitOrder = useServerFn(createOrder);

  const [values, setValues] = useState({ name: "", phone: "", city: "", address: "", notes: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const validate = (): boolean => {
    const next: Errors = {};
    if (values.name.trim().length < 3) next.name = t("e.name");
    if (!PHONE_RE.test(values.phone.replace(/[\s.-]/g, ""))) next.phone = t("e.phone");
    if (values.city.trim().length < 2) next.city = t("e.city");
    if (values.address.trim().length < 8) next.address = t("e.address");
    if (!pack.model) next.model = t("e.model");
    if (pack.designs.length !== 3) next.designs = t("e.designs");
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
          city: values.city,
          address: values.address,
          model: pack.model,
          designs: pack.designs,
          notes: values.notes,
          locale: lang,
        },
      });
      window.sessionStorage.setItem(
        "lenzo-last-order",
        JSON.stringify({
          orderNumber: res.orderNumber,
          model: pack.model,
          designs: pack.designs,
        }),
      );
      pack.clear();
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
            <Link to="/pack" className="hover:text-primary">
              {t("pack.title")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 flip-rtl" />
            <span className="text-foreground">{t("order.title")}</span>
          </nav>
          <h1 className="mt-3 text-2xl font-bold sm:text-3xl lg:text-[2.1rem]">{t("order.title")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("order.sub")}</p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10">
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
              <div className="min-w-0">
                <label htmlFor="city" className="mb-1.5 block text-sm font-medium">
                  {t("f.city")}
                </label>
                <input id="city" value={values.city} onChange={set("city")} maxLength={60} className={fieldClass} />
                {errors.city && <p className="mt-1.5 text-xs text-destructive">{errors.city}</p>}
              </div>
              <div className="min-w-0">
                <label className="mb-1.5 block text-sm font-medium">{t("f.model")}</label>
                <Select value={pack.model || undefined} onValueChange={pack.setModel}>
                  <SelectTrigger className="h-12 rounded-xl">
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
                {errors.model && <p className="mt-1.5 text-xs text-destructive">{errors.model}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="address" className="mb-1.5 block text-sm font-medium">
                {t("f.address")}
              </label>
              <textarea
                id="address"
                rows={3}
                value={values.address}
                onChange={set("address")}
                maxLength={300}
                className="w-full rounded-xl border border-input bg-card p-4 text-sm outline-none transition-colors focus:border-primary"
              />
              {errors.address && <p className="mt-1.5 text-xs text-destructive">{errors.address}</p>}
            </div>

            <div>
              <p className="mb-1.5 text-sm font-medium">{t("f.designs")}</p>
              <div className="flex flex-wrap gap-2 rounded-xl border border-border bg-card p-3">
                {pack.designs.length === 0 && (
                  <span className="text-xs text-muted-foreground">{t("pack.empty")}</span>
                )}
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
              {errors.designs && <p className="mt-1.5 text-xs text-destructive">{errors.designs}</p>}
            </div>

            <div>
              <label htmlFor="notes" className="mb-1.5 block text-sm font-medium">
                {t("f.notes")} <span className="text-xs text-muted-foreground">({t("f.optional")})</span>
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

            <button
              type="submit"
              disabled={pending}
              className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-70"
            >
              {pending && <Loader2 className="h-4 w-4 animate-spin" />}
              {pending ? t("f.sending") : t("f.submit")}
            </button>
            <p className="text-center text-xs text-muted-foreground">{t("f.note")}</p>
          </form>

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <OrderSummary />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function OrderSummary() {
  const { t } = useI18n();
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <h2 className="text-base font-bold">{t("f.summary")}</h2>
      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">{t("f.pack3")}</dt>
          <dd className="font-medium">{PACK_PRICE} MAD</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">{t("pack.delivery")}</dt>
          <dd className="font-medium text-success">{t("pack.free")}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-3">
          <dt className="font-semibold">{t("pack.total")}</dt>
          <dd className="text-xl font-extrabold">{PACK_PRICE} MAD</dd>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-surface p-3 text-xs">
          <ShieldCheck className="h-4 w-4 shrink-0 text-success" />
          <span>
            {t("pack.payment")}: {t("pack.cod")}
          </span>
        </div>
      </dl>
    </div>
  );
}
