import { createBackLensProduct } from "./back-lens-product-template";
import product01Main from "@/assets/backlens/batch03/batch03-product-01-main.webp.asset.json";
import product01Gallery from "@/assets/backlens/batch03/batch03-product-01-gallery.webp.asset.json";
import product02Main from "@/assets/backlens/batch03/batch03-product-02-main.webp.asset.json";
import product02Gallery from "@/assets/backlens/batch03/batch03-product-02-gallery.webp.asset.json";
import product03Main from "@/assets/backlens/batch03/batch03-product-03-main.webp.asset.json";
import product03Gallery from "@/assets/backlens/batch03/batch03-product-03-gallery.webp.asset.json";
import product04Main from "@/assets/backlens/batch03/batch03-product-04-main.webp.asset.json";
import product04Gallery from "@/assets/backlens/batch03/batch03-product-04-gallery.webp.asset.json";
import product05Main from "@/assets/backlens/batch03/batch03-product-05-main.webp.asset.json";
import product05Gallery from "@/assets/backlens/batch03/batch03-product-05-gallery.webp.asset.json";
import product06Main from "@/assets/backlens/batch03/batch03-product-06-main.webp.asset.json";
import product06Gallery from "@/assets/backlens/batch03/batch03-product-06-gallery.webp.asset.json";
import product07Main from "@/assets/backlens/batch03/batch03-product-07-main.webp.asset.json";
import product07Gallery from "@/assets/backlens/batch03/batch03-product-07-gallery.webp.asset.json";
import product08Main from "@/assets/backlens/batch03/batch03-product-08-main.webp.asset.json";
import product08Gallery from "@/assets/backlens/batch03/batch03-product-08-gallery.webp.asset.json";
import product09Main from "@/assets/backlens/batch03/batch03-product-09-main.webp.asset.json";
import product09Gallery from "@/assets/backlens/batch03/batch03-product-09-gallery.webp.asset.json";

/** User-requested pack description: one camera skin + one matching back skin, phone not included. */
export const BATCH03_DESCRIPTION = {
  fr: "Pack assorti : un skin pour le module caméra et un skin arrière au même design, avec découpes précises autour des objectifs, du flash et des capteurs. Téléphone non inclus.",
  ar: "باك متناسق: سكين لوحدة الكاميرا وسكين خلفي بنفس التصميم، بقصّات دقيقة حول العدسات والفلاش والمستشعرات. الهاتف غير مرفق.",
  en: "Matching pack: one camera-module skin and one back skin in the same design, with precise cutouts around the lenses, flash and sensors. Phone not included.",
};

/** Batch 03 (folders 1-9): batch-local numbers never replace products from previous imports. */
export const BATCH03_BACK_LENS_PRODUCTS = [
  createBackLensProduct({
    id: "skinup-backlens-batch03-01",
    externalReference: "skinup-backlens-batch03-01",
    sourceProductNumber: 1,
    displayOrder: 33,
    slug: "back-lens-batch03-friends",
    name: { fr: "Friends", ar: "Friends", en: "Friends" },
    description: BATCH03_DESCRIPTION,
    image: product01Main.url,
    gallery: [product01Main.url, product01Gallery.url],
  }),
  createBackLensProduct({
    id: "skinup-backlens-batch03-02",
    externalReference: "skinup-backlens-batch03-02",
    sourceProductNumber: 2,
    displayOrder: 34,
    slug: "back-lens-batch03-bear-coffee-sunset",
    name: { fr: "Bear Coffee Sunset", ar: "Bear Coffee Sunset", en: "Bear Coffee Sunset" },
    description: BATCH03_DESCRIPTION,
    image: product02Main.url,
    gallery: [product02Main.url, product02Gallery.url],
  }),
  createBackLensProduct({
    id: "skinup-backlens-batch03-03",
    externalReference: "skinup-backlens-batch03-03",
    sourceProductNumber: 3,
    displayOrder: 35,
    slug: "back-lens-batch03-naruto",
    name: { fr: "Naruto", ar: "Naruto", en: "Naruto" },
    description: BATCH03_DESCRIPTION,
    image: product03Main.url,
    gallery: [product03Main.url, product03Gallery.url],
  }),
  createBackLensProduct({
    id: "skinup-backlens-batch03-04",
    externalReference: "skinup-backlens-batch03-04",
    sourceProductNumber: 4,
    displayOrder: 36,
    slug: "back-lens-batch03-chat-noir",
    name: { fr: "Chat Noir", ar: "Chat Noir", en: "Chat Noir" },
    description: BATCH03_DESCRIPTION,
    image: product04Main.url,
    gallery: [product04Main.url, product04Gallery.url],
  }),
  createBackLensProduct({
    id: "skinup-backlens-batch03-05",
    externalReference: "skinup-backlens-batch03-05",
    sourceProductNumber: 5,
    displayOrder: 37,
    slug: "back-lens-batch03-tanjiro",
    name: { fr: "Tanjiro", ar: "Tanjiro", en: "Tanjiro" },
    description: BATCH03_DESCRIPTION,
    image: product05Main.url,
    gallery: [product05Main.url, product05Gallery.url],
  }),
  createBackLensProduct({
    id: "skinup-backlens-batch03-06",
    externalReference: "skinup-backlens-batch03-06",
    sourceProductNumber: 6,
    displayOrder: 38,
    slug: "back-lens-batch03-tapis-oriental",
    name: { fr: "Tapis Oriental", ar: "Tapis Oriental", en: "Tapis Oriental" },
    description: BATCH03_DESCRIPTION,
    image: product06Main.url,
    gallery: [product06Main.url, product06Gallery.url],
  }),
  createBackLensProduct({
    id: "skinup-backlens-batch03-07",
    externalReference: "skinup-backlens-batch03-07",
    sourceProductNumber: 7,
    displayOrder: 39,
    slug: "back-lens-batch03-itachi",
    name: { fr: "Itachi", ar: "Itachi", en: "Itachi" },
    description: BATCH03_DESCRIPTION,
    image: product07Main.url,
    gallery: [product07Main.url, product07Gallery.url],
  }),
  createBackLensProduct({
    id: "skinup-backlens-batch03-08",
    externalReference: "skinup-backlens-batch03-08",
    sourceProductNumber: 8,
    displayOrder: 40,
    slug: "back-lens-batch03-cafe-latte",
    name: { fr: "Café Latte", ar: "Café Latte", en: "Café Latte" },
    description: BATCH03_DESCRIPTION,
    image: product08Main.url,
    gallery: [product08Main.url, product08Gallery.url],
  }),
  createBackLensProduct({
    id: "skinup-backlens-batch03-09",
    externalReference: "skinup-backlens-batch03-09",
    sourceProductNumber: 9,
    displayOrder: 41,
    slug: "back-lens-batch03-obito",
    name: { fr: "Obito", ar: "Obito", en: "Obito" },
    description: BATCH03_DESCRIPTION,
    image: product09Main.url,
    gallery: [product09Main.url, product09Gallery.url],
  }),
];
