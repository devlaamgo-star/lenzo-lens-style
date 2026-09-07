import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const MAX_BYTES = 10 * 1024 * 1024;

const schema = z.object({
  modelId: z.string().trim().min(2).max(60),
  coverage: z.enum(["full", "back", "camera"]),
  templateId: z.string().trim().min(2).max(80),
  transform: z.object({
    x: z.number(),
    y: z.number(),
    scale: z.number(),
    rotation: z.number(),
  }),
  originalType: z.string().trim().min(3).max(60),
  originalName: z.string().trim().max(160).default("design"),
  originalDataUrl: z.string().max(15_000_000),
  previewDataUrl: z.string().max(15_000_000),
});

function decode(dataUrl: string) {
  const base64 = dataUrl.split(",")[1] ?? "";
  return Buffer.from(base64, "base64");
}

/** Enregistre le design original + l'aperçu final dans le stockage des commandes. */
export const saveCustomSkin = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const ext = ALLOWED[data.originalType];
    if (!ext) throw new Error("INVALID_FILE_TYPE");

    const original = decode(data.originalDataUrl);
    const preview = decode(data.previewDataUrl);
    if (original.byteLength === 0 || original.byteLength > MAX_BYTES) throw new Error("INVALID_FILE_SIZE");
    if (preview.byteLength === 0 || preview.byteLength > MAX_BYTES) throw new Error("INVALID_PREVIEW");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const id = crypto.randomUUID();
    const base = `custom-skins/${data.modelId}/${id}`;
    const originalPath = `${base}/original.${ext}`;
    const previewPath = `${base}/preview.png`;

    const up1 = await supabaseAdmin.storage
      .from("order-uploads")
      .upload(originalPath, original, { contentType: data.originalType, upsert: true });
    if (up1.error) throw new Error(up1.error.message);

    const up2 = await supabaseAdmin.storage
      .from("order-uploads")
      .upload(previewPath, preview, { contentType: "image/png", upsert: true });
    if (up2.error) throw new Error(up2.error.message);

    return { id, originalPath, previewPath };
  });
