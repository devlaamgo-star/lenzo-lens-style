import { expect, test } from "bun:test";
import { backLensCardThumbnail } from "../data/back-lens-card-thumbnails";
import { backLensSkinBySlug } from "../data/back-lens-skins";

const HOMEPAGE_TRIO = ["back-lens-little-yellow-duck", "back-lens-levi-s-resolve", "back-lens-pirate-wanted-posters"];

test("Homepage trio cards use 360/540/720 WebP thumbnails", () => {
  for (const slug of HOMEPAGE_TRIO) {
    const skin = backLensSkinBySlug(slug);
    const thumb = backLensCardThumbnail(skin.id);
    expect(thumb).toBeDefined();
    expect(thumb.src.endsWith("-card-540.webp")).toBe(true);
    expect(thumb.srcSet.split(", ").map((s) => s.split(" ")[1])).toEqual(["360w", "540w", "720w"]);
    expect(thumb.srcSet.split(", ").every((s) => s.split(" ")[0].endsWith(".webp"))).toBe(true);
  }
});

test("Product pages keep the full-resolution original PNGs", () => {
  for (const slug of HOMEPAGE_TRIO) {
    const skin = backLensSkinBySlug(slug);
    expect(skin.image.endsWith("-main.png")).toBe(true);
    expect(skin.gallery[0]).toBe(skin.image);
    expect(skin.gallery[1].endsWith("-gallery.png")).toBe(true);
  }
});

test("Other designs keep their original card image", () => {
  expect(backLensCardThumbnail("skinup-backlens-04")).toBeUndefined();
});
