import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { BACK_LENS_SKINS, backLensSkinBySlug, mergeBackLensProducts } from "../data/back-lens-skins";
import { RETIRED_BACK_LENS_PRODUCTS } from "../data/archive/back-lens-imports";
import { backLensCardThumbnail } from "../data/back-lens-card-thumbnails";
import { ARCHIVED_BACK_LENS_SKINS } from "../data/archive/back-lens-skins";
import { BACK_LENS_SKIN_PRICE, modelsForCategory } from "./catalog";
import { lookupProduct } from "./product-lookup";
import { orderItemImage, snapshotOrderItem, ORDER_ASSET_ORIGIN } from "./order-images";
import manifest from "../../catalog-templates/back-lens-skins/imports/optimized43-20261128/products.json";
import identities from "../../catalog-templates/back-lens-skins/imports/optimized43-20261128/identities.json";

const pointer = (path) => JSON.parse(readFileSync(new URL(`../assets/backlens/optimized43/${path.replace(/^products\//, "")}.asset.json`, import.meta.url), "utf8"));

test("only the 43 manifest products are active, once each and in supplied order", () => {
  expect(BACK_LENS_SKINS).toHaveLength(43);
  expect(BACK_LENS_SKINS.map((p) => p.slug)).toEqual(manifest.products.map((p) => p.slug));
  expect(new Set(BACK_LENS_SKINS.map((p) => p.id)).size).toBe(43);
  expect(new Set(BACK_LENS_SKINS.map((p) => p.slug)).size).toBe(43);
  expect(mergeBackLensProducts(BACK_LENS_SKINS, BACK_LENS_SKINS)).toEqual(BACK_LENS_SKINS);
});

test("all 43 retired imports stay outside listings but retain historical identities and photos", () => {
  expect(RETIRED_BACK_LENS_PRODUCTS).toHaveLength(43);
  for (const old of [...RETIRED_BACK_LENS_PRODUCTS, ...ARCHIVED_BACK_LENS_SKINS]) {
    expect(backLensSkinBySlug(old.slug)).toBeUndefined();
    expect(lookupProduct(old.id)?.image).toBe(old.image);
    expect(lookupProduct(old.id)?.name).toBe(old.name.fr);
    expect(orderItemImage({ productId: old.id })).toBe(ORDER_ASSET_ORIGIN + old.image);
  }
});

test("215 distinct gallery photos and 43 distinct thumbnails never mix", () => {
  expect(BACK_LENS_SKINS.flatMap((p) => p.gallery)).toHaveLength(215);
  expect(new Set(BACK_LENS_SKINS.flatMap((p) => p.gallery)).size).toBe(215);
  expect(new Set(BACK_LENS_SKINS.map((p) => backLensCardThumbnail(p.id).src)).size).toBe(43);
});

test("existing price, currency-relevant totals, phone models and purchasing settings are preserved", () => {
  expect(BACK_LENS_SKIN_PRICE).toBe(129);
  expect(modelsForCategory("backlens")).toEqual(["iPhone 17 Pro", "iPhone 17 Pro Max"]);
  const reference = ARCHIVED_BACK_LENS_SKINS.find((p) => p.slug === "horizon-celeste");
  for (const product of BACK_LENS_SKINS) {
    for (const key of ["description", "category", "device", "inStock", "isNew", "popularity"]) expect(product[key]).toEqual(reference[key]);
  }
});

for (const entry of manifest.products) {
  test(`${entry.slug}: exact name, five ordered 1000px photos, separate 480px card and stable new-order cover`, () => {
    const product = backLensSkinBySlug(entry.slug);
    expect(product.id).toBe(identities[entry.slug]);
    expect(product.displayOrder).toBe(entry.sort_order);
    expect(product.name).toEqual({ fr: entry.name_fr, ar: entry.name_fr, en: entry.name_fr });
    expect(product.gallery).toEqual(entry.gallery.map((g) => pointer(g.path).url));
    expect(product.gallery).toHaveLength(5);
    expect(new Set(product.gallery).size).toBe(5);
    expect(product.image).toBe(pointer(entry.cover).url);
    expect(product.gallery[0]).toBe(product.image);
    const thumb = backLensCardThumbnail(product.id);
    expect(thumb.src).toBe(pointer(entry.thumbnail).url);
    expect(thumb.width).toBe(480);
    expect(thumb.height).toBe(480);
    expect(product.gallery.includes(thumb.src)).toBe(false);
    for (const g of entry.gallery) {
      expect(g.width).toBe(1000);
      expect(g.height).toBe(1000);
      expect(pointer(g.path).size).toBe(g.bytes);
    }
    const line = { productId: product.id, category: "backlens", model: "iPhone 17 Pro", qty: 1, unitPrice: 129, image: product.gallery[3] };
    expect(snapshotOrderItem(line)).toEqual({ ...line, slug: product.slug, image: ORDER_ASSET_ORIGIN + product.image });
  });
}