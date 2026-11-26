import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { usePack } from "@/lib/pack";
import { IPHONE_MODELS, LENS_SKIN_PRICE, type Design } from "@/lib/catalog";
import { lensSkinBySlug } from "@/data/camera-lens-skins";
import { QuickAddButton } from "@/components/QuickAddDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ProductCard({ design, priority = false }: { design: Design; priority?: boolean }) {
  const { t, lang } = useI18n();
  const pack = usePack();
  const [open, setOpen] = useState(false);
  const count = pack.countOf(design.id);
  const lensSkin = lensSkinBySlug(design.slug);

  return (
    <article className="group relative flex h-full flex-col bg-background">
      <Link
        to="/objectifs/$slug"
        params={{ slug: design.slug }}
        aria-label={design.name[lang]}
        className="absolute inset-0 z-[1]"
      />
      <div className="relative aspect-square overflow-hidden bg-background">
        <img
          src={design.image}
          alt={design.name[lang]}
          width={1024}
          height={1024}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 top-0 z-[2] flex items-start justify-end gap-2 p-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t("card.quickview")}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-card/90 text-foreground shadow-soft backdrop-blur transition-colors hover:bg-card"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
        {count > 0 && (
          <span className="absolute bottom-3 end-3 rounded-full bg-success px-2.5 py-1 text-[11px] font-semibold text-success-foreground">
            ×{count}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col items-center gap-0.5 px-1 pt-3 text-center">
        <h3 className="w-full truncate text-sm font-semibold sm:text-base">{design.name[lang]}</h3>
        <p className="text-xs text-muted-foreground">{t("card.compatible")}</p>
        <p className="mt-1 text-sm font-semibold text-foreground">{t("card.included")}</p>

        {lensSkin ? (
          <QuickAddButton product={{ productId: lensSkin.id, slug: lensSkin.slug, category: "lens", name: lensSkin.name, image: lensSkin.image, price: LENS_SKIN_PRICE }} />
        ) : null}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-start">{design.name[lang]}</DialogTitle>
            <DialogDescription className="text-start">{t("card.compatible")}</DialogDescription>
          </DialogHeader>
          <img
            src={design.image}
            alt={design.name[lang]}
            width={1024}
            height={1024}
            loading="lazy"
            className="w-full rounded-xl bg-background object-contain"
          />
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">{design.description[lang]}</p>
            <p className="text-sm font-medium text-accent-foreground">{t("card.included")}</p>
            <Select value={pack.model} onValueChange={pack.setModel}>
              <SelectTrigger className="h-11 rounded-full">
                <SelectValue placeholder={t("col.model")} />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                {IPHONE_MODELS.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">

              <button
                type="button"
                onClick={() => pack.add(design.id)}
                                className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-ink-foreground transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
              >
                {t("card.add")}
              </button>
              <Link
                to="/pack"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 items-center justify-center rounded-full border border-border px-5 text-sm font-semibold transition-colors hover:bg-surface"
              >
                {t("pack.title")}
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}
