import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const moroccanPhone = /^(?:\+212|00212|0)([5-7])\d{8}$/;

const MAX_BYTES = 8 * 1024 * 1024;
const MAX_FILES = 6;

const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "application/pdf": "pdf",
};

const fileSchema = z.object({
  name: z.string().trim().min(1).max(160),
  type: z.string().trim().min(3).max(80),
  dataUrl: z.string().max(12_000_000),
});

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
  phoneColor: z.string().trim().max(40).default(""),
  subject: z.string().trim().max(60).default(""),
  style: z.string().trim().max(60).default(""),
  requestType: z.enum(["back", "camera", "both"]),
  description: z.string().trim().max(1000).default(""),
  colors: z.string().trim().max(200).default(""),
  notes: z.string().trim().max(500).default(""),
  address: z.string().trim().max(200).default(""),
  quantity: z.number().int().min(1).max(50).default(1),
  locale: z.enum(["fr", "ar", "en"]).default("fr"),
  files: z.array(fileSchema).max(MAX_FILES).default([]),
  selections: z.record(z.string(), z.any()).default({}),
});

export type DesignRequestInput = z.input<typeof designRequestSchema>;

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
    const paths: string[] = [];
    const uploaded: { name: string; type: string; bytes: Uint8Array }[] = [];

    for (const [i, f] of data.files.entries()) {
      const ext = ALLOWED[f.type];
      if (!ext) throw new Error("INVALID_FILE_TYPE");
      const base64 = f.dataUrl.split(",")[1] ?? "";
      const bytes = Buffer.from(base64, "base64");
      if (bytes.byteLength === 0 || bytes.byteLength > MAX_BYTES) throw new Error("INVALID_FILE_SIZE");
      const path = `${requestNumber}/upload-${i + 1}.${ext}`;
      const { error: upErr } = await supabaseAdmin.storage
        .from("design-uploads")
        .upload(path, bytes, { contentType: f.type, upsert: true });
      if (upErr) throw new Error(upErr.message);
      paths.push(path);
      uploaded.push({ name: f.name, type: f.type, bytes: new Uint8Array(bytes) });
    }

    const { error } = await supabaseAdmin.from("design_requests").insert({
      request_number: requestNumber,
      full_name: data.fullName,
      phone: data.phone,
      city: data.city,
      phone_brand: data.brand,
      phone_model: data.model,
      phone_color: data.phoneColor,
      subject: data.subject,
      style: data.style,
      request_type: data.requestType,
      description: data.description,
      colors: data.colors,
      notes: data.notes,
      file_path: paths[0] ?? null,
      file_paths: paths,
      locale: data.locale,
    });
    if (error) throw new Error(error.message);

    const { postWebhookForm } = await import("./webhook.server");
    await postWebhookForm(
      {
        event_type: "custom_design_request",
        request_number: requestNumber,
        full_name: data.fullName,
        phone: data.phone,
        city: data.city,
        address: data.address,
        customer: {
          full_name: data.fullName,
          phone: data.phone,
          city: data.city,
          address: data.address,
        },
        device: {
          brand: data.brand,
          model: data.model,
          color: data.phoneColor,
        },
        phone_model: data.model,
        product_type: data.requestType,
        skin_type: data.requestType,
        design_option: data.subject,
        subject: data.subject,
        style: data.style,
        colors: data.colors,
        description: data.description,
        notes: data.notes,
        quantity: data.quantity,
        selections: data.selections,
        files: paths,
        file_names: uploaded.map((u) => u.name),
        file_count: uploaded.length,
        language: data.locale,
        timestamp: new Date().toISOString(),
      },
      uploaded,
    );

    return { requestNumber };
  });

