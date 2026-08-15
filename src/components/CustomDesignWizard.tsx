import { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  Crown,
  Loader2,
  Move,
  RotateCcw,
  Sparkles,
  Trash2,
  Upload,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { useI18n } from "@/lib/i18n";
import { MOROCCAN_CITIES } from "@/lib/catalog";
import { CD } from "@/lib/custom-design";
import { STUDIO, TEXT_COLORS } from "@/lib/studio-copy";
import {
  PHONE_COLOR_LIST,
  PHONE_TEMPLATES,
  TEXT_FONTS,
  phoneColor,
  phoneTemplate,
  type SkinArea,
} from "@/lib/phone-templates";
import { PhonePreview, type Artwork, type TextOverlay } from "@/components/studio/PhonePreview";
import { renderPreviewImage } from "@/lib/preview-snapshot";
import { createDesignRequest } from "@/lib/design-requests.functions";
import { cn } from "@/lib/utils";

const PHONE_RE = /^(?:\+212|00212|0)([5-7])\d{8}$/;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const ACCEPT = [...IMAGE_TYPES, "application/pdf"];
const MAX_BYTES = 8 * 1024 * 1024;
const MAX_FILES = 5;
const TOTAL = 8;

type Upl = { name: string; type: string; dataUrl: string };

const AI_STYLES = ["cartoon", "cartoon-3d", "anime", "luxury", "street", "funny"];

export function CustomDesignWizard() {
  const { lang } = useI18n();
  const submit = useServerFn(createDesignRequest);
  const rootRef = useRef<HTMLDivElement>(null);
  const mainInput = useRef<HTMLInputElement>(null);
  const extraInput = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(1);
  const [subject, setSubject] = useState("");
  const [modelId, setModelId] = useState("iphone-17-pro-max");
  const [colorId, setColorId] = useState("orange");
  const [area, setArea] = useState<SkinArea>("both");
  const [main, setMain] = useState<Upl | null>(null);
  const [mainRatio, setMainRatio] = useState(1);
  const [extras, setExtras] = useState<Upl[]>([]);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [text, setText] = useState<TextOverlay>({ value: "", font: "modern", color: "#FFFFFF", position: "center" });
  const [style, setStyle] = useState("original");
  const [notes, setNotes] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [qty, setQty] = useState(1);

  const [touched, setTouched] = useState(false);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [mobilePreview, setMobilePreview] = useState(false);

  const template = useMemo(() => phoneTemplate(modelId), [modelId]);

  useEffect(() => {
    if (!template.colors.includes(colorId)) setColorId(template.colors[0] ?? "black");
  }, [template, colorId]);

  useEffect(() => {
    const onPreselect = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      if (!value) return;
      setSubject(value);
      setStep(2);
      scrollTop();
    };
    window.addEventListener("skinup:preselect-subject", onPreselect);
    return () => window.removeEventListener("skinup:preselect-subject", onPreselect);
  }, []);

  const artwork: Artwork = {
    src: main && IMAGE_TYPES.includes(main.type) ? main.dataUrl : null,
    ratio: mainRatio,
    zoom,
    x: offset.x,
    y: offset.y,
  };

  const scrollTop = () => {
    const y = rootRef.current?.getBoundingClientRect().top ?? 0;
    if (y < 0) rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const canNext = () => {
    if (step === 1) return subject !== "";
    if (step === 4) return Boolean(main) || text.value.trim().length > 0 || notes.trim().length > 0;
    return true;
  };

  const goTo = (s: number) => {
    setTouched(false);
    setStep(Math.min(TOTAL, Math.max(1, s)));
    scrollTop();
  };
  const goNext = () => {
    setTouched(true);
    if (!canNext()) return;
    goTo(step + 1);
  };

  const readFile = (f: File) =>
    new Promise<Upl>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ name: f.name, type: f.type, dataUrl: String(reader.result) });
      reader.onerror = reject;
      reader.readAsDataURL(f);
    });

  const onMainFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (mainInput.current) mainInput.current.value = "";
    if (!f) return;
    if (!IMAGE_TYPES.includes(f.type) || f.size > MAX_BYTES) {
      toast.error(CD.errors.file[lang]);
      return;
    }
    const up = await readFile(f);
    const img = new Image();
    img.onload = () => setMainRatio(img.naturalWidth / img.naturalHeight || 1);
    img.src = up.dataUrl;
    setMain(up);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const onExtraFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files ?? []);
    if (extraInput.current) extraInput.current.value = "";
    const valid = list.filter((f) => ACCEPT.includes(f.type) && f.size <= MAX_BYTES);
    if (valid.length !== list.length) toast.error(CD.errors.file[lang]);
    const room = MAX_FILES - extras.length;
    const read = await Promise.all(valid.slice(0, room).map(readFile));
    setExtras((p) => [...p, ...read]);
  };

  const nudge = (dx: number, dy: number) =>
    setOffset((o) => ({
      x: Math.max(-0.6, Math.min(0.6, o.x + dx)),
      y: Math.max(-0.6, Math.min(0.6, o.y + dy)),
    }));

  const labelOf = (list: { value: string; label: any }[], value: string, l = lang) =>
    list.find((o) => o.value === value)?.label?.[l] ?? value;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (pending) return;
    if (
      name.trim().length < 3 ||
      !PHONE_RE.test(phone.replace(/[\s.-]/g, "")) ||
      city.trim().length < 2
    )
      return;

    setPending(true);
    try {
      const preview = await renderPreviewImage({
        template,
        color: colorId,
        area,
        artwork: { src: artwork.src, zoom, x: offset.x, y: offset.y },
        text,
      }).catch(() => null);

      const files: Upl[] = [];
      if (main) files.push(main);
      files.push(...extras);
      if (preview) files.push({ name: `apercu-final.jpg`, type: "image/jpeg", dataUrl: preview });

      const res = await submit({
        data: {
          fullName: name,
          phone,
          email,
          city,
          brand: "iPhone",
          model: template.label,
          phoneColor: phoneColor(colorId).label.en,
          subject: labelOf(STUDIO.s1.options as any, subject, "en"),
          style: labelOf(STUDIO.s6.options as any, style, "en"),
          requestType: area,
          description: notes,
          colors: text.value ? `Texte: ${text.value} (${text.color})` : "",
          notes,
          address,
          quantity: qty,
          locale: lang,
          files,
          hasPreview: Boolean(preview),
          selections: {
            subject: { value: subject, label_fr: labelOf(STUDIO.s1.options as any, subject, "fr") },
            phone_model: { id: template.id, label: template.label },
            phone_color: { value: colorId, label_en: phoneColor(colorId).label.en },
            skin_area: area,
            style: { value: style, label_en: labelOf(STUDIO.s6.options as any, style, "en"), handmade: AI_STYLES.includes(style) },
            text_overlay: text.value ? text : null,
            artwork_transform: { zoom, offset_x: offset.x, offset_y: offset.y, image_ratio: mainRatio },
            uploads: { original: main?.name ?? null, extras: extras.map((f) => f.name), preview: preview ? "apercu-final.jpg" : null },
            quantity: qty,
            email,
            language: lang,
            submitted_at: new Date().toISOString(),
          },
        },
      });
      setDone(res.requestNumber);
      scrollTop();
    } catch (err) {
      console.error(err);
      toast.error(CD.errors.server[lang]);
    } finally {
      setPending(false);
    }
  };

  const reset = () => {
    setDone(null);
    setStep(1);
    setSubject("");
    setArea("both");
    setMain(null);
    setExtras([]);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    setText({ value: "", font: "modern", color: "#FFFFFF", position: "center" });
    setStyle("original");
    setNotes("");
    setName("");
    setPhone("");
    setEmail("");
    setCity("");
    setAddress("");
    setQty(1);
  };

  const field =
    "h-12 w-full rounded-xl border border-input bg-card px-4 text-sm outline-none transition-colors focus:border-primary";
  const cardBase =
    "group relative flex flex-col items-center justify-center gap-2 rounded-2xl border-2 bg-card p-4 text-center transition-all";
  const active = "border-primary bg-primary/5 shadow-lift";
  const idle = "border-border hover:border-primary/50";
  const t = (s: any) => s[lang];

  if (done) {
    return (
      <div ref={rootRef} id="wizard" className="scroll-mt-24">
        <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-6 text-center sm:p-10">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/15">
            <Check className="h-7 w-7 text-success" />
          </span>
          <h3 className="mt-5 text-xl font-bold sm:text-2xl">{t(STUDIO.doneTitle)}</h3>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t(STUDIO.doneText)}
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm">
            <span className="text-muted-foreground">{t(STUDIO.doneRef)}</span>
            <span className="font-semibold" dir="ltr">
              {done}
            </span>
          </p>
          <div>
            <button
              type="button"
              onClick={reset}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              {t(STUDIO.restart)}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const previewFocus = area === "camera" ? "camera" : "phone";

  const previewPanel = (
    <div className="rounded-3xl border border-border bg-surface p-4 sm:p-6">
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {t(STUDIO.previewTitle)}
      </p>
      <PhonePreview
        template={template}
        color={colorId}
        area={area}
        artwork={artwork}
        text={text}
        focus={previewFocus}
        draggable={step === 5}
        onDrag={(dx, dy) => nudge(dx, dy)}
      />
      <p className="mt-4 text-center text-xs text-muted-foreground">
        {template.label} · {phoneColor(colorId).label[lang]}
      </p>
    </div>
  );

  return (
    <div ref={rootRef} id="wizard" className="scroll-mt-24">
      {/* progress */}
      <div className="mx-auto mb-6 max-w-5xl">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <p className="min-w-0 truncate text-sm font-semibold text-primary">
            {t(STUDIO.stepOf).replace("{n}", String(step)).replace("{t}", String(TOTAL))}
          </p>
          <span className="shrink-0 text-xs text-muted-foreground">{Math.round((step / TOTAL) * 100)}%</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${(step / TOTAL) * 100}%` }}
          />
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <form onSubmit={onSubmit} noValidate className="min-w-0 rounded-3xl border border-border bg-card p-4 sm:p-7">
          {/* STEP 1 — subject */}
          {step === 1 && (
            <fieldset>
              <legend className="text-lg font-bold sm:text-xl">{t(STUDIO.s1.title)}</legend>
              <p className="mt-1.5 text-sm text-muted-foreground">{t(STUDIO.s1.sub)}</p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {STUDIO.s1.options.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => {
                      setSubject(o.value);
                      if (o.value === "camera-only") setArea("camera");
                      setTimeout(() => goTo(2), 140);
                    }}
                    aria-pressed={subject === o.value}
                    className={cn(cardBase, "min-h-[104px]", subject === o.value ? active : idle)}
                  >
                    <span className="text-2xl" aria-hidden>
                      {o.emoji}
                    </span>
                    <span className="text-xs font-semibold leading-snug sm:text-sm">{t(o.label)}</span>
                    {subject === o.value && <Check className="absolute end-2 top-2 h-4 w-4 text-primary" />}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {/* STEP 2 — model + colour */}
          {step === 2 && (
            <fieldset>
              <legend className="text-lg font-bold sm:text-xl">{t(STUDIO.s2.title)}</legend>
              <p className="mt-1.5 text-sm text-muted-foreground">{t(STUDIO.s2.sub)}</p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {PHONE_TEMPLATES.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setModelId(m.id)}
                    aria-pressed={modelId === m.id}
                    className={cn(
                      "relative rounded-2xl border-2 bg-card px-3 py-3.5 text-start text-sm font-semibold transition-all",
                      modelId === m.id ? active : idle,
                    )}
                  >
                    <span className="block min-w-0 truncate">{m.label}</span>
                    {modelId === m.id && <Check className="absolute end-2 top-2 h-4 w-4 text-primary" />}
                  </button>
                ))}
              </div>
              <p className="mb-2 mt-6 text-sm font-medium">{t(STUDIO.s2.color)}</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {PHONE_COLOR_LIST.filter((c) => template.colors.includes(c.value)).map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setColorId(c.value)}
                    aria-pressed={colorId === c.value}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border-2 bg-card px-3 py-3 text-start transition-all",
                      colorId === c.value ? active : idle,
                    )}
                  >
                    <span
                      className="h-7 w-7 shrink-0 rounded-full border border-border"
                      style={{ backgroundColor: c.body }}
                      aria-hidden
                    />
                    <span className="min-w-0 truncate text-sm font-semibold">{t(c.label)}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {/* STEP 3 — area */}
          {step === 3 && (
            <fieldset>
              <legend className="text-lg font-bold sm:text-xl">{t(STUDIO.s3.title)}</legend>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {STUDIO.s3.options.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setArea(o.value as SkinArea)}
                    aria-pressed={area === o.value}
                    className={cn(
                      "relative overflow-hidden rounded-2xl border-2 bg-card p-4 text-start transition-all",
                      area === o.value ? active : idle,
                    )}
                  >
                    {o.value === "both" && (
                      <span className="absolute end-2 top-2 inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                        <Crown className="h-3 w-3" />
                        {t(STUDIO.s3.popular)}
                      </span>
                    )}
                    <span className="pointer-events-none block scale-95">
                      <PhonePreview
                        template={template}
                        color={colorId}
                        area={o.value as SkinArea}
                        artwork={artwork}
                        text={text}
                        className="max-w-[110px]"
                      />
                    </span>
                    <span className="mt-3 block text-sm font-semibold">{t(o.label)}</span>
                    <span className="mt-1 block text-xs leading-snug text-muted-foreground">{t(o.desc)}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {/* STEP 4 — upload */}
          {step === 4 && (
            <fieldset>
              <legend className="text-lg font-bold sm:text-xl">{t(STUDIO.s4.title)}</legend>
              <p className="mt-1.5 text-sm text-muted-foreground">{t(STUDIO.s4.sub)}</p>

              {!main ? (
                <label
                  htmlFor="studio-main"
                  className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-input bg-surface px-4 py-10 text-center transition-colors hover:border-primary"
                >
                  <Upload className="h-6 w-6 text-primary" />
                  <span className="text-sm font-semibold">{t(STUDIO.s4.add)}</span>
                  <span className="text-xs text-muted-foreground">{t(STUDIO.s4.sub)}</span>
                </label>
              ) : (
                <div className="mt-4 grid gap-3 sm:grid-cols-[140px_minmax(0,1fr)] sm:items-center">
                  <img
                    src={main.dataUrl}
                    alt={main.name}
                    className="aspect-square w-full rounded-2xl border border-border bg-surface object-contain"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{main.name}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <label
                        htmlFor="studio-main"
                        className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-border px-4 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        {t(STUDIO.s4.replace)}
                      </label>
                      <button
                        type="button"
                        onClick={() => setMain(null)}
                        className="inline-flex h-10 items-center gap-2 rounded-xl border border-border px-4 text-xs font-semibold transition-colors hover:border-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        {t(STUDIO.s4.remove)}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <input
                id="studio-main"
                ref={mainInput}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={onMainFile}
                className="sr-only"
              />

              {/* name / initials */}
              {(subject === "name" || text.value) && (
                <div className="mt-6 rounded-2xl border border-border bg-surface p-4">
                  <label htmlFor="studio-text" className="mb-1.5 block text-sm font-medium">
                    {t(STUDIO.s4.text)}
                  </label>
                  <input
                    id="studio-text"
                    value={text.value}
                    onChange={(e) => setText((p) => ({ ...p, value: e.target.value.slice(0, 18) }))}
                    placeholder="HAMZA"
                    className={field}
                  />
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <div className="min-w-0">
                      <p className="mb-1.5 text-xs font-medium text-muted-foreground">{t(STUDIO.s4.font)}</p>
                      <select
                        value={text.font}
                        onChange={(e) => setText((p) => ({ ...p, font: e.target.value }))}
                        className={field}
                      >
                        {TEXT_FONTS.map((f) => (
                          <option key={f.value} value={f.value}>
                            {f.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="min-w-0">
                      <p className="mb-1.5 text-xs font-medium text-muted-foreground">{t(STUDIO.s4.position)}</p>
                      <select
                        value={text.position}
                        onChange={(e) => setText((p) => ({ ...p, position: e.target.value as TextOverlay["position"] }))}
                        className={field}
                      >
                        <option value="top">{t(STUDIO.s4.posTop)}</option>
                        <option value="center">{t(STUDIO.s4.posCenter)}</option>
                        <option value="bottom">{t(STUDIO.s4.posBottom)}</option>
                      </select>
                    </div>
                    <div className="min-w-0">
                      <p className="mb-1.5 text-xs font-medium text-muted-foreground">{t(STUDIO.s4.textColor)}</p>
                      <div className="flex flex-wrap gap-2">
                        {TEXT_COLORS.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setText((p) => ({ ...p, color: c }))}
                            aria-label={c}
                            className={cn(
                              "h-9 w-9 rounded-full border-2 transition-transform",
                              text.color === c ? "border-primary scale-110" : "border-border",
                            )}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <label
                  htmlFor="studio-extra"
                  className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-border px-4 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  <Upload className="h-4 w-4" />
                  {t(STUDIO.s4.extra)}
                </label>
                <input
                  id="studio-extra"
                  ref={extraInput}
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  onChange={onExtraFiles}
                  className="sr-only"
                />
                {extras.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {extras.map((f, i) => (
                      <li
                        key={`${f.name}-${i}`}
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs"
                      >
                        <span className="max-w-[160px] truncate">{f.name}</span>
                        <button
                          type="button"
                          onClick={() => setExtras((p) => p.filter((_, idx) => idx !== i))}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          aria-label={t(STUDIO.s4.remove)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {touched && !canNext() && (
                <p className="mt-3 text-xs text-destructive">{t(STUDIO.s4.noFileName)}</p>
              )}
            </fieldset>
          )}

          {/* STEP 5 — adjust */}
          {step === 5 && (
            <fieldset>
              <legend className="text-lg font-bold sm:text-xl">{t(STUDIO.s5.title)}</legend>
              <p className="mt-1.5 text-sm text-muted-foreground">{t(STUDIO.s5.sub)}</p>
              {!artwork.src ? (
                <p className="mt-5 rounded-2xl border border-border bg-surface p-4 text-sm text-muted-foreground">
                  {t(STUDIO.s5.noImage)}
                </p>
              ) : (
                <>
                  <div className="mt-5 lg:hidden">
                    <PhonePreview
                      template={template}
                      color={colorId}
                      area={area}
                      artwork={artwork}
                      text={text}
                      focus={previewFocus}
                      draggable
                      onDrag={nudge}
                    />
                  </div>
                  <div className="mt-5 rounded-2xl border border-border bg-surface p-4">
                    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setZoom((z) => Math.max(1, +(z - 0.1).toFixed(2)))}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border transition-colors hover:border-primary hover:text-primary"
                        aria-label="Zoom out"
                      >
                        <ZoomOut className="h-4 w-4" />
                      </button>
                      <label className="min-w-0">
                        <span className="mb-1 block text-xs font-medium text-muted-foreground">
                          {t(STUDIO.s5.zoom)} · {zoom.toFixed(1)}x
                        </span>
                        <input
                          type="range"
                          min={1}
                          max={3}
                          step={0.05}
                          value={zoom}
                          onChange={(e) => setZoom(Number(e.target.value))}
                          className="w-full accent-[hsl(var(--primary))]"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setZoom((z) => Math.min(3, +(z + 0.1).toFixed(2)))}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border transition-colors hover:border-primary hover:text-primary"
                        aria-label="Zoom in"
                      >
                        <ZoomIn className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-5 flex items-center justify-center gap-2">
                      <div className="grid grid-cols-3 gap-1.5">
                        <span />
                        <ArrowBtn onClick={() => nudge(0, -0.04)} dir="up" />
                        <span />
                        <ArrowBtn onClick={() => nudge(-0.04, 0)} dir="left" />
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Move className="h-4 w-4" />
                        </span>
                        <ArrowBtn onClick={() => nudge(0.04, 0)} dir="right" />
                        <span />
                        <ArrowBtn onClick={() => nudge(0, 0.04)} dir="down" />
                        <span />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setZoom(1);
                        setOffset({ x: 0, y: 0 });
                      }}
                      className="mx-auto mt-5 flex h-10 items-center gap-2 rounded-xl border border-border px-4 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      {t(STUDIO.s5.reset)}
                    </button>
                  </div>
                </>
              )}
            </fieldset>
          )}

          {/* STEP 6 — style */}
          {step === 6 && (
            <fieldset>
              <legend className="text-lg font-bold sm:text-xl">{t(STUDIO.s6.title)}</legend>
              <p className="mt-1.5 text-sm text-muted-foreground">{t(STUDIO.s6.sub)}</p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {STUDIO.s6.options.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setStyle(o.value)}
                    aria-pressed={style === o.value}
                    className={cn(
                      "relative rounded-2xl border-2 bg-card px-3 py-3.5 text-start transition-all",
                      style === o.value ? active : idle,
                    )}
                  >
                    <span className="block text-sm font-semibold">{t(o.label)}</span>
                    {AI_STYLES.includes(o.value) && (
                      <span className="mt-1 block text-[10px] font-medium text-muted-foreground">
                        {t(STUDIO.s6.handmade)}
                      </span>
                    )}
                    {style === o.value && <Check className="absolute end-2 top-2 h-4 w-4 text-primary" />}
                  </button>
                ))}
              </div>
              <p className="mt-4 flex items-start gap-2 rounded-2xl border border-border bg-surface p-4 text-xs leading-relaxed text-muted-foreground">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {t(STUDIO.s6.aiNote)}
              </p>
              <div className="mt-5">
                <label htmlFor="studio-notes" className="mb-1.5 block text-sm font-medium">
                  {t(STUDIO.s8.notes)}
                </label>
                <textarea
                  id="studio-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value.slice(0, 1000))}
                  className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                />
              </div>
            </fieldset>
          )}

          {/* STEP 7 — final preview */}
          {step === 7 && (
            <fieldset>
              <legend className="text-lg font-bold sm:text-xl">{t(STUDIO.s7.title)}</legend>
              <p className="mt-1.5 text-sm text-muted-foreground">{t(STUDIO.s7.sub)}</p>
              <div className="mt-6 rounded-3xl border border-border bg-surface p-5">
                <PhonePreview
                  template={template}
                  color={colorId}
                  area={area}
                  artwork={artwork}
                  text={text}
                  focus={previewFocus}
                  className="max-w-[260px]"
                />
              </div>
              <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
                {t(STUDIO.s7.disclaimer)}
              </p>
              <dl className="mt-6 grid gap-2 rounded-2xl border border-border p-4 text-sm sm:grid-cols-2">
                <Row label={t(STUDIO.s7.summary.model)} value={template.label} />
                <Row label={t(STUDIO.s7.summary.color)} value={t(phoneColor(colorId).label)} />
                <Row label={t(STUDIO.s7.summary.subject)} value={subject ? labelOf(STUDIO.s1.options as any, subject) : "—"} />
                <Row label={t(STUDIO.s7.summary.area)} value={labelOf(STUDIO.s3.options as any, area)} />
                <Row label={t(STUDIO.s7.summary.style)} value={labelOf(STUDIO.s6.options as any, style)} />
                <Row label={t(STUDIO.s7.summary.file)} value={main?.name ?? "—"} />
                {text.value && <Row label={t(STUDIO.s7.summary.text)} value={text.value} />}
              </dl>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => goTo(4)}
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  {t(STUDIO.s7.edit)}
                </button>
                <button
                  type="button"
                  onClick={() => goTo(8)}
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01]"
                >
                  {t(STUDIO.s7.approve)}
                </button>
              </div>
            </fieldset>
          )}

          {/* STEP 8 — order form */}
          {step === 8 && (
            <fieldset>
              <legend className="text-lg font-bold sm:text-xl">{t(STUDIO.s8.title)}</legend>
              <p className="mt-1.5 text-sm text-muted-foreground">{t(STUDIO.s8.sub)}</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="min-w-0">
                  <label htmlFor="s-name" className="mb-1.5 block text-sm font-medium">
                    {t(STUDIO.s8.name)}
                  </label>
                  <input id="s-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} className={field} />
                  {touched && name.trim().length < 3 && (
                    <p className="mt-1.5 text-xs text-destructive">{CD.errors.name[lang]}</p>
                  )}
                </div>
                <div className="min-w-0">
                  <label htmlFor="s-phone" className="mb-1.5 block text-sm font-medium">
                    {t(STUDIO.s8.phone)}
                  </label>
                  <input
                    id="s-phone"
                    inputMode="tel"
                    dir="ltr"
                    placeholder="06 12 34 56 78"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={20}
                    className={field}
                  />
                  {touched && !PHONE_RE.test(phone.replace(/[\s.-]/g, "")) && (
                    <p className="mt-1.5 text-xs text-destructive">{CD.errors.phone[lang]}</p>
                  )}
                </div>
                <div className="min-w-0">
                  <label htmlFor="s-email" className="mb-1.5 block text-sm font-medium">
                    {t(STUDIO.s8.email)} <span className="font-normal text-muted-foreground">({t(STUDIO.optional)})</span>
                  </label>
                  <input
                    id="s-email"
                    type="email"
                    dir="ltr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={120}
                    className={field}
                  />
                </div>
                <div className="min-w-0">
                  <label htmlFor="s-city" className="mb-1.5 block text-sm font-medium">
                    {t(STUDIO.s8.city)}
                  </label>
                  <input id="s-city" list="s-cities" value={city} onChange={(e) => setCity(e.target.value)} maxLength={60} className={field} />
                  <datalist id="s-cities">
                    {MOROCCAN_CITIES.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                  {touched && city.trim().length < 2 && (
                    <p className="mt-1.5 text-xs text-destructive">{CD.errors.city[lang]}</p>
                  )}
                </div>
                <div className="min-w-0 sm:col-span-2">
                  <label htmlFor="s-address" className="mb-1.5 block text-sm font-medium">
                    {t(STUDIO.s8.address)}
                  </label>
                  <input id="s-address" value={address} onChange={(e) => setAddress(e.target.value)} maxLength={200} className={field} />
                </div>
                <div className="min-w-0">
                  <label htmlFor="s-qty" className="mb-1.5 block text-sm font-medium">
                    {t(STUDIO.s8.quantity)}
                  </label>
                  <input
                    id="s-qty"
                    type="number"
                    min={1}
                    max={50}
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
                    className={field}
                  />
                </div>
                <div className="min-w-0">
                  <p className="mb-1.5 block text-sm font-medium">{t(STUDIO.s8.recap)}</p>
                  <p className="flex h-12 items-center rounded-xl border border-border bg-surface px-4 text-xs text-muted-foreground">
                    {template.label} · {labelOf(STUDIO.s3.options as any, area)}
                  </p>
                </div>
              </div>
              <button
                type="submit"
                disabled={pending}
                className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-60"
              >
                {pending && <Loader2 className="h-4 w-4 animate-spin" />}
                <span className="truncate">{t(STUDIO.s8.submit)}</span>
              </button>
            </fieldset>
          )}

          {/* nav */}
          {step !== 7 && (
            <div className="mt-7 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                disabled={step === 1}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary disabled:opacity-40"
              >
                {t(STUDIO.back)}
              </button>
              {step < TOTAL && (
                <button
                  type="button"
                  onClick={goNext}
                  className={cn(
                    "inline-flex h-12 min-w-0 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01]",
                    !canNext() && "opacity-50",
                  )}
                >
                  {t(STUDIO.next)}
                </button>
              )}
            </div>
          )}

          {/* mobile preview */}
          <div className="mt-6 lg:hidden">
            <button
              type="button"
              onClick={() => setMobilePreview((v) => !v)}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              {mobilePreview ? t(STUDIO.hidePreview) : t(STUDIO.showPreview)}
              <ChevronDown className={cn("h-4 w-4 transition-transform", mobilePreview && "rotate-180")} />
            </button>
            {mobilePreview && <div className="mt-4">{previewPanel}</div>}
          </div>
        </form>

        {/* desktop sticky preview */}
        <aside className="hidden lg:block lg:sticky lg:top-24">{previewPanel}</aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="truncate text-sm font-semibold">{value}</dd>
    </div>
  );
}

function ArrowBtn({ onClick, dir }: { onClick: () => void; dir: "up" | "down" | "left" | "right" }) {
  const rot = { up: "-rotate-90", down: "rotate-90", left: "rotate-180", right: "" }[dir];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border transition-colors hover:border-primary hover:text-primary"
    >
      <svg viewBox="0 0 24 24" className={cn("h-4 w-4", rot)} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
