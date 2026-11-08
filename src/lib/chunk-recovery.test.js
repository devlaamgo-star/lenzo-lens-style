import { describe, expect, it } from "bun:test";
import { AUTO_RELOAD_WINDOW_MS, claimAutoReload, isChunkLoadError } from "./chunk-recovery";

function memoryStorage() {
  const data = new Map();
  return { getItem: (k) => (data.has(k) ? data.get(k) : null), setItem: (k, v) => data.set(k, String(v)) };
}

describe("isChunkLoadError", () => {
  it("recognises the script-download failures seen on visitors' phones", () => {
    expect(isChunkLoadError(new TypeError("Importing a module script failed."))).toBe(true);
    expect(
      isChunkLoadError(new TypeError("Failed to fetch dynamically imported module: https://www.skinup.ma/assets/objectifs.index-BwViffeV.js")),
    ).toBe(true);
    expect(isChunkLoadError(new Error("error loading dynamically imported module"))).toBe(true);
  });

  it("does not treat ordinary errors as download failures", () => {
    expect(isChunkLoadError(new SyntaxError("Unexpected token '{'"))).toBe(false);
    expect(isChunkLoadError(new TypeError("Cannot read properties of undefined"))).toBe(false);
    expect(isChunkLoadError(null)).toBe(false);
  });
});

describe("claimAutoReload", () => {
  it("allows only one automatic reload within five minutes", () => {
    const storage = memoryStorage();
    const t0 = 1_000_000;
    expect(claimAutoReload(storage, t0)).toBe(true);
    expect(claimAutoReload(storage, t0 + 1_000)).toBe(false);
    expect(claimAutoReload(storage, t0 + AUTO_RELOAD_WINDOW_MS - 1)).toBe(false);
    expect(claimAutoReload(storage, t0 + AUTO_RELOAD_WINDOW_MS)).toBe(true);
  });

  it("never reloads automatically when browser storage is blocked", () => {
    expect(claimAutoReload(null, 1)).toBe(false);
    const throwing = { getItem: () => { throw new Error("SecurityError"); }, setItem: () => {} };
    expect(claimAutoReload(throwing, 1)).toBe(false);
    const ignoring = { getItem: () => null, setItem: () => {} };
    expect(claimAutoReload(ignoring, 1)).toBe(false);
  });
});

describe("claimAutoReload with the page-only storage replacement", () => {
  it("treats the replacement as unavailable so reloads cannot loop", () => {
    const shim = { __skinupMemory: true, getItem: () => null, setItem: () => {} };
    expect(claimAutoReload(shim, 1)).toBe(false);
  });
});
