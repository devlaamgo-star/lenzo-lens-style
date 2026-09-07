import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle, Music2 } from "lucide-react";
import logo from "@/assets/skinup-logo.png";
import { useI18n } from "@/lib/i18n";
import { whatsappLink, WHATSAPP_DISPLAY_LOCAL } from "@/lib/catalog";
import { toast } from "sonner";

export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="mt-8 border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <img src={logo} alt="SKINUP" width={1152} height={576} loading="lazy" className="mb-3 w-[92px] self-start sm:w-[112px] lg:w-[132px]" />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{t("footer.desc")}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">{t("footer.nav")}</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="transition-colors hover:text-primary">
                {t("nav.home")}
              </Link>
            </li>
            <li>
              <Link to="/collection" className="transition-colors hover:text-primary">
                {t("nav.collection")}
              </Link>
            </li>
            <li>
              <Link to="/pack" className="transition-colors hover:text-primary">
                {t("pack.title")}
              </Link>
            </li>
            <li>
              <Link to="/collection" search={{ filter: "new" }} className="transition-colors hover:text-primary">
                {t("nav.new")}
              </Link>
            </li>
            <li>
              <Link to="/collection" search={{ filter: "best" }} className="transition-colors hover:text-primary">
                {t("nav.best")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">{t("footer.help")}</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link to="/comment-ca-marche" className="transition-colors hover:text-primary">
                {t("nav.how")}
              </Link>
            </li>
            <li>
              <Link to="/creer-mon-skin" className="transition-colors hover:text-primary">
                {t("nav.builder")}
              </Link>
            </li>
            <li>
              <Link to="/design-personnalise" className="transition-colors hover:text-primary">
                {t("nav.custom")}
              </Link>
            </li>
            <li>
              <Link to="/faq" className="transition-colors hover:text-primary">
                {t("nav.faq")}
              </Link>
            </li>
            <li>
              <Link to="/faq" hash="livraison" className="transition-colors hover:text-primary">
                {t("footer.shipping")}
              </Link>
            </li>
            <li>
              <Link to="/retours" className="transition-colors hover:text-primary">
                {t("footer.returns")}
              </Link>
            </li>
            <li>
              <a
                href={whatsappLink(t("wa.msg"))}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                {t("footer.contact")}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">{t("footer.contact")}</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>
              <a
                href={whatsappLink(t("wa.msg"))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" />
                <span dir="ltr">{WHATSAPP_DISPLAY_LOCAL}</span>
              </a>
            </li>
            <li>
              <a href="mailto:contact@skinup.ma" className="inline-flex items-center gap-2 transition-colors hover:text-primary">
                <Mail className="h-4 w-4" /> contact@skinup.ma
              </a>
            </li>
            <li>
              <button
                type="button"
                aria-disabled="true"
                title={t("social.ig.soon")}
                onClick={() => toast(t("social.ig.soon"))}
                className="inline-flex cursor-not-allowed items-center gap-2 text-muted-foreground opacity-70"
              >
                <Instagram className="h-4 w-4" /> Instagram
                <span className="rounded-full border border-border px-2 py-0.5 text-[10px]">{t("social.soon")}</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                aria-disabled="true"
                title={t("social.tt.soon")}
                onClick={() => toast(t("social.tt.soon"))}
                className="inline-flex cursor-not-allowed items-center gap-2 text-muted-foreground opacity-70"
              >
                <Music2 className="h-4 w-4" /> TikTok
                <span className="rounded-full border border-border px-2 py-0.5 text-[10px]">{t("social.soon")}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/faq" className="hover:text-primary">
              {t("footer.terms")}
            </Link>
            <Link to="/faq" className="hover:text-primary">
              {t("footer.privacy")}
            </Link>
            <Link to="/faq" hash="livraison" className="hover:text-primary">
              {t("footer.shipPolicy")}
            </Link>
            <Link to="/retours" className="hover:text-primary">
              {t("footer.returnPolicy")}
            </Link>
          </div>
          <p>{t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
