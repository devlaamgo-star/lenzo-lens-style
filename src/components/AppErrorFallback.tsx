import { useEffect } from "react";
import { useRouter, type ErrorComponentProps } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { reportLovableError } from "@/lib/lovable-error-reporting";
import { isChunkLoadError, reloadOnceForChunkError } from "@/lib/chunk-recovery";

/** Friendly error screen for the whole site and for individual pages. */
export function AppErrorFallback({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  const { t } = useI18n();
  const chunkError = isChunkLoadError(error);

  useEffect(() => {
    console.error(error);
    reportLovableError(error, { boundary: "tanstack_error_component" });
    // A missing site file usually means a newer version was published: fetch it once.
    if (chunkError) reloadOnceForChunkError();
  }, [error, chunkError]);

  const retry = () => {
    if (chunkError) {
      // Browsers remember a failed script download; only a full reload fetches it again.
      window.location.reload();
      return;
    }
    router.invalidate();
    reset();
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{t("err.title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("err.text")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={retry}
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
