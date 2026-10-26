export const TRAFFIC_SOURCES = ["tiktok", "facebook", "instagram", "google", "direct", "other"] as const;
export type TrafficSource = (typeof TRAFFIC_SOURCES)[number];

export type Attribution = {
  trafficSource: TrafficSource;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  fbclid: string;
  ttclid: string;
};

export const SOURCE_LABEL: Record<string, string> = {
  tiktok: "TikTok",
  facebook: "Facebook",
  instagram: "Instagram",
  google: "Google",
  direct: "Direct",
  other: "Autre",
};

const KEY = "skinup-attribution";
const clip = (v: string | null) => (v ?? "").trim().slice(0, 200);

/** Classify a landing URL's query string. Returns null when nothing identifiable is present. */
export function detectAttribution(search: string, referrer = ""): Attribution | null {
  const p = new URLSearchParams(search);
  const a = {
    utmSource: clip(p.get("utm_source")),
    utmMedium: clip(p.get("utm_medium")),
    utmCampaign: clip(p.get("utm_campaign")),
    fbclid: clip(p.get("fbclid")),
    ttclid: clip(p.get("ttclid")),
  };
  const s = a.utmSource.toLowerCase();
  let src: TrafficSource | null = null;
  if (a.ttclid || s.includes("tiktok")) src = "tiktok";
  else if (s.includes("instagram") || s === "ig") src = "instagram";
  else if (s.includes("facebook") || s === "fb" || s === "meta") src = "facebook";
  else if (s.includes("google") || p.get("gclid")) src = "google";
  else if (a.fbclid) src = "facebook";
  else if (s) src = "other";
  else if (referrer) {
    let host = "";
    try { host = new URL(referrer).hostname; } catch { /* ignore */ }
    if (/tiktok\./.test(host)) src = "tiktok";
    else if (/instagram\./.test(host)) src = "instagram";
    else if (/facebook\.|fb\.com|messenger\./.test(host)) src = "facebook";
    else if (/google\./.test(host)) src = "google";
  }
  return src ? { trafficSource: src, ...a } : null;
}

/** Call on every navigation: stores an identifiable source; never overwrites one with Direct. */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    const ref = document.referrer && !document.referrer.startsWith(location.origin) ? document.referrer : "";
    const found = detectAttribution(location.search, ref);
    if (found) localStorage.setItem(KEY, JSON.stringify(found));
  } catch { /* storage blocked */ }
}

export function readAttribution(): Attribution {
  const direct: Attribution = { trafficSource: "direct", utmSource: "", utmMedium: "", utmCampaign: "", fbclid: "", ttclid: "" };
  if (typeof window === "undefined") return direct;
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "null");
    if (v && TRAFFIC_SOURCES.includes(v.trafficSource)) return { ...direct, ...v };
  } catch { /* ignore */ }
  return direct;
}
