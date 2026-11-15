import { describe, expect, it } from "vitest";
import { chunk, isOzonShipment, parseOzonTracking } from "./ozon-tracking";

const ok = { CHECK_API: { RESULT: "SUCCESS", MESSAGE: "Valide API Key" } };

describe("Ozon tracking", () => {
  it("keeps Ozon's exact latest status for each tracking number", () => {
    const out = parseOzonTracking({
      ...ok,
      TRACKING: {
        "TRACKING-NUMBER": "RCH082069088EA",
        RESULT: "SUCCESS",
        LAST_TRACKING: { STATUT: "Livré", TIME: "1598343806", TIME_STR: "2020-08-25 09:23" },
      },
    });
    expect(out).toEqual([
      { trackingNumber: "RCH082069088EA", status: "Livré", at: new Date(1598343806000).toISOString() },
    ]);
  });

  it("skips failed tracking lookups so the previous status is kept", () => {
    const out = parseOzonTracking({
      ...ok,
      MODE: "MULTI",
      "TRACKING-LIST": {
        A1: { RESULT: "ERROR", MESSAGE: "Tracking number not found" },
        B2: { RESULT: "SUCCESS", LAST_TRACKING: { STATUT: "Ramassé", TIME: "1" } },
      },
    });
    expect(out.map((o) => o.trackingNumber)).toEqual(["B2"]);
  });

  it("rejects a response where Ozon refuses the API key", () => {
    expect(() =>
      parseOzonTracking({ CHECK_API: { RESULT: "ERROR", MESSAGE: "Please verify your API Key" } }),
    ).toThrow("OZON_API_REJECTED");
  });

  it("syncs only orders with a tracking number and a blank or Ozon carrier", () => {
    expect(isOzonShipment("ABC", "")).toBe(true);
    expect(isOzonShipment("ABC", "Ozon Express")).toBe(true);
    expect(isOzonShipment("ABC", "Amana")).toBe(false);
    expect(isOzonShipment("", "Ozon")).toBe(false);
  });

  it("splits tracking numbers into bulk requests", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });
});
