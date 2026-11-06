import { createBackLensProduct } from "./back-lens-product-template";
import product01Main from "@/assets/backlens/batch02/batch02-product-01-main.png.asset.json";
import product01Gallery from "@/assets/backlens/batch02/batch02-product-01-gallery.png.asset.json";
import product02Main from "@/assets/backlens/batch02/batch02-product-02-main.png.asset.json";
import product02Gallery from "@/assets/backlens/batch02/batch02-product-02-gallery.png.asset.json";
import product03Main from "@/assets/backlens/batch02/batch02-product-03-main.png.asset.json";
import product03Gallery from "@/assets/backlens/batch02/batch02-product-03-gallery.png.asset.json";
import product04Main from "@/assets/backlens/batch02/batch02-product-04-main.png.asset.json";
import product04Gallery from "@/assets/backlens/batch02/batch02-product-04-gallery.png.asset.json";
import product05Main from "@/assets/backlens/batch02/batch02-product-05-main.png.asset.json";
import product05Gallery from "@/assets/backlens/batch02/batch02-product-05-gallery.png.asset.json";
import product06Main from "@/assets/backlens/batch02/batch02-product-06-main.png.asset.json";
import product06Gallery from "@/assets/backlens/batch02/batch02-product-06-gallery.png.asset.json";
import product07Main from "@/assets/backlens/batch02/batch02-product-07-main.png.asset.json";
import product07Gallery from "@/assets/backlens/batch02/batch02-product-07-gallery.png.asset.json";
import product08Main from "@/assets/backlens/batch02/batch02-product-08-main.png.asset.json";
import product08Gallery from "@/assets/backlens/batch02/batch02-product-08-gallery.png.asset.json";

/** Batch-local numbers never replace products from previous imports. */
export const BATCH02_BACK_LENS_PRODUCTS = [
  createBackLensProduct({
    id: "skinup-backlens-batch02-01",
    externalReference: "skinup-backlens-batch02-01",
    sourceProductNumber: 1,
    displayOrder: 25,
    slug: "back-lens-batch02-yellow-raincoat",
    name: { fr: "Yellow Raincoat", ar: "Yellow Raincoat", en: "Yellow Raincoat" },
    image: product01Main.url,
    gallery: [product01Main.url, product01Gallery.url],
  }),
  createBackLensProduct({
    id: "skinup-backlens-batch02-02",
    externalReference: "skinup-backlens-batch02-02",
    sourceProductNumber: 2,
    displayOrder: 26,
    slug: "back-lens-batch02-moroccan-heritage-gold",
    name: { fr: "Moroccan Heritage Gold", ar: "Moroccan Heritage Gold", en: "Moroccan Heritage Gold" },
    image: product02Main.url,
    gallery: [product02Main.url, product02Gallery.url],
  }),
  createBackLensProduct({
    id: "skinup-backlens-batch02-03",
    externalReference: "skinup-backlens-batch02-03",
    sourceProductNumber: 3,
    displayOrder: 27,
    slug: "back-lens-batch02-botanical-bottles",
    name: { fr: "Botanical Bottles", ar: "Botanical Bottles", en: "Botanical Bottles" },
    image: product03Main.url,
    gallery: [product03Main.url, product03Gallery.url],
  }),
  createBackLensProduct({
    id: "skinup-backlens-batch02-04",
    externalReference: "skinup-backlens-batch02-04",
    sourceProductNumber: 4,
    displayOrder: 28,
    slug: "back-lens-batch02-chromatic-waves",
    name: { fr: "Chromatic Waves", ar: "Chromatic Waves", en: "Chromatic Waves" },
    image: product04Main.url,
    gallery: [product04Main.url, product04Gallery.url],
  }),
  createBackLensProduct({
    id: "skinup-backlens-batch02-05",
    externalReference: "skinup-backlens-batch02-05",
    sourceProductNumber: 5,
    displayOrder: 29,
    slug: "back-lens-batch02-morocco-pride",
    name: { fr: "Morocco Pride", ar: "Morocco Pride", en: "Morocco Pride" },
    image: product05Main.url,
    gallery: [product05Main.url, product05Gallery.url],
  }),
  createBackLensProduct({
    id: "skinup-backlens-batch02-06",
    externalReference: "skinup-backlens-batch02-06",
    sourceProductNumber: 6,
    displayOrder: 30,
    slug: "back-lens-batch02-atlas-lions-red",
    name: { fr: "Atlas Lions Red", ar: "Atlas Lions Red", en: "Atlas Lions Red" },
    image: product06Main.url,
    gallery: [product06Main.url, product06Gallery.url],
  }),
  createBackLensProduct({
    id: "skinup-backlens-batch02-07",
    externalReference: "skinup-backlens-batch02-07",
    sourceProductNumber: 7,
    displayOrder: 31,
    slug: "back-lens-batch02-rose-and-shadow",
    name: { fr: "Rose and Shadow", ar: "Rose and Shadow", en: "Rose and Shadow" },
    image: product07Main.url,
    gallery: [product07Main.url, product07Gallery.url],
  }),
  createBackLensProduct({
    id: "skinup-backlens-batch02-08",
    externalReference: "skinup-backlens-batch02-08",
    sourceProductNumber: 8,
    displayOrder: 32,
    slug: "back-lens-batch02-moroccan-rose",
    name: { fr: "Moroccan Rose", ar: "Moroccan Rose", en: "Moroccan Rose" },
    image: product08Main.url,
    gallery: [product08Main.url, product08Gallery.url],
  }),
];
