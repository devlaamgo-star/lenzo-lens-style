import { useRef } from "react";
import { coverBox, phoneColor, textFont, type PhoneTemplate, type SkinArea } from "@/lib/phone-templates";
import { cn } from "@/lib/utils";

export type Artwork = {
  src: string | null;
  ratio: number; // width / height
  zoom: number;
  x: number; // offset as fraction of the skin box
  y: number;
};

export type TextOverlay = {
  value: string;
  font: string;
  color: string;
  position: "top" | "center" | "bottom";
};

export type PreviewConfig = {
  template: PhoneTemplate;
  color: string;
  area: SkinArea;
  artwork: Artwork;
  text: TextOverlay;
};

type Props = PreviewConfig & {
  /** enlarge the camera module instead of showing the whole phone */
  focus?: "phone" | "camera";
  draggable?: boolean;
  onDrag?: (dx: number, dy: number) => void;
  className?: string;
};

function textTop(position: TextOverlay["position"]) {
  return position === "top" ? "18%" : position === "bottom" ? "76%" : "47%";
}

export function PhonePreview({
  template,
  color,
  area,
  artwork,
  text,
  focus = "phone",
  draggable = false,
  onDrag,
  className,
}: Props) {
  const c = phoneColor(color);
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);

  const showBack = area === "back" || area === "both";
  const showCam = area === "camera" || area === "both";
  const skin = template.skin;
  const island = template.island;

  // box ratios (w/h) in the phone body coordinate space
  const bodyRatio = 1 / template.aspect;
  const skinRatio = (skin.w * 1) / (skin.h * template.aspect);
  const islandRatio = (island.w * 1) / (island.h * template.aspect);

  const skinFit = coverBox(skinRatio, artwork.ratio || 1, artwork.zoom, artwork.x, artwork.y);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!draggable || !artwork.src) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || !onDrag) return;
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    const dx = (e.clientX - drag.current.x) / box.width;
    const dy = (e.clientY - drag.current.y) / box.height;
    drag.current = { x: e.clientX, y: e.clientY };
    onDrag(dx, dy);
  };
  const endDrag = () => {
    drag.current = null;
  };

  /* ---------- camera-focus mode: standalone camera sticker ---------- */
  if (focus === "camera") {
    const camFit = coverBox(islandRatio, artwork.ratio || 1, artwork.zoom, artwork.x, artwork.y);
    return (
      <div className={cn("mx-auto w-full max-w-[420px]", className)}>
        <div
          ref={ref}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className={cn(
            "relative w-full overflow-hidden rounded-[8%] border border-border/60 shadow-lift",
            draggable && artwork.src && "cursor-grab touch-none active:cursor-grabbing",
          )}
          style={{ aspectRatio: `${islandRatio}`, backgroundColor: c.body }}
        >
          {artwork.src && (
            <img
              src={artwork.src}
              alt=""
              draggable={false}
              className="pointer-events-none absolute max-w-none select-none"
              style={{
                width: `${camFit.w}%`,
                height: `${camFit.h}%`,
                left: `${camFit.left}%`,
                top: `${camFit.top}%`,
              }}
            />
          )}
          {text.value && (
            <span
              className="pointer-events-none absolute inset-x-0 text-center"
              style={{
                top: textTop(text.position),
                color: text.color,
                fontFamily: textFont(text.font).css,
                fontWeight: textFont(text.font).weight,
                fontSize: "13%",
                letterSpacing: "0.06em",
              }}
            >
              {text.value}
            </span>
          )}
          <Cutouts template={template} />
        </div>
      </div>
    );
  }

  /* ---------- full phone ---------- */
  return (
    <div className={cn("mx-auto w-full max-w-[300px]", className)}>
      <div
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={cn(
          "relative w-full overflow-hidden shadow-lift",
          draggable && artwork.src && "cursor-grab touch-none active:cursor-grabbing",
        )}
        style={{
          aspectRatio: `${bodyRatio}`,
          backgroundColor: c.edge,
          borderRadius: `${template.radius * 100}%/${(template.radius * 100) / template.aspect}%`,
        }}
      >
        {/* rear skin area */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: `${skin.x * 100}%`,
            top: `${skin.y * 100}%`,
            width: `${skin.w * 100}%`,
            height: `${skin.h * 100}%`,
            backgroundColor: c.body,
            borderRadius: `${(skin.radius * 100) / skin.w}%/${(skin.radius * 100) / (skin.h * template.aspect)}%`,
          }}
        >
          {showBack && artwork.src && (
            <img
              src={artwork.src}
              alt=""
              draggable={false}
              className="pointer-events-none absolute max-w-none select-none"
              style={{
                width: `${skinFit.w}%`,
                height: `${skinFit.h}%`,
                left: `${skinFit.left}%`,
                top: `${skinFit.top}%`,
              }}
            />
          )}
          {showBack && text.value && (
            <span
              className="pointer-events-none absolute inset-x-0 text-center"
              style={{
                top: textTop(text.position),
                color: text.color,
                fontFamily: textFont(text.font).css,
                fontWeight: textFont(text.font).weight,
                fontSize: "16%",
                letterSpacing: "0.06em",
              }}
            >
              {text.value}
            </span>
          )}
          {/* soft gloss */}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-black/10" />
        </div>

        {/* camera island */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: `${island.x * 100}%`,
            top: `${island.y * 100}%`,
            width: `${island.w * 100}%`,
            height: `${island.h * 100}%`,
            backgroundColor: c.body,
            borderRadius: `${(island.radius * 100) / island.w}%/${(island.radius * 100) / (island.h * template.aspect)}%`,
            boxShadow: "0 2px 10px rgba(0,0,0,.28)",
          }}
        >
          {showCam && artwork.src && (
            /* re-project the rear-skin artwork box inside the island so the two align */
            <div
              className="absolute"
              style={{
                left: `${((skin.x - island.x) / island.w) * 100}%`,
                top: `${((skin.y - island.y) / island.h) * 100}%`,
                width: `${(skin.w / island.w) * 100}%`,
                height: `${(skin.h / island.h) * 100}%`,
              }}
            >
              <img
                src={artwork.src}
                alt=""
                draggable={false}
                className="pointer-events-none absolute max-w-none select-none"
                style={{
                  width: `${skinFit.w}%`,
                  height: `${skinFit.h}%`,
                  left: `${skinFit.left}%`,
                  top: `${skinFit.top}%`,
                }}
              />
            </div>
          )}
          <Cutouts template={template} />
        </div>
      </div>
    </div>
  );
}

