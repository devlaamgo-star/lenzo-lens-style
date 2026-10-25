export const TIKTOK_PIXEL_ID = "DBF78F3C77U4J2JQEKJG";
export const TIKTOK_OPTOUT_KEY = "skinup-tiktok-advertising-choice";

// Serialized into the global head; all browser operations stay inside this function.
function installTikTok(pixelId: string, choiceKey: string) {
  const w = window as typeof window & {
    skinupTikTokPage?: () => void;
    skinupTikTokInstalled?: boolean;
    TiktokAnalyticsObject?: string;
    ttq?: any;
  };
  if (w.skinupTikTokInstalled) return;
  w.skinupTikTokInstalled = true;
  let regionAllowed = false;
  let lastPage = "";
  const deniedCountries = new Set("AT BE BG HR CY CZ DK EE FI FR DE GR HU IS IE IT LV LI LT LU MT NL NO PL PT RO SK SI ES SE GB CH".split(" "));
  function optedOut() {
    try {
      const saved = localStorage.getItem(choiceKey);
      const legacy = localStorage.getItem("cookie_consent");
      return Boolean(saved) || legacy === "false" || legacy === "denied" ||
        navigator.globalPrivacyControl === true || navigator.doNotTrack === "1";
    } catch { return true; }
  }
  function load() {
    if (w.ttq?._i?.[pixelId]) return;
    w.TiktokAnalyticsObject = "ttq";
    const ttq = w.ttq = w.ttq || [];
    ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"];
    ttq.setAndDefer = function (target: any, method: string) {
      target[method] = function (...args: any[]) { target.push([method, ...args]); };
    };
    for (const method of ttq.methods) ttq.setAndDefer(ttq, method);
    ttq.instance = function (id: string) {
      const instance = ttq._i[id] || [];
      for (const method of ttq.methods) ttq.setAndDefer(instance, method);
      return instance;
    };
    ttq._i = ttq._i || {};
    ttq._i[pixelId] = [];
    ttq._i[pixelId]._u = "https://analytics.tiktok.com/i18n/pixel/events.js";
    ttq._t = ttq._t || {};
    ttq._t[pixelId] = Date.now();
    ttq._o = ttq._o || {};
    ttq._o[pixelId] = {};
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${pixelId}&lib=ttq`;
    document.head.appendChild(script);
  }
  w.skinupTikTokPage = () => {
    if (!regionAllowed || optedOut()) return;
    const page = location.pathname;
    if (page === lastPage) return;
    load();
    w.ttq.page();
    lastPage = page;
  };
  const applyOptOut = () => {
    if (optedOut() && w.ttq) {
      w.ttq.revokeConsent();
      w.ttq.disableCookie();
    }
  };
  window.addEventListener("storage", applyOptOut);
  window.addEventListener("skinup-advertising-choice", applyOptOut);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2000);
  fetch("/cdn-cgi/trace", { signal: controller.signal, credentials: "same-origin" })
    .then(async response => {
      if (!response.ok) return;
      const country = (await response.text()).match(/^loc=([A-Z]{2})$/m)?.[1];
      regionAllowed = Boolean(country && country !== "XX" && !deniedCountries.has(country));
      w.skinupTikTokPage?.();
    })
    .catch(() => { /* Unknown region: no transmission. */ })
    .finally(() => clearTimeout(timeout));
}

export const TIKTOK_HEAD_SCRIPT = `(${installTikTok.toString()})(${JSON.stringify(TIKTOK_PIXEL_ID)},${JSON.stringify(TIKTOK_OPTOUT_KEY)});`;

declare global {
  interface Navigator { readonly globalPrivacyControl?: boolean }
  interface Window { skinupTikTokPage?: () => void }
}