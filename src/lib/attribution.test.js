import { expect, test } from "bun:test";
import { detectAttribution } from "./attribution.ts";

const src = (q, r) => detectAttribution(q, r)?.trafficSource ?? "direct";

test("ttclid → TikTok", () => expect(src("?ttclid=abc")).toBe("tiktok"));
test("utm_source=tiktok → TikTok", () => expect(src("?utm_source=tiktok")).toBe("tiktok"));
test("fbclid → Facebook", () => expect(src("?fbclid=x")).toBe("facebook"));
test("utm_source=instagram with fbclid → Instagram", () => expect(src("?utm_source=instagram&fbclid=x")).toBe("instagram"));
test("utm_source=facebook → Facebook", () => expect(src("?utm_source=facebook")).toBe("facebook"));
test("utm_source=google → Google", () => expect(src("?utm_source=google")).toBe("google"));
test("nothing → Direct", () => expect(src("")).toBe("direct"));
test("keeps campaign fields", () => {
  const a = detectAttribution("?utm_source=tiktok&utm_medium=paid&utm_campaign=promo");
  expect([a.utmMedium, a.utmCampaign]).toEqual(["paid", "promo"]);
});
