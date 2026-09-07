/**
 * Gabarits SVG 1:1 fournis par le client (Adobe Illustrator, viewBox exact).
 * Les tracés sont repris tels quels : aucune modification de géométrie,
 * de proportions, de trous ni de viewBox.
 *
 * Pour ajouter un nouveau modèle d'iPhone : ajouter une entrée dans
 * SKIN_TEMPLATES avec les mêmes champs (viewBox + printPaths + outlinePaths).
 */

export type SkinCoverage = "full" | "back" | "camera";

export type SkinTemplate = {
  id: string;
  modelId: string;
  modelLabel: string;
  coverage: SkinCoverage;
  /** viewBox d'origine du fichier fourni. */
  viewBox: string;
  width: number;
  height: number;
  /** Zone imprimable (fill-rule evenodd => les trous restent vides). */
  printPaths: string[];
  /** Rectangles imprimables (bandes haut/bas du gabarit). */
  printRects: { x: number; y: number; width: number; height: number }[];
  /** Contour complet visible au-dessus du design. */
  outlinePaths: string[];
  outlineRects: { x: number; y: number; width: number; height: number }[];
};

const VIEW_BOX = "0 0 261.92 504.01";
const W = 261.92;
const H = 504.01;

const CAMERA_ISLAND = "M198.54,141.28H63.37c-15.7,0-28.42-11.2-28.42-28.42v-50.12c0-18.76,12.72-28.42,28.42-28.42h135.17c15.7,0,28.42,10.96,28.42,28.42v50.12c0,17.22-12.72,28.42-28.42,28.42ZM61.09,36.71c-13.19,0-23.88,10.69-23.88,23.88s10.69,23.88,23.88,23.88,23.88-10.69,23.88-23.88-10.69-23.88-23.88-23.88ZM61.09,91.4c-13.19,0-23.88,10.69-23.88,23.88s10.69,23.88,23.88,23.88,23.88-10.69,23.88-23.88-10.69-23.88-23.88-23.88ZM112.31,63.92c-13.19,0-23.88,10.69-23.88,23.88s10.69,23.88,23.88,23.88,23.88-10.69,23.88-23.88-10.69-23.88-23.88-23.88ZM202.76,48.85c-5.62,0-10.17,4.55-10.17,10.17s4.55,10.17,10.17,10.17,10.17-4.55,10.17-10.17-4.55-10.17-10.17-10.17ZM202.76,106.5c-5.62,0-10.17,4.55-10.17,10.17s4.55,10.17,10.17,10.17,10.17-4.55,10.17-10.17-4.55-10.17-10.17-10.17ZM202.44,85.24c-1.39,0-2.52,1.13-2.52,2.52s1.13,2.52,2.52,2.52,2.52-1.13,2.52-2.52-1.13-2.52-2.52-2.52Z";

const FULL_BODY = "M206.12,481.24H55.79c-18.26,0-33.06-14.8-33.06-33.06V55.82c0-18.26,14.8-33.06,33.06-33.06h150.33c18.26,0,33.06,14.8,33.06,33.06v392.35c0,18.26-14.8,33.06-33.06,33.06ZM231.12,112.89v-50.19c0-21.47-14.56-32.52-32.52-32.52H63.32c-17.96,0-32.52,11.05-32.52,32.52v50.19c0,20.81,14.56,32.52,32.52,32.52h135.28c17.96,0,32.52-11.72,32.52-32.52Z";

const BACK_PLATE = "M229.47,449.6V191.36c0-14.88-7.46-26.95-26.78-26.95H59.22c-18.9,0-26.78,12.06-26.78,26.95v258.23c0,14.88,7.94,26.95,26.78,26.95h143.48c19.14,0,26.78-12.06,26.78-26.95Z";

