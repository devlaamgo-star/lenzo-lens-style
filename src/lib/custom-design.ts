import type { Lang } from "@/data/products";
import { BACK_LENS_SKINS } from "@/data/back-lens-skins";
import { CAMERA_LENS_SKINS } from "@/data/camera-lens-skins";

export type L = Record<Lang, string>;

export const CD = {
  nav: {
    fr: "Design personnalisé",
    ar: "صمّم Skin ديالك",
    en: "Custom design",
  } as L,
  heroTitle: {
    fr: "Transformez votre idée en skin unique",
    ar: "حوّل فكرتك لـ Skin خاص بيك",
    en: "Turn your idea into a one-of-a-kind skin",
  } as L,
  heroSub: {
    fr: "Une photo, un logo ou juste une idée en tête ? Envoyez-la-nous et notre équipe crée un design sur mesure pour votre téléphone.",
    ar: "عندك صورة، Logo ولا فكرة فبالك؟ صيفطها لينا وفريقنا يصاوب ليك Design خاص بتليفونك.",
    en: "Got a photo, a logo or just an idea? Send it over and our team designs a skin made only for your phone.",
  } as L,
  ctaPrimary: {
    fr: "Démarrer mon design",
    ar: "بدا Design ديالي",
    en: "Start my design",
  } as L,
  ctaSecondary: {
    fr: "Voir les exemples",
    ar: "شوف الأمثلة",
    en: "See examples",
  } as L,
  badge: {
    fr: "Service de design sur mesure — skins arrière & stickers caméra",
    ar: "خدمة تصميم مخصص — Skin ديال الظهر و ملصقات الكاميرا",
    en: "Custom design service — rear skins & camera stickers",
  } as L,

  stepsTitle: {
    fr: "Comment ça marche ?",
    ar: "كيفاش كتخدم الخدمة؟",
    en: "How does it work?",
  } as L,
  steps: [
    {
      t: {
        fr: "Envoyez-nous votre idée",
        ar: "صيفط لينا الفكرة ديالك",
        en: "Send us your idea",
      } as L,
      d: {
        fr: "Téléversez votre photo, votre logo ou décrivez simplement le design que vous imaginez.",
        ar: "دخّل الصورة، الـ Logo ديالك ولا عاود لينا الفكرة اللي فبالك.",
        en: "Upload your image, logo or simply explain the design you have in mind.",
      } as L,
    },
    {
      t: {
        fr: "Nous préparons un aperçu",
        ar: "كنصاوبو ليك Preview",
        en: "We prepare a preview",
      } as L,
      d: {
        fr: "Notre équipe réalise un aperçu visuel adapté au modèle exact de votre téléphone.",
        ar: "الفريق ديالنا كيصاوب ليك Preview موافق مع الموديل ديال التليفون ديالك.",
        en: "Our team creates a visual preview adapted to your exact phone model.",
      } as L,
    },
    {
      t: {
        fr: "Vous validez, on produit",
        ar: "كتأكد وكنوجدوه ليك",
        en: "You approve, we produce",
      } as L,
      d: {
        fr: "Après votre validation, nous imprimons votre skin et préparons la livraison, paiement à la livraison.",
        ar: "من بعد ما تأكد، كنطبعو الـ Skin ديالك وكنوجدو الطلب — الخلاص عند التوصيل.",
        en: "Once approved, we print your skin and prepare your order — cash on delivery.",
      } as L,
    },
  ],

  createTitle: {
    fr: "Qu'est-ce qu'on peut créer pour vous ?",
    ar: "شنو نقدروا نصاوبو ليك؟",
    en: "What can we create for you?",
  } as L,
  createItems: [
    { fr: "Photos personnelles", ar: "صور شخصية", en: "Personal photos" } as L,
    { fr: "Logos d'entreprise", ar: "Logos ديال الشركات", en: "Company logos" } as L,
    { fr: "Noms & initiales", ar: "أسماء و Initials", en: "Names & initials" } as L,
    { fr: "Branding business", ar: "Business branding", en: "Business branding" } as L,
    { fr: "Designs couple / famille", ar: "Designs ديال الكوبل والعائلة", en: "Couple / family designs" } as L,
    { fr: "Designs minimalistes", ar: "Designs بسيطة", en: "Minimal designs" } as L,
    { fr: "Artwork inspiré anime", ar: "Artwork ديال الأنمي", en: "Anime-inspired artwork" } as L,
    { fr: "Voitures & lifestyle", ar: "طوموبيلات و Lifestyle", en: "Cars & lifestyle" } as L,
    { fr: "Money / mindset", ar: "Money / Mindset", en: "Money / mindset" } as L,
    { fr: "Couleurs sur mesure", ar: "ألوان على الطلب", en: "Custom colours" } as L,
    { fr: "Sticker caméra seul", ar: "غير Sticker ديال الكاميرا", en: "Camera-only sticker" } as L,
    { fr: "Skin arrière + caméra", ar: "Skin ديال الظهر + الكاميرا", en: "Full rear + camera skin" } as L,
  ],

  examplesTitle: {
    fr: "Exemples de designs personnalisés",
    ar: "أمثلة على Designs مخصصين",
    en: "Custom design examples",
  } as L,
  examplesSub: {
    fr: "Des rendus réalisés par notre équipe sur des iPhone — votre design peut être totalement différent.",
    ar: "شي أمثلة صاوبها الفريق ديالنا على iPhone — الـ Design ديالك يقدر يكون مختلف بزاف.",
    en: "Renders made by our team on iPhone — your own design can look completely different.",
  } as L,

  formTitle: {
    fr: "Envoyez-nous votre idée",
    ar: "صيفط لينا الفكرة ديالك",
    en: "Send us your idea",
  } as L,
  formSub: {
    fr: "Remplissez le formulaire, notre équipe vous contacte sur WhatsApp avec un aperçu.",
    ar: "عمّر الفورم وفريقنا غايتواصل معاك فالواتساب بالـ Preview.",
    en: "Fill in the form and our team will contact you on WhatsApp with a preview.",
  } as L,
  f: {
    name: { fr: "Nom complet", ar: "الاسم الكامل", en: "Full name" } as L,
    phone: { fr: "Téléphone / WhatsApp", ar: "رقم الهاتف / WhatsApp", en: "Phone / WhatsApp" } as L,
    city: { fr: "Ville", ar: "المدينة", en: "City" } as L,
    brand: { fr: "Marque du téléphone", ar: "نوع الهاتف", en: "Phone brand" } as L,
    model: { fr: "Modèle du téléphone", ar: "موديل الهاتف", en: "Phone model" } as L,
    type: { fr: "Type de demande", ar: "نوع الطلب", en: "Request type" } as L,
    upload: { fr: "Image / logo (JPG, PNG, WEBP, PDF)", ar: "صورة / Logo (JPG, PNG, WEBP, PDF)", en: "Image / logo (JPG, PNG, WEBP, PDF)" } as L,
    uploadHint: { fr: "Max 8 Mo — aperçu affiché après l'ajout.", ar: "أقصى حجم 8 Mo — غادي تشوف Preview من بعد.", en: "Max 8 MB — preview shown after upload." } as L,
    desc: { fr: "Description du design", ar: "وصف التصميم", en: "Design description" } as L,
    colors: { fr: "Couleurs préférées", ar: "الألوان المفضلة", en: "Preferred colours" } as L,
    notes: { fr: "Notes (optionnel)", ar: "ملاحظات (اختياري)", en: "Notes (optional)" } as L,
    submit: { fr: "Envoyer ma demande de design", ar: "صيفط طلب التصميم", en: "Send my design request" } as L,
    remove: { fr: "Retirer le fichier", ar: "حيّد الملف", en: "Remove file" } as L,
  },
  types: [
    { value: "back", label: { fr: "Skin arrière", ar: "Skin ديال الظهر", en: "Rear skin" } as L },
    { value: "camera", label: { fr: "Skin caméra", ar: "Skin ديال الكاميرا", en: "Camera skin" } as L },
    { value: "both", label: { fr: "Skin arrière + caméra", ar: "Skin ديال الظهر + الكاميرا", en: "Rear + camera skin" } as L },
  ],
  errors: {
    name: { fr: "Entrez votre nom complet.", ar: "دخّل الاسم الكامل ديالك.", en: "Enter your full name." } as L,
    phone: { fr: "Numéro marocain invalide (ex. 06 12 34 56 78).", ar: "الرقم ماشي صحيح (مثال 06 12 34 56 78).", en: "Invalid Moroccan number (e.g. 06 12 34 56 78)." } as L,
    city: { fr: "Indiquez votre ville.", ar: "دخّل المدينة ديالك.", en: "Enter your city." } as L,
    model: { fr: "Indiquez le modèle de votre téléphone.", ar: "دخّل الموديل ديال التليفون.", en: "Enter your phone model." } as L,
    desc: { fr: "Décrivez votre idée en quelques mots.", ar: "عاود لينا الفكرة ديالك بشي كلمات.", en: "Describe your idea in a few words." } as L,
    file: { fr: "Formats acceptés : JPG, PNG, WEBP, PDF (max 8 Mo).", ar: "الملفات المقبولة: JPG, PNG, WEBP, PDF (أقصى 8 Mo).", en: "Accepted files: JPG, PNG, WEBP, PDF (max 8 MB)." } as L,
    server: { fr: "Une erreur est survenue. Réessayez.", ar: "وقع شي مشكل. عاود جرب.", en: "Something went wrong. Please try again." } as L,
  },
  success: {
    fr: "Demande envoyée ! Notre équipe vous contacte très vite avec un aperçu.",
    ar: "تصيفطات! الفريق ديالنا غايتواصل معاك دغيا بالـ Preview.",
    en: "Request sent! Our team will contact you shortly with a preview.",
  } as L,

  trustTitle: {
    fr: "Aucune impression sans votre validation",
    ar: "ما غاديش نطبعو حتى Design قبل ما تشوف الـ Preview وتأكد لينا بلي عجبك.",
    en: "Nothing gets printed before you approve",
  } as L,
  trustText: {
    fr: "Nous n'imprimons aucun design avant que vous ayez vu l'aperçu et confirmé qu'il vous plaît.",
    ar: "كنطبعو غير من بعد ما تشوف الـ Preview وتقول لينا عجبني.",
    en: "We never print a design before you have seen the preview and confirmed it.",
  } as L,
  privacy: {
    fr: "Vos photos et fichiers servent uniquement à créer votre commande.",
    ar: "الصور والملفات ديالك كتستعمل غير باش نصاوبو الطلب ديالك.",
    en: "Your photos and files are only used to create your order.",
  } as L,

  faqTitle: { fr: "Questions fréquentes", ar: "أسئلة كثر مطروحة", en: "Frequently asked questions" } as L,
  faq: [
    {
      q: { fr: "Puis-je envoyer ma propre photo ?", ar: "واش نقدر نصيفط صورتي؟", en: "Can I send my own photo?" } as L,
      a: {
        fr: "Oui. Envoyez une photo nette et notre équipe l'adapte au format de votre skin.",
        ar: "إيه. صيفط صورة واضحة وفريقنا يوافقها مع القياس ديال الـ Skin.",
        en: "Yes. Send a sharp photo and our team adapts it to your skin format.",
      } as L,
    },
    {
      q: { fr: "Puis-je envoyer le logo de mon entreprise ?", ar: "واش نقدر نصيفط Logo ديال الشركة ديالي؟", en: "Can I send my company logo?" } as L,
      a: {
        fr: "Oui. Logos, branding, cartes de visite : envoyez vos fichiers, on s'occupe de la mise en page.",
        ar: "إيه. Logo، Branding ولا أي ملف — حنا كنتكلفو بالتنسيق.",
        en: "Yes. Logos and full branding files are welcome, we handle the layout.",
      } as L,
    },
    {
      q: { fr: "Puis-je changer les couleurs ?", ar: "واش نقدر نبدل الألوان؟", en: "Can I change the colours?" } as L,
      a: {
        fr: "Oui, indiquez vos couleurs préférées dans le formulaire et nous ajustons l'aperçu.",
        ar: "إيه، كتب الألوان اللي بغيتي فالفورم وحنا نعدلو الـ Preview.",
        en: "Yes, tell us your preferred colours in the form and we adjust the preview.",
      } as L,
    },
    {
      q: { fr: "Vais-je voir le design avant l'impression ?", ar: "واش غادي نشوف التصميم قبل الطباعة؟", en: "Will I see the design before printing?" } as L,
      a: {
        fr: "Oui, nous envoyons toujours un aperçu avant toute impression.",
        ar: "إيه، ديما كنصيفطو Preview قبل ما نطبعو.",
        en: "Yes, we always send a preview before printing.",
      } as L,
    },
    {
      q: { fr: "Pouvez-vous faire uniquement le sticker caméra ?", ar: "واش تقدروا تصاوبو غير Sticker ديال الكاميرا؟", en: "Can you make only the camera sticker?" } as L,
      a: {
        fr: "Oui, le sticker caméra seul est possible, comme le skin arrière seul ou les deux ensemble.",
        ar: "إيه، تقدر تاخد غير Sticker ديال الكاميرا، ولا غير الظهر، ولا بجوج مع بعضياتهم.",
        en: "Yes — camera sticker only, rear skin only, or both together.",
      } as L,
    },
    {
      q: { fr: "Combien de temps prend le design ?", ar: "شحال كياخد التصميم؟", en: "How long does the design take?" } as L,
      a: {
        fr: "Notre équipe examine chaque demande puis vous contacte sur WhatsApp avec l'aperçu et le délai exact.",
        ar: "الفريق كيشوف كل طلب على حدة ومن بعد كيتواصل معاك فالواتساب بالـ Preview والمدة بالضبط.",
        en: "Our team reviews each request and then contacts you on WhatsApp with the preview and exact timing.",
      } as L,
    },
  ],

  finalTitle: { fr: "Une idée en tête ? Laissez-nous faire.", ar: "عندك فكرة؟ خليها علينا.", en: "Got an idea? Leave it to us." } as L,
  finalText: {
    fr: "Envoyez-nous votre idée et notre équipe la transforme en skin unique, rien que pour vous.",
    ar: "صيفط لينا الفكرة ديالك وفريقنا يساعدك نحولوها لـ Skin خاص بيك.",
    en: "Send us your idea and our team will turn it into a skin made just for you.",
  } as L,
  whatsapp: { fr: "Nous écrire sur WhatsApp", ar: "تواصل معنا فالواتساب", en: "Chat with us on WhatsApp" } as L,
  waMsg: {
    fr: "Bonjour SKINUP, je voudrais un design personnalisé pour mon téléphone.",
    ar: "سلام SKINUP، بغيت Design مخصص للتليفون ديالي.",
    en: "Hello SKINUP, I'd like a custom design for my phone.",
  } as L,
};

