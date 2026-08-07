import { useState } from "react";
import { Info } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CD, CD_EXAMPLES, EX_MODAL } from "@/lib/custom-design";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function CustomExamplesSection() {
  const { lang } = useI18n();
  const [open, setOpen] = useState<number | null>(null);
  const current = open === null ? null : CD_EXAMPLES[open];

  function requestLikeThis(subject: string) {
    setOpen(null);
    window.dispatchEvent(new CustomEvent("skinup:preselect-subject", { detail: subject }));
    window.setTimeout(() => {
      document.getElementById("wizard")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  return (
    <section id="exemples" className="section-y scroll-mt-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-[2.1rem]">{CD.examplesTitle[lang]}</h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">{CD.examplesSub[lang]}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 lg:grid-cols-4">
          {CD_EXAMPLES.map((ex, i) => (
            <button
              key={ex.label.en}
              type="button"
              onClick={() => setOpen(i)}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-start transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift"
            >
              <img
                src={ex.image}
                alt={ex.label[lang]}
                loading="lazy"
                className="aspect-square w-full bg-surface object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="flex min-w-0 flex-1 flex-col border-t border-border px-4 py-3.5">
                <span className="text-sm font-semibold">{ex.label[lang]}</span>
                <span className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{ex.desc[lang]}</span>
              </div>
            </button>
          ))}
        </div>

        <p className="mx-auto mt-6 flex max-w-2xl items-start gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span className="min-w-0">{EX_MODAL.note[lang]}</span>
        </p>
      </div>

      <Dialog open={current !== null} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-lg gap-0 overflow-hidden p-0">
          {current && (
            <>
              <DialogTitle className="border-b border-border px-5 py-3.5 text-start text-sm font-semibold">
                {current.label[lang]}
              </DialogTitle>
              <img
                src={current.image}
                alt={current.label[lang]}
                className="max-h-[52vh] w-full bg-surface object-contain"
              />
              <div className="px-5 py-4">
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{EX_MODAL.note[lang]}</p>
                <button
                  type="button"
                  onClick={() => requestLikeThis(current.subject)}
                  className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01]"
                >
                  {EX_MODAL.cta[lang]}
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
