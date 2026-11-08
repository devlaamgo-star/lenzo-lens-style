import { describe, expect, it } from "bun:test";
import vm from "node:vm";
import { parse } from "acorn";
import { AUTO_RELOAD_WINDOW_MS, bootGuardScript } from "./boot-guard";

const STRINGS = {
  fr: { title: "Cette page n’a pas pu se charger", retry: "Réessayer" },
  ar: { title: "تعذّر تحميل هذه الصفحة", retry: "إعادة المحاولة" },
  en: { title: "This page could not load", retry: "Try again" },
};
const SCRIPT = bootGuardScript(STRINGS);

function memoryStorage() {
  const data = new Map();
  return {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, String(v)),
    removeItem: (k) => data.delete(k),
  };
}

/** Minimal browser stand-in: enough DOM for the guard, with controllable storage and timers. */
function boot({ storage = memoryStorage(), sessionThrows = false, submitting = false, now = 1_000_000 } = {}) {
  const listeners = {};
  const timers = [];
  const appended = [];
  const reports = [];
  let reloads = 0;
  const element = (tag) => ({ tagName: tag.toUpperCase(), style: {}, attrs: {}, children: [], setAttribute(k, v) { this.attrs[k] = v; }, appendChild(c) { this.children.push(c); } });
  const document = {
    readyState: "loading",
    documentElement: { getAttribute: () => "fr" },
    body: { appendChild: (el) => appended.push(el) },
    createElement: element,
    getElementById: (id) => appended.find((el) => el.id === id) || null,
    querySelector: () => null,
    addEventListener() {},
  };
  function StorageProto() {}
  StorageProto.prototype.getItem = function (k) { return this._d.get(k) ?? null; };
  const realSession = Object.create(StorageProto.prototype);
  realSession._d = new Map();
  const window = {
    document,
    navigator: { userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) Instagram 300.0" },
    location: { pathname: "/objectifs", origin: "https://skinup.ma", reload: () => { reloads += 1; } },
    Storage: StorageProto,
    localStorage: memoryStorage(),
    __skinupSubmitting: submitting,
    __lovableEvents: { captureException: (err, ctx) => reports.push({ message: err.message, ctx }) },
    addEventListener: (type, fn) => { (listeners[type] ||= []).push(fn); },
    setTimeout: (fn) => timers.push(fn),
    Date: { now: () => now },
    _realSession: realSession,
  };
  if (sessionThrows) {
    Object.defineProperty(window, "sessionStorage", {
      configurable: true,
      get() { throw Object.assign(new Error("The operation is insecure."), { name: "SecurityError" }); },
    });
  } else {
    window.sessionStorage = storage;
  }
  window.window = window;
  const context = vm.createContext(window);
  vm.runInContext(SCRIPT, context);
  const runTimers = () => { while (timers.length) timers.shift()(); };
  const fire = (type, event) => (listeners[type] || []).forEach((fn) => fn(event));
  return { window, fire, runTimers, appended, reports, reloads: () => reloads };
}

