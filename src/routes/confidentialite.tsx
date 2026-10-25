import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/lib/catalog";
import { TIKTOK_OPTOUT_KEY } from "@/lib/tiktok-pixel";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({ meta: [
    { title: "Confidentialité et publicité — SKINUP" },
    { name: "description", content: "Données personnelles, mesure publicitaire TikTok et choix de confidentialité sur SKINUP." },
    { property: "og:title", content: "Confidentialité et publicité — SKINUP" },
    { property: "og:description", content: "Consultez les usages des données et désactivez la mesure publicitaire TikTok." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: PrivacyPage,
});

const copy = {
  fr: ["Politique de confidentialité", "Vos commandes", "SKINUP utilise les coordonnées, l’adresse, les articles et les images fournis pour traiter vos commandes, assurer la livraison et répondre à vos demandes. Contact :", "Mesure publicitaire", "Le Pixel TikTok transmet à TikTok les pages visitées et les soumissions de commande réussies (événement SubmitForm), des informations sur le navigateur et l’appareil, l’adresse IP et des identifiants publicitaires/cookies pour mesurer les visites issues des publicités et améliorer leur diffusion. Aucun email ni téléphone client n’est envoyé par cette installation TikTok. Le Pixel Meta/Facebook existant reste inchangé et transmet à Meta les visites et informations de navigateur pour la mesure publicitaire.", "TikTok reste bloqué dans les régions où le consentement est requis (EEE, Royaume-Uni et Suisse), lorsque la région est inconnue, et en présence d’un refus ou d’un signal GPC/Do Not Track. Aucun événement bloqué n’est rejoué. Aucun consentement publicitaire n’est demandé ni enregistré comme accepté par cette installation.", "Votre choix TikTok", "Vous pouvez désactiver TikTok ici. Votre refus est conservé dans ce navigateur avec sa date et la version de cette notice (2026-10-25), et appliqué aux autres onglets ouverts. Les réglages de votre navigateur et les préférences publicitaires TikTok/Meta permettent également de limiter leur utilisation de vos données.", "Désactiver la mesure TikTok", "La mesure TikTok est désactivée dans ce navigateur."],
  en: ["Privacy policy", "Your orders", "SKINUP uses the contact details, address, items and images you provide to process orders, deliver purchases and answer requests. Contact:", "Advertising measurement", "The TikTok Pixel sends TikTok visited pages and successful order form submissions (SubmitForm event), browser and device information, IP address and advertising identifiers/cookies to measure visits from ads and improve ad delivery. This TikTok installation sends no customer email or phone number. The existing Meta/Facebook Pixel remains unchanged and sends Meta page visits and browser information for advertising measurement.", "TikTok is blocked in consent-required regions (EEA, UK and Switzerland), unknown regions, and when a refusal or GPC/Do Not Track signal applies. Blocked events are never replayed. This installation does not ask for or record advertising acceptance.", "Your TikTok choice", "You can disable TikTok here. Your refusal is saved in this browser with its date and notice version (2026-10-25), and applied to other open tabs. Browser settings and TikTok/Meta advertising preferences also allow you to limit their use of your data.", "Disable TikTok measurement", "TikTok measurement is disabled in this browser."],
  ar: ["سياسة الخصوصية", "طلباتكم", "تستعمل SKINUP معلومات الاتصال والعنوان والمنتجات والصور المقدمة لمعالجة الطلبات والتوصيل والرد على الاستفسارات. للتواصل:", "قياس الإعلانات", "يرسل بكسل TikTok إلى TikTok الصفحات المزارة ونجاح إرسال طلبات الشراء (حدث SubmitForm) ومعلومات المتصفح والجهاز وعنوان IP ومعرفات الإعلانات وملفات الارتباط لقياس زيارات الإعلانات وتحسين عرضها. هذا التثبيت لا يرسل بريد العميل أو هاتفه. بكسل Meta/Facebook الحالي لم يتغير ويرسل إلى Meta معلومات الزيارات والمتصفح لقياس الإعلانات.", "يُحظر TikTok في المناطق التي تتطلب الموافقة (المنطقة الاقتصادية الأوروبية وبريطانيا وسويسرا)، وعندما تكون المنطقة غير معروفة أو يوجد رفض أو إشارة GPC أو Do Not Track. لا تُرسل الأحداث المحظورة لاحقاً. لا يطلب هذا التثبيت موافقة إعلانية ولا يسجل قبولاً.", "اختياركم بشأن TikTok", "يمكنكم تعطيل TikTok هنا. يُحفظ الرفض في هذا المتصفح مع التاريخ وإصدار الإشعار (2026-10-25) ويطبق على علامات التبويب الأخرى. يمكنكم أيضاً تحديد استخدام بياناتكم عبر إعدادات المتصفح وتفضيلات إعلانات TikTok وMeta.", "تعطيل قياس TikTok", "تم تعطيل قياس TikTok في هذا المتصفح."],
};

function PrivacyPage() {
  const { lang } = useI18n();
  const text = copy[lang];
  const [disabled, setDisabled] = useState(false);
  useEffect(() => { try { setDisabled(Boolean(localStorage.getItem(TIKTOK_OPTOUT_KEY))); } catch { setDisabled(true); } }, []);
  function optOut() {
    try {
      localStorage.setItem(TIKTOK_OPTOUT_KEY, JSON.stringify({ advertising: false, provider: "TikTok", at: new Date().toISOString(), notice: "2026-10-25", noticeText: text.slice(3, 8), region: "any" }));
    } catch { /* Still apply the refusal for this visit. */ }
    window.dispatchEvent(new Event("skinup-advertising-choice"));
    setDisabled(true);
  }
  return <section className="container-page max-w-3xl py-12">
    <h1 className="text-3xl font-bold">{text[0]}</h1>
    <h2 className="mt-8 text-xl font-semibold">{text[1]}</h2>
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text[2]} <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a></p>
    <h2 className="mt-8 text-xl font-semibold">{text[3]}</h2>
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text[4]}</p>
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text[5]}</p>
    <h2 className="mt-8 text-xl font-semibold">{text[6]}</h2>
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text[7]}</p>
    <Button variant="outline" className="mt-5 min-h-11" disabled={disabled} onClick={optOut}>{text[8]}</Button>
    {disabled && <p role="status" className="mt-3 text-sm text-muted-foreground">{text[9]}</p>}
  </section>;
}