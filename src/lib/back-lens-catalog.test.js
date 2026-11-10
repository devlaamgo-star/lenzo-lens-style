import { expect, test } from "bun:test";
import { BACK_LENS_SKINS, backLensSkinBySlug, mergeBackLensProducts } from "../data/back-lens-skins";
import manifest from "../../catalog-templates/back-lens-skins/imports/organized-2026-11/catalog.json";
import batch02Manifest from "../../catalog-templates/back-lens-skins/imports/batch02/catalog.json";
import { ORGANIZED_BACK_LENS_PRODUCTS } from "../data/organized-back-lens-products";
import { BATCH02_BACK_LENS_PRODUCTS } from "../data/batch02-back-lens-products";
import { BATCH03_BACK_LENS_PRODUCTS, BATCH03_DESCRIPTION } from "../data/batch03-back-lens-products";
import batch03Manifest from "../../catalog-templates/back-lens-skins/imports/batch03/catalog.json";
import { BATCH04_BACK_LENS_PRODUCTS, BATCH04_PACK_NOTE } from "../data/batch04-back-lens-products";
import batch04Manifest from "../../catalog-templates/back-lens-skins/imports/batch04/catalog.json";
import { CAMERA_LENS_SKINS } from "../data/camera-lens-skins";
import { BACK_LENS_SKIN_PRICE, modelsForCategory } from "./catalog";
import { readFileSync } from "node:fs";
import { ARCHIVED_BACK_LENS_SKINS } from "../data/archive/back-lens-skins";
import { createBackLensProduct } from "../data/back-lens-product-template";
import { lookupProduct } from "./product-lookup";

test("All 30 archived designs remain absent from active listings and slug lookup", () => {
  expect(ARCHIVED_BACK_LENS_SKINS).toHaveLength(30);
  for (const product of ARCHIVED_BACK_LENS_SKINS) {
    expect(backLensSkinBySlug(product.slug)).toBeUndefined();
  }
});

test("Historical orders retain every original product name, image and identifier", () => {
  for (const product of ARCHIVED_BACK_LENS_SKINS) {
    const expected = { id: product.id, slug: product.slug, name: product.name.fr, image: product.image, categoryLabel: "Skins arrière & caméra" };
    expect(lookupProduct(product.id)).toEqual(expected);
    expect(lookupProduct(product.slug)).toEqual(expected);
  }
});

test("Reusable template replaces only supplied design-specific fields", () => {
  const reference = ARCHIVED_BACK_LENS_SKINS.find((skin) => skin.slug === "horizon-celeste");
  expect(reference).toBeDefined();
  const design = { slug: "template-test-only", name: { fr: "Test FR", ar: "Test AR", en: "Test EN" }, image: "test-image", gallery: ["test-image", "test-detail"] };
  const product = createBackLensProduct(design);
  expect(product).toEqual({ ...reference, ...design, id: "backlens-template-test-only" });
});

test("Exactly 22 ready entries preserve original numbering; 17 and 23 remain pending", () => {
  expect(ORGANIZED_BACK_LENS_PRODUCTS).toHaveLength(22);
  expect(ORGANIZED_BACK_LENS_PRODUCTS.map((p) => p.sourceProductNumber)).toEqual([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,18,19,20,21,22,24]);
  expect(ORGANIZED_BACK_LENS_PRODUCTS.some((p) => [17,23].includes(p.sourceProductNumber))).toBe(false);
});

for (const entry of manifest.products.filter((p) => p.import_status === "ready")) {
  test(`Product ${entry.source_product_number}: exact manifest mapping and inherited setup`, () => {
    const product = backLensSkinBySlug(entry.slug);
    const reference = ARCHIVED_BACK_LENS_SKINS.find((p) => p.slug === "horizon-celeste");
    expect(product).toBeDefined();
    expect(product.id).toBe(entry.external_reference);
    expect(product.externalReference).toBe(entry.external_reference);
    expect(product.displayOrder).toBe(entry.display_order);
    expect(product.name).toEqual({ fr: entry.name, ar: entry.name, en: entry.name });
    expect(product.gallery).toHaveLength(2);
    expect(product.image).toBe(product.gallery[0]);
    expect(product.gallery[1]).not.toBe(product.image);
    const pointer = (role) => JSON.parse(readFileSync(new URL(`../assets/backlens/organized-2026-11/product-${String(entry.source_product_number).padStart(2, "0")}-${role}.png.asset.json`, import.meta.url), "utf8")).url;
    expect(product.gallery).toEqual([pointer("main"), pointer("gallery")]);
    expect(product.description).toEqual(reference.description);
    expect(product.category).toBe("back-and-lens-skins");
    expect(product.device).toBe(reference.device);
    expect(product.inStock).toBe(reference.inStock);
    expect(BACK_LENS_SKIN_PRICE).toBe(129);
    expect(modelsForCategory("backlens")).toEqual(["iPhone 17 Pro", "iPhone 17 Pro Max"]);
    expect(lookupProduct(product.id)?.name).toBe(entry.name);
  });
}

