import { Star, BadgeCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { REVIEWS } from "@/lib/content";
import { SectionHeading } from "@/components/SectionHeading";

export function ReviewsSection() {
  const { t, lang } = useI18n();
  return (
    <section id="avis" className="section-y">
      <div className="container-page">
        <SectionHeading title="reviews.title" subtitle="reviews.sub" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure
              key={r.name.en + r.city.en}
              className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="flex items-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4"
                    fill={i < r.rating ? "currentColor" : "none"}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed text-foreground/90">
                “{r.text[lang]}”
              </blockquote>
              <figcaption className="flex min-w-0 items-center justify-between gap-3 border-t border-border pt-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{r.name[lang]}</p>
                  <p className="truncate text-xs text-muted-foreground">{r.city[lang]}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  {t("reviews.verified")}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
