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
