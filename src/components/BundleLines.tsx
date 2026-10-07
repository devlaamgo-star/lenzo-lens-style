import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/lang";
import { LENS_UNIT_PRICE, PACK_TOTAL, PACK_PROMO_SIZE } from "@/lib/pricing";

/** Une ligne par groupe complet de 3 stickers caméra, puis les articles hors offre. */
export function BundleLines() {
  const cart = useCart();
  const { t } = useLang();
  if (cart.bundleGroups === 0) return null;
  return (
    <>
      {Array.from({ length: cart.bundleGroups }, (_, i) => (
        <div key={i} className="flex items-center justify-between gap-3 text-success">
          <dt>{t("cart.bundleLine")}</dt>
          <dd className="flex shrink-0 items-center gap-2 font-medium">
            <span className="text-muted-foreground line-through">{PACK_PROMO_SIZE * LENS_UNIT_PRICE} MAD</span>
            <span className="font-bold">{PACK_TOTAL} MAD</span>
          </dd>
        </div>
      ))}
      {cart.bundleRemainder > 0 && (
        <div className="flex items-center justify-between gap-3">
          <dt className="text-muted-foreground">
            {cart.bundleRemainder} × {t("cart.bundleOutside")}
          </dt>
          <dd className="font-medium">{cart.bundleRemainder * LENS_UNIT_PRICE} MAD</dd>
        </div>
      )}
    </>
  );
}
