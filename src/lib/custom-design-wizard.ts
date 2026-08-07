import type { Lang } from "@/data/products";
import { BACK_LENS_SKINS } from "@/data/back-lens-skins";
import { CAMERA_LENS_SKINS } from "@/data/camera-lens-skins";
import { FULL_BODY_SKINS } from "@/data/full-body-skins";
import { ANIME_SKINS } from "@/data/anime-skins";
import type { L } from "@/lib/custom-design";

const bl = (i: number) => BACK_LENS_SKINS[i % BACK_LENS_SKINS.length]?.image ?? "";
const ln = (i: number) => CAMERA_LENS_SKINS[i % CAMERA_LENS_SKINS.length]?.image ?? "";
const fb = (i: number) => FULL_BODY_SKINS[i % FULL_BODY_SKINS.length]?.image ?? "";
const an = (i: number) => ANIME_SKINS[i % ANIME_SKINS.length]?.image ?? "";

export type Option = { value: string; label: L; image?: string; emoji?: string };

export const WIZ = {
  title: {
    fr: "Construisons votre design ensemble",
    ar: "خلينا نصاوبو Design ديالك",
    en: "Let's build your design together",
  } as L,
  sub: {
    fr: "Répondez à quelques questions, notre équipe s'occupe du reste.",
    ar: "جاوب غير على شوية ديال الأسئلة وفريقنا يتكلف بالباقي.",
    en: "Answer a few quick questions — our team handles the rest.",
  } as L,
  stepOf: {
    fr: "Étape {n} sur 7",
    ar: "الخطوة {n} من 7",
    en: "Step {n} of 7",
  } as L,
  next: { fr: "Suivant", ar: "التالي", en: "Next" } as L,
  back: { fr: "Retour", ar: "رجوع", en: "Back" } as L,
  optional: { fr: "Optionnel", ar: "اختياري", en: "Optional" } as L,
  submit: { fr: "Envoyer ma demande de design", ar: "صيفط طلب التصميم", en: "Send my design request" } as L,

  s1: {
    title: { fr: "Que voulez-vous personnaliser ?", ar: "شنو بغيتي تخصص؟", en: "What do you want to customize?" } as L,
    options: [
      { value: "photo", label: { fr: "Photo personnelle", ar: "صورة شخصية", en: "Personal photo" } as L, emoji: "📸" },
      { value: "logo", label: { fr: "Mon logo", ar: "Logo ديالي", en: "My logo" } as L, emoji: "🏷️" },
      { value: "name", label: { fr: "Nom / Initiales", ar: "الاسم / Initials", en: "Name / Initials" } as L, emoji: "🔠" },
      { value: "car", label: { fr: "Ma voiture", ar: "طوموبيلتي", en: "My car" } as L, emoji: "🚗" },
      { value: "couple", label: { fr: "Couple / Famille", ar: "Couple / Family", en: "Couple / Family" } as L, emoji: "❤️" },
      { value: "business", label: { fr: "Business branding", ar: "Business branding", en: "Business branding" } as L, emoji: "💼" },
      { value: "camera-only", label: { fr: "Sticker caméra seul", ar: "غير Sticker ديال الكاميرا", en: "Camera sticker only" } as L, emoji: "🎯" },
      { value: "own-idea", label: { fr: "J'ai une idée spéciale", ar: "عندي فكرة خاصة", en: "I have my own idea" } as L, emoji: "💡" },
    ] as Option[],
  },

  s2: {
    title: { fr: "Quel style vous plaît ?", ar: "شنو الستايل اللي كيعجبك؟", en: "Which style do you like?" } as L,
    options: [
      { value: "minimal", label: { fr: "Minimal", ar: "Minimal", en: "Minimal" } as L, image: bl(14) },
      { value: "luxury", label: { fr: "Luxury", ar: "Luxury", en: "Luxury" } as L, image: bl(19) },
      { value: "anime", label: { fr: "Anime", ar: "Anime", en: "Anime" } as L, image: an(1) },
      { value: "street", label: { fr: "Street", ar: "Street", en: "Street" } as L, image: bl(22) },
      { value: "dark", label: { fr: "Dark", ar: "Dark", en: "Dark" } as L, image: bl(0) },
      { value: "cute", label: { fr: "Cute", ar: "Cute", en: "Cute" } as L, image: ln(6) },
      { value: "sport", label: { fr: "Sport", ar: "Sport", en: "Sport" } as L, image: fb(3) },
      { value: "futuristic", label: { fr: "Futuristic", ar: "Futuristic", en: "Futuristic" } as L, image: fb(8) },
      { value: "clean", label: { fr: "Clean", ar: "Clean", en: "Clean" } as L, image: ln(2) },
      { value: "surprise", label: { fr: "Surprise Me", ar: "Surprise Me", en: "Surprise Me" } as L, emoji: "✨" },
    ] as Option[],
  },

  s3: {
    title: { fr: "Quelles couleurs souhaitez-vous ?", ar: "شنو الألوان اللي بغيتي؟", en: "Which colours do you want?" } as L,
    hint: { fr: "Plusieurs choix possibles.", ar: "تقدر تختار أكثر من لون.", en: "You can pick several." } as L,
    options: [
      { value: "black", label: { fr: "Noir", ar: "كحل", en: "Black" } as L, swatch: "#111111" },
      { value: "white", label: { fr: "Blanc", ar: "بيض", en: "White" } as L, swatch: "#FFFFFF" },
      { value: "blue", label: { fr: "Bleu", ar: "زرق", en: "Blue" } as L, swatch: "#1D4ED8" },
      { value: "red", label: { fr: "Rouge", ar: "حمر", en: "Red" } as L, swatch: "#DC2626" },
      { value: "green", label: { fr: "Vert", ar: "خضر", en: "Green" } as L, swatch: "#15803D" },
      { value: "gold", label: { fr: "Or", ar: "دهبي", en: "Gold" } as L, swatch: "#C9A227" },
      { value: "silver", label: { fr: "Argent", ar: "فضي", en: "Silver" } as L, swatch: "#B9BDC4" },
      { value: "beige", label: { fr: "Beige", ar: "بيج", en: "Beige" } as L, swatch: "#E4D5C1" },
    ] as { value: string; label: L; swatch: string }[],
    custom: { fr: "Couleur personnalisée", ar: "لون خاص", en: "Custom colour" } as L,
    customPlaceholder: { fr: "Ex. bleu nuit + cuivre", ar: "مثلاً: زرق غامق + نحاسي", en: "e.g. midnight blue + copper" } as L,
    letDesigner: { fr: "Laissez le designer choisir", ar: "خلي المصمم يختار", en: "Let the designer choose" } as L,
  },

  s4: {
    title: { fr: "Détails du téléphone", ar: "تفاصيل التليفون", en: "Phone details" } as L,
    brand: { fr: "Marque", ar: "الماركة", en: "Brand" } as L,
    model: { fr: "Modèle", ar: "الموديل", en: "Model" } as L,
    color: { fr: "Couleur du téléphone", ar: "لون التليفون", en: "Phone colour" } as L,
    choose: { fr: "Choisir…", ar: "اختار…", en: "Choose…" } as L,
    other: { fr: "Autre modèle", ar: "موديل آخر", en: "Other model" } as L,
  },

  s5: {
    title: { fr: "Que voulez-vous exactement ?", ar: "شنو بغيتي بالضبط؟", en: "What exactly do you want?" } as L,
    popular: { fr: "Le plus demandé", ar: "الأكثر طلباً", en: "Most requested" } as L,
    options: [
      { value: "back", label: { fr: "Skin arrière", ar: "Skin ديال الظهر", en: "Rear skin" } as L, image: bl(9) },
      { value: "camera", label: { fr: "Sticker caméra", ar: "Sticker ديال الكاميرا", en: "Camera sticker" } as L, image: ln(0) },
      { value: "both", label: { fr: "Skin arrière + caméra", ar: "Skin ديال الظهر + الكاميرا", en: "Rear + camera skin" } as L, image: bl(27) },
    ] as Option[],
  },

  s6: {
    title: { fr: "Envoyez-nous votre image ou logo", ar: "صيفط لينا الصورة ولا Logo", en: "Send us your image or logo" } as L,
    helper: {
      fr: "Si vous avez plusieurs images, envoyez-les toutes et le designer choisira la plus adaptée.",
      ar: "إلا كان عندك أكثر من صورة، صيفطهم كاملين وخلي المصمم يختار الأنسب.",
      en: "If you have several images, send them all and the designer will pick the best one.",
    } as L,
    formats: { fr: "JPG, PNG, WEBP, PDF — max 8 Mo par fichier", ar: "JPG, PNG, WEBP, PDF — أقصى 8 Mo لكل ملف", en: "JPG, PNG, WEBP, PDF — max 8 MB per file" } as L,
    add: { fr: "Ajouter des fichiers", ar: "زيد الملفات", en: "Add files" } as L,
    descTitle: { fr: "Expliquez-nous votre idée", ar: "شرح لينا الفكرة ديالك", en: "Tell us about your idea" } as L,
    descPlaceholder: {
      fr: "Ex. : je veux mon logo au centre d'un design noir et or, très simple…",
      ar: "مثلاً: بغيت Logo ديالي وسط Design أسود وذهبي، ويكون بسيط…",
      en: "e.g. I want my logo in the middle of a black and gold design, very simple…",
    } as L,
  },

  s7: {
    title: { fr: "Vos coordonnées", ar: "المعلومات ديالك", en: "Your details" } as L,
    name: { fr: "Nom", ar: "الاسم", en: "Name" } as L,
    phone: { fr: "WhatsApp", ar: "WhatsApp", en: "WhatsApp" } as L,
    city: { fr: "Ville", ar: "المدينة", en: "City" } as L,
  },

  doneTitle: { fr: "Nous avons bien reçu votre demande ✅", ar: "وصلنا الطلب ديالك ✅", en: "We received your request ✅" } as L,
  doneText: {
    fr: "L'équipe SKINUP examine votre idée et vous contacte sur WhatsApp pour finaliser les détails et vous envoyer un aperçu.",
    ar: "فريق SKINUP غادي يراجع الفكرة ديالك ويتواصل معاك فالواتساب باش نكملو التفاصيل ونصيفطو ليك Preview.",
    en: "The SKINUP team will review your idea and contact you on WhatsApp to finalise the details and send you a preview.",
  } as L,
  doneRef: { fr: "Référence", ar: "رقم الطلب", en: "Reference" } as L,
  restart: { fr: "Nouvelle demande", ar: "طلب جديد", en: "New request" } as L,
};

