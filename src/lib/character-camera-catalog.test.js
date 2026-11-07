import { expect, test } from "bun:test";
import { CAMERA_LENS_SKINS, LENS_SKIN_PRICE, modelsForCategory } from "./catalog";
import { BACK_LENS_SKINS } from "@/data/back-lens-skins";
import { lookupProduct } from "./product-lookup";

const NOTE = "Skin pour le module caméra uniquement. Téléphone et skin arrière non inclus.";

const designs = {
  "spider-man-keffieh": ["spider-man-keffieh-orange.png"],
  "naruto-curieux": ["naruto-curieux-orange.png"],
  "nezuko-rose": ["nezuko-rose-orange.png"],
  "pepe-blase": ["pepe-blase-orange.png", "pepe-blase-argent.png", "pepe-blase-bleu-nuit.png"],
  "shin-chan-cache": ["shin-chan-cache-bleu-nuit.png"],
  "hinata-timide": ["hinata-timide-bleu-nuit.png"],
};

for (const [slug, files] of Object.entries(designs)) {
  test(`${slug} is one camera-only product with every supplied color photo`, () => {
    const matches = CAMERA_LENS_SKINS.filter((skin) => skin.slug === slug);
    expect(matches).toHaveLength(1);
    const skin = matches[0];
    expect(skin.category).toBe("camera-lens-skins");
    expect(skin.gallery.map((url) => url.split("/").pop())).toEqual(files);
    expect(skin.image).toBe(skin.gallery[0]);
    expect(skin.imagePresentation).toBe("full-phone");
    expect(skin.scopeNote.fr).toBe(NOTE);
    expect(lookupProduct(skin.id)?.image).toBe(skin.image);
  });
}

test("the frog artwork on three phone colors stays a single product", () => {
  expect(CAMERA_LENS_SKINS.filter((skin) => skin.gallery.some((url) => url.includes("pepe-blase")))).toHaveLength(1);
});

test("character designs are never added to back & lens skins", () => {
  const all = JSON.stringify(BACK_LENS_SKINS);
  for (const slug of Object.keys(designs)) expect(all).not.toContain(slug);
});

test("character designs reuse the camera price and models", () => {
  expect(LENS_SKIN_PRICE).toBe(79);
  expect(modelsForCategory("lens")).toEqual(["iPhone 17 Pro", "iPhone 17 Pro Max"]);
});
