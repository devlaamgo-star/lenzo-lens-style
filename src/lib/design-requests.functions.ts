import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const moroccanPhone = /^(?:\+212|00212|0)([5-7])\d{8}$/;

const MAX_BYTES = 8 * 1024 * 1024;

const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "application/pdf": "pdf",
};

export const designRequestSchema = z.object({
  fullName: z.string().trim().min(3).max(80),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s.-]/g, ""))
    .refine((v) => moroccanPhone.test(v)),
  city: z.string().trim().min(2).max(60),
  brand: z.string().trim().max(40).default(""),
  model: z.string().trim().min(2).max(60),
  requestType: z.enum(["back", "camera", "both"]),
  description: z.string().trim().min(5).max(1000),
  colors: z.string().trim().max(200).default(""),
  notes: z.string().trim().max(500).default(""),
  locale: z.enum(["fr", "ar", "en"]).default("fr"),
  file: z
    .object({
      name: z.string().trim().min(1).max(160),
      type: z.string().trim().min(3).max(80),
      dataUrl: z.string().max(12_000_000),
    })
    .nullable()
    .default(null),
});

export type DesignRequestInput = z.infer<typeof designRequestSchema>;

function buildRequestNumber() {
  const d = new Date();
  const stamp = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(
    d.getDate(),
  ).padStart(2, "0")}`;
  return `SKD-${stamp}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export const createDesignRequest = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => designRequestSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const requestNumber = buildRequestNumber();
    let filePath: string | null = null;

    if (data.file) {
      const ext = ALLOWED[data.file.type];
      if (!ext) throw new Error("INVALID_FILE_TYPE");
      const base64 = data.file.dataUrl.split(",")[1] ?? "";
      const bytes = Buffer.from(base64, "base64");
      if (bytes.byteLength === 0 || bytes.byteLength > MAX_BYTES) throw new Error("INVALID_FILE_SIZE");
      const path = `${requestNumber}/upload.${ext}`;
      const { error: upErr } = await supabaseAdmin.storage
        .from("design-uploads")
        .upload(path, bytes, { contentType: data.file.type, upsert: true });
      if (upErr) throw new Error(upErr.message);
      filePath = path;
    }

    const { error } = await supabaseAdmin.from("design_requests").insert({
      request_number: requestNumber,
      full_name: data.fullName,
      phone: data.phone,
      city: data.city,
      phone_brand: data.brand,
      phone_model: data.model,
      request_type: data.requestType,
      description: data.description,
      colors: data.colors,
      notes: data.notes,
      file_path: filePath,
      locale: data.locale,
    });
    if (error) throw new Error(error.message);

    return { requestNumber };
  });
