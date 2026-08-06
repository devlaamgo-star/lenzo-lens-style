import { createFileRoute, Link } from "@tanstack/react-router";
import { PackageCheck, RefreshCcw, ShieldCheck, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { whatsappLink } from "@/lib/catalog";

export const Route = createFileRoute("/retours")({
  head: () => ({
    meta: [
      { title: "Retours et remboursements — LENZO" },
      {
        name: "description",
        content:
          "Produit incorrect, endommagé ou défectueux ? Découvrez la politique de retours et remboursements LENZO pour les commandes au Maroc.",
      },
      { property: "og:title", content: "Retours et remboursements — LENZO" },
      {
        property: "og:description",
        content: "Échange ou remboursement après vérification de votre commande LENZO.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReturnsPage,
});

export function ReturnsPolicyCard() {
  const { t } = useI18n();
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <h2 className="flex items-center gap-2 text-base font-bold">
        <RefreshCcw className="h-4 w-4 text-primary" />
        {t("ret.title")}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("ret.text")}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("ret.text2")}</p>
      <Link to="/retours" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
        {t("ret.link")}
      </Link>
    </div>
  );
}

export function CodInfoCard() {
  const { t } = useI18n();
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <h2 className="flex items-center gap-2 text-base font-bold">
        <ShieldCheck className="h-4 w-4 text-success" />
        {t("cod.title")}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">{t("cod.text")}</p>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {[t("cod.p1"), t("cod.p2"), t("cod.p3")].map((line) => (
          <li key={line} className="flex items-start gap-2">
            <PackageCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReturnsPage() {
  const { t } = useI18n();
  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="container-page py-8 lg:py-12">
          <h1 className="text-2xl font-bold sm:text-3xl lg:text-[2.1rem]">{t("ret.title")}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{t("cod.text")}</p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid max-w-4xl gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
            <p className="text-sm leading-relaxed">{t("ret.text")}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t("ret.text2")}</p>
            <a
              href={whatsappLink(t("wa.msg"))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 text-sm font-semibold text-whatsapp-foreground"
            >
              <MessageCircle className="h-4 w-4" />
              {t("ret.contact")}
            </a>
          </div>
          <CodInfoCard />
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <h2 className="text-base font-bold">{t("nav.faq")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("faq.sub")}</p>
            <Link
              to="/faq"
              hash="retours"
              className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
            >
              {t("footer.returns")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
