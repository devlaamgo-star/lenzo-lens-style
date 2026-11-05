import { expect, test } from "bun:test";
import * as catalog from "./catalog";
import { archivedBackLensSkinBySlug } from "../data/archive/back-lens-skins";

test("Full Body Skins is not available in the storefront catalog", () => {
  expect("FULL_BODY_SKINS" in catalog).toBe(false);
  expect("skinBySlug" in catalog).toBe(false);
});

test("Other storefront categories remain available", () => {
  expect(catalog.CAMERA_LENS_SKINS.length).toBeGreaterThan(0);
  expect(catalog.IPHONE_AIR_SKINS.length).toBeGreaterThan(0);
});

test("Phone starts a call to the current public number", () => {
  expect(catalog.PHONE_LINK).toBe("tel:+212694728194");
  expect(catalog.WHATSAPP_DISPLAY_INTL).toBe("+212 694-728194");
  expect(catalog.WHATSAPP_DISPLAY_LOCAL).toBe("+212 694-728194");
});

test("WhatsApp conversations use the current public number", () => {
  expect(catalog.WHATSAPP_NUMBER).toBe("212694728194");
  expect(catalog.whatsappLink("Bonjour")).toBe("https://wa.me/212694728194?text=Bonjour");
});

test("Public email uses the requested inbox", () => {
  expect(catalog.CONTACT_EMAIL).toBe("skinup.ma@gmail.com");
});

test("Instagram uses the direct SKINUP profile", () => {
  expect(catalog.INSTAGRAM_LINK).toBe("https://www.instagram.com/skinup.ma/");
});

test("TikTok uses the direct SKINUP profile", () => {
  expect(catalog.TIKTOK_LINK).toBe("https://www.tiktok.com/@skinup.ma");
});

test("Every Journey belongs to Skin arrière & caméra", () => {
  expect(archivedBackLensSkinBySlug("every-journey")?.category).toBe("back-and-lens-skins");
});

test("Every Journey uses the existing 129 MAD back and camera price", () => {
  const product = archivedBackLensSkinBySlug("every-journey");
  expect(product).toBeDefined();
  expect(catalog.BACK_LENS_SKIN_PRICE).toBe(129);
});

test("Every Journey is compatible with iPhone 17 Pro Max", () => {
  expect(archivedBackLensSkinBySlug("every-journey")?.device).toBe("iPhone 17 Pro Max");
});

test("Every Journey is in stock", () => {
  expect(archivedBackLensSkinBySlug("every-journey")?.inStock).toBe(true);
});