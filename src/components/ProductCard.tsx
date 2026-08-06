import { Link } from "@tanstack/react-router";
import { Check, Eye, Plus } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { usePack } from "@/lib/pack";
import { IPHONE_MODELS, type Design } from "@/lib/catalog";
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
  const full = pack.isComplete;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="relative aspect-square overflow-hidden bg-surface">
        <img
          src={design.image}
          alt={design.name[lang]}
          width={1024}
          height={1024}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <div className="flex flex-wrap gap-1.5">
            {design.isNew && (
              <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold tracking-wide text-primary-foreground">
                {t("badge.new")}
              </span>
            )}
            {design.isBestseller && (
              <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold tracking-wide text-ink-foreground">
                {t("badge.best")}
              </span>
            )}
          </div>
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

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="truncate text-sm font-semibold sm:text-base">{design.name[lang]}</h3>
        <p className="text-xs text-muted-foreground">{t("card.compatible")}</p>
        <p className="mt-1 text-xs font-medium text-accent-foreground">{t("card.included")}</p>

        <button
          type="button"
          disabled={full && count === 0}
          onClick={() => pack.add(design.id)}
          className={cn(
            "mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors",
            full && count === 0
              ? "cursor-not-allowed bg-muted text-muted-foreground"
              : "bg-ink text-ink-foreground hover:bg-primary",
          )}
        >
          {full && count === 0 ? (
            t("card.full")
          ) : (
            <>
              {count > 0 ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {count > 0 ? t("card.added") : t("card.add")}
            </>
          )}
        </button>
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
            className="w-full rounded-xl bg-surface object-cover"
          />
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">{design.description[lang]}</p>
            <p className="text-sm font-medium text-accent-foreground">{t("card.included")}</p>
            <Select value={pack.model || undefined} onValueChange={pack.setModel}>
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
                disabled={full && count === 0}
                onClick={() => pack.add(design.id)}
                className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-ink-foreground transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
              >
                {full && count === 0 ? t("card.full") : t("card.add")}
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
