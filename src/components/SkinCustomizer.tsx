import { useCallback, useMemo, useRef, useState } from "react";
import {
  Minus,
  Plus,
  RotateCcw,
  RotateCw,
  Upload,
  Loader2,
  ShoppingBag,
  Check,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart";
import {
  SKIN_MODELS,
  SKIN_TEMPLATES,
  templateFor,
  type SkinCoverage,
  type SkinTemplate,
} from "@/lib/skin-templates";
import { COVERAGE_LABELS, COVERAGE_PRICES, CS, type SkinTransform } from "@/lib/custom-skin";
import { saveCustomSkin } from "@/lib/custom-skin.functions";
import { toast } from "sonner";

const ACCEPT = ["image/jpeg", "image/png", "image/webp"];
const DEFAULT_TRANSFORM: SkinTransform = { x: 0, y: 0, scale: 1, rotation: 0 };

type Loaded = { dataUrl: string; type: string; name: string; w: number; h: number };

/** Rendu SVG du gabarit + design, réutilisé pour l'écran et pour l'export. */
function templateSvgMarkup(
  tpl: SkinTemplate,
  img: Loaded | null,
  t: SkinTransform,
  base: number,
) {
  const clipId = "skin-clip";
  const inner = img
    ? `<g clip-path="url(#${clipId})"><g transform="translate(${tpl.width / 2 + t.x} ${
        tpl.height / 2 + t.y
      }) rotate(${t.rotation}) scale(${base * t.scale}) translate(${-img.w / 2} ${-img.h / 2})">` +
      `<image href="${img.dataUrl}" x="0" y="0" width="${img.w}" height="${img.h}" preserveAspectRatio="none"/></g></g>`
    : "";
  const outline =
    tpl.outlinePaths
      .map((d) => `<path d="${d}" fill="none" stroke="#111" stroke-width="0.6"/>`)
      .join("") +
    tpl.outlineRects
      .map(
        (r) =>
          `<rect x="${r.x}" y="${r.y}" width="${r.width}" height="${r.height}" fill="none" stroke="#111" stroke-width="0.6"/>`,
      )
      .join("");
  const rectMarkup = (attrs: string) =>
    tpl.printRects
      .map((r) => `<rect x="${r.x}" y="${r.y}" width="${r.width}" height="${r.height}" ${attrs}/>`)
      .join("");
  const clip = `<clipPath id="${clipId}" clipPathUnits="userSpaceOnUse">${tpl.printPaths
    .map((d) => `<path d="${d}" clip-rule="evenodd"/>`)
    .join("")}${rectMarkup("")}</clipPath>`;
  const plate =
    tpl.printPaths.map((d) => `<path d="${d}" fill="#f4f4f5" fill-rule="evenodd"/>`).join("") +
    rectMarkup('fill="#f4f4f5"');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${tpl.viewBox}" width="${
    tpl.width * 4
  }" height="${tpl.height * 4}"><defs>${clip}</defs>${plate}${inner}${outline}</svg>`;
}

async function rasterize(markup: string, width: number): Promise<string> {
  const svgUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`;
  const image = new Image();
  image.crossOrigin = "anonymous";
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("SVG_RENDER_FAILED"));
    image.src = svgUrl;
  });
  const ratio = image.height / image.width || 2;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = Math.round(width * ratio);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("NO_CANVAS");
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/png");
}

export function SkinCustomizer() {
  const { lang } = useI18n();
  const cart = useCart();
  const fileRef = useRef<HTMLInputElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [modelId, setModelId] = useState<string>(SKIN_MODELS[0].id);
  const [coverage, setCoverage] = useState<SkinCoverage>("back");
  const [img, setImg] = useState<Loaded | null>(null);
  const [t, setT] = useState<SkinTransform>(DEFAULT_TRANSFORM);
  const [qty, setQty] = useState(1);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const drag = useRef<{ id: number; sx: number; sy: number; ox: number; oy: number } | null>(null);

  const tpl = templateFor(modelId, coverage) ?? SKIN_TEMPLATES[0]!;
  const price = COVERAGE_PRICES[coverage];

  // Échelle de base : l'image couvre entièrement le gabarit.
  const base = useMemo(() => {
    if (!img) return 1;
    return Math.max(tpl.width / img.w, tpl.height / img.h);
  }, [img, tpl.width, tpl.height]);

  const onFile = useCallback((file: File) => {
    if (!ACCEPT.includes(file.type)) {
      toast.error(CS.badType[lang]);
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error(CS.tooBig[lang]);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      const probe = new Image();
      probe.onload = () => {
        setImg({ dataUrl, type: file.type, name: file.name, w: probe.width, h: probe.height });
        setT(DEFAULT_TRANSFORM);
        setDone(false);
      };
      probe.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }, [lang]);

  const toViewBox = (clientX: number, clientY: number) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: ((clientX - rect.left) / rect.width) * tpl.width,
      y: ((clientY - rect.top) / rect.height) * tpl.height,
    };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (!img) return;
    const p = toViewBox(e.clientX, e.clientY);
    drag.current = { id: e.pointerId, sx: p.x, sy: p.y, ox: t.x, oy: t.y };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const p = toViewBox(e.clientX, e.clientY);
    setT((prev) => ({ ...prev, x: d.ox + (p.x - d.sx), y: d.oy + (p.y - d.sy) }));
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (drag.current?.id === e.pointerId) drag.current = null;
  };

  const nudge = (dx: number, dy: number) =>
    setT((p) => ({ ...p, x: p.x + dx, y: p.y + dy }));

  const addToCart = async () => {
    if (!img) {
      toast.error(CS.needImage[lang]);
      return;
    }
    setBusy(true);
    try {
      const markup = templateSvgMarkup(tpl, img, t, base);
      const previewDataUrl = await rasterize(markup, 1000);
      const thumb = await rasterize(markup, 220);
      const saved = await saveCustomSkin({
        data: {
          modelId,
          coverage,
          templateId: tpl.id,
          transform: t,
          originalType: img.type,
          originalName: img.name,
          originalDataUrl: img.dataUrl,
          previewDataUrl,
        },
      });
      cart.add(
        {
          productId: `custom-${saved.id}`,
          slug: "creer-mon-skin",
          category: "custom",
          name: {
            fr: `Skin personnalisé — ${COVERAGE_LABELS[coverage].fr}`,
            ar: `سكين مخصص — ${COVERAGE_LABELS[coverage].ar}`,
            en: `Custom skin — ${COVERAGE_LABELS[coverage].en}`,
          },
          image: thumb,
          price,
          custom: {
            modelId,
            modelLabel: tpl.modelLabel,
            coverage,
            templateId: tpl.id,
            transform: t,
            originalPath: saved.originalPath,
            previewPath: saved.previewPath,
          },
        },
        tpl.modelLabel,
        qty,
      );
      setDone(true);
      toast.success(CS.added[lang]);
    } catch {
      toast.error(CS.error[lang]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-10">
      {/* PREVIEW */}
      <div className="rounded-3xl border border-border bg-card p-4 sm:p-6">
        <p className="mb-3 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {CS.preview[lang]}
        </p>
        <div className="mx-auto max-w-[300px] select-none">
          <svg
            ref={svgRef}
            viewBox={tpl.viewBox}
            className={cn("w-full touch-none", img ? "cursor-grab active:cursor-grabbing" : "")}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <defs>
              <clipPath id={`clip-${tpl.id}`} clipPathUnits="userSpaceOnUse">
                {tpl.printPaths.map((d, i) => (
                  <path key={i} d={d} clipRule="evenodd" />
                ))}
                {tpl.printRects.map((r, i) => (
                  <rect key={`cr-${i}`} x={r.x} y={r.y} width={r.width} height={r.height} />
                ))}
              </clipPath>
            </defs>
            {tpl.printPaths.map((d, i) => (
              <path key={`plate-${i}`} d={d} fill="hsl(0 0% 96%)" fillRule="evenodd" />
            ))}
            {tpl.printRects.map((r, i) => (
              <rect
                key={`plate-r-${i}`}
                x={r.x}
                y={r.y}
                width={r.width}
                height={r.height}
                fill="hsl(0 0% 96%)"
              />
            ))}
            {img && (
              <g clipPath={`url(#clip-${tpl.id})`}>
                <g
                  transform={`translate(${tpl.width / 2 + t.x} ${tpl.height / 2 + t.y}) rotate(${
                    t.rotation
                  }) scale(${base * t.scale}) translate(${-img.w / 2} ${-img.h / 2})`}
                >
                  <image href={img.dataUrl} x={0} y={0} width={img.w} height={img.h} />
                </g>
              </g>
            )}
            {tpl.outlinePaths.map((d, i) => (
              <path key={`o-${i}`} d={d} fill="none" stroke="currentColor" strokeWidth={0.6} />
            ))}
            {tpl.outlineRects.map((r, i) => (
              <rect
                key={`r-${i}`}
                x={r.x}
                y={r.y}
                width={r.width}
                height={r.height}
                fill="none"
                stroke="currentColor"
                strokeWidth={0.6}
              />
            ))}
          </svg>
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">{CS.dragHint[lang]}</p>
      </div>

      {/* CONTROLS */}
      <div className="space-y-5">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {CS.model[lang]}
          </label>
          <select
            value={modelId}
            onChange={(e) => setModelId(e.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-border bg-card px-3 text-sm font-medium"
          >
            {SKIN_MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {CS.coverage[lang]}
          </label>
          <div className="mt-2 grid gap-2">
            {(["back", "camera"] as SkinCoverage[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCoverage(c);
                  setDone(false);
                }}
                aria-pressed={coverage === c}
                className={cn(
                  "flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition-colors",
                  coverage === c
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-card hover:border-primary",
                )}
              >
                <span>{COVERAGE_LABELS[c][lang]}</span>
                <span className="text-xs font-bold">{COVERAGE_PRICES[c]} MAD</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <input
            ref={fileRef}
            type="file"
            accept={ACCEPT.join(",")}
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFile(f);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-primary/50 bg-primary/5 text-sm font-semibold text-primary"
          >
            <Upload className="h-4 w-4" />
            {img ? CS.replace[lang] : CS.upload[lang]}
          </button>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">{CS.formats[lang]}</p>
        </div>

        <div className={cn("space-y-4 rounded-2xl border border-border bg-card p-4", !img && "opacity-50")}>
          <div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span>{CS.zoom[lang]}</span>
              <span className="text-muted-foreground">{Math.round(t.scale * 100)}%</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                disabled={!img}
                onClick={() => setT((p) => ({ ...p, scale: Math.max(0.2, p.scale - 0.1) }))}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="range"
                min={0.2}
                max={4}
                step={0.01}
                value={t.scale}
                disabled={!img}
                onChange={(e) => setT((p) => ({ ...p, scale: Number(e.target.value) }))}
                className="h-1.5 w-full accent-primary"
              />
              <button
                type="button"
                disabled={!img}
                onClick={() => setT((p) => ({ ...p, scale: Math.min(4, p.scale + 0.1) }))}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span>{CS.rotation[lang]}</span>
              <span className="text-muted-foreground">{Math.round(t.rotation)}°</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <button
                type="button"
                disabled={!img}
                onClick={() => setT((p) => ({ ...p, rotation: p.rotation - 15 }))}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <input
                type="range"
                min={-180}
                max={180}
                step={1}
                value={t.rotation}
                disabled={!img}
                onChange={(e) => setT((p) => ({ ...p, rotation: Number(e.target.value) }))}
                className="h-1.5 w-full accent-primary"
              />
              <button
                type="button"
                disabled={!img}
                onClick={() => setT((p) => ({ ...p, rotation: p.rotation + 15 }))}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border"
              >
                <RotateCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold">{CS.position[lang]}</span>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              <span />
              <button type="button" disabled={!img} onClick={() => nudge(0, -8)} className="h-9 rounded-lg border border-border text-sm">↑</button>
              <span />
              <button type="button" disabled={!img} onClick={() => nudge(-8, 0)} className="h-9 rounded-lg border border-border text-sm">←</button>
              <button
                type="button"
                disabled={!img}
                onClick={() => setT(DEFAULT_TRANSFORM)}
                className="inline-flex h-9 items-center justify-center gap-1 rounded-lg border border-border text-xs font-semibold"
              >
                {CS.reset[lang]}
              </button>
              <button type="button" disabled={!img} onClick={() => nudge(8, 0)} className="h-9 rounded-lg border border-border text-sm">→</button>
              <span />
              <button type="button" disabled={!img} onClick={() => nudge(0, 8)} className="h-9 rounded-lg border border-border text-sm">↓</button>
              <span />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {CS.quantity[lang]}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="grid h-8 w-8 place-items-center rounded-lg border border-border"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-bold">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(20, q + 1))}
              className="grid h-8 w-8 place-items-center rounded-lg border border-border"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{CS.price[lang]}</span>
          <span className="text-xl font-bold">{price * qty} MAD</span>
        </div>

        <button
          type="button"
          onClick={addToCart}
          disabled={busy || !img}
          className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-60"
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : done ? (
            <Check className="h-4 w-4" />
          ) : (
            <ShoppingBag className="h-4 w-4" />
          )}
          {busy ? CS.saving[lang] : done ? CS.added[lang] : CS.addToCart[lang]}
        </button>
      </div>
    </div>
  );
}