export const PHONE_BRANDS: { value: string; label: string; models: string[] }[] = [
  {
    value: "iphone",
    label: "iPhone",
    models: [
      "iPhone 17 Pro Max",
      "iPhone 17 Pro",
      "iPhone 17",
      "iPhone Air",
      "iPhone 16 Pro Max",
      "iPhone 16 Pro",
      "iPhone 16",
      "iPhone 15 Pro Max",
      "iPhone 15 Pro",
      "iPhone 15",
      "iPhone 14 Pro Max",
      "iPhone 14 Pro",
      "iPhone 13",
      "iPhone 12",
      "iPhone 11",
    ],
  },
  {
    value: "samsung",
    label: "Samsung",
    models: ["Galaxy S25 Ultra", "Galaxy S25", "Galaxy S24 Ultra", "Galaxy S24", "Galaxy S23", "Galaxy A55", "Galaxy A35", "Galaxy Z Flip"],
  },
  { value: "xiaomi", label: "Xiaomi / Redmi", models: ["Xiaomi 15", "Xiaomi 14", "Redmi Note 14 Pro", "Redmi Note 13", "Poco X6 Pro"] },
  { value: "oppo", label: "Oppo", models: ["Reno 12", "Reno 11", "A98", "A78"] },
  { value: "huawei", label: "Huawei", models: ["P60 Pro", "Nova 12", "Mate 50"] },
  { value: "honor", label: "Honor", models: ["Magic 6", "Honor 200", "X9b"] },
  { value: "other", label: "Autre / آخر", models: [] },
];

