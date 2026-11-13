import { isLovableBackendConfigured, isStorefrontOperation, type StorefrontOperation } from "./lovable-backend.server";

const MAX_BODY_BYTES = 31_000_000; // two <=15 MB data URLs plus upload metadata
const ADMIN_OPERATIONS = new Set<StorefrontOperation>([
  "getAdminStatus", "listAdminOrders", "getRecordFileUrls", "updateRecordStatus",
  "bulkUpdateStatus", "updateRecordOps", "deleteRecords",
]);
type Dispatcher = (operation: StorefrontOperation, data: unknown) => Promise<unknown>;

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
}

function localBackendAvailable() {
  // The Cloudflare copy must never dispatch back to itself or become a second relay.
  return !isLovableBackendConfigured() && Boolean(process.env['SUPABASE_SERVICE_ROLE_KEY']) &&
    Boolean(process.env['SUPABASE_URL']) && Boolean(process.env['SUPABASE_PUBLISHABLE_KEY']);
}

export function storefrontReadiness() {
  return localBackendAvailable()
    ? json({ service: "skinup-storefront", version: 1 })
    : json({ ok: false, error: "BACKEND_UNAVAILABLE" }, 503);
}

async function readBody(request: Request) {
  const declaredSize = Number(request.headers.get("content-length"));
  if (declaredSize > MAX_BODY_BYTES) throw new Error("BODY_TOO_LARGE");
  if (!request.body) throw new Error("INVALID_INPUT");
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let text = "";
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      size += chunk.value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new Error("BODY_TOO_LARGE");
      }
      text += decoder.decode(chunk.value, { stream: true });
    }
    text += decoder.decode();
  } finally {
    reader.releaseLock();
  }
  return JSON.parse(text) as unknown;
}

// Calling the existing functions within this request preserves their validators,
// Supabase token verification, admin role checks, pricing, and file safeguards.
async function dispatch(operation: StorefrontOperation, data: unknown): Promise<unknown> {
  switch (operation) {
    case "createOrder": {
      const { createOrder } = await import("./orders.functions");
      return createOrder({ data });
    }
    case "saveCustomSkin": {
      const { saveCustomSkin } = await import("./custom-skin.functions");
      return saveCustomSkin({ data });
    }
    case "getAdminStatus": return (await import("./admin.functions")).getAdminStatus();
    case "listAdminOrders": return (await import("./admin.functions")).listAdminOrders();
    case "getRecordFileUrls": {
      const { getRecordFileUrls } = await import("./admin.functions");
      return getRecordFileUrls({ data });
    }
    case "updateRecordStatus": {
      const { updateRecordStatus } = await import("./admin.functions");
      return updateRecordStatus({ data });
    }
    case "bulkUpdateStatus": {
      const { bulkUpdateStatus } = await import("./admin.functions");
      return bulkUpdateStatus({ data });
    }
    case "updateRecordOps": {
      const { updateRecordOps } = await import("./admin.functions");
      return updateRecordOps({ data });
    }
    case "deleteRecords": {
      const { deleteRecords } = await import("./admin.functions");
      return deleteRecords({ data });
    }
  }
}

export async function handleStorefrontRequest(request: Request, execute: Dispatcher = dispatch) {
  if (!localBackendAvailable()) return json({ ok: false, error: "BACKEND_UNAVAILABLE" }, 503);
  if (request.method !== "POST") return json({ ok: false, error: "METHOD_NOT_ALLOWED" }, 405);
  // This API is server-to-server. No browser CORS or cookie-based authorization.
  if (request.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase() !== "application/json") {
    return json({ ok: false, error: "INVALID_INPUT" }, 415);
  }
  let payload: unknown;
  try {
    payload = await readBody(request);
  } catch (error) {
    const tooLarge = error instanceof Error && error.message === "BODY_TOO_LARGE";
    return json({ ok: false, error: "INVALID_INPUT" }, tooLarge ? 413 : 400);
  }
  if (!payload || typeof payload !== "object" || !("operation" in payload) || !isStorefrontOperation(payload.operation)) {
    return json({ ok: false, error: "INVALID_INPUT" }, 400);
  }
  const operation = payload.operation;
  if (ADMIN_OPERATIONS.has(operation) && !/^Bearer \S+$/.test(request.headers.get("authorization") ?? "")) {
    return json({ ok: false, error: "UNAUTHORIZED" }, 401);
  }
  try {
    const result = await execute(operation, "data" in payload ? payload.data : undefined);
    return json({ ok: true, result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.startsWith("Unauthorized")) return json({ ok: false, error: "UNAUTHORIZED" }, 401);
    if (message === "Forbidden") return json({ ok: false, error: "FORBIDDEN" }, 403);
    if (error instanceof Error && error.name === "ZodError") return json({ ok: false, error: "INVALID_INPUT" }, 400);
    if (["EMPTY_ORDER", "MODEL_REQUIRED", "INVALID_FILE_TYPE", "INVALID_FILE_SIZE", "INVALID_PREVIEW"].includes(message)) {
      return json({ ok: false, error: message }, 400);
    }
    // Never return database errors, customer records, tokens, or environment values.
    return json({ ok: false, error: operation === "createOrder" ? "ORDER_FAILED" : "BACKEND_UNAVAILABLE" }, 502);
  }
}
