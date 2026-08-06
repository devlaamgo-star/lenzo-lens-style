import type { Lang } from "./translations";

export type Review = {
  name: Record<Lang, string>;
  city: Record<Lang, string>;
  text: Record<Lang, string>;
  rating: number;
};

export const REVIEWS: Review[] = [
  {
    name: { fr: "Yassine", ar: "ياسين", en: "Yassine" },
    city: { fr: "Casablanca", ar: "الدار البيضاء", en: "Casablanca" },
    rating: 5,
    text: {
      fr: "Les designs sont très propres et l’installation était facile. J’ai reçu ma commande rapidement.",
      ar: "التصاميم نظيفة جداً والتركيب كان سهلاً. توصلت بالطلب بسرعة.",
      en: "The designs are very clean and installation was easy. My order arrived quickly.",
    },
  },
  {
    name: { fr: "Salma", ar: "سلمى", en: "Salma" },
    city: { fr: "Rabat", ar: "الرباط", en: "Rabat" },
    rating: 5,
    text: {
      fr: "J’ai pris le pack doré et argent. La finition est discrète et ça change vraiment le look du téléphone.",
      ar: "أخذت الباقة الذهبية والفضية. التشطيب أنيق ويغير مظهر الهاتف فعلاً.",
      en: "I took the gold and silver pack. The finish is subtle and it really changes the phone's look.",
    },
  },
  {
    name: { fr: "Mehdi", ar: "مهدي", en: "Mehdi" },
    city: { fr: "Marrakech", ar: "مراكش", en: "Marrakech" },
    rating: 4,
    text: {
      fr: "Bon rapport qualité-prix. J’ai payé à la livraison, le livreur a appelé avant de passer.",
      ar: "جودة مناسبة للثمن. دفعت عند الاستلام والموصل اتصل قبل المجيء.",
      en: "Good value. I paid on delivery and the courier called before arriving.",
    },
  },
  {
    name: { fr: "Imane", ar: "إيمان", en: "Imane" },
    city: { fr: "Fès", ar: "فاس", en: "Fes" },
    rating: 5,
    text: {
      fr: "Commande confirmée par WhatsApp en quelques minutes. Les stickers tiennent bien depuis trois semaines.",
      ar: "تم تأكيد الطلب عبر واتساب في دقائق. الملصقات ثابتة منذ ثلاثة أسابيع.",
      en: "Order confirmed on WhatsApp within minutes. The stickers have held well for three weeks.",
    },
  },
  {
    name: { fr: "Anas", ar: "أنس", en: "Anas" },
    city: { fr: "Tanger", ar: "طنجة", en: "Tangier" },
    rating: 4,
    text: {
      fr: "J’ai hésité sur mon modèle, le support m’a aidé à choisir. Pose simple en deux minutes.",
      ar: "ترددت في اختيار الموديل وساعدني الدعم. التركيب سهل في دقيقتين.",
      en: "I hesitated on my model and support helped me choose. Two-minute install.",
    },
  },
  {
    name: { fr: "Nour", ar: "نور", en: "Nour" },
    city: { fr: "Agadir", ar: "أكادير", en: "Agadir" },
    rating: 5,
    text: {
      fr: "Livraison gratuite jusqu’à chez moi et emballage soigné. Je recommanderai un autre pack.",
      ar: "توصيل مجاني حتى المنزل وتغليف مرتب. سأطلب باقة أخرى.",
      en: "Free delivery to my door and neat packaging. I'll order another pack.",
    },
  },
];

export type Faq = { q: Record<Lang, string>; a: Record<Lang, string> };

