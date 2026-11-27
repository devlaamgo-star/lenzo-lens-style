import { CAMERA72_SKINS } from "./camera-lens-batch72";
import { ARCHIVE3_CAMERA_SKINS } from "./camera-lens-archive3";
import { mergeCameraImport } from "./merge-camera-import";
import type { CameraLensSkin } from "./camera-lens-types";

export type { CameraLensSkin } from "./camera-lens-types";
export { CAMERA_ONLY_NOTE } from "./camera-lens-types";

/** Preserve the replacement collection and append manifest imports by stable identity. */
export const CAMERA_LENS_SKINS: CameraLensSkin[] = mergeCameraImport(CAMERA72_SKINS, ARCHIVE3_CAMERA_SKINS);

export function lensSkinBySlug(slug: string): CameraLensSkin | undefined {
  return CAMERA_LENS_SKINS.find((skin) => skin.slug === slug);
}