describe("boot guard script", () => {
  it("is plain ES5 so old phones and in-app browsers can run it", () => {
    expect(() => parse(SCRIPT, { ecmaVersion: 5 })).not.toThrow();
  });

  it("reloads once when the main script fails, then shows the retry bar instead of looping", () => {
    const storage = memoryStorage();
    const first = boot({ storage });
    first.fire("error", { target: { tagName: "SCRIPT", src: "/assets/index-abc.js" } });
    first.runTimers();
    expect(first.reloads()).toBe(1);
    expect(first.appended.length).toBe(0);

    // Same tab after the reload, still failing, within five minutes.
    const second = boot({ storage, now: 1_000_000 + 60_000 });
    second.fire("error", { target: { tagName: "SCRIPT", src: "/assets/index-abc.js" } });
    second.runTimers();
    expect(second.reloads()).toBe(0);
    expect(second.appended[0].id).toBe("skinup-boot-bar");
  });

  it("allows a new automatic reload only after five minutes", () => {
    const storage = memoryStorage();
    expect(boot({ storage }).window.__skinupBoot.claim()).toBe(true);
    expect(boot({ storage, now: 1_000_000 + AUTO_RELOAD_WINDOW_MS - 1 }).window.__skinupBoot.claim()).toBe(false);
    expect(boot({ storage, now: 1_000_000 + AUTO_RELOAD_WINDOW_MS }).window.__skinupBoot.claim()).toBe(true);
  });

  it("never reloads automatically when sessionStorage is denied, and shows the manual retry", () => {
    const page = boot({ sessionThrows: true });
    // The router's own retry can read storage again without a second SecurityError…
    expect(() => page.window.sessionStorage.getItem("anything")).not.toThrow();
    // …and is told it already retried, so it hands the error to the error screen.
    expect(page.window.sessionStorage.getItem("tanstack_router_reload:Importing a module script failed.")).toBe("1");
    expect(page.window.__skinupBoot.reloadOnce("route_import_failed")).toBe(false);
    page.fire("unhandledrejection", { reason: new TypeError("Importing a module script failed.") });
    page.runTimers();
    expect(page.reloads()).toBe(0);
    expect(page.appended[0].id).toBe("skinup-boot-bar");
  });

  it("routes the router's own retry through the shared budget", () => {
    const page = boot();
    expect(page.window._realSession.getItem("tanstack_router_reload:x")).toBe("1");
    expect(page.window._realSession.getItem("other")).toBe(null);
  });

  it("never reloads while an order is being submitted", () => {
    const page = boot({ submitting: true });
    expect(page.window.__skinupBoot.reloadOnce("route_import_failed")).toBe(false);
    expect(page.reloads()).toBe(0);
  });

  it("does nothing once the app has started", () => {
    const page = boot();
    page.window.__skinupBoot.markReady();
    page.fire("error", { target: { tagName: "SCRIPT", src: "/assets/objectifs-x.js" } });
    page.runTimers();
    expect(page.reloads()).toBe(0);
    expect(page.appended.length).toBe(0);
  });

  it("ignores failures of tracking scripts", () => {
    const page = boot();
    page.fire("error", { target: { tagName: "SCRIPT", src: "https://connect.facebook.net/en_US/fbevents.js" } });
    page.fire("error", { message: "Script error.", filename: "https://analytics.tiktok.com/i18n/pixel/events.js" });
    page.runTimers();
    expect(page.reloads()).toBe(0);
    expect(page.window.__skinupBoot.failed).toBe(false);
  });

  it("reports classified errors without query strings or click IDs", () => {
    const page = boot();
    page.fire("unhandledrejection", { reason: new TypeError("Failed to fetch dynamically imported module: https://skinup.ma/assets/a.js?fbclid=SECRET123") });
    page.runTimers();
    const failure = page.reports.find((r) => r.ctx.skinup_kind === "entry_script_failed");
    expect(failure.ctx.route).toBe("/objectifs");
    expect(failure.ctx.browser).toBe("instagram-inapp/ios 17.2");
    expect(JSON.stringify(page.reports)).not.toContain("SECRET123");
  });

  it("shows the retry bar if the page loaded but the app never started", () => {
    const page = boot();
    page.fire("load", {});
    page.runTimers();
    expect(page.appended[0].id).toBe("skinup-boot-bar");
    expect(page.reloads()).toBe(0);
    expect(page.reports.some((r) => r.ctx.skinup_kind === "startup_timeout")).toBe(true);
  });

  it("keeps quiet on a slow load once the app starts", () => {
    const page = boot();
    page.fire("load", {});
    page.window.__skinupBoot.markReady();
    page.runTimers();
    expect(page.appended.length).toBe(0);
  });

  it("classifies hydration errors", () => {
    const page = boot();
    page.window.__skinupBoot.markReady();
    page.fire("error", { message: "Minified React error #418; visit https://react.dev/errors/418" });
    expect(page.reports.some((r) => r.ctx.skinup_kind === "hydration_error")).toBe(true);
  });

  it("keeps the underlying cause of errors React recovered from while hydrating", () => {
    const page = boot();
    page.window.__skinupBoot.markReady();
    const error = Object.assign(new Error("Minified React error #520; visit https://react.dev/errors/520"), {
      cause: new TypeError("Importing a module script failed."),
    });
    page.fire("error", { message: error.message, error });
    const report = page.reports.find((r) => r.ctx.skinup_kind === "hydration_error");
    expect(report.message).toContain("cause: Importing a module script failed.");
  });
});
