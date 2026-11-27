import retiredProducts from "../../../catalog-templates/camera-lens-skins/retired-products.json";
import type { CameraLensSkin } from "../camera-lens-types";

/** Retired records resolve historical orders only; never render as active products. */
export const ARCHIVED_CAMERA_LENS_SKINS = retiredProducts as CameraLensSkin[];
