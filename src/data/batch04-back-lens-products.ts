import { createBackLensProduct } from "./back-lens-product-template";
import product01Main from "@/assets/backlens/batch04/batch04-product-01-main.webp.asset.json";
import product01Gallery from "@/assets/backlens/batch04/batch04-product-01-gallery.webp.asset.json";
import product02Main from "@/assets/backlens/batch04/batch04-product-02-main.webp.asset.json";
import product02Gallery from "@/assets/backlens/batch04/batch04-product-02-gallery.webp.asset.json";
import product03Main from "@/assets/backlens/batch04/batch04-product-03-main.webp.asset.json";
import product03Gallery from "@/assets/backlens/batch04/batch04-product-03-gallery.webp.asset.json";
import product04Main from "@/assets/backlens/batch04/batch04-product-04-main.webp.asset.json";
import product04Gallery from "@/assets/backlens/batch04/batch04-product-04-gallery.webp.asset.json";

/** Exact pack statement requested by the user; appended to every Batch 04 French description. */
export const BATCH04_PACK_NOTE = {
  fr: "Pack comprenant un skin dos + un skin pour le module caméra. Téléphone non inclus.",
  ar: "باك يضم سكين خلفي + سكين لوحدة الكاميرا. الهاتف غير مرفق.",
  en: "Pack includes one back skin + one camera-module skin. Phone not included.",
};

const describe = (fr: string, ar: string, en: string) => ({
  fr: `${fr} ${BATCH04_PACK_NOTE.fr}`,
  ar: `${ar} ${BATCH04_PACK_NOTE.ar}`,
  en: `${en} ${BATCH04_PACK_NOTE.en}`,
});

/** Batch 04 (folders 1-4): 1.webp = main photo, 2.webp = second gallery photo; batch-local numbers never replace earlier imports. */
export const BATCH04_BACK_LENS_PRODUCTS = [
  createBackLensProduct({
    id: "skinup-backlens-batch04-01",
    externalReference: "skinup-backlens-batch04-01",
    sourceProductNumber: 1,
    displayOrder: 42,
    slug: "back-lens-batch04-amazigh-khamsa",
    name: { fr: "Amazigh Khamsa", ar: "Amazigh Khamsa", en: "Amazigh Khamsa" },
    description: describe(
      "Une main Khamsa décorative aux couleurs bleu, vert et jaune, ornée du symbole amazigh en rouge.",
      "يد خمسة زخرفية بألوان الأزرق والأخضر والأصفر، يتوسطها الرمز الأمازيغي باللون الأحمر.",
      "A decorative Khamsa hand in blue, green and yellow, featuring the red Amazigh symbol.",
    ),
    image: product01Main.url,
    gallery: [product01Main.url, product01Gallery.url],
  }),
  createBackLensProduct({
    id: "skinup-backlens-batch04-02",
    externalReference: "skinup-backlens-batch04-02",
    sourceProductNumber: 2,
    displayOrder: 43,
    slug: "back-lens-batch04-moroccan-kingdom-gold",
    name: { fr: "Moroccan Kingdom Gold", ar: "Moroccan Kingdom Gold", en: "Moroccan Kingdom Gold" },
    description: describe(
      "La carte du Maroc dessinée en calligraphie noire sur un parchemin doré.",
      "خريطة المغرب مرسومة بخط عربي أسود على رقّ ذهبي.",
      "The map of Morocco drawn in black calligraphy on golden parchment.",
    ),
    image: product02Main.url,
    gallery: [product02Main.url, product02Gallery.url],
  }),
  createBackLensProduct({
    id: "skinup-backlens-batch04-03",
    externalReference: "skinup-backlens-batch04-03",
    sourceProductNumber: 3,
    displayOrder: 44,
    slug: "back-lens-batch04-moroccan-kingdom-vintage",
    name: { fr: "Moroccan Kingdom Vintage", ar: "Moroccan Kingdom Vintage", en: "Moroccan Kingdom Vintage" },
    description: describe(
      "La carte du Maroc en calligraphie rouge, parsemée d'étoiles vertes, sur un parchemin crème au style vintage.",
      "خريطة المغرب بخط عربي أحمر تزينها نجوم خضراء، على رقّ كريمي بطابع عتيق.",
      "The map of Morocco in red calligraphy with green stars on vintage cream parchment.",
    ),
    image: product03Main.url,
    gallery: [product03Main.url, product03Gallery.url],
  }),
  createBackLensProduct({
    id: "skinup-backlens-batch04-04",
    externalReference: "skinup-backlens-batch04-04",
    sourceProductNumber: 4,
    displayOrder: 45,
    slug: "back-lens-batch04-moroccan-royal-crest",
    name: { fr: "Moroccan Royal Crest", ar: "Moroccan Royal Crest", en: "Moroccan Royal Crest" },
    description: describe(
      "Les armoiries du Maroc encadrées de deux lions dorés, sur un fond de zellige coloré.",
      "شعار المملكة المغربية بأسدين ذهبيين، على خلفية من الزليج الملون.",
      "The Moroccan coat of arms with two golden lions over colorful zellige.",
    ),
    image: product04Main.url,
    gallery: [product04Main.url, product04Gallery.url],
  }),
];
