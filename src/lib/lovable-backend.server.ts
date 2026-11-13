// Cloudflare delegates privileged operations to the original Lovable backend.
// The service-role key stays there; only the caller's login token is forwarded.
export const STOREFRONT_OPERATIONS = [
  "createOrder", "saveCustomSkin", "getAdminStatus", "listAdminOrders",
  "getRecordFileUrls", "updateRecordStatus", "bulkUpdateStatus", "updateRecordOps", "deleteRecords",
] as const;
export type StorefrontOperation = (typeof STOREFRONT_OPERATIONS)[number];

export function isStorefrontOperation(value: unknown): value is StorefrontOperation {
  return typeof value === "string" && (STOREFRONT_OPERATIONS as readonly string[]).includes(value);
}

export function isLovableBackendConfigured() {
  return Boolean(process.env['LOVABLE_BACKEND_ORIGIN']?.trim());
}

export function lovableBackendUrl(origin: string, incomingOrigin?: string) {
  const url = new URL(origin);
  if (url.protocol !== "https:" || !url.hostname.endsWith(".lovable.app") ||
      url.username || url.password || url.port || url.pathname !== "/" || url.search || url.hash ||
      url.origin === incomingOrigin) {
    throw new Error("BACKEND_CONFIGURATION_INVALID");
  }
  return new URL("/api/storefront", url);
}

const PUBLIC_ERRORS = new Set([
  "UNAUTHORIZED", "FORBIDDEN", "INVALID_INPUT", "EMPTY_ORDER", "MODEL_REQUIRED",
  "INVALID_FILE_TYPE", "INVALID_FILE_SIZE", "INVALID_PREVIEW", "ORDER_FAILED", "BACKEND_UNAVAILABLE",
]);

export async function relayToLovable<T>(
  origin: string,
  operation: StorefrontOperation,
  data: unknown,
  request: Request,
  fetcher: typeof fetch = fetch,
): Promise<T> {
  const url = lovableBackendUrl(origin, new URL(request.url).origin);
  if (!isStorefrontOperation(operation)) throw new Error("INVALID_INPUT");
  const headers = new Headers({ "Content-Type": "application/json", Accept: "application/json" });
  const authorization = request.headers.get("authorization");
  if (authorization) headers.set("Authorization", authorization);
  let response: Response;
  try {
    // Never follow a redirect with a login token, or retry an order/upload write.
    response = await fetcher(url, {
      method: "POST", headers, body: JSON.stringify({ operation, data }),
      // Workers supports "manual", not "error". Reject every redirect below.
      redirect: "manual", cache: "no-store", signal: AbortSignal.timeout(60_000),
    });
  } catch {
    throw new Error("BACKEND_UNAVAILABLE");
  }
  if (response.status >= 300 && response.status < 400) {
    throw new Error("BACKEND_UNAVAILABLE");
  }
  if (!response.headers.get("content-type")?.includes("application/json")) {
    throw new Error("BACKEND_UNAVAILABLE");
  }
  const payload = await response.json().catch(() => null) as {
    ok?: unknown; result?: T; error?: unknown;
  } | null;
  if (!response.ok || payload?.ok !== true || !Object.hasOwn(payload, "result")) {
    const error = typeof payload?.error === "string" && PUBLIC_ERRORS.has(payload.error)
      ? payload.error : "BACKEND_UNAVAILABLE";
    throw new Error(error);
  }
  return payload.result as T;
}

export async function callLovableBackend<T>(operation: StorefrontOperation, data?: unknown): Promise<T> {
  const { getRequest } = await import("@tanstack/react-start/server");
  return relayToLovable<T>(process.env['LOVABLE_BACKEND_ORIGIN'] ?? "", operation, data, getRequest());
}
