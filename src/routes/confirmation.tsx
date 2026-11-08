import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { WHATSAPP_NUMBER, designById } from "@/lib/catalog";
import { packBreakdown } from "@/lib/pricing";
import { ReturnsPolicyCard } from "@/routes/retours";
import { readLastOrder } from "@/lib/last-order";

export const Route = createFileRoute("/confirmation")({
  head: () => ({
    meta: [
      { title: "Merci pour votre commande — SKINUP" },
      {
        name: "description",
        content: "Merci pour votre commande SKINUP. Notre équipe vous appelle pour confirmer la livraison.",
      },
      { property: "og:title", content: "Merci pour votre commande — SKINUP" },
      { property: "og:description", content: "Merci pour votre commande SKINUP." },
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConfirmationPage,
});

type OrderItem = { name: string; image: string; model: string; qty: number; price: number };
type LastOrder = {
  orderNumber: string;
  total: number;
  shipping?: number;
  name: string;
  phone: string;
  city: string;
  address: string;
  model: string;
  designs: string[];
  items: OrderItem[];
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="min-w-0 text-end font-medium">{value}</span>
    </div>
  );
}

function ConfirmationPage() {
  const { t, lang } = useI18n();
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    setOrder(readLastOrder<LastOrder>());
  }, []);

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    order ? `${t("wa.msg")} ${order.orderNumber}` : t("wa.msg"),
  )}`;

  return (
    <section className="section-y">
      <div className="container-page max-w-2xl space-y-6">
        <div className="flex flex-col items-center rounded-3xl border border-border bg-card p-6 text-center shadow-card sm:p-10">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-success/12 text-success">
            <CheckCircle2 className="h-8 w-8" strokeWidth={1.6} />
          </span>
          <h1 className="mt-5 text-2xl font-bold sm:text-3xl">{t("conf.title")}</h1>
          <p className="mt-3 text-base font-medium">{t("conf.received")}</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{t("conf.support")}</p>

          {order ? (
            <div className="mt-6 w-full space-y-3 rounded-2xl bg-surface p-5 text-start">
              <Row label={t("conf.number")} value={order.orderNumber} />
              <Row label={t("conf.customer")} value={order.name} />
              <Row label={t("f.phone")} value={order.phone} />
              <Row label={t("f.city")} value={order.city} />
              <Row label={t("f.address")} value={order.address} />

              <div className="space-y-3 border-t border-border pt-3">
                <p className="text-sm font-semibold">{t("cart.items")}</p>
                {order.items.map((i, idx) => (
                  <div key={`${i.name}-${idx}`} className="flex items-center gap-3">
                    <img
                      src={i.image}
                      alt={i.name}
                      loading="lazy"
                      className="h-12 w-12 shrink-0 rounded-lg bg-card object-contain p-0.5"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{i.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {i.model} · {t("f.qty")} {i.qty}
                      </p>
                    </div>
                    <span className="text-sm font-semibold">{i.price * i.qty} MAD</span>
                  </div>
                ))}

                {order.designs.length > 0 && (
                  <div>
                    {packBreakdown(order.designs.length).promoApplies ? (
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{t("pack.promoLine")}</p>
                        <span className="text-sm font-semibold">
                          {packBreakdown(order.designs.length).promoTotal} MAD
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                          {t("pack.orderItems")} × {order.designs.length}
                        </p>
                        <span className="text-sm font-semibold">
                          {packBreakdown(order.designs.length).promoTotal} MAD
                        </span>
                      </div>
                    )}
                    {packBreakdown(order.designs.length).extraCount > 0 && (
                      <div className="mt-1 flex items-center justify-between">
                        <p className="text-sm font-medium">
                          {t("pack.extraLine")} × {packBreakdown(order.designs.length).extraCount}
                        </p>
                        <span className="text-sm font-semibold">
                          {packBreakdown(order.designs.length).extraTotal} MAD
                        </span>
                      </div>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">
                      {order.model} · {t("f.qty")} {order.designs.length}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {order.designs.map((id, i) => {
                        const d = designById(id);
                        return d ? (
                          <span
                            key={`${id}-${i}`}
                            className="inline-flex items-center gap-2 rounded-full bg-card py-1.5 pe-3 ps-1.5 text-xs font-medium"
                          >
                            <img src={d.image} alt="" loading="lazy" className="h-6 w-6 rounded-full object-cover" />
                            {d.name[lang]}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3 border-t border-border pt-3">
                <Row label={t("f.paymentMethod")} value={t("pack.cod")} />
                {order.shipping !== undefined && <Row label={t("pack.delivery")} value={order.shipping ? `${order.shipping} MAD` : t("pack.free")} />}
                <Row label={t("conf.status")} value={t("conf.pending")} />
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{t("pack.total")}</span>
                  <span className="text-lg font-extrabold">{order.total} MAD</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-6 text-sm text-muted-foreground">{t("conf.none")}</p>
          )}

          <p className="mt-6 text-sm font-medium">{t("conf.keepPhone")}</p>

          <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold hover:bg-surface"
            >
              {t("conf.back")}
            </Link>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-sm font-semibold text-whatsapp-foreground"
            >
              <MessageCircle className="h-4 w-4" />
              {t("conf.wa")}
            </a>
          </div>
        </div>

        <ReturnsPolicyCard />
      </div>
    </section>
  );
}