test("Repeated imports update by external reference and preserve unrelated products", () => {
  const first = BACK_LENS_SKINS[0];
  const existing = { ...first, id: "existing-product", slug: "existing-product", externalReference: "existing-product" };
  const updated = { ...first, name: { fr: "Updated", ar: "Updated", en: "Updated" } };
  const result = mergeBackLensProducts([existing, ...BACK_LENS_SKINS], [updated]);
  expect(result).toHaveLength(BACK_LENS_SKINS.length + 1);
  expect(result[0]).toEqual(existing);
  expect(result.find((p) => p.externalReference === first.externalReference)).toEqual(updated);
});

test("Batch 02 appends eight products without replacing Batch 01 local numbers", () => {
  expect(BATCH02_BACK_LENS_PRODUCTS).toHaveLength(8);
  expect(BACK_LENS_SKINS.slice(0, 22)).toEqual(ORGANIZED_BACK_LENS_PRODUCTS);
  expect(BACK_LENS_SKINS.slice(22, 30)).toEqual(BATCH02_BACK_LENS_PRODUCTS);
  expect(BATCH02_BACK_LENS_PRODUCTS.map((p) => p.sourceProductNumber)).toEqual([1,2,3,4,5,6,7,8]);
  expect(new Set(BACK_LENS_SKINS.map((p) => p.id)).size).toBe(BACK_LENS_SKINS.length);
  expect(new Set(BACK_LENS_SKINS.map((p) => p.slug)).size).toBe(BACK_LENS_SKINS.length);
  expect(mergeBackLensProducts(BACK_LENS_SKINS, BATCH02_BACK_LENS_PRODUCTS)).toEqual(BACK_LENS_SKINS);
});

for (const entry of batch02Manifest.products) {
  test(`Batch 02 product ${entry.source_product_number}: exact identity, gallery order and inherited configuration`, () => {
    const product = backLensSkinBySlug(entry.slug);
    const reference = ARCHIVED_BACK_LENS_SKINS.find((p) => p.slug === "horizon-celeste");
    const pointer = (role) => JSON.parse(readFileSync(new URL(`../assets/backlens/batch02/batch02-product-${String(entry.source_product_number).padStart(2, "0")}-${role}.png.asset.json`, import.meta.url), "utf8")).url;
    expect(product).toEqual({
      ...reference,
      id: entry.external_reference,
      externalReference: entry.external_reference,
      sourceProductNumber: entry.source_product_number,
      displayOrder: entry.suggested_catalog_position,
      slug: entry.slug,
      name: { fr: entry.name, ar: entry.name, en: entry.name },
      image: pointer("main"),
      gallery: [pointer("main"), pointer("gallery")],
    });
    expect(BACK_LENS_SKIN_PRICE).toBe(129);
    expect(modelsForCategory("backlens")).toEqual(["iPhone 17 Pro", "iPhone 17 Pro Max"]);
    expect(lookupProduct(entry.external_reference)?.name).toBe(entry.name);
  });
}
test("Batch 03 appends exactly nine packs (folders 1-9) after Batch 02", () => {
  expect(BATCH03_BACK_LENS_PRODUCTS).toHaveLength(9);
  expect(BACK_LENS_SKINS.slice(30, 39)).toEqual(BATCH03_BACK_LENS_PRODUCTS);
  expect(BATCH03_BACK_LENS_PRODUCTS.map((p) => p.name.fr)).toEqual([
    "Friends", "Bear Coffee Sunset", "Naruto", "Chat Noir", "Tanjiro", "Tapis Oriental", "Itachi", "Café Latte", "Obito",
  ]);
  expect(mergeBackLensProducts(BACK_LENS_SKINS, BATCH03_BACK_LENS_PRODUCTS)).toEqual(BACK_LENS_SKINS);
});

test("Batch 03 packs stay out of the camera-only category", () => {
  const ids = new Set(BATCH03_BACK_LENS_PRODUCTS.map((p) => p.id));
  const slugs = new Set(BATCH03_BACK_LENS_PRODUCTS.map((p) => p.slug));
  expect(CAMERA_LENS_SKINS.some((p) => ids.has(p.id) || slugs.has(p.slug))).toBe(false);
});

