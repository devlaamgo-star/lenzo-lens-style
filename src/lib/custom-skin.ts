import type { Lang } from "./translations";
import type { SkinCoverage } from "./skin-templates";

export const COVERAGE_PRICES: Record<SkinCoverage, number> = {
  full: 149,
  back: 129,
  camera: 49,
};

export const COVERAGE_LABELS: Record<SkinCoverage, Record<Lang, string>> = {
  full: { fr: "Arrière & côtés", ar: "الظهر والجوانب", en: "Back & Sides" },
  back: { fr: "Arrière uniquement", ar: "الظهر فقط", en: "Back Only" },
  camera: { fr: "Zone caméra", ar: "منطقة الكاميرا", en: "Camera Lens Area" },
};

export const CS = {
  badge: { fr: "Nouveau", ar: "جديد", en: "New" },
  title: {
    fr: "Créez votre propre skin",
    ar: "صمم سكين ديالك",
    en: "Create your own skin",
  },
  sub: {
    fr: "Importez votre image, placez-la sur le gabarit exact de votre iPhone et commandez. Paiement à la livraison, livraison gratuite au Maroc.",
    ar: "حمّل تصويرة ديالك، حطها فوق القالب الدقيق ديال الآيفون ديالك وسيفط الطلب. الخلاص عند التوصيل ومجاني فالمغرب.",
    en: "Upload your image, place it on the exact template of your iPhone and order. Cash on delivery, free shipping in Morocco.",
  },
  model: { fr: "Modèle", ar: "الموديل", en: "Model" },
  coverage: { fr: "Couverture", ar: "التغطية", en: "Coverage" },
  upload: { fr: "Importer votre design", ar: "حمّل التصميم ديالك", en: "Upload your design" },
  replace: { fr: "Changer d'image", ar: "بدّل التصويرة", en: "Replace image" },
  formats: { fr: "JPG, PNG ou WEBP — 10 Mo max", ar: "JPG أو PNG أو WEBP — 10 ميغا كحد أقصى", en: "JPG, PNG or WEBP — 10 MB max" },
  zoom: { fr: "Zoom", ar: "التكبير", en: "Zoom" },
  rotation: { fr: "Rotation", ar: "الدوران", en: "Rotation" },
  position: { fr: "Position", ar: "الموضع", en: "Position" },
  reset: { fr: "Réinitialiser", ar: "إعادة ضبط", en: "Reset" },
  quantity: { fr: "Quantité", ar: "الكمية", en: "Quantity" },
  addToCart: { fr: "Ajouter au panier", ar: "زيد للسلة", en: "Add to cart" },
  added: { fr: "Ajouté au panier", ar: "تزاد للسلة", en: "Added to cart" },
  dragHint: {
    fr: "Glissez l'image pour la déplacer. Les découpes caméra restent vides.",
    ar: "حرّك التصويرة بيدك. فتحات الكاميرا كتبقى خاوية.",
    en: "Drag the image to move it. Camera cutouts stay empty.",
  },
  needImage: { fr: "Importez d'abord une image", ar: "حمّل تصويرة أولاً", en: "Upload an image first" },
  saving: { fr: "Enregistrement…", ar: "كنسجل…", en: "Saving…" },
  error: {
    fr: "Impossible d'enregistrer votre design. Réessayez.",
    ar: "ما قدرناش نسجلو التصميم. عاود المحاولة.",
    en: "We could not save your design. Please try again.",
  },
  price: { fr: "Prix", ar: "الثمن", en: "Price" },
  preview: { fr: "Aperçu en direct", ar: "معاينة مباشرة", en: "Live preview" },
  tooBig: { fr: "Fichier trop lourd (10 Mo max)", ar: "الملف كبير بزاف (10 ميغا)", en: "File too large (10 MB max)" },
  badType: { fr: "Format non supporté", ar: "الصيغة ماكتخدمش", en: "Unsupported format" },
} as const;

export type SkinTransform = { x: number; y: number; scale: number; rotation: number };
