import type { L } from "@/lib/custom-design";

export const STUDIO = {
  stepOf: { fr: "Étape {n} sur {t}", ar: "الخطوة {n} من {t}", en: "Step {n} of {t}" } as L,
  next: { fr: "Continuer", ar: "التالي", en: "Continue" } as L,
  back: { fr: "Retour", ar: "رجوع", en: "Back" } as L,
  optional: { fr: "Optionnel", ar: "اختياري", en: "Optional" } as L,
  skip: { fr: "Passer cette étape", ar: "تخطى", en: "Skip this step" } as L,
  previewTitle: { fr: "Aperçu en direct", ar: "معاينة مباشرة", en: "Live preview" } as L,
  showPreview: { fr: "Voir mon aperçu", ar: "شوف المعاينة ديالي", en: "View my preview" } as L,
  hidePreview: { fr: "Masquer l'aperçu", ar: "خبي المعاينة", en: "Hide preview" } as L,

  s1: {
    title: { fr: "Que voulez-vous personnaliser ?", ar: "شنو بغيتي تخصص؟", en: "What do you want to customize?" } as L,
    sub: { fr: "Choisissez une option, on passe automatiquement à la suite.", ar: "اختار خيار وغادي نمشيو للخطوة الجاية.", en: "Pick one option — we move on automatically." } as L,
    options: [
      { value: "photo", label: { fr: "Photo personnelle", ar: "صورة شخصية", en: "Personal photo" } as L, emoji: "📸" },
      { value: "logo", label: { fr: "Mon logo", ar: "Logo ديالي", en: "My logo" } as L, emoji: "🏷️" },
      { value: "name", label: { fr: "Nom / Initiales", ar: "الاسم / Initials", en: "Name / Initials" } as L, emoji: "🔠" },
      { value: "car", label: { fr: "Ma voiture", ar: "طوموبيلتي", en: "My car" } as L, emoji: "🚗" },
      { value: "couple", label: { fr: "Couple / Famille", ar: "Couple / Family", en: "Couple / Family" } as L, emoji: "❤️" },
      { value: "business", label: { fr: "Business branding", ar: "Business branding", en: "Business branding" } as L, emoji: "💼" },
      { value: "camera-only", label: { fr: "Sticker caméra seul", ar: "غير Sticker ديال الكاميرا", en: "Camera sticker only" } as L, emoji: "🎯" },
      { value: "own-idea", label: { fr: "J'ai ma propre idée", ar: "عندي فكرة ديالي", en: "I have my own idea" } as L, emoji: "💡" },
    ],
  },

  s2: {
    title: { fr: "Choisissez votre iPhone", ar: "اختار الـ iPhone ديالك", en: "Choose your iPhone" } as L,
    sub: { fr: "L'aperçu s'adapte automatiquement au modèle.", ar: "المعاينة كتبدل حسب الموديل.", en: "The preview adapts to the model automatically." } as L,
    color: { fr: "Couleur du téléphone", ar: "لون التليفون", en: "Phone colour" } as L,
  },

  s3: {
    title: { fr: "Où voulez-vous votre design ?", ar: "فين بغيتي التصميم ديالك؟", en: "Where do you want your design?" } as L,
    options: [
      {
        value: "back",
        label: { fr: "Skin arrière", ar: "Skin ديال الظهر", en: "Back skin" } as L,
        desc: { fr: "Le design couvre toute la face arrière.", ar: "التصميم كيغطي الظهر كامل.", en: "Design covers the whole rear area." } as L,
      },
      {
        value: "camera",
        label: { fr: "Sticker caméra", ar: "Sticker الكاميرا", en: "Camera sticker" } as L,
        desc: { fr: "Le design couvre uniquement le module caméra.", ar: "التصميم كيغطي غير موديل الكاميرا.", en: "Design covers only the camera module." } as L,
      },
      {
        value: "both",
        label: { fr: "Arrière + caméra", ar: "الظهر + الكاميرا", en: "Back + camera" } as L,
        desc: { fr: "Vous recevez les deux pièces assorties.", ar: "غادي توصلك الجوج قطع متناسقين.", en: "You receive both matching pieces." } as L,
      },
    ],
    popular: { fr: "Le plus demandé", ar: "الأكثر طلباً", en: "Most requested" } as L,
  },

  s4: {
    title: { fr: "Envoyez votre photo ou logo", ar: "صيفط الصورة ولا Logo ديالك", en: "Upload your photo or logo" } as L,
    sub: { fr: "JPG, PNG ou WEBP — 8 Mo maximum.", ar: "JPG, PNG ولا WEBP — أقصى 8 Mo.", en: "JPG, PNG or WEBP — 8 MB max." } as L,
    add: { fr: "Choisir un fichier", ar: "اختار ملف", en: "Choose a file" } as L,
    replace: { fr: "Remplacer la photo", ar: "بدل الصورة", en: "Replace photo" } as L,
    remove: { fr: "Supprimer", ar: "حيد", en: "Remove" } as L,
    extra: { fr: "Ajouter d'autres fichiers de référence", ar: "زيد ملفات أخرى", en: "Add more reference files" } as L,
    noFileName: { fr: "Vous pouvez continuer sans fichier : votre texte sera utilisé.", ar: "تقدر تكمل بلا ملف: غادي نستعملو النص ديالك.", en: "You can continue without a file — your text will be used." } as L,
    text: { fr: "Votre nom ou initiales", ar: "الاسم ولا Initials ديالك", en: "Your name or initials" } as L,
    font: { fr: "Style de police", ar: "نوع الخط", en: "Font style" } as L,
    textColor: { fr: "Couleur du texte", ar: "لون النص", en: "Text colour" } as L,
    position: { fr: "Position du texte", ar: "مكان النص", en: "Text position" } as L,
    posTop: { fr: "Haut", ar: "فوق", en: "Top" } as L,
    posCenter: { fr: "Centre", ar: "وسط", en: "Center" } as L,
    posBottom: { fr: "Bas", ar: "تحت", en: "Bottom" } as L,
  },

  s5: {
    title: { fr: "Ajustez votre image", ar: "عدل الصورة ديالك", en: "Adjust your image" } as L,
    sub: { fr: "Déplacez l'image directement sur l'aperçu ou utilisez les boutons.", ar: "حرك الصورة نيشان فالمعاينة ولا استعمل الأزرار.", en: "Drag the image on the preview or use the buttons." } as L,
    zoom: { fr: "Zoom", ar: "التكبير", en: "Zoom" } as L,
    reset: { fr: "Réinitialiser", ar: "إعادة الضبط", en: "Reset" } as L,
    noImage: { fr: "Aucune image à ajuster — vous pouvez continuer.", ar: "ماكاينة حتى صورة للتعديل — تقدر تكمل.", en: "No image to adjust — you can continue." } as L,
  },

  s6: {
    title: { fr: "Choisissez un style", ar: "اختار ستايل", en: "Choose a style" } as L,
    sub: { fr: "Optionnel — c'est une préférence transmise à notre équipe de design.", ar: "اختياري — هادي غير تفضيل كنصيفطوه لفريق التصميم.", en: "Optional — this is a preference sent to our design team." } as L,
    aiNote: {
      fr: "Les styles créatifs sont réalisés à la main par nos designers : l'aperçu affiche votre image d'origine.",
      ar: "الستايلات الإبداعية كيصاوبوها المصممين ديالنا بيدهم: المعاينة كتبين الصورة الأصلية.",
      en: "Creative styles are crafted by hand by our designers — the preview shows your original image.",
    } as L,
    options: [
      { value: "original", label: { fr: "Photo d'origine", ar: "الصورة الأصلية", en: "Original photo" } as L },
      { value: "clean", label: { fr: "Clean", ar: "Clean", en: "Clean" } as L },
      { value: "cartoon", label: { fr: "Cartoon", ar: "Cartoon", en: "Cartoon" } as L },
      { value: "cartoon-3d", label: { fr: "Cartoon 3D", ar: "Cartoon 3D", en: "3D Cartoon" } as L },
      { value: "minimal", label: { fr: "Minimal", ar: "Minimal", en: "Minimal" } as L },
      { value: "luxury", label: { fr: "Luxury", ar: "Luxury", en: "Luxury" } as L },
      { value: "street", label: { fr: "Street", ar: "Street", en: "Street" } as L },
      { value: "anime", label: { fr: "Anime", ar: "Anime", en: "Anime Inspired" } as L },
      { value: "funny", label: { fr: "Funny", ar: "Funny", en: "Funny" } as L },
      { value: "skinup", label: { fr: "SKINUP décide", ar: "خلي SKINUP يختار", en: "Let SKINUP decide" } as L },
    ],
    handmade: { fr: "Réalisé par nos designers", ar: "كيصاوبوه المصممين", en: "Made by our designers" } as L,
  },

  s7: {
    title: { fr: "Votre aperçu final", ar: "المعاينة النهائية ديالك", en: "Your final preview" } as L,
    sub: {
      fr: "Voici à quoi ressemblera votre design SKINUP.",
      ar: "هاكيفاش غادي يبان التصميم ديالك مع SKINUP.",
      en: "This is how your custom SKINUP design will look.",
    } as L,
    disclaimer: {
      fr: "Aperçu à titre de visualisation. Notre équipe de design peut faire de petits ajustements pour une impression et un ajustement parfaits. Nous confirmons le design final avant production.",
      ar: "المعاينة غير للتصور. فريق التصميم ممكن يدير تعديلات صغيرة باش الطباعة تكون مزيانة. غادي نأكدو معاك التصميم قبل الإنتاج.",
      en: "Preview for visualization purposes. Our design team may make small adjustments for the best print and fit. We will confirm the final design before production.",
    } as L,
    edit: { fr: "Modifier mon design", ar: "عدل التصميم ديالي", en: "Edit my design" } as L,
    approve: { fr: "C'est parfait — continuer", ar: "زوين — كمل الطلب", en: "Looks good — continue to order" } as L,
    summary: {
      model: { fr: "Modèle iPhone", ar: "موديل iPhone", en: "iPhone model" } as L,
      color: { fr: "Couleur du téléphone", ar: "لون التليفون", en: "Phone colour" } as L,
      subject: { fr: "Type de personnalisation", ar: "نوع التخصيص", en: "Customization type" } as L,
      area: { fr: "Zone", ar: "المنطقة", en: "Area" } as L,
      style: { fr: "Style", ar: "الستايل", en: "Style" } as L,
      file: { fr: "Fichier envoyé", ar: "الملف المرسل", en: "Uploaded file" } as L,
      text: { fr: "Nom / Initiales", ar: "الاسم / Initials", en: "Name / Initials" } as L,
      none: { fr: "—", ar: "—", en: "—" } as L,
    },
  },

  s8: {
    title: { fr: "Informations de livraison", ar: "معلومات التوصيل", en: "Delivery information" } as L,
    sub: { fr: "Paiement à la livraison — livraison gratuite partout au Maroc.", ar: "الخلاص عند التوصيل — التوصيل مجاني فالمغرب كامل.", en: "Cash on delivery — free delivery across Morocco." } as L,
    name: { fr: "Nom complet", ar: "الاسم الكامل", en: "Full name" } as L,
    phone: { fr: "Téléphone / WhatsApp", ar: "التيليفون / WhatsApp", en: "Phone / WhatsApp" } as L,
    email: { fr: "Email", ar: "الإيميل", en: "Email" } as L,
    city: { fr: "Ville", ar: "المدينة", en: "City" } as L,
    address: { fr: "Adresse de livraison", ar: "عنوان التوصيل", en: "Delivery address" } as L,
    quantity: { fr: "Quantité", ar: "الكمية", en: "Quantity" } as L,
    notes: { fr: "Notes (optionnel)", ar: "ملاحظات (اختياري)", en: "Notes (optional)" } as L,
    submit: { fr: "Envoyer ma commande", ar: "صيفط الطلب", en: "Submit my order" } as L,
    recap: { fr: "Votre design", ar: "التصميم ديالك", en: "Your design" } as L,
  },

  doneTitle: { fr: "Demande bien reçue ✅", ar: "وصلنا الطلب ديالك ✅", en: "Request received ✅" } as L,
  doneText: {
    fr: "Votre demande de design personnalisé a bien été reçue. Notre équipe vérifie votre design et vous contacte pour tout confirmer avant la production.",
    ar: "وصلنا طلب التصميم ديالك. الفريق غادي يراجع التصميم ويتواصل معاك باش نأكدو كلشي قبل الإنتاج.",
    en: "Your custom design request has been received. Our team will review your design and contact you to confirm everything before production.",
  } as L,
  doneRef: { fr: "Numéro de référence", ar: "رقم الطلب", en: "Reference number" } as L,
  restart: { fr: "Nouvelle demande", ar: "طلب جديد", en: "New request" } as L,
};

export const TEXT_COLORS = ["#FFFFFF", "#111111", "#D2622B", "#C9A227", "#1D4ED8", "#DC2626"];