for (const entry of batch03Manifest.products) {
  test(`Batch 03 product ${entry.source_product_number}: single-phone main, three-color second, pack description`, () => {
    const product = backLensSkinBySlug(entry.slug);
    const reference = ARCHIVED_BACK_LENS_SKINS.find((p) => p.slug === "horizon-celeste");
    const pointer = (role) => JSON.parse(readFileSync(new URL(`../assets/backlens/batch03/batch03-product-${String(entry.source_product_number).padStart(2, "0")}-${role}.webp.asset.json`, import.meta.url), "utf8")).url;
    expect(product).toEqual({
      ...reference,
      id: entry.external_reference,
      externalReference: entry.external_reference,
      sourceProductNumber: entry.source_product_number,
      displayOrder: entry.display_order,
      slug: entry.slug,
      name: { fr: entry.name, ar: entry.name, en: entry.name },
      description: BATCH03_DESCRIPTION,
      image: pointer("main"),
      gallery: [pointer("main"), pointer("gallery")],
    });
    expect(product.description.fr).toContain("skin pour le module caméra");
    expect(product.description.fr).toContain("skin arrière");
    expect(product.description.fr).toContain("Téléphone non inclus");
    expect(BACK_LENS_SKIN_PRICE).toBe(129);
    expect(modelsForCategory("backlens")).toEqual(["iPhone 17 Pro", "iPhone 17 Pro Max"]);
    expect(lookupProduct(entry.external_reference)?.name).toBe(entry.name);
  });
}

test("Batch 04 appends exactly four packs (folders 1-4) after Batch 03", () => {
  expect(BATCH04_BACK_LENS_PRODUCTS).toHaveLength(4);
  expect(BACK_LENS_SKINS).toHaveLength(43);
  expect(BACK_LENS_SKINS.slice(39)).toEqual(BATCH04_BACK_LENS_PRODUCTS);
  expect(BATCH04_BACK_LENS_PRODUCTS.map((p) => p.name.fr)).toEqual([
    "Amazigh Khamsa", "Moroccan Kingdom Gold", "Moroccan Kingdom Vintage", "Moroccan Royal Crest",
  ]);
  expect(new Set(BACK_LENS_SKINS.map((p) => p.slug)).size).toBe(BACK_LENS_SKINS.length);
  expect(mergeBackLensProducts(BACK_LENS_SKINS, BATCH04_BACK_LENS_PRODUCTS)).toEqual(BACK_LENS_SKINS);
});

test("Batch 04 packs stay out of the camera-only category", () => {
  const ids = new Set(BATCH04_BACK_LENS_PRODUCTS.map((p) => p.id));
  const slugs = new Set(BATCH04_BACK_LENS_PRODUCTS.map((p) => p.slug));
  expect(CAMERA_LENS_SKINS.some((p) => ids.has(p.id) || slugs.has(p.slug))).toBe(false);
});

for (const entry of batch04Manifest.products) {
  test(`Batch 04 product ${entry.source_product_number}: 1.webp main, 2.webp second, exact pack sentence`, () => {
    const product = backLensSkinBySlug(entry.slug);
    const reference = ARCHIVED_BACK_LENS_SKINS.find((p) => p.slug === "horizon-celeste");
    const pointer = (role) => JSON.parse(readFileSync(new URL(`../assets/backlens/batch04/batch04-product-${String(entry.source_product_number).padStart(2, "0")}-${role}.webp.asset.json`, import.meta.url), "utf8"));
    expect(product).toEqual({
      ...reference,
      id: entry.external_reference,
      externalReference: entry.external_reference,
      sourceProductNumber: entry.source_product_number,
      displayOrder: entry.display_order,
      slug: entry.slug,
      name: { fr: entry.name, ar: entry.name, en: entry.name },
      description: product.description,
      image: pointer("main").url,
      gallery: [pointer("main").url, pointer("gallery").url],
    });
    expect(pointer("main").size).toBeGreaterThan(0);
    expect(entry.main_image.source).toBe(`${entry.source_folder}/1.webp`);
    expect(entry.gallery_image.source).toBe(`${entry.source_folder}/2.webp`);
    expect(product.description.fr.endsWith(" Pack comprenant un skin dos + un skin pour le module caméra. Téléphone non inclus.")).toBe(true);
    expect(product.description.fr.length).toBeGreaterThan(BATCH04_PACK_NOTE.fr.length + 20);
    expect(BACK_LENS_SKIN_PRICE).toBe(129);
    expect(modelsForCategory("backlens")).toEqual(["iPhone 17 Pro", "iPhone 17 Pro Max"]);
    expect(lookupProduct(entry.external_reference)?.name).toBe(entry.name);
  });
}
