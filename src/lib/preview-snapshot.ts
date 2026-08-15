import { coverBox, phoneColor, textFont, type PhoneTemplate, type SkinArea } from "@/lib/phone-templates";

type Snap = {
  template: PhoneTemplate;
  color: string;
  area: SkinArea;
  artwork: { src: string | null; zoom: number; x: number; y: number };
  text: { value: string; font: string; color: string; position: "top" | "center" | "bottom" };
};

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.arcTo(x + w, y, x + w, y + h, rad);
  ctx.arcTo(x + w, y + h, x, y + h, rad);
  ctx.arcTo(x, y + h, x, y, rad);
  ctx.arcTo(x, y, x + w, y, rad);
  ctx.closePath();
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  bx: number,
  by: number,
  bw: number,
  bh: number,
  zoom: number,
  ox: number,
  oy: number,
) {
  const fit = coverBox(bw / bh, img.naturalWidth / img.naturalHeight, zoom, ox, oy);
  ctx.drawImage(img, bx + (fit.left / 100) * bw, by + (fit.top / 100) * bh, (fit.w / 100) * bw, (fit.h / 100) * bh);
}

function drawText(
  ctx: CanvasRenderingContext2D,
  snap: Snap,
  bx: number,
  by: number,
  bw: number,
  bh: number,
  sizeRatio: number,
) {
  if (!snap.text.value) return;
  const f = textFont(snap.text.font);
  ctx.save();
  ctx.fillStyle = snap.text.color;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.font = `${f.weight} ${Math.round(bh * sizeRatio)}px ${f.css}`;
  const top = snap.text.position === "top" ? 0.18 : snap.text.position === "bottom" ? 0.76 : 0.47;
  ctx.fillText(snap.text.value, bx + bw / 2, by + bh * top, bw * 0.9);
  ctx.restore();
}

function drawCutouts(
  ctx: CanvasRenderingContext2D,
  template: PhoneTemplate,
  ix: number,
  iy: number,
  iw: number,
  ih: number,
) {
  for (const l of template.lenses) {
    const cx = ix + l.cx * iw;
    const cy = iy + l.cy * ih;
    const r = l.r * iw;
    const g = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.35, r * 0.15, cx, cy, r);
    g.addColorStop(0, "#4a4d55");
    g.addColorStop(0.55, "#17181c");
    g.addColorStop(1, "#050506");
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.lineWidth = Math.max(1, r * 0.14);
    ctx.strokeStyle = "rgba(140,140,150,.5)";
    ctx.stroke();
  }
  for (const d of template.dots) {
    const cx = ix + d.cx * iw;
    const cy = iy + d.cy * ih;
    const r = d.r * iw;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = "#e6d9ae";
    ctx.fill();
  }
}

/**
 * Renders the same layered mockup to a canvas and returns a JPEG data URL,
 * stored with the order so the production team sees exactly what the customer approved.
 */
export async function renderPreviewImage(snap: Snap, width = 900): Promise<string | null> {
  if (typeof document === "undefined") return null;
  const { template } = snap;
  const w = width;
  const h = Math.round(width * template.aspect);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const c = phoneColor(snap.color);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);

  // body
  roundRect(ctx, 0, 0, w, h, template.radius * w);
  ctx.fillStyle = c.edge;
  ctx.fill();

  const img = snap.artwork.src ? await loadImage(snap.artwork.src).catch(() => null) : null;

  // rear skin
  const sx = template.skin.x * w;
  const sy = template.skin.y * h;
  const sw = template.skin.w * w;
  const sh = template.skin.h * h;
  ctx.save();
  roundRect(ctx, sx, sy, sw, sh, template.skin.radius * w);
  ctx.clip();
  ctx.fillStyle = c.body;
  ctx.fillRect(sx, sy, sw, sh);
  if (img && (snap.area === "back" || snap.area === "both")) {
    drawCover(ctx, img, sx, sy, sw, sh, snap.artwork.zoom, snap.artwork.x, snap.artwork.y);
  }
  if (snap.area === "back" || snap.area === "both") drawText(ctx, snap, sx, sy, sw, sh, 0.055);
  ctx.restore();

  // camera island
  const ix = template.island.x * w;
  const iy = template.island.y * h;
  const iw = template.island.w * w;
  const ih = template.island.h * h;
  ctx.save();
  roundRect(ctx, ix, iy, iw, ih, template.island.radius * w);
  ctx.clip();
  ctx.fillStyle = c.body;
  ctx.fillRect(ix, iy, iw, ih);
  if (img && (snap.area === "camera" || snap.area === "both")) {
    // project the rear-skin box inside the island so both pieces line up
    drawCover(ctx, img, sx, sy, sw, sh, snap.artwork.zoom, snap.artwork.x, snap.artwork.y);
  }
  drawCutouts(ctx, template, ix, iy, iw, ih);
  ctx.restore();

  return canvas.toDataURL("image/jpeg", 0.88);
}
