import { expect, test } from "bun:test";
import { runInNewContext } from "node:vm";
import { TIKTOK_HEAD_SCRIPT, TIKTOK_PIXEL_ID, TIKTOK_OPTOUT_KEY } from "./tiktok-pixel";

async function visit(region, saved = null, ok = true) {
  const scripts = [];
  const handled = new Map();
  const listeners = {};
  const window = { addEventListener: (name, fn) => { listeners[name] = fn; } };
  const location = { pathname: "/" };
  const context = {
    window, location, navigator: {}, Date, Set, Boolean, AbortController,
    localStorage: { getItem: key => key === TIKTOK_OPTOUT_KEY ? saved : null },
    sessionStorage: { getItem: key => handled.get(key), setItem: (key, value) => handled.set(key, value) },
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

test("page load sends no SubmitForm; confirmed submissions send the requested event exactly once", async () => {
  const state = await visit("MA");
  const tracks = () => state.window.ttq.filter(event => event[0] === "track");
  expect(tracks().length).toBe(0);
  state.window.skinupTikTokSubmitForm("LNZ-TEST-1");
  state.window.skinupTikTokSubmitForm("LNZ-TEST-1");
  expect(tracks()).toEqual([["track", "SubmitForm"]]);
  state.window.skinupTikTokSubmitForm("LNZ-TEST-2");
  expect(tracks().length).toBe(2);
});

test("blocked submissions are never replayed when the visitor becomes eligible", async () => {
  const state = await visit("MA");
  state.context.navigator.globalPrivacyControl = true;
  state.window.skinupTikTokSubmitForm("LNZ-BLOCKED");
  state.context.navigator.globalPrivacyControl = false;
  state.window.skinupTikTokSubmitForm("LNZ-BLOCKED");
  expect(state.window.ttq.filter(event => event[0] === "track").length).toBe(0);
});

test("SubmitForm never loads TikTok in a consent-required region or after withdrawal", async () => {
  const blocked = await visit("FR");
  blocked.window.skinupTikTokSubmitForm("LNZ-FR");
  expect(blocked.scripts.length).toBe(0);
  const withdrawn = await visit("MA");
  withdrawn.listeners["skinup-advertising-choice"]();
  withdrawn.window.skinupTikTokSubmitForm("LNZ-REFUSED");
  expect(withdrawn.window.ttq.filter(event => event[0] === "track").length).toBe(0);
});