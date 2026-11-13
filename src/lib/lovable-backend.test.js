import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";
import {
  lovableBackendUrl,
  relayToLovable,
} from "./lovable-backend.server";
import {
  handleStorefrontRequest,
  storefrontReadiness,
} from "./storefront-api.server";

const BACKEND = "https://skinup-backend-test.lovable.app";
const EXTERNAL = "https://skinup-test.example";
const ENV_NAMES = [
  "LOVABLE_BACKEND_ORIGIN", "SUPABASE_URL",
  "SUPABASE_PUBLISHABLE_KEY", "SUPABASE_SERVICE_ROLE_KEY",
];
let savedEnv;

beforeEach(() => {
  savedEnv = Object.fromEntries(ENV_NAMES.map((name) => [name, process.env[name]]));
  delete process.env.LOVABLE_BACKEND_ORIGIN;
  process.env.SUPABASE_URL = "https://supabase-test.example";
  process.env.SUPABASE_PUBLISHABLE_KEY = "dummy-publishable-key-for-tests";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "dummy-service-key-for-tests";
});

afterEach(() => {
  for (const name of ENV_NAMES) {
    if (savedEnv[name] === undefined) delete process.env[name];
    else process.env[name] = savedEnv[name];
  }
});

function apiRequest(operation, data, headers = {}) {
  return new Request(`${BACKEND}/api/storefront`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify({ operation, data }),
  });
}

async function expectApiError(response, status, error) {
  expect(response.status).toBe(status);
  expect(response.headers.get("cache-control")).toBe("no-store");
  expect(await response.json()).toEqual({ ok: false, error });
}

