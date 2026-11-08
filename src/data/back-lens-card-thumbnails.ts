// Card-sized WebP renditions of Back & Lens main images, keyed by product id.
// Re-encoded from the exact uploaded artwork (same 5:6 frame, white background);
// product pages, galleries, quick view and cart keep the full-resolution originals.
import duck360 from "@/assets/backlens/card-thumbs/back-lens-01-card-360.webp.asset.json";
import duck540 from "@/assets/backlens/card-thumbs/back-lens-01-card-540.webp.asset.json";
import duck720 from "@/assets/backlens/card-thumbs/back-lens-01-card-720.webp.asset.json";
import levis360 from "@/assets/backlens/card-thumbs/back-lens-02-card-360.webp.asset.json";
import levis540 from "@/assets/backlens/card-thumbs/back-lens-02-card-540.webp.asset.json";
import levis720 from "@/assets/backlens/card-thumbs/back-lens-02-card-720.webp.asset.json";
import pirate360 from "@/assets/backlens/card-thumbs/back-lens-03-card-360.webp.asset.json";
import pirate540 from "@/assets/backlens/card-thumbs/back-lens-03-card-540.webp.asset.json";
import pirate720 from "@/assets/backlens/card-thumbs/back-lens-03-card-720.webp.asset.json";

export type CardThumbnail = { src: string; srcSet: string };

function thumb(a: { url: string }, b: { url: string }, c: { url: string }): CardThumbnail {
  return { src: b.url, srcSet: `${a.url} 360w, ${b.url} 540w, ${c.url} 720w` };
}

const THUMBNAILS: Record<string, CardThumbnail> = {
  "skinup-backlens-01": thumb(duck360, duck540, duck720),
  "skinup-backlens-02": thumb(levis360, levis540, levis720),
  "skinup-backlens-03": thumb(pirate360, pirate540, pirate720),
};

/** Rendered image width inside a square card (images are 5:6, contained). */
export const BACK_LENS_CARD_SIZES = "(min-width: 1024px) 260px, 42vw";

export function backLensCardThumbnail(productId: string): CardThumbnail | undefined {
  return THUMBNAILS[productId];
}