const bl = (i: number) => BACK_LENS_SKINS[i]?.image ?? BACK_LENS_SKINS[0]?.image ?? "";
const ln = (i: number) => CAMERA_LENS_SKINS[i]?.image ?? CAMERA_LENS_SKINS[0]?.image ?? "";

export const CD_EXAMPLES: { image: string; label: L }[] = [
  { image: bl(0), label: { fr: "Portrait personnel", ar: "صورة شخصية", en: "Personal portrait" } },
  { image: bl(9), label: { fr: "Logo d'entreprise", ar: "Logo ديال شركة", en: "Business logo" } },
  { image: bl(19), label: { fr: "Initiales & nom", ar: "Initials و الاسم", en: "Initials & name" } },
  { image: bl(4), label: { fr: "Design couple", ar: "Design ديال الكوبل", en: "Couple design" } },
  { image: bl(22), label: { fr: "Inspiration auto", ar: "Design ديال الطوموبيلات", en: "Car inspired" } },
  { image: bl(14), label: { fr: "Branding minimal", ar: "Branding بسيط", en: "Minimal branding" } },
  { image: ln(0), label: { fr: "Sticker caméra sur mesure", ar: "Sticker كاميرا مخصص", en: "Custom camera sticker" } },
  { image: bl(27), label: { fr: "Arrière + caméra assortis", ar: "الظهر + الكاميرا متناسقين", en: "Matching rear + camera" } },
];
