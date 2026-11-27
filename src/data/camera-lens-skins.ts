import { CAMERA72_SKINS } from "./camera-lens-batch72";
import type { CameraLensSkin } from "./camera-lens-types";

export type { CameraLensSkin } from "./camera-lens-types";
export { CAMERA_ONLY_NOTE } from "./camera-lens-types";

/** Authoritative replacement, not an append: stable import keys make reruns duplicate-free. */
export const CAMERA_LENS_SKINS: CameraLensSkin[] = CAMERA72_SKINS;

export function lensSkinBySlug(slug: string): CameraLensSkin | undefined {
  return CAMERA_LENS_SKINS.find((skin) => skin.slug === slug);
}
