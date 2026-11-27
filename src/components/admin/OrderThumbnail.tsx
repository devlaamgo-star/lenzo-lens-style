import { useState } from "react";
import { ImageOff } from "lucide-react";
import { stableOrderImage } from "@/lib/order-images";

export function OrderThumbnail({ image, name }: { image: string | null; name: string }) {
  const src = stableOrderImage(image);
  const [failed, setFailed] = useState<string | null>(null);
  if (!src || failed === src) {
    return (
      <span role="img" aria-label={`Photo indisponible : ${name}`} className="flex h-full w-full items-center justify-center text-muted-foreground">
        <ImageOff className="h-5 w-5" aria-hidden="true" />
      </span>
    );
  }
  return <img src={src} alt={name} className="h-full w-full object-contain" loading="lazy" onError={() => setFailed(src)} />;
}