export const PHONE_COLORS: { value: string; label: L; swatch: string }[] = [
  { value: "black", label: { fr: "Noir", ar: "كحل", en: "Black" } as L, swatch: "#1B1B1B" },
  { value: "white", label: { fr: "Blanc", ar: "بيض", en: "White" } as L, swatch: "#F3F3F1" },
  { value: "silver", label: { fr: "Argent", ar: "فضي", en: "Silver" } as L, swatch: "#C6CAD0" },
  { value: "gold", label: { fr: "Or", ar: "دهبي", en: "Gold" } as L, swatch: "#D8B26A" },
  { value: "blue", label: { fr: "Bleu", ar: "زرق", en: "Blue" } as L, swatch: "#2B4A73" },
  { value: "orange", label: { fr: "Orange", ar: "لیموني", en: "Orange" } as L, swatch: "#D4622A" },
  { value: "other", label: { fr: "Autre", ar: "آخر", en: "Other" } as L, swatch: "#9AA0A6" },
];

/* ---------- Idea → Skin flow ---------- */

export const IDEA_TO_SKIN = {
  title: { fr: "De l'idée à votre skin", ar: "من الفكرة لـ Skin ديالك", en: "From idea to your skin" } as L,
  sub: {
    fr: "Nous n'imprimons pas simplement votre image : nos designers la transforment en composition professionnelle.",
    ar: "حنا ما كنطبعوش غير الصورة ديالك — المصممين ديالنا كيحولوها لتصميم احترافي.",
    en: "We don't just print your image — our designers turn it into a professional composition.",
  } as L,
  stageLabels: [
    { fr: "Vous envoyez", ar: "نتا كتصيفط", en: "You send" } as L,
    { fr: "On design", ar: "حنا كنصاوبو", en: "We design" } as L,
    { fr: "Skin final", ar: "الـ Skin النهائي", en: "Final skin" } as L,
  ],
  cases: [
    {
      idea: { fr: "Un simple logo d'entreprise", ar: "غير Logo ديال الشركة", en: "A simple business logo" } as L,
      ideaEmoji: "🏷️",
      design: { fr: "Composition brandée premium", ar: "تصميم Branding راقي", en: "Premium branded composition" } as L,
      designImage: bl(14),
      final: { fr: "Skin arrière fini", ar: "Skin ديال الظهر واجد", en: "Finished rear skin" } as L,
      finalImage: bl(19),
    },
    {
      idea: { fr: "Une photo de votre voiture", ar: "تصويرة ديال الطوموبيل ديالك", en: "A photo of your car" } as L,
      ideaEmoji: "🚗",
      design: { fr: "Affiche automobile stylisée", ar: "Poster ديال الطوموبيل بستايل", en: "Stylish automotive poster" } as L,
      designImage: bl(22),
      final: { fr: "Skin arrière fini", ar: "Skin ديال الظهر واجد", en: "Finished rear skin" } as L,
      finalImage: fb(3),
    },
    {
      idea: { fr: "Vos initiales", ar: "الـ Initials ديالك", en: "Your initials" } as L,
      ideaEmoji: "🔠",
      design: { fr: "Monogramme luxe", ar: "Monogram فخم", en: "Luxury monogram" } as L,
      designImage: bl(9),
      final: { fr: "Arrière + caméra assortis", ar: "الظهر + الكاميرا متناسقين", en: "Matching rear + camera" } as L,
      finalImage: ln(3),
    },
  ],
};