const FULL_SIDES: string[] = ["M251.79,128.19h0c-3.26,0-5.9-2.64-5.9-5.9v-10.06c0-3.26,2.64-5.9,5.9-5.9h0c3.26,0,5.9,2.64,5.9,5.9v10.06c0,3.26-2.64,5.9-5.9,5.9ZM257.68,169.18v-23.31c0-3.26-2.64-5.9-5.9-5.9h0c-3.26,0-5.9,2.64-5.9,5.9v23.31c0,3.26,2.64,5.9,5.9,5.9h0c3.26,0,5.9-2.64,5.9-5.9ZM257.68,209.26v-23.31c0-3.26-2.64-5.9-5.9-5.9h0c-3.26,0-5.9,2.64-5.9,5.9v23.31c0,3.26,2.64,5.9,5.9,5.9h0c3.26,0,5.9-2.64,5.9-5.9ZM242.4,54.69v394.62h19.52V54.69h-19.52ZM256.85,401.82v-38.24c0-2.75-2.23-4.98-4.98-4.98h-.17c-2.75,0-4.98,2.23-4.98,4.98v38.24c0,2.75,2.23,4.98,4.98,4.98h.17c2.75,0,4.98-2.23,4.98-4.98Z", "M9.9,204.59h-.28c-2.9,0-5.24-2.26-5.24-5.05v-43.83c0-2.79,2.35-5.05,5.24-5.05h.28c2.9,0,5.24,2.26,5.24,5.05v43.83c0,2.79-2.35,5.05-5.24,5.05ZM16.52,357.59v-41.2c0-3.7-3-6.69-6.69-6.69h0c-3.7,0-6.69,3-6.69,6.69v41.2c0,3.7,3,6.69,6.69,6.69h0c3.7,0,6.69-3,6.69-6.69ZM0,54.69v394.62h19.52V54.69H0Z", "M139.75,499.16h-17.57c-2.95,0-5.34-2.39-5.34-5.34h0c0-2.95,2.39-5.34,5.34-5.34h17.57c2.95,0,5.34,2.39,5.34,5.34h0c0,2.95-2.39,5.34-5.34,5.34ZM150.52,490.54c-1.52,0-2.75,1.23-2.75,2.75s1.23,2.75,2.75,2.75,2.75-1.23,2.75-2.75-1.23-2.75-2.75-2.75ZM111.4,490.54c-1.52,0-2.75,1.23-2.75,2.75s1.23,2.75,2.75,2.75,2.75-1.23,2.75-2.75-1.23-2.75-2.75-2.75ZM259.99,484.5H1.93v19.52h258.06v-19.52ZM64.63,490.85c-1.4,0-2.54,1.14-2.54,2.54s1.14,2.54,2.54,2.54,2.54-1.14,2.54-2.54-1.14-2.54-2.54-2.54ZM70.57,490.85c-1.4,0-2.54,1.14-2.54,2.54s1.14,2.54,2.54,2.54,2.54-1.14,2.54-2.54-1.14-2.54-2.54-2.54ZM76.51,490.85c-1.4,0-2.54,1.14-2.54,2.54s1.14,2.54,2.54,2.54,2.54-1.14,2.54-2.54-1.14-2.54-2.54-2.54ZM82.44,490.85c-1.4,0-2.54,1.14-2.54,2.54s1.14,2.54,2.54,2.54,2.54-1.14,2.54-2.54-1.14-2.54-2.54-2.54ZM88.38,490.85c-1.4,0-2.54,1.14-2.54,2.54s1.14,2.54,2.54,2.54,2.54-1.14,2.54-2.54-1.14-2.54-2.54-2.54ZM94.32,490.85c-1.4,0-2.54,1.14-2.54,2.54s1.14,2.54,2.54,2.54,2.54-1.14,2.54-2.54-1.14-2.54-2.54-2.54ZM167.56,490.85c-1.41,0-2.54,1.14-2.54,2.54s1.14,2.54,2.54,2.54,2.54-1.14,2.54-2.54-1.14-2.54-2.54-2.54ZM173.5,490.85c-1.41,0-2.54,1.14-2.54,2.54s1.14,2.54,2.54,2.54,2.54-1.14,2.54-2.54-1.14-2.54-2.54-2.54ZM179.44,490.85c-1.41,0-2.54,1.14-2.54,2.54s1.14,2.54,2.54,2.54,2.54-1.14,2.54-2.54-1.14-2.54-2.54-2.54ZM185.38,490.85c-1.41,0-2.54,1.14-2.54,2.54s1.14,2.54,2.54,2.54,2.54-1.14,2.54-2.54-1.14-2.54-2.54-2.54ZM191.32,490.85c-1.4,0-2.54,1.14-2.54,2.54s1.14,2.54,2.54,2.54,2.54-1.14,2.54-2.54-1.14-2.54-2.54-2.54ZM197.26,490.85c-1.41,0-2.54,1.14-2.54,2.54s1.14,2.54,2.54,2.54,2.54-1.14,2.54-2.54-1.14-2.54-2.54-2.54Z"];

const FULL_RECTS = [{ x: 1.93, y: 0.0, width: 258.06, height: 19.52 }];

export const SKIN_TEMPLATES: SkinTemplate[] = [
  {
    id: "iphone-17-pro-max-full",
    modelId: "iphone-17-pro-max",
    modelLabel: "iPhone 17 Pro Max",
    coverage: "full",
    viewBox: VIEW_BOX,
    width: W,
    height: H,
    printPaths: [FULL_BODY, CAMERA_ISLAND, ...FULL_SIDES],
    printRects: FULL_RECTS,
    outlinePaths: [CAMERA_ISLAND, FULL_BODY, ...FULL_SIDES],
    outlineRects: FULL_RECTS,
  },
  {
    id: "iphone-17-pro-max-back",
    modelId: "iphone-17-pro-max",
    modelLabel: "iPhone 17 Pro Max",
    coverage: "back",
    viewBox: VIEW_BOX,
    width: W,
    height: H,
    printPaths: [BACK_PLATE, CAMERA_ISLAND],
    printRects: [],
    outlinePaths: [CAMERA_ISLAND, BACK_PLATE],
    outlineRects: [],
  },
  {
    id: "iphone-17-pro-max-camera",
    modelId: "iphone-17-pro-max",
    modelLabel: "iPhone 17 Pro Max",
    coverage: "camera",
    viewBox: VIEW_BOX,
    width: W,
    height: H,
    printPaths: [CAMERA_ISLAND],
    printRects: [],
    outlinePaths: [CAMERA_ISLAND],
    outlineRects: [],
  },
];

export function templateFor(modelId: string, coverage: SkinCoverage): SkinTemplate | undefined {
  return SKIN_TEMPLATES.find((t) => t.modelId === modelId && t.coverage === coverage);
}

export const SKIN_MODELS = [
  { id: "iphone-17-pro-max", label: "iPhone 17 Pro Max" },
] as const;
