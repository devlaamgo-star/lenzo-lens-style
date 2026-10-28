import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { saveMetaConsent } from "@/lib/meta-pixel";

export const META_BANNER_COPY = {
  fr: { text: "Nous utilisons le Pixel Meta (Facebook/Instagram) pour mesurer nos publicités : pages vues, produits consultés, ajouts au panier et commandes, avec des cookies et identifiants publicitaires partagés avec Meta. Acceptez-vous ?", accept: "Accepter", refuse: "Refuser", more: "En savoir plus" },
  en: { text: "We use the Meta Pixel (Facebook/Instagram) to measure our ads: pages viewed, products viewed, cart additions and orders, using cookies and advertising identifiers shared with Meta. Do you accept?", accept: "Accept", refuse: "Refuse", more: "Learn more" },
  ar: { text: "كنستعملو Meta Pixel (فيسبوك/إنستغرام) باش نقيسو الإعلانات ديالنا: الصفحات والمنتجات اللي شفتي، الإضافات للسلة والطلبات، بواسطة كوكيز ومعرفات إعلانية كتشارك مع Meta. واش موافق؟", accept: "موافق", refuse: "رفض", more: "عرف أكثر" },
};

/** Shown only to visitors in consent-required or unresolved regions without a saved choice. */
export function MetaConsentBanner() {
  const { lang } = useI18n();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const check = () => setOpen(Boolean(window.skinupMetaNeedsBanner?.()));
    check();
    window.addEventListener("skinup-meta-region", check);
    window.addEventListener("skinup-meta-choice", check);
    window.addEventListener("storage", check);
    return () => {
      window.removeEventListener("skinup-meta-region", check);
      window.removeEventListener("skinup-meta-choice", check);
      window.removeEventListener("storage", check);
    };
  }, []);
  if (!open) return null;
  const c = META_BANNER_COPY[lang];
  const choose = (v: boolean) => { saveMetaConsent(v, c.text); setOpen(false); };
  return (
    <div role="dialog" aria-label="Cookies" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-border bg-background p-4 shadow-lg">
      <p className="text-xs leading-relaxed text-muted-foreground">
        {c.text} <Link to="/confidentialite" className="underline">{c.more}</Link>
      </p>
      <div className="mt-3 flex gap-2">
        <Button variant="outline" size="sm" className="min-h-10 flex-1" onClick={() => choose(false)}>{c.refuse}</Button>
        <Button size="sm" className="min-h-10 flex-1" onClick={() => choose(true)}>{c.accept}</Button>
      </div>
    </div>
  );
}
