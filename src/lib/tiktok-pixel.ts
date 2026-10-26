export const TIKTOK_PIXEL_ID = "DBF78F3C77U4J2JQEKJG";
export const TIKTOK_OPTOUT_KEY = "skinup-tiktok-advertising-choice";

// Serialized into the global head; all browser operations stay inside this function.
function installTikTok(pixelId: string, choiceKey: string) {
  const w = window as typeof window & {
    skinupTikTokPage?: () => void;
    skinupTikTokSubmitForm?: (submissionId: string) => void;
    skinupTikTokPurchase?: (orderNumber: string, details: { value: number; quantity: number; contentIds: string[] }) => void;
    skinupTikTokInstalled?: boolean;
    TiktokAnalyticsObject?: string;
    ttq?: any;
  };
  if (w.skinupTikTokInstalled) return;
  w.skinupTikTokInstalled = true;
  let regionAllowed = false;
  let lastPage = "";
  let visitRefused = false;
  const completedSubmissions = new Set<string>();
  const completedPurchases = new Set<string>();
  const deniedCountries = new Set("AT BE BG HR CY CZ DK EE FI FR DE GR HU IS IE IT LV LI LT LU MT NL NO PL PT RO SK SI ES SE GB CH".split(" "));
  const knownCountries = new Set("AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW".split(" "));
  function optedOut() {
    try {
      const saved = localStorage.getItem(choiceKey);
      const legacy = localStorage.getItem("cookie_consent");
      return visitRefused || Boolean(saved) || legacy === "false" || legacy === "denied" ||
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
  // Called only by a form's confirmed success path. Never queue blocked outcomes.
  w.skinupTikTokSubmitForm = (submissionId: string) => {
    if (!submissionId || completedSubmissions.has(submissionId)) return;
    const key = `skinup-tiktok-submit:${submissionId}`;
    try { if (sessionStorage.getItem(key)) return; } catch { /* In-memory deduplication remains available. */ }
    completedSubmissions.add(submissionId);
    try { sessionStorage.setItem(key, "handled"); } catch { /* Never prevent checkout success. */ }
    if (!regionAllowed || optedOut()) return;
    try {
      load();
      w.ttq.track('SubmitForm');
    } catch { /* Advertising failure must not turn a saved order into a failed submission. */ }
  };
  // Standard Purchase event, fired once per saved order from the checkout success path.
  w.skinupTikTokPurchase = (orderNumber: string, details: { value: number; quantity: number; contents: { id: string; qty: number }[] }) => {
    if (!orderNumber || completedPurchases.has(orderNumber)) return;
    const key = `skinup-tiktok-purchase:${orderNumber}`;
    try { if (sessionStorage.getItem(key)) return; } catch { /* In-memory deduplication remains available. */ }
    completedPurchases.add(orderNumber);
    try { sessionStorage.setItem(key, "handled"); } catch { /* Never prevent checkout success. */ }
    if (!regionAllowed || optedOut()) return;
    try {
      load();
      w.ttq.track('Purchase', {
        value: details.value,
        currency: 'MAD',
        content_type: 'product',
        contents: details.contents.map(c => ({ content_id: c.id, quantity: c.qty })),
        quantity: details.quantity,
      });
    } catch { /* Advertising failure must not turn a saved order into a failed purchase. */ }
  };
  const applyOptOut = () => {
    if (optedOut() && w.ttq) {
      w.ttq.revokeConsent();
      w.ttq.disableCookie();
    }
  };
  window.addEventListener("storage", applyOptOut);
  window.addEventListener("skinup-advertising-choice", () => { visitRefused = true; applyOptOut(); });
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2000);
  fetch("/cdn-cgi/trace", { signal: controller.signal, credentials: "same-origin" })
    .then(async response => {
      if (!response.ok) return;
      const country = (await response.text()).match(/^loc=([A-Z]{2})$/m)?.[1];
      regionAllowed = Boolean(country && knownCountries.has(country) && !deniedCountries.has(country));
      w.skinupTikTokPage?.();
    })
    .catch(() => { /* Unknown region: no transmission. */ })
    .finally(() => clearTimeout(timeout));
}

export const TIKTOK_HEAD_SCRIPT = `(${installTikTok.toString()})(${JSON.stringify(TIKTOK_PIXEL_ID)},${JSON.stringify(TIKTOK_OPTOUT_KEY)});`;

declare global {
  interface Navigator { readonly globalPrivacyControl?: boolean }
  interface Window {
    skinupTikTokPage?: () => void;
    skinupTikTokSubmitForm?: (submissionId: string) => void;
    skinupTikTokPurchase?: (orderNumber: string, details: { value: number; quantity: number; contentIds: string[] }) => void;
  }
}