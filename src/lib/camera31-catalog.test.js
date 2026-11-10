import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { CAMERA_LENS_SKINS, LENS_SKIN_PRICE, modelsForCategory } from "./catalog";
import { BACK_LENS_SKINS } from "@/data/back-lens-skins";
import { IPHONE_AIR_SKINS } from "@/data/iphone-air-skins";
import { lookupProduct } from "./product-lookup";
import { packBreakdown } from "./pricing";

const manifest = JSON.parse(readFileSync(new URL("../../catalog-templates/camera-lens-skins/imports/camera31/products.json", import.meta.url), "utf8"));
const NOTE = "Skin pour la zone caméra uniquement. Téléphone et coque non inclus.";

test("the manifest lists exactly 31 camera-only products", () => {
  expect(manifest).toHaveLength(31);
  expect(new Set(manifest.map((p) => p.image)).size).toBe(31);
});

for (const item of manifest) {
  test(`${item.name} is one camera-only product with its own supplied photo`, () => {
    const matches = CAMERA_LENS_SKINS.filter((s) => s.slug === item.slug);
    expect(matches).toHaveLength(1);
    const skin = matches[0];
    expect(skin.name.fr).toBe(item.name);
    expect(skin.image).toEndWith(`/${item.image}`);
    expect(skin.gallery).toEqual([skin.image]);
    expect(skin.category).toBe("camera-lens-skins");
    expect(skin.imagePresentation).toBe("full-phone");
    expect(skin.scopeNote.fr).toBe(NOTE);
    expect(lookupProduct(skin.id)?.image).toBe(skin.image);
    expect(lookupProduct(skin.slug)?.categoryLabel).toBe("Stickers caméra");
  });
}

test("each supplied photo is used by exactly one camera product", () => {
  for (const item of manifest) {
    expect(CAMERA_LENS_SKINS.filter((s) => s.gallery.some((u) => u.endsWith(`/${item.image}`)))).toHaveLength(1);
  }
});

test("existing camera products stay first and in order", () => {
  expect(CAMERA_LENS_SKINS).toHaveLength(107);
  expect(CAMERA_LENS_SKINS[0].slug).toBe("horizon-ambre");
  expect(CAMERA_LENS_SKINS[75].slug).toBe("hinata-timide");
  expect(CAMERA_LENS_SKINS[76].slug).toBe("dreamy-puppy");
  expect(CAMERA_LENS_SKINS[106].slug).toBe("ghost-cat");
});

test("the 31 designs never appear in back-skin or iPhone Air categories", () => {
  const other = JSON.stringify([...BACK_LENS_SKINS, ...IPHONE_AIR_SKINS]);
  for (const item of manifest) expect(other).not.toContain(item.image);
});

test("they inherit the 79 MAD camera price and existing model options", () => {
  expect(LENS_SKIN_PRICE).toBe(79);
  expect(modelsForCategory("lens")).toEqual(["iPhone 17 Pro", "iPhone 17 Pro Max"]);
});
