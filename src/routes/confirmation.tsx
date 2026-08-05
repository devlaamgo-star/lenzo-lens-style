import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { PACK_PRICE, WHATSAPP_NUMBER, designById } from "@/lib/catalog";

export const Route = createFileRoute("/confirmation")({
  head: () => ({
    meta: [
      { title: "Commande confirmée — LENZO" },
      {
        name: "description",
        content: "Merci pour votre commande LENZO. Notre équipe vous appelle pour confirmer la livraison.",
      },
      { property: "og:title", content: "Commande confirmée — LENZO" },
      { property: "og:description", content: "Merci pour votre commande LENZO." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ConfirmationPage,
});

type LastOrder = { orderNumber: string; model: string; designs: string[] };

function ConfirmationPage() {
  const { t, lang } = useI18n();
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    const raw = window.sessionStorage.getItem("lenzo-last-order");
    if (raw) {
      try {
        setOrder(JSON.parse(raw) as LastOrder);
      } catch {
        setOrder(null);
      }
    }
  }, []);

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    order ? `${t("wa.msg")} ${order.orderNumber}` : t("wa.msg"),
  )}`;

  return (
    <section className="section-y">
      <div className="container-page max-w-2xl">
        <div className="flex flex-col items-center rounded-3xl border border-border bg-card p-6 text-center shadow-card sm:p-10">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-success/12 text-success">
            <CheckCircle2 className="h-8 w-8" strokeWidth={1.6} />
          </span>
          <h1 className="mt-5 text-2xl font-bold sm:text-3xl">{t("conf.title")}</h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{t("conf.text")}</p>

          {order && (
            <div className="mt-6 w-full rounded-2xl bg-surface p-5 text-start">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-muted-foreground">{t("conf.number")}</span>
                <span className="font-bold tracking-wide">{order.orderNumber}</span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                <span className="text-muted-foreground">{t("pack.model")}</span>
                <span className="min-w-0 truncate font-medium">{order.model}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
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
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
                <span className="font-semibold">{t("pack.total")}</span>
                <span className="text-lg font-extrabold">{PACK_PRICE} MAD</span>
              </div>
            </div>
          )}

          <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-sm font-semibold text-whatsapp-foreground"
            >
              <MessageCircle className="h-4 w-4" />
              {t("wa.help")}
            </a>
            <Link
              to="/collection"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold hover:bg-surface"
            >
              {t("conf.back")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
