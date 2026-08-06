import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { ANIME_SKIN_PRICE, type AnimeSkin } from "@/lib/catalog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function AnimeSkinCard({
  skin,
  priority = false,
}: {
  skin: AnimeSkin;
  priority?: boolean;
}) {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="relative aspect-square overflow-hidden bg-surface">
        <img
          src={skin.image}
          alt={`${skin.name[lang]} — ${t("anime.category")} ${skin.device}`}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          {skin.isNew ? (
            <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold tracking-wide text-primary-foreground">
              {t("badge.new")}
            </span>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t("card.quickview")}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-card/90 text-foreground shadow-soft backdrop-blur transition-colors hover:bg-card"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="truncate text-sm font-semibold sm:text-base">{skin.name[lang]}</h3>
        <p className="text-xs text-muted-foreground">{skin.device}</p>
        <p className="mt-1 text-sm font-bold">{ANIME_SKIN_PRICE} MAD</p>

        <Link
          to="/anime/$slug"
          params={{ slug: skin.slug }}
          className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-full bg-ink text-sm font-semibold text-ink-foreground transition-colors hover:bg-primary"
        >
          {t("skins.viewProduct")}
        </Link>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-start">{skin.name[lang]}</DialogTitle>
            <DialogDescription className="text-start">{t("anime.category")}</DialogDescription>
          </DialogHeader>
          <img
            src={skin.image}
            alt={skin.name[lang]}
            loading="lazy"
            className="max-h-[46vh] w-full rounded-xl bg-surface object-contain p-3"
          />
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">{skin.description[lang]}</p>
            <p className="text-sm">{skin.device}</p>
            <p className="text-base font-bold">{ANIME_SKIN_PRICE} MAD</p>
            <Link
              to="/anime/$slug"
              params={{ slug: skin.slug }}
              onClick={() => setOpen(false)}
              className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-ink-foreground transition-colors hover:bg-primary"
            >
              {t("skins.viewProduct")}
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}
