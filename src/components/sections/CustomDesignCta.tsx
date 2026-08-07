import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { HOME_CTA } from "@/lib/custom-design-wizard";

export function CustomDesignCta() {
  const { lang, dir } = useI18n();

  return (
    <section className="section-y">
      <div className="container-page">
        <div className="grid items-center gap-6 rounded-3xl border border-border bg-card px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10 lg:py-10">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              {HOME_CTA.note[lang]}
            </span>
            <h2 className="mt-3 text-xl font-bold leading-snug sm:text-2xl lg:text-[1.75rem]">
              {HOME_CTA.title[lang]}
            </h2>
            <p className="mt-2.5 max-w-lg text-sm text-muted-foreground sm:text-base">{HOME_CTA.text[lang]}</p>
            <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex">
              <Link
                to="/design-personnalise"
                className="inline-flex h-12 min-w-0 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                <span className="truncate">{HOME_CTA.cta[lang]}</span>
              </Link>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
                <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
                {HOME_CTA.note[lang]}
              </span>
            </div>
          </div>

          {/* visual: plain phone → idea → finished skin */}
          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-3 lg:w-[26rem]">
            <div className="min-w-0 rounded-2xl border border-border bg-surface p-2">
              <div className="mx-auto aspect-[9/17] w-full max-w-[7rem] rounded-2xl border-2 border-border bg-background" />
              <p className="mt-2 text-center text-[11px] font-medium text-muted-foreground">
                {HOME_CTA.ideaLabel[lang]}
              </p>
            </div>
            <ArrowRight
              className={cn("h-5 w-5 shrink-0 text-primary", dir === "rtl" && "rotate-180")}
              aria-hidden
            />
            <div className="min-w-0 rounded-2xl border border-primary/40 bg-primary/5 p-2">
              <img
                src={HOME_CTA.resultImage}
                alt={HOME_CTA.resultLabel[lang]}
                loading="lazy"
                className="mx-auto aspect-[9/17] w-full max-w-[7rem] object-contain"
              />
              <p className="mt-2 text-center text-[11px] font-semibold text-primary">
                {HOME_CTA.resultLabel[lang]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
