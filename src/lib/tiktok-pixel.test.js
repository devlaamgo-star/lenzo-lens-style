import { expect, test } from "bun:test";
import { runInNewContext } from "node:vm";
import { TIKTOK_HEAD_SCRIPT, TIKTOK_PIXEL_ID, TIKTOK_OPTOUT_KEY } from "./tiktok-pixel";

async function visit(region, saved = null, ok = true) {
  const scripts = [];
  const listeners = {};
  const window = { addEventListener: (name, fn) => { listeners[name] = fn; } };
  const location = { pathname: "/" };
  const context = {
    window, location, navigator: {}, Date, Set, Boolean, AbortController,
    localStorage: { getItem: key => key === TIKTOK_OPTOUT_KEY ? saved : null },
    document: { createElement: () => ({}), head: { appendChild: script => scripts.push(script) } },
    setTimeout, clearTimeout,
    fetch: async () => ({ ok, text: async () => `loc=${region}\n` }),
  };
  runInNewContext(TIKTOK_HEAD_SCRIPT, context);
  await new Promise(resolve => setTimeout(resolve, 10));
  return { window, location, scripts, listeners, context };
}

test("requested TikTok account initializes once and sends one page per navigation", async () => {
  expect(TIKTOK_PIXEL_ID).toBe("DBF78F3C77U4J2JQEKJG");
  const state = await visit("MA");
  runInNewContext(TIKTOK_HEAD_SCRIPT, state.context);
  state.window.skinupTikTokPage();
  expect(state.scripts.length).toBe(1);
  expect(state.window.ttq.filter(event => event[0] === "page").length).toBe(1);
  state.location.pathname = "/collection";
  state.window.skinupTikTokPage();
  expect(state.window.ttq.filter(event => event[0] === "page").length).toBe(2);
});

test("no-banner route blocks consent-required regions", async () => {
  for (const region of ["FR", "DE", "GB", "CH", "NO"]) {
    expect((await visit(region)).scripts.length).toBe(0);
  }
});

test("unresolved and failed region checks never load TikTok", async () => {
  for (const region of ["XX", "T1", "ZZ", ""]) {
    expect((await visit(region)).scripts.length).toBe(0);
  }
  expect((await visit("MA", null, false)).scripts.length).toBe(0);
});

test("saved refusal blocks TikTok even in Morocco", async () => {
  expect((await visit("MA", JSON.stringify({ advertising: false }))).scripts.length).toBe(0);
});

test("withdrawal immediately stops pageviews even when storage is unavailable", async () => {
  const state = await visit("MA");
  state.listeners["skinup-advertising-choice"]();
  state.location.pathname = "/collection";
  state.window.skinupTikTokPage();
  expect(state.window.ttq.filter(event => event[0] === "page").length).toBe(1);
  expect(state.window.ttq.some(event => event[0] === "revokeConsent")).toBe(true);
});