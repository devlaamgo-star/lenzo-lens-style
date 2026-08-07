import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { usePack } from "@/lib/pack";


/**
 * Mobile-only sticky action bar. Sits above the WhatsApp button
 * (which is offset by --fab-offset when this bar is present).
 */
export function StickyPackBar() {
  const { t } = useI18n();
  const pack = usePack();

  return (
    <>
      <div className="h-20 lg:hidden" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur lg:hidden">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{pack.breakdown.total} MAD</p>
            <p className="truncate text-xs text-muted-foreground">
              {pack.designs.length} {t("pack.selectedCount")}
              {pack.breakdown.promoApplies ? ` — ${t("pack.promoApplied")}` : ""}
            </p>
          </div>
          <Link
            to="/pack"
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
          >
            {t("sticky.build")}
          </Link>
        </div>
      </div>
      <style>{`@media (max-width: 1023px){ :root { --fab-offset: 4.75rem; } }`}</style>
    </>
  );
}