/* ---------- You send the idea ---------- */

export const YOU_SEND = {
  title: { fr: "Vous envoyez l'idée, on crée le design", ar: "نتا صيفط الفكرة، وحنا نصاوبو Design", en: "You send the idea, we create the design" } as L,
  text: {
    fr: "Pas besoin d'avoir un fichier prêt à imprimer. Même avec juste une idée, une couleur, un nom, un logo ou une photo, notre équipe peut construire votre design depuis zéro.",
    ar: "ما خاصكش تكون عندك صورة واجدة للطباعة. حتى إلا كانت عندك غير فكرة، لون كيعجبك، اسم، Logo ولا صورة، فريقنا يقدر يبني ليك Design من الصفر.",
    en: "You don't need a print-ready file. Even with just an idea, a colour, a name, a logo or a photo, our team can build your design from scratch.",
  } as L,
  examples: [
    { fr: "« Je veux quelque chose Black & Gold »", ar: "«بغيت شي حاجة Black & Gold»", en: "\u201cI want something Black & Gold\u201d" } as L,
    { fr: "« Je veux mon nom en style Minimal »", ar: "«بغيت اسمي بطريقة Minimal»", en: "\u201cI want my name, minimal style\u201d" } as L,
    { fr: "« Je veux un design de ma voiture »", ar: "«بغيت Design ديال طوموبيلتي»", en: "\u201cI want a design of my car\u201d" } as L,
    { fr: "« Je veux uniquement la caméra »", ar: "«بغيت غير الكاميرا»", en: "\u201cI only want the camera part\u201d" } as L,
    { fr: "« Je ne sais pas, choisissez pour moi »", ar: "«ما عارفش شنو بغيت، اختارو ليا»", en: "\u201cI don't know, choose for me\u201d" } as L,
  ],
};

/* ---------- Gallery ---------- */

