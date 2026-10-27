import { useCart, type CartItem } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { isBundleEligible, LENS_UNIT_PRICE } from "@/lib/pricing";
import type { Lang } from "@/lib/translations";

const CAT: Record<string, Record<Lang, string>> = {
  lens: { fr: "Sticker caméra", ar: "ستيكر الكاميرا", en: "Camera Skin" },
  air: { fr: "Sticker caméra iPhone Air", ar: "ستيكر كاميرا iPhone Air", en: "iPhone Air Camera Skin" },
  backlens: { fr: "Skin arrière & caméra", ar: "سكين الظهر والكاميرا", en: "Back & Lens Skin" },
  skins: { fr: "Skin", ar: "سكين", en: "Skin" },
  custom: { fr: "Skin personnalisé", ar: "سكين مخصص", en: "Custom Skin" },
};
const L = {
  cameraSub: { fr: "Sous-total stickers caméra", ar: "مجموع ستيكرات الكاميرا", en: "Camera Skins subtotal" },
  discount: { fr: "Réduction offre caméra", ar: "تخفيض عرض الكاميرا", en: "Camera offer discount" },
};

const unit = (i: CartItem) => (isBundleEligible(i.category) ? LENS_UNIT_PRICE : i.price);

/** Liste détaillée de tous les articles + regroupement par type, affichée avant le sous-total. */
export function SummaryItems() {
  const cart = useCart();
  const { t, lang } = useI18n();
  if (cart.items.length === 0) return null;
  const cam = cart.items.filter((i) => i.category === "lens");
  const camQty = cam.reduce((n, i) => n + i.qty, 0);
  const others = new Map<string, { qty: number; total: number; unit: number }>();
  for (const i of cart.items) {
    if (i.category === "lens") continue;
    const k = i.category;
    const g = others.get(k) ?? { qty: 0, total: 0, unit: unit(i) };
    g.qty += i.qty;
    g.total += i.qty * unit(i);
    others.set(k, g);
  }
  return (
    <>
      <div className="space-y-3 border-b border-border pb-3">
        {cart.items.map((i) => (
          <div key={i.key} className="flex items-start justify-between gap-3">
            <dt className="min-w-0">
              <p className="truncate font-medium">{i.name[lang]}</p>
              <p className="text-xs text-muted-foreground">
                {CAT[i.category]?.[lang]} · {i.custom?.modelLabel ?? i.model}
              </p>
            </dt>
            <dd className="shrink-0 text-end text-xs">
              <span className="text-muted-foreground">{i.qty} × {unit(i)} MAD = </span>
              <span className="font-semibold">{i.qty * unit(i)} MAD</span>
            </dd>
          </div>
        ))}
      </div>
      <div className="space-y-2 border-b border-border pb-3">
        {camQty > 0 && (
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted-foreground">{L.cameraSub[lang]}</dt>
            <dd className="font-medium">{camQty} × {LENS_UNIT_PRICE} MAD = {camQty * LENS_UNIT_PRICE} MAD</dd>
          </div>
        )}
        {cart.bundleGroupList.map((g, i) => (
          <div key={i} className="flex items-center justify-between gap-3 text-success">
            <dt>{t(g.category === "air" ? "cart.airBundleLine" : "cart.bundleLine")}</dt>
            <dd className="flex shrink-0 items-center gap-2 font-medium">
              <span className="text-muted-foreground line-through">{g.listTotal} MAD</span>
              <span className="font-bold">{g.total} MAD</span>
            </dd>
          </div>
        ))}
        {cart.bundleGroups > 0 && cart.bundleRemainder > 0 && (
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted-foreground">{cart.bundleRemainder} × {t("cart.bundleOutside")}</dt>
            <dd className="font-medium">{cart.bundleRemainderTotal} MAD</dd>
          </div>
        )}
        {[...others].map(([k, g]) => (
          <div key={k} className="flex items-center justify-between gap-3">
            <dt className="text-muted-foreground">{CAT[k]?.[lang]}</dt>
            <dd className="font-medium">{g.qty} × {g.unit} MAD = {g.total} MAD</dd>
          </div>
        ))}
      </div>
    </>
  );
}

/** Ligne de réduction de l'offre caméra, affichée après le sous-total. */
export function BundleLines() {
  const cart = useCart();
  const { lang } = useI18n();
  if (cart.bundleDiscount <= 0) return null;
  return (
    <div className="flex items-center justify-between text-success">
      <dt>{L.discount[lang]}</dt>
      <dd className="font-semibold">−{cart.bundleDiscount} MAD</dd>
    </div>
  );
}
