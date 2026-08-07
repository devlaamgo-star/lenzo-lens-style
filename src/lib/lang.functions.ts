import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { LANGS, type Lang } from "./translations";

const COOKIE = "skinup-lang";

function normalize(value: string | undefined | null): Lang {
  return value && (LANGS as readonly string[]).includes(value) ? (value as Lang) : "fr";
}

/** Reads the visitor language cookie during SSR so the first paint is already localized. */
export const getServerLang = createServerFn({ method: "GET" }).handler(() => {
  const cookie = getRequest().headers.get("cookie") ?? "";
  const match = cookie.match(/(?:^|;\s*)skinup-lang=([^;]+)/);
  return normalize(match?.[1]);
});

export const LANG_COOKIE = COOKIE;
