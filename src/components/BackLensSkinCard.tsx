import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { BACK_LENS_SKIN_PRICE, type BackLensSkin } from "@/lib/catalog";
import { AddToCartBlock } from "@/components/ProductOptions";
import { QuickAddButton } from "@/components/QuickAddDialog";
import { Button } from "@/components/ui/button";
import { BACK_LENS_CARD_SIZES, backLensCardThumbnail } from "@/data/back-lens-card-thumbnails";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function BackLensSkinCard({
  skin,
  priority = false,
}: {
  skin: BackLensSkin;
  priority?: boolean;
}) {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const thumbnail = backLensCardThumbnail(skin.id);

  return (
    <article className="group relative flex h-full flex-col bg-background">
      <Link
        to="/dos-camera/$slug"
        params={{ slug: skin.slug }}
        aria-label={skin.name[lang]}
        className="absolute inset-0 z-[1]"
      />
      <div className="relative aspect-square overflow-hidden bg-card">
        <img
          src={thumbnail?.src ?? skin.image}
          srcSet={thumbnail?.srcSet}
          sizes={thumbnail ? BACK_LENS_CARD_SIZES : undefined}
          width={thumbnail?.width ?? (thumbnail ? 540 : undefined)}
          height={thumbnail?.height ?? (thumbnail ? 648 : undefined)}
          decoding="async"
          alt={`${skin.name[lang]} — ${t("backlens.category")} ${skin.device}`}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-contain object-center"
        />
        <div className="absolute inset-x-0 top-0 z-[2] flex items-start justify-end gap-2 p-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t("card.quickview")}
            className="relative z-[2] grid h-8 w-8 shrink-0 place-items-center rounded-full bg-card/90 text-foreground shadow-soft backdrop-blur transition-colors hover:bg-card"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center gap-0.5 px-1 pt-3 text-center">
        <h3 className="w-full truncate text-sm font-semibold sm:text-base">{skin.name[lang]}</h3>
        <p className="text-xs text-muted-foreground">{skin.device}</p>
        <p className="mt-1 text-sm font-semibold text-foreground">{BACK_LENS_SKIN_PRICE} MAD</p>

        <QuickAddButton product={{ productId: skin.id, slug: skin.slug, category: "backlens", name: skin.name, image: skin.image, price: BACK_LENS_SKIN_PRICE }} />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-start">{skin.name[lang]}</DialogTitle>
            <DialogDescription className="text-start">{t("backlens.category")}</DialogDescription>
          </DialogHeader>
          <img
            src={skin.image}
            alt={skin.name[lang]}
            loading="lazy"
            className="max-h-[46vh] w-full rounded-xl bg-background object-contain"
          />
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">{skin.description[lang]}</p>
            <p className="text-sm">{t("skins.compat")}</p>
            <p className="text-base font-bold">{BACK_LENS_SKIN_PRICE} MAD</p>
            <AddToCartBlock
              compact
              onDone={() => setOpen(false)}
              product={{
                productId: skin.id,
                slug: skin.slug,
                category: "backlens",
                name: skin.name,
                image: skin.image,
                price: BACK_LENS_SKIN_PRICE,
              }}
            />
            <Button asChild className="h-11 rounded-full bg-primary px-5 py-0 text-sm font-semibold text-card shadow-none hover:bg-primary-hover">
            <Link
              to="/dos-camera/$slug"
              params={{ slug: skin.slug }}
              onClick={() => setOpen(false)}
            >
              {t("skins.viewProduct")}
            </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}
