import { z } from "zod";
import { DELIVERY_ZONES } from "@/data/delivery-zones";

const labels = new Set(DELIVERY_ZONES.map((zone) => zone.label));
export function isDeliveryZone(value: string): boolean {
  return labels.has(value);
}

function searchText(value: string): string {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

export function searchDeliveryZones(query: string) {
  const words = searchText(query).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return DELIVERY_ZONES.filter((zone) => {
    const haystack = searchText([zone.label, zone.parentCity, ...zone.aliases].join(" "));
    return words.every((word) => haystack.includes(word));
  });
}

/** Require multiple address details without insisting on a house number in rural areas. */
export function isCompleteAddress(value: string): boolean {
  const text = value.trim();
  const words = text.match(/[\p{L}\p{N}]+/gu) ?? [];
  return text.length >= 15 && text.length <= 300 && words.length >= 3;
}

// No transform on the selected zone: its approved label is stored verbatim.
export const deliveryZoneSchema = z.string().max(120).refine(isDeliveryZone, "SELECT_APPROVED_DELIVERY_ZONE");
export const fullAddressSchema = z.string().trim().max(300).refine(isCompleteAddress, "FULL_ADDRESS_REQUIRED");