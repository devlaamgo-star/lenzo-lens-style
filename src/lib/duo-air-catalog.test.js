import { expect, test } from "bun:test";
import manifest from "../../catalog-templates/iphone-air-skins/imports/duo-air-20261127/products.json";
import { DUO_AIR_SKINS } from "../data/iphone-air-duo-batch";
import { IPHONE_AIR_SKINS } from "../data/iphone-air-skins";
import { CAMERA72_SKINS } from "../data/camera-lens-batch72";
import { modelsForCategory } from "./catalog";
import { CATEGORY_PRICES } from "./pricing";

test("imports exactly the 55 supplied Duo / Air products in sort order, Route d’Automne first", () => {
  expect(DUO_AIR_SKINS.length).toBe(55);
  expect(DUO_AIR_SKINS[0].name.fr).toBe("Route d’Automne");
  expect(DUO_AIR_SKINS.map((p) => p.sortOrder)).toEqual(manifest.products.map((p) => p.sort_order).sort((a, b) => a - b));
  expect(new Set(DUO_AIR_SKINS.map((p) => p.id)).size).toBe(55);
});

test("each product keeps its own cover first and its own 437 gallery photos in order", () => {
  const byKey = Object.fromEntries(manifest.products.map((p) => [p.import_key, p]));
  let total = 0;
  const all = new Set();
  for (const s of DUO_AIR_SKINS) {
    const m = byKey[s.importKey];
    expect(s.gallery.length).toBe(m.images.length);
    expect(s.image).toBe(s.gallery[0]);
    for (const g of s.gallery) { expect(all.has(g)).toBe(false); all.add(g); }
    total += s.gallery.length;
  }
  expect(total).toBe(437);
});

test("previous Air designs and 72 camera designs remain; Air pricing and model unchanged", () => {
  expect(IPHONE_AIR_SKINS.length).toBe(65);
  expect(IPHONE_AIR_SKINS.slice(55).map((s) => s.slug)[0]).toBe("air-couchant");
  expect(CAMERA72_SKINS.length).toBe(72);
  expect(CATEGORY_PRICES.air).toBe(79);
  expect([...modelsForCategory("air")]).toEqual(["iPhone Air"]);
});
