import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  ScriptOnce,
  useLocation,
  type ErrorComponentProps,

} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { getServerLang } from "@/lib/lang.functions";
import { LANGS, translate, type Lang } from "@/lib/translations";
import { captureAttribution } from "@/lib/attribution";
import { PackProvider, usePack } from "@/lib/pack";
import { CartProvider, useCart } from "@/lib/cart";
import { cameraDeliveryFee } from "@/lib/pricing";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Toaster } from "@/components/ui/sonner";
import { TIKTOK_HEAD_SCRIPT } from "@/lib/tiktok-pixel";
import { META_HEAD_SCRIPT } from "@/lib/meta-pixel";
import { MetaConsentBanner } from "@/components/MetaConsentBanner";
import { AppErrorFallback } from "@/components/AppErrorFallback";
import { COMPAT_HEAD_SCRIPT } from "@/lib/browser-compat";
import { markAppStarted } from "@/lib/chunk-recovery";
import { bootGuardScript } from "@/lib/boot-guard";

const BOOT_GUARD_SCRIPT = bootGuardScript({
  fr: { title: translate("fr", "err.title"), retry: translate("fr", "err.retry") },
  ar: { title: translate("ar", "err.title"), retry: translate("ar", "err.retry") },
  en: { title: translate("en", "err.title"), retry: translate("en", "err.retry") },
});

// French/Latin (Plus Jakarta Sans) and Arabic (Noto Kufi Arabic) faces, display=swap.
const FONT_STYLESHEET =
  "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Kufi+Arabic:wght@400;500;600;700&display=swap";
// A stylesheet inserted by script is non-render-blocking; the request still starts
// immediately from the head, and text shows in the fallback font until it swaps.
const FONT_LOADER_SCRIPT = `(function(){try{var l=document.createElement("link");l.rel="stylesheet";l.href=${JSON.stringify(FONT_STYLESHEET)};l.id="skinup-fonts-css";document.head.appendChild(l);}catch(e){}})();`;

function NotFoundComponent() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t("nf.title")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("nf.text")}</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
          >
            {t("nf.back")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent(props: ErrorComponentProps) {
  return <AppErrorFallback {...props} />;
}

/** Tracking helpers must never be able to break the page. */
function safely(run: () => void) {
  try { run(); } catch { /* ignore tracking failures */ }
}

function readStoredLang(): string | null {
  try { return window.localStorage.getItem("skinup-lang"); } catch { return null; }
}


export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SKINUP — Stickers caméra décoratifs pour iPhone au Maroc" },
      {
        name: "description",
        content:
          "3 stickers caméra iPhone pour 149 MAD. Livraison gratuite au Maroc et paiement à la livraison.",
      },
      { name: "author", content: "SKINUP" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      // Google Fonts CSS is attached by FONT_LOADER_SCRIPT so it never blocks first paint.
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  loader: async (): Promise<{ lang: Lang }> => {
    if (import.meta.env.SSR) return { lang: await getServerLang() };
    const stored = typeof window !== "undefined" ? readStoredLang() : null;
    return { lang: stored && (LANGS as readonly string[]).includes(stored) ? (stored as Lang) : "fr" };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script id="skinup-compat" dangerouslySetInnerHTML={{ __html: COMPAT_HEAD_SCRIPT }} />
        {/* Must precede every app script: protects the first render when they fail. */}
        <script id="skinup-boot" dangerouslySetInnerHTML={{ __html: BOOT_GUARD_SCRIPT }} />
        <HeadContent />
        <script id="skinup-fonts" dangerouslySetInnerHTML={{ __html: FONT_LOADER_SCRIPT }} />
        <noscript>
          <link rel="stylesheet" href={FONT_STYLESHEET} />
        </noscript>
        <script id="skinup-tiktok-pixel" dangerouslySetInnerHTML={{ __html: TIKTOK_HEAD_SCRIPT }} />
        <script id="skinup-meta-pixel" dangerouslySetInnerHTML={{ __html: META_HEAD_SCRIPT }} />
      </head>
      <body>
        <ScriptOnce>
          {`try{var l=localStorage.getItem('skinup-lang');if(l){document.cookie='skinup-lang='+l+'; path=/; max-age=31536000; samesite=lax';}if(l==='fr'||l==='ar'||l==='en'){document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';}else{document.documentElement.dir='ltr';}}catch(e){}`}
        </ScriptOnce>
        {children}
        <Scripts />
      </body>
    </html>
  );
}


function AnnouncementBar() {
  const { t } = useI18n();
  const cart = useCart();
  const pack = usePack();
  const pathname = useLocation({ select: (location) => location.pathname });
  const cameraContext = pathname.startsWith("/objectifs") || cameraDeliveryFee(cart.items, pack.designs.length) > 0;
  return (
    <div className="bg-ink text-ink-foreground">
      <p className="container-page py-2 text-center text-[11px] font-medium leading-tight tracking-wide sm:text-xs">
        {t(cameraContext ? "announce.camera" : "announce.bar")}
      </p>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { lang } = Route.useLoaderData();
  const pathname = useLocation({ select: location => location.pathname });
  const href = useLocation({ select: location => location.href });
  // Runs once the page has hydrated: tells the inline boot guard the app started.
  useEffect(() => { markAppStarted(); }, []);
  useEffect(() => { safely(() => window.skinupTikTokPage?.()); safely(captureAttribution); }, [pathname]);
  useEffect(() => { safely(() => window.skinupMetaPage?.()); }, [href]);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider initialLang={lang}>
        <PackProvider>
         <CartProvider>
          <div className="flex min-h-screen flex-col">
            <AnnouncementBar />
            <SiteHeader />
            <main className="flex-1">
              {/* Required: nested routes render here. */}
              <Outlet />
            </main>
            <SiteFooter />
          </div>
          <WhatsAppFab />
          <MetaConsentBanner />
          <Toaster position="top-center" />
         </CartProvider>
        </PackProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
