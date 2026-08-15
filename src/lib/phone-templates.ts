import type { L } from "@/lib/custom-design";

/**
 * Reusable phone mockup templates.
 * All geometry is expressed as fractions of the phone body box
 * (x/w relative to body width, y/h relative to body height),
 * so a new model only needs a new entry here — no component changes.
 *
 * NOTE: these are visualisation mockups only, never production cut files.
 */

export type Lens = { cx: number; cy: number; r: number };

export type PhoneTemplate = {
  id: string;
  label: string;
  /** height / width of the phone body */
  aspect: number;
  /** body corner radius, fraction of width */
  radius: number;
  /** rear skin area inset, fraction of width */
  skin: { x: number; y: number; w: number; h: number; radius: number };
  /** camera island (plateau) box, fraction of body box */
  island: { x: number; y: number; w: number; h: number; radius: number };
  /** lens cutouts, fraction of the island box */
  lenses: Lens[];
  /** flash + sensor cutouts, fraction of the island box */
  dots: Lens[];
  colors: string[];
};

export type PhoneColor = {
  value: string;
  label: L;
  body: string;
  edge: string;
};

export const PHONE_COLOR_LIST: PhoneColor[] = [
  { value: "orange", label: { fr: "Orange", ar: "برتقالي", en: "Cosmic Orange" } as L, body: "#D2622B", edge: "#B14C1C" },
  { value: "silver", label: { fr: "Argent", ar: "فضي", en: "Silver" } as L, body: "#D9DCE1", edge: "#AFB4BC" },
  { value: "white", label: { fr: "Blanc", ar: "أبيض", en: "White" } as L, body: "#F2F1EE", edge: "#CFCEC9" },
  { value: "black", label: { fr: "Noir", ar: "أسود", en: "Black" } as L, body: "#1C1C1E", edge: "#0B0B0C" },
  { value: "blue", label: { fr: "Bleu", ar: "أزرق", en: "Deep Blue" } as L, body: "#2C4A70", edge: "#1D3453" },
  { value: "titanium", label: { fr: "Titane naturel", ar: "تيتانيوم", en: "Natural Titanium" } as L, body: "#B9AFA3", edge: "#948B80" },
  { value: "desert", label: { fr: "Titane sable", ar: "تيتانيوم رملي", en: "Desert Titanium" } as L, body: "#C0A483", edge: "#9C8465" },
];

export function phoneColor(value: string): PhoneColor {
  return PHONE_COLOR_LIST.find((c) => c.value === value) ?? PHONE_COLOR_LIST[0]!;
}

const PRO_PLATEAU: PhoneTemplate["island"] = { x: 0.055, y: 0.028, w: 0.545, h: 0.175, radius: 0.055 };
const PRO_LENSES: Lens[] = [
  { cx: 0.2, cy: 0.32, r: 0.135 },
  { cx: 0.2, cy: 0.72, r: 0.135 },
  { cx: 0.52, cy: 0.52, r: 0.135 },
];
const PRO_DOTS: Lens[] = [
  { cx: 0.78, cy: 0.34, r: 0.06 },
  { cx: 0.9, cy: 0.62, r: 0.045 },
];

const SQUARE_ISLAND: PhoneTemplate["island"] = { x: 0.055, y: 0.028, w: 0.33, h: 0.165, radius: 0.05 };
const DUO_LENSES: Lens[] = [
  { cx: 0.28, cy: 0.5, r: 0.24 },
  { cx: 0.72, cy: 0.5, r: 0.24 },
];

const base = {
  aspect: 2.03,
  radius: 0.13,
  skin: { x: 0.028, y: 0.014, w: 0.944, h: 0.972, radius: 0.115 },
} as const;

