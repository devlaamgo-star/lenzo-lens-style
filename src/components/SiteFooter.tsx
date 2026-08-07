import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle, Music2 } from "lucide-react";
import logo from "@/assets/skinup-logo.png";
import { useI18n } from "@/lib/i18n";
import { whatsappLink } from "@/lib/catalog";

export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="mt-8 border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <img src={logo} alt="SKINUP" width={1152} height={576} loading="lazy" className="h-6 w-auto self-start" />
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
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </li>
            <li>
              <a href="mailto:contact@skinup.ma" className="inline-flex items-center gap-2 transition-colors hover:text-primary">
                <Mail className="h-4 w-4" /> contact@skinup.ma
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Instagram className="h-4 w-4" /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Music2 className="h-4 w-4" /> TikTok
              </a>
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