/** Lens + flash cutouts drawn over the camera skin (never covered by artwork). */
function Cutouts({ template }: { template: PhoneTemplate }) {
  const ratio = (template.island.w * 1) / (template.island.h * template.aspect);
  return (
    <>
      {template.lenses.map((l, i) => (
        <span
          key={`l-${i}`}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: `${(l.cx - l.r) * 100}%`,
            top: `${(l.cy - l.r * ratio) * 100}%`,
            width: `${l.r * 200}%`,
            height: `${l.r * ratio * 200}%`,
            background: "radial-gradient(circle at 35% 30%, #4a4d55 0%, #17181c 55%, #050506 100%)",
            boxShadow: "0 0 0 4% rgba(120,120,130,.45), inset 0 0 6px rgba(255,255,255,.25)",
          }}
        />
      ))}
      {template.dots.map((d, i) => (
        <span
          key={`d-${i}`}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: `${(d.cx - d.r) * 100}%`,
            top: `${(d.cy - d.r * ratio) * 100}%`,
            width: `${d.r * 200}%`,
            height: `${d.r * ratio * 200}%`,
            background: "radial-gradient(circle at 40% 35%, #fff6d8 0%, #cbb98a 60%, #7b7364 100%)",
          }}
        />
      ))}
    </>
  );
}