describe("Cloudflare relay", () => {
  it("returns the backend result and forwards only the caller's login token", async () => {
    const fetcher = mock(async () => Response.json({ ok: true, result: [{ id: "order-1" }] }));
    const request = new Request(`${EXTERNAL}/_serverFn/example`, {
      headers: {
        Authorization: "Bearer dummy-user-token",
        Cookie: "session=must-stay-at-the-original-host",
        Origin: EXTERNAL,
        Referer: `${EXTERNAL}/admin/orders`,
        "X-Private-Header": "must-not-forward",
      },
    });

    const result = await relayToLovable(BACKEND, "listAdminOrders", undefined, request, fetcher);

    expect(result).toEqual([{ id: "order-1" }]);
    expect(fetcher).toHaveBeenCalledTimes(1);
    const [url, options] = fetcher.mock.calls[0];
    expect(String(url)).toBe(`${BACKEND}/api/storefront`);
    expect(options.method).toBe("POST");
    expect(Object.fromEntries(options.headers.entries())).toEqual({
      accept: "application/json",
      authorization: "Bearer dummy-user-token",
      "content-type": "application/json",
    });
    expect(JSON.parse(options.body)).toEqual({ operation: "listAdminOrders" });
    expect(options.redirect).toBe("manual");
    expect(options.cache).toBe("no-store");
    expect(options.signal).toBeInstanceOf(AbortSignal);
  });

  it("sends validated guest data without inventing an authorization token", async () => {
    const data = { customer: "Test customer", items: [{ id: "test-item" }] };
    const result = { orderNumber: "TEST-1", total: 79, quantity: 1, shipping: 0 };
    const fetcher = mock(async () => Response.json({ ok: true, result }));
    expect(await relayToLovable(BACKEND, "createOrder", data, new Request(EXTERNAL), fetcher)).toEqual(result);
    expect(fetcher.mock.calls[0][1].headers.has("authorization")).toBe(false);
    expect(JSON.parse(fetcher.mock.calls[0][1].body)).toEqual({ operation: "createOrder", data });
  });

  it("never retries a write after a network failure", async () => {
    const fetcher = mock(async () => { throw new Error("upstream disconnected after insert"); });
    await expect(relayToLovable(BACKEND, "createOrder", {}, new Request(EXTERNAL), fetcher))
      .rejects.toThrow("BACKEND_UNAVAILABLE");
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it.each([301, 302, 303, 307, 308])("does not retry or follow an upstream %s redirect", async (status) => {
    const fetcher = mock(async () => Response.json({ ok: true, result: { id: "must-not-accept" } }, {
      status, headers: { Location: "https://untrusted.example/collect" },
    }));
    const request = new Request(EXTERNAL, { headers: { Authorization: "Bearer dummy-user-token" } });
    await expect(relayToLovable(BACKEND, "saveCustomSkin", {}, request, fetcher))
      .rejects.toThrow("BACKEND_UNAVAILABLE");
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(fetcher.mock.calls[0][1].redirect).toBe("manual");
  });

  it.each([
    "http://skinup-backend-test.lovable.app",
    "https://skinup-backend-test.lovable.app.evil.example",
    "https://lovable.app",
    "https://127.0.0.1",
    "https://user:password@skinup-backend-test.lovable.app",
    "https://skinup-backend-test.lovable.app:8443",
    "https://skinup-backend-test.lovable.app/api/storefront",
    "https://skinup-backend-test.lovable.app?token=bad",
    "https://skinup-backend-test.lovable.app#fragment",
  ])("rejects an unsafe backend origin: %s", async (origin) => {
    const fetcher = mock(async () => Response.json({ ok: true, result: {} }));
    await expect(relayToLovable(origin, "createOrder", {}, new Request(EXTERNAL), fetcher))
      .rejects.toThrow("BACKEND_CONFIGURATION_INVALID");
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("rejects a relay loop before contacting the backend", async () => {
    const fetcher = mock(async () => Response.json({ ok: true, result: {} }));
    await expect(relayToLovable(BACKEND, "createOrder", {}, new Request(BACKEND), fetcher))
      .rejects.toThrow("BACKEND_CONFIGURATION_INVALID");
    expect(fetcher).not.toHaveBeenCalled();
    expect(String(lovableBackendUrl(`${BACKEND}/`, EXTERNAL))).toBe(`${BACKEND}/api/storefront`);
  });

  it.each(["constructor", "toString", "__proto__", "runSql"])(
    "rejects an unrecognized operation before sending it: %s", async (operation) => {
      const fetcher = mock(async () => Response.json({ ok: true, result: {} }));
      await expect(relayToLovable(BACKEND, operation, {}, new Request(EXTERNAL), fetcher))
        .rejects.toThrow("INVALID_INPUT");
      expect(fetcher).not.toHaveBeenCalled();
    },
  );

  it.each(["UNAUTHORIZED", "FORBIDDEN", "INVALID_INPUT", "ORDER_FAILED"])(
    "preserves a documented backend error: %s", async (error) => {
      const fetcher = mock(async () => Response.json({ ok: false, error }, { status: 400 }));
      await expect(relayToLovable(BACKEND, "createOrder", {}, new Request(EXTERNAL), fetcher))
        .rejects.toThrow(error);
      expect(fetcher).toHaveBeenCalledTimes(1);
    },
  );

  it("hides database errors received from the backend", async () => {
    const fetcher = mock(async () => Response.json({
      ok: false, error: "database detail containing customer data or a private token",
    }, { status: 500 }));
    await expect(relayToLovable(BACKEND, "listAdminOrders", undefined, new Request(EXTERNAL), fetcher))
      .rejects.toThrow("BACKEND_UNAVAILABLE");
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it.each([
    () => new Response("<html>login page</html>", { headers: { "Content-Type": "text/html" } }),
    () => new Response("{broken", { headers: { "Content-Type": "application/json" } }),
    () => Response.json({ ok: true }),
    () => Response.json(null),
    () => Response.json({ ok: false, error: "unexpected error" }),
  ])("rejects an unusable backend response without retrying", async (makeResponse) => {
    const fetcher = mock(async () => makeResponse());
    await expect(relayToLovable(BACKEND, "createOrder", {}, new Request(EXTERNAL), fetcher))
      .rejects.toThrow("BACKEND_UNAVAILABLE");
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
});

describe("Lovable storefront endpoint", () => {
  it("dispatches a public operation with its data and returns a noncached result", async () => {
    const data = { items: [{ productId: "test-design" }] };
    const execute = mock(async () => ({ orderNumber: "TEST-2" }));
    const response = await handleStorefrontRequest(apiRequest("createOrder", data), execute);
    expect(execute).toHaveBeenCalledWith("createOrder", data);
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    expect(await response.json()).toEqual({ ok: true, result: { orderNumber: "TEST-2" } });
  });

  it.each([
    "getAdminStatus", "listAdminOrders", "getRecordFileUrls", "updateRecordStatus",
    "bulkUpdateStatus", "updateRecordOps", "deleteRecords",
  ])("rejects unauthenticated %s before dispatch", async (operation) => {
    const execute = mock(async () => ({ shouldNeverRun: true }));
    const response = await handleStorefrontRequest(apiRequest(operation, {}), execute);
    await expectApiError(response, 401, "UNAUTHORIZED");
    expect(execute).not.toHaveBeenCalled();
  });

  it.each(["Basic abc", "Bearer", "Bearer ", "Bearer token extra"])(
    "rejects malformed authorization before dispatch: %s", async (authorization) => {
      const execute = mock(async () => []);
      await expectApiError(await handleStorefrontRequest(
        apiRequest("listAdminOrders", undefined, { Authorization: authorization }), execute,
      ), 401, "UNAUTHORIZED");
      expect(execute).not.toHaveBeenCalled();
    },
  );

  it.each([
    ["Unauthorized: Invalid token", 401, "UNAUTHORIZED"],
    ["Forbidden", 403, "FORBIDDEN"],
  ])("maps a handler authorization failure: %s", async (message, status, error) => {
    const execute = mock(async () => { throw new Error(message); });
    const response = await handleStorefrontRequest(
      apiRequest("listAdminOrders", undefined, { Authorization: "Bearer dummy-user-token" }), execute,
    );
    await expectApiError(response, status, error);
    expect(execute).toHaveBeenCalledTimes(1);
  });

  it("passes an authenticated admin request to the existing authorization layer", async () => {
    const execute = mock(async () => ({ isAdmin: false, adminExists: true }));
    const response = await handleStorefrontRequest(
      apiRequest("getAdminStatus", undefined, { Authorization: "Bearer dummy-user-token" }), execute,
    );
    expect(execute).toHaveBeenCalledWith("getAdminStatus", undefined);
    expect(await response.json()).toEqual({ ok: true, result: { isAdmin: false, adminExists: true } });
  });

  it.each(["constructor", "toString", "__proto__", "runSql", null, 12])(
    "rejects an unknown or invalid operation: %s", async (operation) => {
      const execute = mock(async () => ({}));
      await expectApiError(await handleStorefrontRequest(apiRequest(operation, {}), execute), 400, "INVALID_INPUT");
      expect(execute).not.toHaveBeenCalled();
    },
  );

  it.each(["{invalid json", "null", "[]", '"createOrder"', "{}"])(
    "rejects an invalid request body: %s", async (body) => {
      const execute = mock(async () => ({}));
      const request = new Request(`${BACKEND}/api/storefront`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body,
      });
      await expectApiError(await handleStorefrontRequest(request, execute), 400, "INVALID_INPUT");
      expect(execute).not.toHaveBeenCalled();
    },
  );

  it("rejects non-JSON content and unsupported methods", async () => {
    const execute = mock(async () => ({}));
    await expectApiError(await handleStorefrontRequest(new Request(`${BACKEND}/api/storefront`, {
      method: "POST", body: JSON.stringify({ operation: "createOrder" }),
    }), execute), 415, "INVALID_INPUT");
    await expectApiError(await handleStorefrontRequest(new Request(`${BACKEND}/api/storefront`), execute), 405, "METHOD_NOT_ALLOWED");
    expect(execute).not.toHaveBeenCalled();
  });

  it("rejects a declared oversized request without reading or dispatching it", async () => {
    const execute = mock(async () => ({}));
    const request = apiRequest("saveCustomSkin", {}, { "Content-Length": "31000001" });
    await expectApiError(await handleStorefrontRequest(request, execute), 413, "INVALID_INPUT");
    expect(request.bodyUsed).toBe(false);
    expect(execute).not.toHaveBeenCalled();
  });

  it("enforces the streamed body limit even with a false content length", async () => {
    const execute = mock(async () => ({}));
    let cancelled = false;
    const stream = new ReadableStream({
      start(controller) { controller.enqueue(new Uint8Array(31_000_001)); },
      cancel() { cancelled = true; },
    });
    const request = new Request(`${BACKEND}/api/storefront`, {
      method: "POST", duplex: "half",
      headers: { "Content-Type": "application/json", "Content-Length": "1" },
      body: stream,
    });
    await expectApiError(await handleStorefrontRequest(request, execute), 413, "INVALID_INPUT");
    expect(cancelled).toBe(true);
    expect(execute).not.toHaveBeenCalled();
  });

  it("maps validation failures without exposing field contents", async () => {
    const execute = mock(async () => {
      const error = new Error("private customer data in validation details");
      error.name = "ZodError";
      throw error;
    });
    await expectApiError(await handleStorefrontRequest(apiRequest("createOrder", {}), execute), 400, "INVALID_INPUT");
  });

  it.each(["EMPTY_ORDER", "MODEL_REQUIRED", "INVALID_FILE_TYPE", "INVALID_FILE_SIZE", "INVALID_PREVIEW"])(
    "preserves an expected validation code: %s", async (code) => {
      const execute = mock(async () => { throw new Error(code); });
      await expectApiError(await handleStorefrontRequest(apiRequest("createOrder", {}), execute), 400, code);
    },
  );

  it.each([
    ["createOrder", "ORDER_FAILED"],
    ["saveCustomSkin", "BACKEND_UNAVAILABLE"],
    ["listAdminOrders", "BACKEND_UNAVAILABLE"],
  ])("sanitizes internal failures in %s", async (operation, error) => {
    const execute = mock(async () => { throw new Error("database detail with a private token and customer records"); });
    const response = await handleStorefrontRequest(
      apiRequest(operation, {}, { Authorization: "Bearer dummy-user-token" }), execute,
    );
    await expectApiError(response, 502, error);
  });

  it("reports readiness only when a local backend is available", async () => {
    const ready = storefrontReadiness();
    expect(ready.status).toBe(200);
    expect(await ready.json()).toEqual({ service: "skinup-storefront", version: 1 });
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    await expectApiError(storefrontReadiness(), 503, "BACKEND_UNAVAILABLE");
  });

  it("disables both readiness and dispatch on a relay deployment", async () => {
    process.env.LOVABLE_BACKEND_ORIGIN = BACKEND;
    const execute = mock(async () => ({}));
    await expectApiError(storefrontReadiness(), 503, "BACKEND_UNAVAILABLE");
    await expectApiError(await handleStorefrontRequest(apiRequest("createOrder", {}), execute), 503, "BACKEND_UNAVAILABLE");
    expect(execute).not.toHaveBeenCalled();
  });
});
