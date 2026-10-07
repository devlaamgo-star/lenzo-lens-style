import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";

/** Une ligne par groupe complet de 3 stickers caméra, puis les articles hors offre. */
export function BundleLines() {
  const cart = useCart();
  const { t } = useI18n();
  if (cart.bundleGroups === 0) return null;
  return (
    <>
      {cart.bundleGroupList.map((g, i) => (
        <div key={i} className="flex items-center justify-between gap-3 text-success">
          <dt>{t("cart.bundleLine")}</dt>
          <dd className="flex shrink-0 items-center gap-2 font-medium">
            <span className="text-muted-foreground line-through">{g.listTotal} MAD</span>
            <span className="font-bold">{g.total} MAD</span>
          </dd>
        </div>
      ))}
      {cart.bundleRemainder > 0 && (
        <div className="flex items-center justify-between gap-3">
          <dt className="text-muted-foreground">
            {cart.bundleRemainder} × {t("cart.bundleOutside")}
          </dt>
          <dd className="font-medium">{cart.bundleRemainderTotal} MAD</dd>
        </div>
      )}
    </>
  );
}
