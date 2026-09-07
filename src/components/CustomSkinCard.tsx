import { Link } from "@tanstack/react-router";
import { Paintbrush } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import customImage from "@/assets/custom-skin-featured.webp.asset.json";

/** Pinned featured card linking to the /creer-mon-skin customizer. */
export function CustomSkinCard({ priority = false }: { priority?: boolean }) {
  const { t } = useI18n();

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-primary/40 bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <Link to="/creer-mon-skin" aria-label={t("custom.name")} className="absolute inset-0 z-[1]" />
      <div className="relative aspect-square overflow-hidden bg-surface">
        <img
          src={customImage.url}
          alt={`${t("custom.name")} — iPhone 17 Pro Max`}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute right-0 top-0 z-[2] flex items-start justify-end p-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-card/90 text-foreground shadow-soft backdrop-blur">
            <Paintbrush className="h-4 w-4" />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="truncate text-sm font-semibold sm:text-base">{t("custom.name")}</h3>
        <p className="text-xs text-muted-foreground">iPhone 17 Pro Max</p>
        <p className="mt-1 text-sm font-bold">{t("custom.price")}</p>

        <Link
          to="/creer-mon-skin"
          className="relative z-[2] mt-3 inline-flex h-11 w-full items-center justify-center rounded-full bg-ink text-sm font-semibold text-ink-foreground transition-colors hover:bg-primary"
        >
          {t("custom.cta")}
        </Link>
      </div>
    </article>
  );
}
