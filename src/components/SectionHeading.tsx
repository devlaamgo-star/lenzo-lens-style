import { useI18n } from "@/lib/i18n";
import type { TKey } from "@/lib/translations";

export function SectionHeading({
  title,
  subtitle,
  align = "center",
}: {
  title: TKey;
  subtitle?: TKey;
  align?: "center" | "start";
}) {
  const { t } = useI18n();
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-start"}>
      <h2 className="text-2xl font-bold sm:text-3xl lg:text-[2.1rem]">{t(title)}</h2>
      {subtitle && <p className="mt-3 text-sm text-muted-foreground sm:text-base">{t(subtitle)}</p>}
    </div>
  );
}