export const GALLERY = {
  title: { fr: "Galerie de designs personnalisés", ar: "معرض Designs مخصصة", en: "Custom design gallery" } as L,
  sub: {
    fr: "Des rendus réalisés par notre équipe — votre design sera unique.",
    ar: "أمثلة صاوبها الفريق ديالنا — الـ Design ديالك غادي يكون خاص بيك.",
    en: "Renders made by our team — your own design will be unique.",
  } as L,
  categories: [
    { value: "personal", label: { fr: "Personnel", ar: "شخصي", en: "Personal" } as L, images: [bl(0), bl(4), fb(1), ln(8)] },
    { value: "business", label: { fr: "Business", ar: "Business", en: "Business" } as L, images: [bl(14), bl(11), fb(6), ln(12)] },
    { value: "cars", label: { fr: "Voitures", ar: "طوموبيلات", en: "Cars" } as L, images: [bl(22), fb(3), bl(24), fb(10)] },
    { value: "initials", label: { fr: "Initiales", ar: "Initials", en: "Initials" } as L, images: [bl(9), bl(19), ln(5), fb(12)] },
    { value: "camera", label: { fr: "Stickers caméra", ar: "Stickers الكاميرا", en: "Camera stickers" } as L, images: [ln(0), ln(3), ln(17), ln(24)] },
    { value: "couple", label: { fr: "Couple", ar: "Couple", en: "Couple" } as L, images: [bl(5), bl(7), ln(30), fb(15)] },
    { value: "minimal", label: { fr: "Minimal", ar: "Minimal", en: "Minimal" } as L, images: [ln(2), bl(16), ln(41), fb(20)] },
    { value: "luxury", label: { fr: "Luxury", ar: "Luxury", en: "Luxury" } as L, images: [bl(27), bl(20), fb(24), ln(45)] },
  ],
};

/* ---------- File quality ---------- */

export const FILE_QUALITY = {
  title: { fr: "Votre photo n'est pas parfaite ? Pas de souci.", ar: "الصورة ديالك ماشي Perfect؟ ماشي مشكل.", en: "Your photo isn't perfect? No problem." } as L,
  text: {
    fr: "Envoyez-nous la meilleure version que vous avez. Notre équipe vérifie si la qualité est suffisante avant de préparer le design.",
    ar: "صيفط لينا أحسن نسخة عندك. فريقنا يشوف واش الجودة كافية قبل ما نوجد التصميم.",
    en: "Send us the best version you have. Our team checks whether the quality is good enough before preparing the design.",
  } as L,
};

/* ---------- Trust points ---------- */

export const TRUST_POINTS: L[] = [
  { fr: "Aperçu avant impression", ar: "Preview قبل الطباعة", en: "Preview before printing" } as L,
  { fr: "Vous pouvez demander une retouche", ar: "تقدر تطلب تعديل", en: "You can ask for a revision" } as L,
  { fr: "Design adapté à votre modèle", ar: "Design على قياس الموديل ديالك", en: "Design fitted to your model" } as L,
  { fr: "Votre idée reste liée à votre commande", ar: "الفكرة ديالك كتبقى خاصة بطلبك", en: "Your idea stays tied to your order" } as L,
];

export const RIGHTS_NOTE = {
  fr: "N'utilisez que des photos, logos et fichiers que vous avez le droit d'utiliser.",
  ar: "استعمل غير الصور، Logos والملفات اللي عندك الحق تستعملهم.",
  en: "Only use photos, logos and files you have the right to use.",
} as L;

/* ---------- Homepage CTA ---------- */

export const HOME_CTA = {
  title: { fr: "Vous n'avez pas trouvé votre design ? On le crée pour vous.", ar: "مالقيتيش Design ديالك؟ نصاوبوه ليك.", en: "Didn't find your design? We'll create it for you." } as L,
  text: {
    fr: "Envoyez-nous une photo, un logo, ou juste l'idée que vous avez en tête.",
    ar: "صيفط لينا صورة، Logo ولا غير الفكرة اللي فبالك.",
    en: "Send us a photo, a logo, or just the idea you have in mind.",
  } as L,
  cta: { fr: "Créer mon skin", ar: "صمّم Skin ديالك", en: "Design my skin" } as L,
  note: { fr: "Aperçu avant impression", ar: "Preview قبل الطباعة", en: "Preview before printing" } as L,
  ideaLabel: { fr: "Votre idée", ar: "الفكرة ديالك", en: "Your idea" } as L,
  resultLabel: { fr: "Votre skin", ar: "الـ Skin ديالك", en: "Your skin" } as L,
  resultImage: bl(19),
};
