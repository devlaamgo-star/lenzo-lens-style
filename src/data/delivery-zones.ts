/** User-supplied example zones only. Replace/extend with an approved Ozon export. */
export type DeliveryZone = { label: string; parentCity: string; aliases: string[] };

const casablanca = [
  "Casablanca – Maarif", "Casablanca – Ain Chock", "Casablanca – Californie",
  "Casablanca – Hay Hassani", "Casablanca – Bernoussi", "Casablanca – Ain Sebaa",
  "Casablanca – Anassi", "Casablanca – Sidi Moumen", "Casablanca – Hay Mohammadi",
  "Casablanca – Ain Borja", "Casablanca – Roches Noires", "Casablanca – Anfa",
  "Casablanca – Sidi Maarouf", "Casablanca – Lissasfa", "Casablanca – Moulay Rachid",
  "Casablanca – Sidi Othmane", "Casablanca – Sbata", "Casablanca – Beauséjour",
  "Casablanca – Oasis", "Casablanca – Bourgogne", "Casablanca – Ain Diab",
  "Casablanca – Centre Ville", "Casablanca – Derb Omar", "Casablanca – Derb Sultan",
  "Casablanca – Oulfa", "Casablanca – 2 Mars", "Daroua", "Mediouna",
  "Lahraouiyine-Casablanca", "Bournazel-Casablanca", "Sidi Hajjaj-Casa",
];
const agadir = [
  "Agadir", "AIT AMIRA-AGADIR", "Tamraght-Agadir", "Aourir-Agadir", "Temsia-Agadir",
  "AZRO-AIT MELLOUL AGADIR", "Tamait Izder-agadir", "Imi Ouaddar-agadir",
  "massa chtouka-agadir", "Tamri-agadir", "imsouane-agadir", "Inchaden-agadir",
  "Ameskroud-agadir", "Tifnit-agadir", "douar larab (ait amira)-agadir",
  "Issen (Drarga – Route Houara)-agadir", "Agourram (Ait Amira)-agadir",
  "Biougra (Lkhrba)-Agadir", "Biougra (Ait Sayh)-Agadir",
  "Biougra (Lghriss)-Agadir", "Biougra (Tin Hamou)-Agadir",
];

export const DELIVERY_ZONES: readonly DeliveryZone[] = [
  ...casablanca.map((label) => ({ label, parentCity: "Casablanca", aliases: ["casa", "الدار البيضاء"] })),
  ...agadir.map((label) => ({ label, parentCity: "Agadir", aliases: ["أكادير", "اكادير"] })),
];