import { Gift } from "lucide-react";
import { useI18n } from "@/lib/i18n";

/** Single explanation of the camera-skin 3-for-149 offer (mixable designs). */
export function CameraOfferBanner({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();

  if (compact) {
    return (
      <div className="flex w-full items-start gap-2.5 rounded-xl border border-primary/30 bg-primary/5 px-3 py-2.5">
        <Gift className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2} aria-hidden />
        <div className="space-y-0.5">
          <p className="text-sm font-semibold text-foreground">{t("lens.offerTitle")}</p>
          <p className="text-xs leading-relaxed text-muted-foreground">{t("lens.offerHow")}</p>
        </div>
      </div>
    );
  }

  return (
    <aside
      aria-label={t("lens.offerTitle")}
      className="flex flex-col gap-4 rounded-3xl border border-primary/30 bg-primary/5 p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6"
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
        <Gift className="h-6 w-6" strokeWidth={2} aria-hidden />
      </span>
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-foreground sm:text-xl">{t("lens.offerTitle")}</h2>
        <p className="text-sm font-semibold text-primary">{t("lens.offerSub")}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">{t("lens.offerHow")}</p>
      </div>
    </aside>
  );
}
