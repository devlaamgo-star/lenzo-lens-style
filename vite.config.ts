// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    environments: {
      client: {
        build: {
          // Browser JS only: the default (Safari 16.4 / Chrome 111) ships ES2022 class
          // static blocks from Radix, which older iPhones (iOS 14–16.3) and outdated
          // Android WebViews cannot parse, wiping the homepage and product pages.
          target: ["es2020", "safari14", "ios14", "chrome87", "edge88", "firefox78"],
          // Keep the stylesheet output identical to the previous default.
          cssTarget: ["chrome111", "edge111", "firefox114", "safari16.4", "ios16.4"],
        },
      },
    },
  },
});
