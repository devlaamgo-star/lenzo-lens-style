import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  FILE_QUALITY,
  GALLERY,
  RIGHTS_NOTE,
  TRUST_POINTS,
  YOU_SEND,
} from "@/lib/custom-design-wizard";

export function IdeaToSkinSection() {
  const { lang, dir } = useI18n();
  return (
    <section className="section-y bg-surface">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-[2.1rem]">{IDEA_TO_SKIN.title[lang]}</h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">{IDEA_TO_SKIN.sub[lang]}</p>
        </div>
        <div className="mt-10 space-y-5">
          {IDEA_TO_SKIN.cases.map((c) => (
            <div
              key={c.design.en}
              className="grid items-center gap-3 rounded-3xl border border-border bg-card p-4 sm:p-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr]"
            >
              <Stage label={IDEA_TO_SKIN.stageLabels[0]![lang]} caption={c.idea[lang]}>
                <span className="flex aspect-[4/3] w-full items-center justify-center rounded-xl bg-surface text-4xl" aria-hidden>
                  {c.ideaEmoji}
                </span>
              </Stage>
              <Arrow dir={dir} />
              <Stage label={IDEA_TO_SKIN.stageLabels[1]![lang]} caption={c.design[lang]}>
                <img src={c.designImage} alt={c.design[lang]} loading="lazy" className="aspect-[4/3] w-full rounded-xl bg-surface object-contain" />
              </Stage>
              <Arrow dir={dir} />
              <Stage label={IDEA_TO_SKIN.stageLabels[2]![lang]} caption={c.final[lang]} highlight>
                <img src={c.finalImage} alt={c.final[lang]} loading="lazy" className="aspect-[4/3] w-full rounded-xl bg-surface object-contain" />
              </Stage>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Arrow({ dir }: { dir: string }) {
  return (
    <div className="flex items-center justify-center py-1 lg:py-0">
      <ArrowRight
        className={cn("h-5 w-5 text-primary", dir === "rtl" ? "rotate-180 max-lg:rotate-90" : "max-lg:rotate-90")}
        aria-hidden
      />
    </div>
  );
}

function Stage({
  label,
  caption,
  highlight,
  children,
}: {
  label: string;
  caption: string;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("min-w-0 rounded-2xl border p-3", highlight ? "border-primary/40 bg-primary/5" : "border-border")}>
      <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-primary">{label}</p>
      {children}
      <p className="mt-2 text-xs font-medium leading-snug sm:text-sm">{caption}</p>
    </div>
  );
}

export function YouSendSection() {
  const { lang } = useI18n();
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card px-5 py-8 text-center sm:px-10 sm:py-10">
          <h2 className="text-2xl font-bold sm:text-3xl">{YOU_SEND.title[lang]}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {YOU_SEND.text[lang]}
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
            {YOU_SEND.examples.map((e) => (
              <li
                key={e.en}
                className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium sm:text-sm"
              >
                {e[lang]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function CustomGallerySection() {
  const { lang } = useI18n();
  const [cat, setCat] = useState(GALLERY.categories[0]!.value);
  const current = GALLERY.categories.find((c) => c.value === cat) ?? GALLERY.categories[0]!;
  return (
    <section className="section-y bg-surface">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-[2.1rem]">{GALLERY.title[lang]}</h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">{GALLERY.sub[lang]}</p>
        </div>
        <div className="-mx-4 mt-8 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          <div className="flex w-max gap-2 sm:w-full sm:flex-wrap sm:justify-center">
            {GALLERY.categories.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setCat(c.value)}
                aria-pressed={cat === c.value}
                className={cn(
                  "h-10 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors",
                  cat === c.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-primary hover:text-primary",
                )}
              >
                {c.label[lang]}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {current.images.map((src, i) => (
            <figure key={`${cat}-${i}`} className="overflow-hidden rounded-2xl border border-border bg-card">
              <img
                src={src}
                alt={`${current.label[lang]} ${i + 1}`}
                loading="lazy"
                className="aspect-square w-full bg-surface object-contain"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FileQualitySection() {
  const { lang } = useI18n();
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-5 sm:p-7">
          <h2 className="text-lg font-bold sm:text-xl">{FILE_QUALITY.title[lang]}</h2>
          <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{FILE_QUALITY.text[lang]}</p>
        </div>

        <div className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.map((p) => (
            <div key={p.en} className="flex items-start gap-2.5 rounded-2xl border border-border bg-card p-4">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="min-w-0 text-sm font-medium leading-snug">{p[lang]}</span>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-4 max-w-3xl text-center text-xs text-muted-foreground">{RIGHTS_NOTE[lang]}</p>
      </div>
    </section>
  );
}
