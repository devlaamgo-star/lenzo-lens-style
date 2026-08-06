import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  ScriptOnce,

} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { getServerLang } from "@/lib/lang.functions";
import { LANGS, type Lang } from "@/lib/translations";
import { PackProvider } from "@/lib/pack";
import { CartProvider } from "@/lib/cart";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Toaster } from "@/components/ui/sonner";

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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { t } = useI18n();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{t("err.title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("err.text")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
          >
            {t("err.retry")}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
          >
            {t("nf.back")}
          </a>
        </div>
      </div>
    </div>
  );
}


export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "LENZO — Stickers caméra décoratifs pour iPhone au Maroc" },
      {
        name: "description",
        content:
          "3 stickers caméra iPhone pour 99 MAD. Livraison gratuite au Maroc et paiement à la livraison.",
      },
      { name: "author", content: "LENZO" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Kufi+Arabic:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  loader: async (): Promise<{ lang: Lang }> => {
    if (import.meta.env.SSR) return { lang: await getServerLang() };
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("lenzo-lang") : null;
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
        <HeadContent />
      </head>
      <body>
        <ScriptOnce>
          {`try{var l=localStorage.getItem('lenzo-lang');if(l){document.cookie='lenzo-lang='+l+'; path=/; max-age=31536000; samesite=lax';}if(l==='fr'||l==='ar'||l==='en'){document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';}else{document.documentElement.dir='ltr';}}catch(e){}`}
        </ScriptOnce>
        {children}
        <Scripts />
      </body>
    </html>
  );
}


function AnnouncementBar() {
  const { t } = useI18n();
  return (
    <div className="bg-ink text-ink-foreground">
      <p className="container-page py-2 text-center text-[11px] font-medium leading-tight tracking-wide sm:text-xs">
        {t("announce.bar")}
      </p>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { lang } = Route.useLoaderData();

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
          <Toaster position="top-center" />
         </CartProvider>
        </PackProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