export const FAQS: Faq[] = [
  {
    q: {
      fr: "Comment choisir le bon modèle d’iPhone ?",
      ar: "كيف أختار موديل iPhone الصحيح؟",
      en: "How do I choose the right iPhone model?",
    },
    a: {
      fr: "Ouvrez Réglages → Général → Informations sur votre iPhone : le nom exact du modèle y est affiché. Vous pouvez aussi nous écrire sur WhatsApp, nous vous aidons à l’identifier.",
      ar: "افتح الإعدادات ← عام ← حول، وستجد اسم الموديل بدقة. يمكنك أيضاً مراسلتنا عبر واتساب وسنساعدك.",
      en: "Open Settings → General → About on your iPhone: the exact model name is shown there. You can also message us on WhatsApp and we'll help.",
    },
  },
  {
    q: {
      fr: "Puis-je choisir trois designs différents ?",
      ar: "هل يمكنني اختيار ثلاثة تصاميم مختلفة؟",
      en: "Can I choose three different designs?",
    },
    a: {
      fr: "Oui. Le pack contient trois stickers et vous êtes libre de choisir trois designs différents.",
      ar: "نعم. الباقة تحتوي على ثلاث ملصقات ويمكنك اختيار ثلاثة تصاميم مختلفة.",
      en: "Yes. The pack contains three stickers and you can freely pick three different designs.",
    },
  },
  {
    q: {
      fr: "Puis-je commander trois fois le même design ?",
      ar: "هل يمكنني طلب نفس التصميم ثلاث مرات؟",
      en: "Can I order the same design three times?",
    },
    a: {
      fr: "Oui, vous pouvez sélectionner le même design plusieurs fois dans le pack builder.",
      ar: "نعم، يمكنك اختيار نفس التصميم أكثر من مرة في صفحة تكوين الباقة.",
      en: "Yes, you can select the same design more than once in the pack builder.",
    },
  },
  {
    q: { fr: "Comment installer les stickers ?", ar: "كيف أركب الملصقات؟", en: "How do I install the stickers?" },
    a: {
      fr: "Nettoyez la surface autour des objectifs, retirez le film protecteur, alignez le sticker sur l’objectif puis appuyez quelques secondes.",
      ar: "نظف السطح حول العدسات، انزع الغشاء الواقي، ضع الملصق فوق العدسة واضغط لبضع ثوانٍ.",
      en: "Clean the surface around the lenses, peel off the backing, align the sticker over the lens and press for a few seconds.",
    },
  },
  {
    q: {
      fr: "Les stickers laissent-ils des traces ?",
      ar: "هل تترك الملصقات آثاراً؟",
      en: "Do the stickers leave marks?",
    },
    a: {
      fr: "Non. L’adhésif est conçu pour être retiré proprement, sans résidu visible sur la surface.",
      ar: "لا. اللاصق مصمم للإزالة بنظافة دون بقايا ظاهرة.",
      en: "No. The adhesive is designed to be removed cleanly, with no visible residue.",
    },
  },
  {
    q: {
      fr: "Est-ce que les stickers protègent les objectifs ?",
      ar: "هل تحمي الملصقات العدسات؟",
      en: "Do the stickers protect the lenses?",
    },
    a: {
      fr: "Les stickers sont avant tout décoratifs. Ils aident à protéger la surface contre les petites rayures du quotidien, mais ne sont pas conçus pour absorber les chocs importants.",
      ar: "الملصقات تزيينية بالأساس. تساعد على حماية السطح من الخدوش الصغيرة اليومية، لكنها ليست مصممة لامتصاص الصدمات القوية.",
      en: "The stickers are primarily decorative. They help protect the surface against small everyday scratches, but are not designed to absorb major impacts.",
    },
  },
  {
    q: { fr: "Quels sont les délais de livraison ?", ar: "ما هي مدة التوصيل؟", en: "What are the delivery times?" },
    a: {
      fr: "En général 24 à 48 h dans les grandes villes et 2 à 4 jours ouvrables pour les autres régions du Maroc.",
      ar: "عادة من 24 إلى 48 ساعة في المدن الكبرى ومن 2 إلى 4 أيام عمل في باقي المناطق.",
      en: "Usually 24–48 h in major cities and 2–4 working days elsewhere in Morocco.",
    },
  },
  {
    q: { fr: "La livraison est-elle gratuite ?", ar: "هل التوصيل مجاني؟", en: "Is delivery free?" },
    a: {
      fr: "Oui, la livraison est offerte partout au Maroc, sans montant minimum.",
      ar: "نعم، التوصيل مجاني في كل المغرب دون حد أدنى.",
      en: "Yes, delivery is free everywhere in Morocco, with no minimum order.",
    },
  },
  {
    q: {
      fr: "Comment fonctionne le paiement à la livraison ?",
      ar: "كيف يعمل الدفع عند الاستلام؟",
      en: "How does cash on delivery work?",
    },
    a: {
      fr: "Vous ne payez rien en ligne. Nous confirmons votre commande par téléphone ou WhatsApp, puis vous réglez 99 MAD au livreur à la réception.",
      ar: "لا تدفع شيئاً عبر الإنترنت. نؤكد الطلب هاتفياً أو عبر واتساب ثم تدفع 99 درهم للموصل عند الاستلام.",
      en: "You pay nothing online. We confirm your order by phone or WhatsApp, then you pay 99 MAD to the courier on delivery.",
    },
  },
  {
    q: {
      fr: "Puis-je échanger mon produit si je choisis le mauvais modèle ?",
      ar: "هل يمكنني الاستبدال إذا اخترت الموديل الخطأ؟",
      en: "Can I exchange if I pick the wrong model?",
    },
    a: {
      fr: "Oui. Contactez-nous sous 7 jours avec votre numéro de commande : nous organisons l’échange pour le bon modèle.",
      ar: "نعم. تواصل معنا خلال 7 أيام مع رقم الطلب وسننظم الاستبدال بالموديل الصحيح.",
      en: "Yes. Contact us within 7 days with your order number and we'll arrange an exchange for the right model.",
    },
  },
  {
    q: {
      fr: "Quelle est votre politique de retours et remboursements ?",
      ar: "ما هي سياسة الإرجاع والاسترجاع؟",
      en: "What is your returns and refunds policy?",
    },
    a: {
      fr: "Vous disposez de 7 jours après réception pour demander un retour si le produit est défectueux, endommagé ou ne correspond pas à votre commande. Le produit doit être dans son état d’origine.",
      ar: "لديك 7 أيام بعد الاستلام لطلب الإرجاع إذا كان المنتج معيباً أو تالفاً أو غير مطابق لطلبك، بشرط أن يكون بحالته الأصلية.",
      en: "You have 7 days after delivery to request a return if the item is defective, damaged or not what you ordered. It must be in its original condition.",
    },
  },
  {
    q: {
      fr: "Comment demander un remboursement ?",
      ar: "كيف أطلب استرجاع المبلغ؟",
      en: "How do I request a refund?",
    },
    a: {
      fr: "Contactez-nous par WhatsApp ou par téléphone avec votre numéro de commande et une photo du produit. Après validation, le remboursement est effectué sous 3 à 7 jours ouvrables.",
      ar: "تواصل معنا عبر واتساب أو الهاتف مع رقم الطلب وصورة للمنتج. بعد التحقق يتم الاسترجاع خلال 3 إلى 7 أيام عمل.",
      en: "Contact us on WhatsApp or by phone with your order number and a photo of the product. Once approved, the refund is issued within 3 to 7 business days.",
    },
  },
];
