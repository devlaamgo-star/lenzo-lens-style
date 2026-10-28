export const META_PIXEL_ID = "1593210515384208";
export const META_CONSENT_KEY = "skinup-meta-consent";
export const META_NOTICE_VERSION = "2026-10-28";

export type MetaParams = Record<string, unknown>;
export type MetaConsentRecord = { advertising: boolean; provider: "Meta"; at: string; notice: string; noticeText: string; region: string };

// Serialized into the global head; all browser operations stay inside this function.
function installMeta(pixelId: string, consentKey: string) {
  const w = window as any;
  if (w.skinupMetaInstalled) return;
  w.skinupMetaInstalled = true;
  // "open": no consent required; "consent": EEA/UK/CH or unresolved region.
  let region: "pending" | "open" | "consent" = "pending";
  let country = "XX";
  let lastPage = "";
  let loaded = false;
  let pending: [string, any, any][] = [];
  const firedPurchases = new Set<string>();
  const denied = new Set("AT BE BG HR CY CZ DK EE FI FR DE GR HU IS IE IT LV LI LT LU MT NL NO PL PT RO SK SI ES SE GB CH".split(" "));
  function choice(): { advertising?: boolean } | null {
    try { const raw = localStorage.getItem(consentKey); return raw ? JSON.parse(raw) : null; } catch { return null; }
  }
  function allowed() {
    try {
      const legacy = localStorage.getItem("cookie_consent");
      if (legacy === "false" || legacy === "denied") return false;
      if (navigator.globalPrivacyControl === true || navigator.doNotTrack === "1") return false;
    } catch { return false; }
    const c = choice();
    if (c && c.advertising === false) return false;
    if (region === "open") return true;
    if (region === "consent") return c?.advertising === true;
    return false;
  }
  function load() {
    if (!loaded) {
      loaded = true;
      if (!w.fbq) {
        const n: any = (w.fbq = function (...args: any[]) { n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args); });
        if (!w._fbq) w._fbq = n;
        n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
        const s = document.createElement("script");
        s.async = true; s.src = "https://connect.facebook.net/en_US/fbevents.js";
        document.head.appendChild(s);
      }
      w.fbq("init", pixelId, {}, { agent: "lovable" });
    }
    w.fbq("consent", "grant");
  }
  function send(kind: string, name: any, data: any) {
    try {
      load();
      if (kind === "page") w.fbq("track", "PageView");
      else w.fbq("track", name, data.params, data.eventID ? { eventID: data.eventID } : undefined);
    } catch { /* Advertising must never break the store. */ }
  }
  function dispatch(kind: string, name: any, data: any) {
    if (region === "pending") { pending.push([kind, name, data]); return; }
    if (allowed()) send(kind, name, data);
  }
  w.skinupMetaPage = () => {
    const page = location.pathname + location.search;
    if (page === lastPage) return;
    lastPage = page;
    dispatch("page", null, {});
  };
  w.skinupMetaTrack = (name: string, params: any, eventID?: string) => dispatch("track", name, { params, eventID });
  // Purchase fires once per saved order, also across reloads and tabs.
  w.skinupMetaPurchase = (orderId: string, params: any) => {
    if (!orderId || firedPurchases.has(orderId)) return;
    const key = `skinup-meta-purchase:${orderId}`;
    try { if (localStorage.getItem(key)) return; localStorage.setItem(key, "1"); } catch { /* memory dedupe remains */ }
    firedPurchases.add(orderId);
    dispatch("track", "Purchase", { params: { ...params, order_id: orderId }, eventID: `purchase-${orderId}` });
  };
  w.skinupMetaNeedsBanner = () => region === "consent" && !choice();
  w.skinupMetaRegion = () => country;
  w.skinupMetaApply = () => {
    if (allowed()) { load(); }
    else if (loaded && w.fbq) w.fbq("consent", "revoke");
  };
  window.addEventListener("storage", e => { if (e.key === consentKey || e.key === "cookie_consent") w.skinupMetaApply(); });
  const finish = (r: "open" | "consent") => {
    region = r;
    const queued = pending; pending = [];
    // Events decided before a banner choice are dropped, never replayed.
    if (allowed()) for (const [k, n, d] of queued) send(k, n, d);
    window.dispatchEvent(new Event("skinup-meta-region"));
  };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2000);
  fetch("/cdn-cgi/trace", { signal: controller.signal, credentials: "same-origin" })
    .then(async res => {
      if (!res.ok) return finish("consent");
      const text = await res.text();
      country = text.match(/^loc=([A-Z0-9]{2})$/m)?.[1] ?? "XX";
      finish(country === "XX" || country === "T1" || denied.has(country) ? "consent" : "open");
    })
    .catch(() => finish("consent"))
    .finally(() => clearTimeout(timeout));
}

export const META_HEAD_SCRIPT = `(${installMeta.toString()})(${JSON.stringify(META_PIXEL_ID)},${JSON.stringify(META_CONSENT_KEY)});`;

export function saveMetaConsent(advertising: boolean, noticeText: string) {
  const record: MetaConsentRecord = {
    advertising, provider: "Meta", at: new Date().toISOString(), notice: META_NOTICE_VERSION, noticeText,
    region: window.skinupMetaRegion?.() ?? "XX",
  };
  try { localStorage.setItem(META_CONSENT_KEY, JSON.stringify(record)); } catch { /* applies for this visit only */ }
  window.skinupMetaApply?.();
  window.dispatchEvent(new Event("skinup-meta-choice"));
}

export function readMetaConsent(): MetaConsentRecord | null {
  try { const raw = localStorage.getItem(META_CONSENT_KEY); return raw ? JSON.parse(raw) : null; } catch { return null; }
}

export function metaTrack(name: string, params: MetaParams, eventID?: string) {
  try { window.skinupMetaTrack?.(name, params, eventID); } catch { /* never block the store */ }
}

declare global {
  interface Window {
    skinupMetaPage?: () => void;
    skinupMetaTrack?: (name: string, params: MetaParams, eventID?: string) => void;
    skinupMetaPurchase?: (orderId: string, params: MetaParams) => void;
    skinupMetaNeedsBanner?: () => boolean;
    skinupMetaRegion?: () => string;
    skinupMetaApply?: () => void;
  }
}
