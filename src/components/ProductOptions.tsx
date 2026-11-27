import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { useCart, type CartProduct } from "@/lib/cart";
import { IPHONE_MODELS, modelsForCategory } from "@/lib/catalog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ModelSelect({
  value,
  onChange,
  error,
  className = "h-11 rounded-full",
  models = IPHONE_MODELS,
  label,
  helper,
  placeholder,
}: {
  label?: string;
  helper?: string;
  placeholder?: string;
  models?: readonly string[];
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
  className?: string;
}) {
  const { t } = useI18n();
  return (
    <div className="w-full">
      <label className="mb-1.5 block text-sm font-medium">{label ?? t("pack.model")}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger aria-label={label ?? t("pack.model")} className={className}>
          <SelectValue placeholder={placeholder ?? t("pack.modelPlaceholder")} />
        </SelectTrigger>
        <SelectContent>
          {models.map((m) => (
            <SelectItem key={m} value={m}>
              {m}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {helper && <p className="mt-2 text-xs text-muted-foreground">{helper}</p>}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function QtyStepper({
  value,
  onChange,
  compact = false,
}: {
  value: number;
  onChange: (v: number) => void;
  compact?: boolean;
}) {
  const { t } = useI18n();
  const size = compact ? "h-10 w-10" : "h-12 w-12";
  return (
    <div className="inline-flex items-center rounded-full border border-border">
      <button
        type="button"
        aria-label={`${t("skins.qty")} -`}
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
        className={`grid ${size} place-items-center rounded-full disabled:opacity-40`}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-9 text-center text-sm font-semibold" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label={`${t("skins.qty")} +`}
        onClick={() => onChange(Math.min(20, value + 1))}
        className={`grid ${size} place-items-center rounded-full`}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

/** Sélecteur modèle + quantité + ajout au panier, partagé par les pages produit et les aperçus rapides. */
export function AddToCartBlock({
  product,
  compact = false,
  onDone,
  cameraFrench = false,
}: {
  cameraFrench?: boolean;
  product: CartProduct;
  compact?: boolean;
  onDone?: () => void;
}) {
  const { t } = useI18n();
  const cart = useCart();
  const navigate = useNavigate();
  const models = modelsForCategory(product.category);
  const [model, setModel] = useState<string>(models.length === 1 ? (models[0] ?? "") : "");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState<string | undefined>(undefined);

  const submit = (goToCheckout: boolean) => {
    if (!model) {
      setError(cameraFrench ? "Choisissez votre modèle d’iPhone." : t("e.modelSelect"));
      return;
    }
    setError(undefined);
    cart.add(product, model, qty);
    toast.success(cameraFrench ? "Skin ajouté au panier" : t("cart.addedToast"));
    onDone?.();
    if (goToCheckout) navigate({ to: "/commande" });
  };

  return (
    <div className="w-full space-y-3">
      <ModelSelect
        {...(cameraFrench ? { label: "Votre modèle d’iPhone", helper: "Choisissez le modèle exact de votre téléphone.", placeholder: "Sélectionnez votre modèle", className: "h-12 rounded-lg" } : {})}
        models={models} value={model} onChange={(v) => { setModel(v); setError(undefined); }} error={error} />
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <span className="mb-1.5 block text-sm font-medium">{cameraFrench ? "Quantité" : t("skins.qty")}</span>
          <QtyStepper value={qty} onChange={setQty} compact={compact} />
        </div>
        <Button
          variant={cameraFrench ? "outline" : "ghost"}
          type="button"
          onClick={() => submit(false)}
          className={cameraFrench ? "mt-6 h-12 flex-1 rounded-lg px-4 font-semibold shadow-none" : "mt-6 h-12 flex-1 rounded-full bg-ink px-6 font-semibold text-ink-foreground hover:bg-primary"}
        >
          <ShoppingBag className="h-4 w-4" />
          {cameraFrench ? "Ajouter au panier" : t("cart.add")}
        </Button>
      </div>
      <Button
        type="button"
        onClick={() => submit(true)}
        className={cameraFrench ? "h-12 w-full rounded-lg px-6 font-semibold shadow-none hover:bg-primary-hover" : "h-12 w-full rounded-full bg-primary px-6 font-semibold text-primary-foreground shadow-none transition-transform hover:scale-[1.01]"}
      >
        {cameraFrench ? "Commander ce skin" : t("skins.order")}
      </Button>
      <p className="text-xs text-muted-foreground">{cameraFrench ? "Paiement à la livraison au Maroc." : t("cod.text")}</p>
    </div>
  );
}
