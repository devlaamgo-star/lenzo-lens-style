export type Lang = "fr" | "ar" | "en";

export type CollectionId = "minimal" | "artistique" | "elegance" | "urbain";

export type Product = {
  id: string;
  slug: string;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  image: string;
  collection: CollectionId;
  isNew: boolean;
  isBestseller: boolean;
  popularity: number;
};

const base = "/products/camera-stickers";

const desc = (fr: string, ar: string, en: string) => ({ fr, ar, en });

export const PRODUCTS: Product[] = [
  {
    id: "chat-curieux",
    slug: "chat-curieux",
    name: { fr: "Chat Curieux", ar: "قطة فضولية", en: "Curious Cat" },
    description: desc(
      "Sticker décoratif pour module caméra iPhone, illustration d'un chat curieux aux traits doux.",
      "ملصق ديكوري لوحدة كاميرا الآيفون برسم قطة فضولية بخطوط ناعمة.",
      "Decorative iPhone camera-module sticker featuring a softly drawn curious cat.",
    ),
    image: `${base}/chat-curieux.jpg`,
    collection: "artistique",
    isNew: true,
    isBestseller: true,
    popularity: 99,
  },
  {
    id: "chat-creme",
    slug: "chat-creme",
    name: { fr: "Chat Crème", ar: "قطة كريمية", en: "Cream Cat" },
    description: desc(
      "Skin décoratif caméra aux tons crème, discret et élégant sur toutes les finitions d'iPhone.",
      "سكين ديكوري للكاميرا بألوان كريمية أنيقة تناسب كل ألوان الآيفون.",
      "Cream-toned decorative camera skin, discreet and elegant on every iPhone finish.",
    ),
    image: `${base}/chat-creme.jpg`,
    collection: "elegance",
    isNew: true,
    isBestseller: true,
    popularity: 96,
  },
  {
    id: "regard-noir",
    slug: "regard-noir",
    name: { fr: "Regard Noir", ar: "نظرة سوداء", en: "Black Gaze" },
    description: desc(
      "Sticker décoratif pour module caméra iPhone, graphisme noir minimaliste au rendu mat.",
      "ملصق ديكوري لوحدة الكاميرا بتصميم أسود بسيط بلمسة مطفية.",
      "Decorative camera-module sticker with a minimal matte black graphic.",
    ),
    image: `${base}/regard-noir.jpg`,
    collection: "minimal",
    isNew: false,
    isBestseller: true,
    popularity: 94,
  },
  {
    id: "soleil-felin",
    slug: "soleil-felin",
    name: { fr: "Soleil Félin", ar: "شمس القطط", en: "Feline Sun" },
    description: desc(
      "Skin décoratif caméra iPhone aux teintes chaudes inspirées du soleil marocain.",
      "سكين ديكوري للكاميرا بألوان دافئة مستوحاة من شمس المغرب.",
      "Decorative iPhone camera skin in warm tones inspired by Moroccan sunlight.",
    ),
    image: `${base}/soleil-felin.jpg`,
    collection: "artistique",
    isNew: true,
    isBestseller: false,
    popularity: 91,
  },
  {
    id: "canards-pop",
    slug: "canards-pop",
    name: { fr: "Canards Pop", ar: "بطات بوب", en: "Pop Ducks" },
    description: desc(
      "Sticker décoratif caméra au style pop coloré, parfait pour un iPhone qui se remarque.",
      "ملصق ديكوري للكاميرا بأسلوب بوب ملوّن يمنح آيفونك حضوراً مميزاً.",
      "Colourful pop-style decorative camera sticker for an iPhone that stands out.",
    ),
    image: `${base}/canards-pop.jpg`,
    collection: "urbain",
    isNew: true,
    isBestseller: false,
    popularity: 89,
  },
  {
    id: "nuit-sauvage",
    slug: "nuit-sauvage",
    name: { fr: "Nuit Sauvage", ar: "ليل بري", en: "Wild Night" },
    description: desc(
      "Skin décoratif pour caméra iPhone, motif nocturne profond aux reflets subtils.",
      "سكين ديكوري لكاميرا الآيفون بنقشة ليلية عميقة بلمسات خفيفة.",
      "Decorative iPhone camera skin with a deep nocturnal pattern and subtle highlights.",
    ),
    image: `${base}/nuit-sauvage.jpg`,
    collection: "urbain",
    isNew: false,
    isBestseller: false,
    popularity: 86,
  },
  {
    id: "ville-orange",
    slug: "ville-orange",
    name: { fr: "Ville Orange", ar: "مدينة برتقالية", en: "Orange City" },
    description: desc(
      "Sticker décoratif module caméra, skyline orange graphique et contemporaine.",
      "ملصق ديكوري لوحدة الكاميرا بأفق مدينة برتقالي عصري.",
      "Decorative camera-module sticker with a contemporary orange skyline graphic.",
    ),
    image: `${base}/ville-orange.jpg`,
    collection: "urbain",
    isNew: false,
    isBestseller: true,
    popularity: 85,
  },
  {
    id: "dragon-urbain",
    slug: "dragon-urbain",
    name: { fr: "Dragon Urbain", ar: "تنين حضري", en: "Urban Dragon" },
    description: desc(
      "Skin décoratif caméra iPhone au dessin dragon street-art, encrage net et contrasté.",
      "سكين ديكوري للكاميرا برسم تنين بأسلوب فن الشارع بخطوط واضحة.",
      "Decorative iPhone camera skin with a crisp street-art dragon illustration.",
    ),
    image: `${base}/dragon-urbain.jpg`,
    collection: "urbain",
    isNew: true,
    isBestseller: false,
    popularity: 83,
  },
  {
    id: "mode-hors-ligne",
    slug: "mode-hors-ligne",
    name: { fr: "Mode Hors Ligne", ar: "وضع غير متصل", en: "Offline Mode" },
    description: desc(
      "Sticker décoratif pour module caméra iPhone, typographie minimaliste noir et blanc.",
      "ملصق ديكوري لوحدة الكاميرا بخط بسيط بالأبيض والأسود.",
      "Decorative camera-module sticker with minimal black-and-white typography.",
    ),
    image: `${base}/mode-hors-ligne.jpg`,
    collection: "minimal",
    isNew: false,
    isBestseller: true,
    popularity: 82,
  },
  {
    id: "ombre-jaune",
    slug: "ombre-jaune",
    name: { fr: "Ombre Jaune", ar: "ظل أصفر", en: "Yellow Shade" },
    description: desc(
      "Skin décoratif caméra au dégradé jaune lumineux, finition douce au toucher.",
      "سكين ديكوري للكاميرا بتدرّج أصفر مشرق وملمس ناعم.",
      "Decorative camera skin with a bright yellow gradient and soft-touch finish.",
    ),
    image: `${base}/ombre-jaune.jpg`,
    collection: "artistique",
    isNew: false,
    isBestseller: false,
    popularity: 80,
  },
  {
    id: "lignes-nocturnes",
    slug: "lignes-nocturnes",
    name: { fr: "Lignes Nocturnes", ar: "خطوط ليلية", en: "Night Lines" },
    description: desc(
      "Sticker décoratif caméra iPhone, lignes néon bleues sur fond nuit profonde.",
      "ملصق ديكوري لكاميرا الآيفون بخطوط نيون زرقاء على خلفية داكنة.",
      "Decorative iPhone camera sticker with blue neon lines on a deep night background.",
    ),
    image: `${base}/lignes-nocturnes.jpg`,
    collection: "minimal",
    isNew: true,
    isBestseller: false,
    popularity: 78,
  },
  {
    id: "retro-maroc",
    slug: "retro-maroc",
    name: { fr: "Rétro Maroc", ar: "ريترو المغرب", en: "Retro Morocco" },
    description: desc(
      "Skin décoratif pour caméra iPhone inspiré du zellige marocain aux tons terracotta.",
      "سكين ديكوري لكاميرا الآيفون مستوحى من الزليج المغربي بألوان ترابية.",
      "Decorative iPhone camera skin inspired by Moroccan zellige in terracotta tones.",
    ),
    image: `${base}/retro-maroc.jpg`,
    collection: "elegance",
    isNew: true,
    isBestseller: true,
    popularity: 93,
  },
  {
    id: "manga-orange",
    slug: "manga-orange",
    name: { fr: "Manga Orange", ar: "مانغا برتقالي", en: "Orange Manga" },
    description: desc(
      "Sticker décoratif module caméra au style manga orange, cases graphiques détaillées.",
      "ملصق ديكوري لوحدة الكاميرا بأسلوب مانغا برتقالي بتفاصيل دقيقة.",
      "Decorative camera-module sticker in an orange manga panel style.",
    ),
    image: `${base}/manga-orange.jpg`,
    collection: "artistique",
    isNew: true,
    isBestseller: true,
    popularity: 90,
  },
  {
    id: "heros-masque",
    slug: "heros-masque",
    name: { fr: "Héros Masqué", ar: "البطل المقنّع", en: "Masked Hero" },
    description: desc(
      "Skin décoratif caméra iPhone rouge et noir, trame comics et graphisme audacieux.",
      "سكين ديكوري للكاميرا بالأحمر والأسود بأسلوب القصص المصورة الجريء.",
      "Red and black decorative camera skin with a bold comic halftone graphic.",
    ),
    image: `${base}/heros-masque.jpg`,
    collection: "urbain",
    isNew: true,
    isBestseller: false,
    popularity: 77,
  },
  {
    id: "regard-violet",
    slug: "regard-violet",
    name: { fr: "Regard Violet", ar: "نظرة بنفسجية", en: "Violet Gaze" },
    description: desc(
      "Sticker décoratif pour module caméra iPhone, dégradé violet et regard stylisé.",
      "ملصق ديكوري لوحدة الكاميرا بتدرّج بنفسجي ونظرة مرسومة بأناقة.",
      "Decorative camera-module sticker with a violet gradient and stylised eye.",
    ),
    image: `${base}/regard-violet.jpg`,
    collection: "artistique",
    isNew: false,
    isBestseller: false,
    popularity: 75,
  },
  {
    id: "foret-mystique",
    slug: "foret-mystique",
    name: { fr: "Forêt Mystique", ar: "غابة غامضة", en: "Mystic Forest" },
    description: desc(
      "Skin décoratif caméra iPhone, forêt brumeuse aux verts profonds et lumière douce.",
      "سكين ديكوري لكاميرا الآيفون بغابة ضبابية بألوان خضراء عميقة.",
      "Decorative iPhone camera skin with a misty forest in deep greens and soft light.",
    ),
    image: `${base}/foret-mystique.jpg`,
    collection: "elegance",
    isNew: true,
    isBestseller: false,
    popularity: 74,
  },
  {
    id: "chat-paresseux",
    slug: "chat-paresseux",
    name: { fr: "Chat Paresseux", ar: "قطة كسولة", en: "Lazy Cat" },
    description: desc(
      "Sticker décoratif caméra iPhone, chat endormi façon illustration kawaii.",
      "ملصق ديكوري لكاميرا الآيفون برسم قطة نائمة بأسلوب كاواي.",
      "Decorative iPhone camera sticker with a sleeping cat in kawaii illustration style.",
    ),
    image: `${base}/chat-paresseux.jpg`,
    collection: "artistique",
    isNew: true,
    isBestseller: true,
    popularity: 92,
  },
  {
    id: "chat-pew-pew",
    slug: "chat-pew-pew",
    name: { fr: "Chat Pew Pew", ar: "قطة بيو بيو", en: "Pew Pew Cat" },
    description: desc(
      "Skin décoratif pour caméra iPhone, chat rétro cartoon plein d'énergie.",
      "سكين ديكوري لكاميرا الآيفون برسم قطة كرتونية ريترو مليئة بالحيوية.",
      "Decorative iPhone camera skin with an energetic retro cartoon cat.",
    ),
    image: `${base}/chat-pew-pew.jpg`,
    collection: "urbain",
    isNew: true,
    isBestseller: false,
    popularity: 73,
  },
  {
    id: "gang-de-chats",
    slug: "gang-de-chats",
    name: { fr: "Gang de Chats", ar: "عصابة القطط", en: "Cat Gang" },
    description: desc(
      "Sticker décoratif module caméra iPhone, petite bande de chats illustrés.",
      "ملصق ديكوري لوحدة الكاميرا برسم مجموعة صغيرة من القطط.",
      "Decorative camera-module sticker with a small illustrated crew of cats.",
    ),
    image: `${base}/gang-de-chats.jpg`,
    collection: "artistique",
    isNew: true,
    isBestseller: true,
    popularity: 88,
  },
  {
    id: "good-vibes",
    slug: "good-vibes",
    name: { fr: "Good Vibes", ar: "أجواء إيجابية", en: "Good Vibes" },
    description: desc(
      "Skin décoratif caméra iPhone au lettrage rétro arc-en-ciel, ambiance solaire.",
      "سكين ديكوري لكاميرا الآيفون بخط ريترو بألوان قوس قزح وأجواء مشرقة.",
      "Decorative iPhone camera skin with retro rainbow lettering and a sunny mood.",
    ),
    image: `${base}/good-vibes.jpg`,
    collection: "elegance",
    isNew: true,
    isBestseller: true,
    popularity: 87,
  },
];

export function productById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
