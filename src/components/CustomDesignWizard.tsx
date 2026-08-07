import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Crown, Loader2, Sparkles, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { useI18n } from "@/lib/i18n";
import { MOROCCAN_CITIES } from "@/lib/catalog";
import { CD } from "@/lib/custom-design";
import { PHONE_BRANDS, PHONE_COLORS, WIZ } from "@/lib/custom-design-wizard";
import { createDesignRequest } from "@/lib/design-requests.functions";
import { cn } from "@/lib/utils";

const PHONE_RE = /^(?:\+212|00212|0)([5-7])\d{8}$/;
const ACCEPT = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const MAX_BYTES = 8 * 1024 * 1024;
const MAX_FILES = 6;
const TOTAL = 7;

type Upl = { name: string; type: string; dataUrl: string };

export function CustomDesignWizard() {
  const { lang } = useI18n();
  const submit = useServerFn(createDesignRequest);
  const fileInput = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(1);
  const [subject, setSubject] = useState("");

  useEffect(() => {
    const onPreselect = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      if (!value) return;
      setSubject(value);
      setStep(1);
    };
    window.addEventListener("skinup:preselect-subject", onPreselect);
    return () => window.removeEventListener("skinup:preselect-subject", onPreselect);
  }, []);

  const [style, setStyle] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [customColor, setCustomColor] = useState("");
  const [letDesigner, setLetDesigner] = useState(false);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [otherModel, setOtherModel] = useState("");
  const [phoneColor, setPhoneColor] = useState("");
  const [type, setType] = useState<"back" | "camera" | "both">("both");
  const [files, setFiles] = useState<Upl[]>([]);
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [touched, setTouched] = useState(false);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  const models = useMemo(
    () => PHONE_BRANDS.find((b) => b.value === brand)?.models ?? [],
    [brand],
  );
  const resolvedModel = model === "__other" || models.length === 0 ? otherModel : model;

  const scrollTop = () => {
    const y = rootRef.current?.getBoundingClientRect().top ?? 0;
    if (y < 0) rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const canNext = () => {
    if (step === 1) return subject !== "";
    if (step === 2) return style !== "";
    if (step === 3) return letDesigner || colors.length > 0 || customColor.trim() !== "";
    if (step === 4) return brand !== "" && resolvedModel.trim().length >= 2;
    return true;
  };

  const goNext = () => {
    setTouched(true);
    if (!canNext()) return;
    setTouched(false);
    setStep((s) => Math.min(TOTAL, s + 1));
    scrollTop();
  };
  const goBack = () => {
    setTouched(false);
    setStep((s) => Math.max(1, s - 1));
    scrollTop();
  };

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files ?? []);
    if (fileInput.current) fileInput.current.value = "";
    const valid = list.filter((f) => ACCEPT.includes(f.type) && f.size <= MAX_BYTES);
    if (valid.length !== list.length) toast.error(CD.errors.file[lang]);
    const room = MAX_FILES - files.length;
    valid.slice(0, room).forEach((f) => {
      const reader = new FileReader();
      reader.onload = () =>
        setFiles((prev) =>
          prev.length >= MAX_FILES ? prev : [...prev, { name: f.name, type: f.type, dataUrl: String(reader.result) }],
        );
      reader.readAsDataURL(f);
    });
  };

  const colorsText = () => {
    const named = colors
      .map((c) => WIZ.s3.options.find((o) => o.value === c)?.label[lang] ?? c)
      .join(", ");
    const parts = [named, customColor.trim(), letDesigner ? WIZ.s3.letDesigner[lang] : ""].filter(Boolean);
    return parts.join(" — ").slice(0, 200);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (pending) return;
    if (name.trim().length < 3 || !PHONE_RE.test(phone.replace(/[\s.-]/g, "")) || city.trim().length < 2) return;

    setPending(true);
    try {
      const res = await submit({
        data: {
          fullName: name,
          phone,
          city,
          brand: PHONE_BRANDS.find((b) => b.value === brand)?.label ?? brand,
          model: resolvedModel,
          phoneColor: PHONE_COLORS.find((c) => c.value === phoneColor)?.label[lang] ?? "",
          subject: WIZ.s1.options.find((o) => o.value === subject)?.label.en ?? subject,
          style: WIZ.s2.options.find((o) => o.value === style)?.label.en ?? style,
          requestType: type,
          description: desc,
          colors: colorsText(),
          notes: "",
          locale: lang,
          files,
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
    setStyle("");
    setColors([]);
    setCustomColor("");
    setLetDesigner(false);
    setBrand("");
    setModel("");
    setOtherModel("");
    setPhoneColor("");
    setType("both");
    setFiles([]);
    setDesc("");
    setName("");
    setPhone("");
    setCity("");
  };

  const field =
    "h-12 w-full rounded-xl border border-input bg-card px-4 text-sm outline-none transition-colors focus:border-primary";
  const cardBase =
    "group relative flex flex-col items-center justify-center gap-2 rounded-2xl border-2 bg-card p-4 text-center transition-all";
  const active = "border-primary bg-primary/5 shadow-lift";
  const idle = "border-border hover:border-primary/50";

  if (done) {
    return (
      <div ref={rootRef} id="wizard" className="scroll-mt-24">
        <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-6 text-center sm:p-10">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/15">
            <Check className="h-7 w-7 text-success" />
          </span>
          <h3 className="mt-5 text-xl font-bold sm:text-2xl">{WIZ.doneTitle[lang]}</h3>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
            {WIZ.doneText[lang]}
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm">
            <span className="text-muted-foreground">{WIZ.doneRef[lang]}</span>
            <span className="font-semibold" dir="ltr">{done}</span>
          </p>
          <div>
            <button
              type="button"
              onClick={reset}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              {WIZ.restart[lang]}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={rootRef} id="wizard" className="scroll-mt-24">
      <div className="mx-auto max-w-3xl">
        {/* progress */}
        <div className="mb-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <p className="min-w-0 truncate text-sm font-semibold text-primary">
              {WIZ.stepOf[lang].replace("{n}", String(step))}
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

        <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-border bg-card p-4 sm:p-7">
          {/* STEP 1 */}
          {step === 1 && (
            <fieldset>
              <legend className="text-lg font-bold sm:text-xl">{WIZ.s1.title[lang]}</legend>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {WIZ.s1.options.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setSubject(o.value)}
                    aria-pressed={subject === o.value}
                    className={cn(cardBase, "min-h-[104px]", subject === o.value ? active : idle)}
                  >
                    <span className="text-2xl" aria-hidden>{o.emoji}</span>
                    <span className="text-xs font-semibold leading-snug sm:text-sm">{o.label[lang]}</span>
                    {subject === o.value && (
                      <Check className="absolute end-2 top-2 h-4 w-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <fieldset>
              <legend className="text-lg font-bold sm:text-xl">{WIZ.s2.title[lang]}</legend>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {WIZ.s2.options.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setStyle(o.value)}
                    aria-pressed={style === o.value}
                    className={cn(
                      "relative overflow-hidden rounded-2xl border-2 bg-card transition-all",
                      style === o.value ? active : idle,
                    )}
                  >
                    {o.image ? (
                      <img
                        src={o.image}
                        alt=""
                        loading="lazy"
                        className="aspect-square w-full bg-surface object-contain p-1.5"
                      />
                    ) : (
                      <span className="flex aspect-square w-full items-center justify-center bg-surface text-3xl">
                        ✨
                      </span>
                    )}
                    <span className="block border-t border-border px-2 py-2 text-xs font-semibold sm:text-sm">
                      {o.label[lang]}
                    </span>
                    {style === o.value && <Check className="absolute end-2 top-2 h-4 w-4 text-primary" />}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <fieldset>
              <legend className="text-lg font-bold sm:text-xl">{WIZ.s3.title[lang]}</legend>
              <p className="mt-1.5 text-sm text-muted-foreground">{WIZ.s3.hint[lang]}</p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {WIZ.s3.options.map((o) => {
                  const on = colors.includes(o.value);
                  return (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() =>
                        setColors((p) => (on ? p.filter((c) => c !== o.value) : [...p, o.value]))
                      }
                      aria-pressed={on}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border-2 bg-card px-3 py-3 text-start transition-all",
                        on ? active : idle,
                      )}
                    >
                      <span
                        className="h-7 w-7 shrink-0 rounded-full border border-border"
                        style={{ backgroundColor: o.swatch }}
                        aria-hidden
                      />
                      <span className="min-w-0 truncate text-sm font-semibold">{o.label[lang]}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="min-w-0">
                  <label htmlFor="w-custom-color" className="mb-1.5 block text-sm font-medium">
                    {WIZ.s3.custom[lang]}
                  </label>
                  <input
                    id="w-custom-color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    placeholder={WIZ.s3.customPlaceholder[lang]}
                    maxLength={80}
                    className={field}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setLetDesigner((v) => !v)}
                  aria-pressed={letDesigner}
                  className={cn(
                    "mt-auto flex h-12 items-center justify-center gap-2 rounded-xl border-2 px-4 text-sm font-semibold transition-all",
                    letDesigner ? active : idle,
                  )}
                >
                  <Sparkles className="h-4 w-4 text-primary" />
                  {WIZ.s3.letDesigner[lang]}
                </button>
              </div>
            </fieldset>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <fieldset>
              <legend className="text-lg font-bold sm:text-xl">{WIZ.s4.title[lang]}</legend>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="min-w-0">
                  <label htmlFor="w-brand" className="mb-1.5 block text-sm font-medium">
                    {WIZ.s4.brand[lang]}
                  </label>
                  <select
                    id="w-brand"
                    value={brand}
                    onChange={(e) => {
                      setBrand(e.target.value);
                      setModel("");
                      setOtherModel("");
                    }}
                    className={field}
                  >
                    <option value="">{WIZ.s4.choose[lang]}</option>
                    {PHONE_BRANDS.map((b) => (
                      <option key={b.value} value={b.value}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="min-w-0">
                  <label htmlFor="w-model" className="mb-1.5 block text-sm font-medium">
                    {WIZ.s4.model[lang]}
                  </label>
                  {models.length > 0 ? (
                    <select id="w-model" value={model} onChange={(e) => setModel(e.target.value)} className={field}>
                      <option value="">{WIZ.s4.choose[lang]}</option>
                      {models.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                      <option value="__other">{WIZ.s4.other[lang]}</option>
                    </select>
                  ) : (
                    <input
                      id="w-model"
                      value={otherModel}
                      onChange={(e) => setOtherModel(e.target.value)}
                      maxLength={60}
                      disabled={!brand}
                      className={cn(field, !brand && "opacity-60")}
                    />
                  )}
                </div>
                {models.length > 0 && model === "__other" && (
                  <div className="min-w-0 sm:col-span-2">
                    <label htmlFor="w-other-model" className="mb-1.5 block text-sm font-medium">
                      {WIZ.s4.other[lang]}
                    </label>
                    <input
                      id="w-other-model"
                      value={otherModel}
                      onChange={(e) => setOtherModel(e.target.value)}
                      maxLength={60}
                      className={field}
                    />
                  </div>
                )}
              </div>
              <p className="mb-2 mt-5 text-sm font-medium">{WIZ.s4.color[lang]}</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {PHONE_COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setPhoneColor(c.value)}
                    aria-pressed={phoneColor === c.value}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border-2 bg-card px-3 py-3 text-start transition-all",
                      phoneColor === c.value ? active : idle,
                    )}
                  >
                    <span
                      className="h-7 w-7 shrink-0 rounded-full border border-border"
                      style={{ backgroundColor: c.swatch }}
                      aria-hidden
                    />
                    <span className="min-w-0 truncate text-sm font-semibold">{c.label[lang]}</span>
                  </button>
                ))}
              </div>
              {touched && !canNext() && (
                <p className="mt-3 text-xs text-destructive">{CD.errors.model[lang]}</p>
              )}
            </fieldset>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <fieldset>
              <legend className="text-lg font-bold sm:text-xl">{WIZ.s5.title[lang]}</legend>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {WIZ.s5.options.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => setType(o.value as typeof type)}
                    aria-pressed={type === o.value}
                    className={cn(
                      "relative overflow-hidden rounded-2xl border-2 bg-card text-start transition-all",
                      type === o.value ? active : idle,
                    )}
                  >
                    {o.value === "both" && (
                      <span className="absolute start-2 top-2 z-10 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground">
                        <Crown className="h-3 w-3" />
                        {WIZ.s5.popular[lang]}
                      </span>
                    )}
                    <img
                      src={o.image}
                      alt=""
                      loading="lazy"
                      className="aspect-[4/3] w-full bg-surface object-contain p-2"
                    />
                    <span className="block border-t border-border px-3 py-3 text-sm font-semibold">
                      {o.label[lang]}
                    </span>
                    {type === o.value && <Check className="absolute end-2 top-2 h-4 w-4 text-primary" />}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {/* STEP 6 */}
          {step === 6 && (
            <fieldset>
              <legend className="text-lg font-bold sm:text-xl">{WIZ.s6.title[lang]}</legend>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{WIZ.s6.helper[lang]}</p>
              <label
                htmlFor="w-files"
                className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-input bg-surface px-4 py-8 text-center transition-colors hover:border-primary"
              >
                <Upload className="h-6 w-6 text-primary" />
                <span className="text-sm font-semibold">{WIZ.s6.add[lang]}</span>
                <span className="text-xs text-muted-foreground">{WIZ.s6.formats[lang]}</span>
              </label>
              <input
                id="w-files"
                ref={fileInput}
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
                onChange={onFiles}
                className="sr-only"
              />
              {files.length > 0 && (
                <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {files.map((f, i) => (
                    <li key={`${f.name}-${i}`} className="relative overflow-hidden rounded-xl border border-border bg-card">
                      {f.type === "application/pdf" ? (
                        <span className="flex aspect-square w-full items-center justify-center bg-surface text-3xl">📄</span>
                      ) : (
                        <img src={f.dataUrl} alt={f.name} className="aspect-square w-full bg-surface object-contain" />
                      )}
                      <span className="block truncate border-t border-border px-2 py-2 text-xs">{f.name}</span>
                      <button
                        type="button"
                        onClick={() => setFiles((p) => p.filter((_, idx) => idx !== i))}
                        aria-label={CD.f.remove[lang]}
                        className="absolute end-1.5 top-1.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-card/90 text-foreground shadow-lift transition-colors hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-5">
                <label htmlFor="w-desc" className="mb-1.5 block text-sm font-medium">
                  {WIZ.s6.descTitle[lang]}{" "}
                  <span className="font-normal text-muted-foreground">({WIZ.optional[lang]})</span>
                </label>
                <textarea
                  id="w-desc"
                  rows={4}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  maxLength={1000}
                  placeholder={WIZ.s6.descPlaceholder[lang]}
                  className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                />
              </div>
            </fieldset>
          )}

          {/* STEP 7 */}
          {step === 7 && (
            <fieldset>
              <legend className="text-lg font-bold sm:text-xl">{WIZ.s7.title[lang]}</legend>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="min-w-0">
                  <label htmlFor="w-name" className="mb-1.5 block text-sm font-medium">
                    {WIZ.s7.name[lang]}
                  </label>
                  <input id="w-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} className={field} />
                  {touched && name.trim().length < 3 && <p className="mt-1.5 text-xs text-destructive">{CD.errors.name[lang]}</p>}
                </div>
                <div className="min-w-0">
                  <label htmlFor="w-phone" className="mb-1.5 block text-sm font-medium">
                    {WIZ.s7.phone[lang]}
                  </label>
                  <input
                    id="w-phone"
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
                <div className="min-w-0 sm:col-span-2">
                  <label htmlFor="w-city" className="mb-1.5 block text-sm font-medium">
                    {WIZ.s7.city[lang]}
                  </label>
                  <input id="w-city" list="w-cities" value={city} onChange={(e) => setCity(e.target.value)} maxLength={60} className={field} />
                  <datalist id="w-cities">
                    {MOROCCAN_CITIES.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                  {touched && city.trim().length < 2 && <p className="mt-1.5 text-xs text-destructive">{CD.errors.city[lang]}</p>}
                </div>
              </div>
            </fieldset>
          )}

          {/* nav */}
          <div className="mt-7 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 1}
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary disabled:opacity-40"
            >
              {WIZ.back[lang]}
            </button>
            {step < TOTAL ? (
              <button
                type="button"
                onClick={goNext}
                className={cn(
                  "inline-flex h-12 min-w-0 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01]",
                  !canNext() && "opacity-50",
                )}
              >
                {WIZ.next[lang]}
              </button>
            ) : (
              <button
                type="submit"
                disabled={pending}
                className="inline-flex h-12 min-w-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-60"
              >
                {pending && <Loader2 className="h-4 w-4 animate-spin" />}
                <span className="truncate">{WIZ.submit[lang]}</span>
              </button>
            )}
          </div>
          {touched && !canNext() && step < 4 && (
            <p className="mt-3 text-center text-xs text-muted-foreground">
              {WIZ.stepOf[lang].replace("{n}", String(step))}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