export const PHONE_TEMPLATES: PhoneTemplate[] = [
  {
    id: "iphone-17-pro-max",
    label: "iPhone 17 Pro Max",
    ...base,
    island: PRO_PLATEAU,
    lenses: PRO_LENSES,
    dots: PRO_DOTS,
    colors: ["orange", "silver", "black", "blue"],
  },
  {
    id: "iphone-17-pro",
    label: "iPhone 17 Pro",
    ...base,
    aspect: 2.0,
    island: PRO_PLATEAU,
    lenses: PRO_LENSES,
    dots: PRO_DOTS,
    colors: ["orange", "silver", "black", "blue"],
  },
  {
    id: "iphone-17",
    label: "iPhone 17",
    ...base,
    aspect: 2.0,
    island: SQUARE_ISLAND,
    lenses: DUO_LENSES,
    dots: [{ cx: 0.5, cy: 0.06, r: 0.05 }],
    colors: ["white", "black", "blue", "silver"],
  },
  {
    id: "iphone-air",
    label: "iPhone Air",
    ...base,
    aspect: 2.09,
    island: { x: 0.055, y: 0.026, w: 0.89, h: 0.115, radius: 0.05 },
    lenses: [{ cx: 0.11, cy: 0.5, r: 0.32 }],
    dots: [
      { cx: 0.23, cy: 0.5, r: 0.11 },
      { cx: 0.31, cy: 0.5, r: 0.08 },
    ],
    colors: ["black", "white", "gold" as string, "blue"].filter((c) => c !== "gold"),
  },
  {
    id: "iphone-16-pro-max",
    label: "iPhone 16 Pro Max",
    ...base,
    island: { x: 0.055, y: 0.028, w: 0.33, h: 0.28, radius: 0.05 },
    lenses: [
      { cx: 0.3, cy: 0.22, r: 0.16 },
      { cx: 0.3, cy: 0.62, r: 0.16 },
      { cx: 0.72, cy: 0.42, r: 0.16 },
    ],
    dots: [{ cx: 0.74, cy: 0.78, r: 0.07 }],
    colors: ["titanium", "desert", "black", "white"],
  },
  {
    id: "iphone-16-pro",
    label: "iPhone 16 Pro",
    ...base,
    aspect: 2.0,
    island: { x: 0.055, y: 0.028, w: 0.34, h: 0.29, radius: 0.05 },
    lenses: [
      { cx: 0.3, cy: 0.22, r: 0.16 },
      { cx: 0.3, cy: 0.62, r: 0.16 },
      { cx: 0.72, cy: 0.42, r: 0.16 },
    ],
    dots: [{ cx: 0.74, cy: 0.78, r: 0.07 }],
    colors: ["titanium", "desert", "black", "white"],
  },
  {
    id: "iphone-16",
    label: "iPhone 16",
    ...base,
    aspect: 2.0,
    island: SQUARE_ISLAND,
    lenses: DUO_LENSES,
    dots: [{ cx: 0.5, cy: 0.06, r: 0.05 }],
    colors: ["black", "white", "blue", "silver"],
  },
  {
    id: "iphone-15-pro-max",
    label: "iPhone 15 Pro Max",
    ...base,
    island: { x: 0.055, y: 0.028, w: 0.33, h: 0.28, radius: 0.05 },
    lenses: [
      { cx: 0.3, cy: 0.22, r: 0.16 },
      { cx: 0.3, cy: 0.62, r: 0.16 },
      { cx: 0.72, cy: 0.42, r: 0.16 },
    ],
    dots: [{ cx: 0.74, cy: 0.78, r: 0.07 }],
    colors: ["titanium", "black", "white", "blue"],
  },
  {
    id: "iphone-15",
    label: "iPhone 15",
    ...base,
    aspect: 2.0,
    island: SQUARE_ISLAND,
    lenses: DUO_LENSES,
    dots: [{ cx: 0.5, cy: 0.06, r: 0.05 }],
    colors: ["black", "white", "blue", "silver"],
  },
  {
    id: "iphone-14-pro-max",
    label: "iPhone 14 Pro Max",
    ...base,
    island: { x: 0.055, y: 0.028, w: 0.33, h: 0.28, radius: 0.05 },
    lenses: [
      { cx: 0.3, cy: 0.22, r: 0.16 },
      { cx: 0.3, cy: 0.62, r: 0.16 },
      { cx: 0.72, cy: 0.42, r: 0.16 },
    ],
    dots: [{ cx: 0.74, cy: 0.78, r: 0.07 }],
    colors: ["black", "silver", "white"],
  },
  {
    id: "iphone-13",
    label: "iPhone 13",
    ...base,
    aspect: 2.0,
    island: SQUARE_ISLAND,
    lenses: DUO_LENSES,
    dots: [{ cx: 0.5, cy: 0.06, r: 0.05 }],
    colors: ["black", "white", "blue"],
  },
];

export function phoneTemplate(id: string): PhoneTemplate {
  return PHONE_TEMPLATES.find((t) => t.id === id) ?? PHONE_TEMPLATES[0]!;
}

export type SkinArea = "back" | "camera" | "both";

/** Fonts offered for the name / initials overlay. */
export const TEXT_FONTS: { value: string; label: string; css: string; weight: number }[] = [
  { value: "modern", label: "Modern", css: "'Poppins', 'Helvetica Neue', sans-serif", weight: 700 },
  { value: "serif", label: "Serif", css: "Georgia, 'Times New Roman', serif", weight: 700 },
  { value: "mono", label: "Mono", css: "'Courier New', monospace", weight: 700 },
  { value: "script", label: "Script", css: "'Brush Script MT', cursive", weight: 400 },
];

export function textFont(value: string) {
  return TEXT_FONTS.find((f) => f.value === value) ?? TEXT_FONTS[0]!;
}

/** Cover-fit geometry shared by the DOM preview and the canvas snapshot. */
export function coverBox(
  boxRatio: number, // box width / height
  imgRatio: number, // image width / height
  zoom: number,
  offsetX: number,
  offsetY: number,
) {
  let w: number;
  let h: number;
  if (imgRatio > boxRatio) {
    h = 100 * zoom;
    w = (100 * zoom * imgRatio) / boxRatio;
  } else {
    w = 100 * zoom;
    h = (100 * zoom * boxRatio) / imgRatio;
  }
  return { w, h, left: (100 - w) / 2 + offsetX * 100, top: (100 - h) / 2 + offsetY * 100 };
}
