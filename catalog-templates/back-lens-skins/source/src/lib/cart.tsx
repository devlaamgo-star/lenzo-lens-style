import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Lang } from "./translations";
import { metaTrack } from "./meta-pixel";
import { categoryBundles, isBundleEligible, LENS_UNIT_PRICE } from "./pricing";

export type CartCategory = "lens" | "skins" | "backlens" | "air" | "custom";

/** Design personnalisé créé dans le configurateur. */
export type CustomSkinMeta = {
  modelId: string;
  modelLabel: string;
  coverage: "full" | "back" | "camera";
  templateId: string;
  transform: { x: number; y: number; scale: number; rotation: number };
  originalPath: string;
  previewPath: string;
};

export type CartProduct = {
  productId: string;
  slug: string;
  category: CartCategory;
  name: Record<Lang, string>;
  image: string;
  price: number;
  custom?: CustomSkinMeta;
};

export type CartItem = CartProduct & {
  key: string;
  model: string;
  qty: number;
};

type CartValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  /** Remise offre "3 stickers caméra pour 149 MAD" */
  bundleDiscount: number;
  bundleGroups: number;
  bundleListTotal: number;
  bundleTotal: number;
  bundleRemainder: number;
  bundleRemainderTotal: number;
  bundleGroupList: { listTotal: number; total: number; category: "lens" | "air" }[];
  /** Sous-total après remise */
  total: number;
  add: (product: CartProduct, model: string, qty: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  ready: boolean;
};

const CartContext = createContext<CartValue | null>(null);
const KEY = "skinup-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(
            parsed
              .filter((i) => i && i.productId && i.qty >= 1)
              .map((i) => (i.category === "air" ? { ...i, model: "iPhone Air", key: `air:${i.productId}:iPhone Air` } : i)),
          );
      }
    } catch {
      /* ignore malformed storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, ready]);

  const add = useCallback((product: CartProduct, rawModel: string, qty: number) => {
    const model = product.category === "air" ? "iPhone Air" : rawModel;
    const key = `${product.category}:${product.productId}:${model}`;
    const safeQty = Math.max(1, Math.min(20, Math.floor(qty) || 1));
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: Math.min(20, i.qty + safeQty) } : i,
        );
      }
      return [...prev, { ...product, key, model, qty: safeQty }];
    });
    const unit = isBundleEligible(product.category) ? LENS_UNIT_PRICE : product.price;
    metaTrack("AddToCart", {
      content_ids: [product.productId], content_type: "product",
      contents: [{ id: product.productId, quantity: safeQty }],
      value: unit * safeQty, currency: "MAD",
    });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, Math.min(20, qty)) } : i)),
    );
  }, []);

  const remove = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartValue>(() => {
    const subtotal = items.reduce(
      (n, i) => n + i.qty * (isBundleEligible(i.category) ? LENS_UNIT_PRICE : i.price),
      0,
    );
    const bundle = categoryBundles(items.map((i) => ({ ...i, price: isBundleEligible(i.category) ? LENS_UNIT_PRICE : i.price })));
    return {
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal,
      bundleDiscount: bundle.discount,
      bundleGroups: bundle.groups.length,
      bundleGroupList: bundle.groups,
      bundleListTotal: bundle.groups.reduce((s, g) => s + g.listTotal, 0),
      bundleTotal: bundle.groups.reduce((s, g) => s + g.total, 0),
      bundleRemainder: bundle.remainderCount,
      bundleRemainderTotal: bundle.remainderTotal,
      total: subtotal - bundle.discount,
      add,
      setQty,
      remove,
      clear,
      ready,
    };
  }, [items, add, setQty, remove, clear, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

const FALLBACK: CartValue = {
  items: [],
  count: 0,
  subtotal: 0,
  bundleDiscount: 0,
  bundleGroups: 0,
  bundleListTotal: 0,
  bundleTotal: 0,
  bundleRemainder: 0,
  bundleRemainderTotal: 0,
  bundleGroupList: [],
  total: 0,
  add: () => {},
  setQty: () => {},
  remove: () => {},
  clear: () => {},
  ready: false,
};

export function useCart(): CartValue {
  return useContext(CartContext) ?? FALLBACK;
}
