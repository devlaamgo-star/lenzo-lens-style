import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useRef, useState } from "react";
import {
  Check,
  Image as ImageIcon,
  Loader2,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { MOROCCAN_CITIES, whatsappLink } from "@/lib/catalog";
import { CD, CD_EXAMPLES } from "@/lib/custom-design";
import { createDesignRequest } from "@/lib/design-requests.functions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StickyPackBar } from "@/components/StickyPackBar";

export const Route = createFileRoute("/design-personnalise")({
  head: () => ({
    meta: [
      { title: "Design personnalisé — Skin sur mesure SKINUP" },
      {
        name: "description",
        content:
          "Envoyez votre photo, logo ou idée : notre équipe crée un skin arrière et un sticker caméra personnalisés pour votre téléphone. Aperçu avant impression, paiement à la livraison.",
      },
      { property: "og:title", content: "Design personnalisé — SKINUP" },
      {
        property: "og:description",
        content:
          "Photo, logo ou idée : on transforme votre inspiration en skin unique. Aperçu validé avant impression.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CustomDesignPage,
});

const PHONE_RE = /^(?:\+212|00212|0)([5-7])\d{8}$/;
const ACCEPT = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const MAX_BYTES = 8 * 1024 * 1024;

type Errors = Partial<Record<"name" | "phone" | "city" | "model" | "desc" | "file", string>>;

function CustomDesignPage() {
  const { lang } = useI18n();
  const submit = useServerFn(createDesignRequest);
  const fileInput = useRef<HTMLInputElement>(null);

  const [values, setValues] = useState({
    name: "",
    phone: "",
    city: "",
    brand: "",
    model: "",
    type: "both" as "back" | "camera" | "both",
    desc: "",
    colors: "",
    notes: "",
  });
  const [file, setFile] = useState<{ name: string; type: string; dataUrl: string } | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  const set =
    (key: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!ACCEPT.includes(f.type) || f.size > MAX_BYTES) {
      setErrors((x) => ({ ...x, file: CD.errors.file[lang] }));
      setFile(null);
      if (fileInput.current) fileInput.current.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setErrors(({ file: _omit, ...rest }) => rest);
      setFile({ name: f.name, type: f.type, dataUrl: String(reader.result) });
    };
    reader.readAsDataURL(f);
  };

  const clearFile = () => {
    setFile(null);
    if (fileInput.current) fileInput.current.value = "";
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pending) return;
    const next: Errors = {};
    if (values.name.trim().length < 3) next.name = CD.errors.name[lang];
    if (!PHONE_RE.test(values.phone.replace(/[\s.-]/g, ""))) next.phone = CD.errors.phone[lang];
    if (values.city.trim().length < 2) next.city = CD.errors.city[lang];
    if (values.model.trim().length < 2) next.model = CD.errors.model[lang];
    if (values.desc.trim().length < 5) next.desc = CD.errors.desc[lang];
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setPending(true);
    try {
      const res = await submit({
        data: {
          fullName: values.name,
          phone: values.phone,
          city: values.city,
          brand: values.brand,
          model: values.model,
          requestType: values.type,
          description: values.desc,
          colors: values.colors,
          notes: values.notes,
          locale: lang,
          file,
        },
      });
      setDone(res.requestNumber);
      toast.success(CD.success[lang]);
      setValues({
        name: "",
        phone: "",
        city: "",
        brand: "",
        model: "",
        type: "both",
        desc: "",
        colors: "",
        notes: "",
      });
      clearFile();
      window.scrollTo({ top: document.getElementById("form")?.offsetTop ?? 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      toast.error(CD.errors.server[lang]);
    } finally {
      setPending(false);
    }
  };

  const field =
    "h-12 w-full rounded-xl border border-input bg-card px-4 text-sm outline-none transition-colors focus:border-primary";
  const area =
    "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary";
  const err = "mt-1.5 text-xs text-destructive";

  return (
    <>
      {/* HERO */}
      <section className="border-b border-border bg-surface">
        <div className="container-page grid items-center gap-8 py-10 lg:grid-cols-2 lg:gap-12 lg:py-16">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold text-primary sm:text-xs">
              <Sparkles className="h-3.5 w-3.5" />
              {CD.badge[lang]}
            </span>
            <h1 className="mt-4 text-[1.75rem] font-bold leading-tight sm:text-4xl lg:text-[2.6rem]">
              {CD.heroTitle[lang]}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {CD.heroSub[lang]}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#form"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                {CD.ctaPrimary[lang]}
              </a>
              <a
                href="#exemples"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-card px-6 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                {CD.ctaSecondary[lang]}
              </a>
            </div>
          </div>
          <div className="min-w-0">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {CD_EXAMPLES.slice(0, 2).map((ex) => (
                <div
                  key={ex.label.en}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-lift"
                >
                  <img
                    src={ex.image}
                    alt={ex.label[lang]}
                    className="aspect-[4/5] w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="section-y">
        <div className="container-page">
          <h2 className="mx-auto max-w-2xl text-center text-2xl font-bold sm:text-3xl lg:text-[2.1rem]">
            {CD.stepsTitle[lang]}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {CD.steps.map((s, i) => (
              <div
                key={s.t.en}
                className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lift"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold">{s.t[lang]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE CREATE */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <h2 className="mx-auto max-w-2xl text-center text-2xl font-bold sm:text-3xl lg:text-[2.1rem]">
            {CD.createTitle[lang]}
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {CD.createItems.map((c) => (
              <div
                key={c.en}
                className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3.5 text-sm font-medium"
              >
                <Check className="h-4 w-4 shrink-0 text-primary" />
                <span className="min-w-0">{c[lang]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXAMPLES */}
      <section id="exemples" className="section-y scroll-mt-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl lg:text-[2.1rem]">{CD.examplesTitle[lang]}</h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">{CD.examplesSub[lang]}</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {CD_EXAMPLES.map((ex) => (
              <figure
                key={ex.label.en}
                className="overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lift"
              >
                <img
                  src={ex.image}
                  alt={ex.label[lang]}
                  loading="lazy"
                  className="aspect-square w-full bg-surface object-contain"
                />
                <figcaption className="border-t border-border px-3 py-3 text-center text-xs font-medium sm:text-sm">
                  {ex.label[lang]}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="form" className="section-y scroll-mt-20 bg-surface">
        <div className="container-page grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10">
          <div className="min-w-0">
            <h2 className="text-2xl font-bold sm:text-3xl">{CD.formTitle[lang]}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{CD.formSub[lang]}</p>

            {done && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-success/30 bg-success/10 p-4 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <p>
                  {CD.success[lang]} <span className="font-semibold" dir="ltr">{done}</span>
                </p>
              </div>
            )}

            <form onSubmit={onSubmit} noValidate className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="min-w-0">
                  <label htmlFor="cd-name" className="mb-1.5 block text-sm font-medium">
                    {CD.f.name[lang]}
                  </label>
                  <input id="cd-name" value={values.name} onChange={set("name")} maxLength={80} className={field} />
                  {errors.name && <p className={err}>{errors.name}</p>}
                </div>
                <div className="min-w-0">
                  <label htmlFor="cd-phone" className="mb-1.5 block text-sm font-medium">
                    {CD.f.phone[lang]}
                  </label>
                  <input
                    id="cd-phone"
                    inputMode="tel"
                    dir="ltr"
                    placeholder="06 12 34 56 78"
                    value={values.phone}
                    onChange={set("phone")}
                    maxLength={20}
                    className={field}
                  />
                  {errors.phone && <p className={err}>{errors.phone}</p>}
                </div>
                <div className="min-w-0">
                  <label htmlFor="cd-city" className="mb-1.5 block text-sm font-medium">
                    {CD.f.city[lang]}
                  </label>
                  <input
                    id="cd-city"
                    list="cd-cities"
                    value={values.city}
                    onChange={set("city")}
                    maxLength={60}
                    className={field}
                  />
                  <datalist id="cd-cities">
                    {MOROCCAN_CITIES.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                  {errors.city && <p className={err}>{errors.city}</p>}
                </div>
                <div className="min-w-0">
                  <label htmlFor="cd-brand" className="mb-1.5 block text-sm font-medium">
                    {CD.f.brand[lang]}
                  </label>
                  <input
                    id="cd-brand"
                    value={values.brand}
                    onChange={set("brand")}
                    placeholder="iPhone, Samsung…"
                    maxLength={40}
                    className={field}
                  />
                </div>
                <div className="min-w-0">
                  <label htmlFor="cd-model" className="mb-1.5 block text-sm font-medium">
                    {CD.f.model[lang]}
                  </label>
                  <input
                    id="cd-model"
                    value={values.model}
                    onChange={set("model")}
                    placeholder="iPhone 17 Pro Max"
                    maxLength={60}
                    className={field}
                  />
                  {errors.model && <p className={err}>{errors.model}</p>}
                </div>
                <div className="min-w-0">
                  <label htmlFor="cd-type" className="mb-1.5 block text-sm font-medium">
                    {CD.f.type[lang]}
                  </label>
                  <select id="cd-type" value={values.type} onChange={set("type")} className={field}>
                    {CD.types.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label[lang]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <span className="mb-1.5 block text-sm font-medium">{CD.f.upload[lang]}</span>
                <label
                  htmlFor="cd-file"
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-input bg-card px-4 py-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Upload className="h-4 w-4 shrink-0" />
                  <span className="min-w-0 truncate">{file ? file.name : CD.f.uploadHint[lang]}</span>
                </label>
                <input
                  id="cd-file"
                  ref={fileInput}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
                  onChange={onFile}
                  className="sr-only"
                />
                {errors.file && <p className={err}>{errors.file}</p>}
                {file && (
                  <div className="mt-3 flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                    {file.type === "application/pdf" ? (
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-surface">
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                    ) : (
                      <img
                        src={file.dataUrl}
                        alt={file.name}
                        className="h-20 w-20 shrink-0 rounded-lg bg-surface object-contain"
                      />
                    )}
                    <p className="min-w-0 flex-1 truncate text-sm">{file.name}</p>
                    <button
                      type="button"
                      onClick={clearFile}
                      aria-label={CD.f.remove[lang]}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border transition-colors hover:border-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="cd-desc" className="mb-1.5 block text-sm font-medium">
                  {CD.f.desc[lang]}
                </label>
                <textarea id="cd-desc" rows={4} value={values.desc} onChange={set("desc")} maxLength={1000} className={area} />
                {errors.desc && <p className={err}>{errors.desc}</p>}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="min-w-0">
                  <label htmlFor="cd-colors" className="mb-1.5 block text-sm font-medium">
                    {CD.f.colors[lang]}
                  </label>
                  <input id="cd-colors" value={values.colors} onChange={set("colors")} maxLength={200} className={field} />
                </div>
                <div className="min-w-0">
                  <label htmlFor="cd-notes" className="mb-1.5 block text-sm font-medium">
                    {CD.f.notes[lang]}
                  </label>
                  <input id="cd-notes" value={values.notes} onChange={set("notes")} maxLength={500} className={field} />
                </div>
              </div>

              <button
                type="submit"
                disabled={pending}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-60 sm:w-auto"
              >
                {pending && <Loader2 className="h-4 w-4 animate-spin" />}
                {CD.f.submit[lang]}
              </button>
            </form>
          </div>

          {/* TRUST */}
          <aside className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-5">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <h3 className="mt-3 text-sm font-semibold leading-snug">{CD.trustTitle[lang]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{CD.trustText[lang]}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm leading-relaxed text-muted-foreground">{CD.privacy[lang]}</p>
            </div>
            <a
              href={whatsappLink(CD.waMsg[lang])}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-success px-5 text-sm font-semibold text-success-foreground transition-transform hover:scale-[1.01]"
            >
              <MessageCircle className="h-4 w-4" />
              {CD.whatsapp[lang]}
            </a>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y">
        <div className="container-page">
          <h2 className="mx-auto max-w-2xl text-center text-2xl font-bold sm:text-3xl lg:text-[2.1rem]">
            {CD.faqTitle[lang]}
          </h2>
          <div className="mx-auto mt-10 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {CD.faq.map((f, i) => (
                <AccordionItem key={f.q.en} value={`cd-${i}`} className="border-b border-border">
                  <AccordionTrigger className="py-5 text-start text-sm font-semibold hover:no-underline sm:text-base">
                    {f.q[lang]}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    {f.a[lang]}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <div className="rounded-3xl border border-border bg-card px-6 py-10 text-center sm:px-10 lg:py-14">
            <h2 className="text-2xl font-bold sm:text-3xl">{CD.finalTitle[lang]}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
              {CD.finalText[lang]}
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#form"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                {CD.ctaPrimary[lang]}
              </a>
              <a
                href={whatsappLink(CD.waMsg[lang])}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border px-6 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" />
                {CD.whatsapp[lang]}
              </a>
            </div>
          </div>
        </div>
      </section>

      <StickyPackBar />
    </>
  );
}
