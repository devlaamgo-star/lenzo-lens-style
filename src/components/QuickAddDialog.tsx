import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { useCart, type CartProduct } from "@/lib/cart";
import { modelsForCategory } from "@/lib/catalog";
import { ModelSelect } from "@/components/ProductOptions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/** Compact "+ Add" button that opens a model-selection popup and adds to cart without leaving the page. */
export function QuickAddButton({ product }: { product: CartProduct }) {
  const { t, lang } = useI18n();
  const cart = useCart();
  const [open, setOpen] = useState(false);
  const models = modelsForCategory(product.category);
  const single = models.length === 1 ? (models[0] ?? "") : "";
  const [model, setModel] = useState(single);

  const openDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setModel(single);
    setOpen(true);
  };

  const confirm = () => {
    if (!model) return;
    cart.add(product, model, 1);
    setOpen(false);
    toast.success(t("cart.addedToast"));
  };

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        aria-haspopup="dialog"
        className="relative z-[2] mt-2 inline-flex h-9 w-fit items-center justify-center rounded-full border border-foreground px-4 text-xs font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background"
      >
        {t("card.quickAdd")}
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm rounded-2xl bg-background">
          <DialogHeader className="flex-row items-center gap-3 space-y-0 pe-6 text-start">
            <img
              src={product.image}
              alt=""
              className="h-16 w-16 shrink-0 rounded-lg bg-background object-contain"
            />
            <div className="min-w-0">
              <DialogTitle className="text-start text-base leading-snug">{product.name[lang]}</DialogTitle>
              <DialogDescription className="mt-1 text-start text-sm font-semibold text-foreground">
                {product.price} MAD
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{t("quickadd.choose")}</h4>
            <ModelSelect models={models} value={model} onChange={setModel} />
            <button
              type="button"
              onClick={confirm}
              disabled={!model}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-ink-foreground transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
            >
              <ShoppingBag className="h-4 w-4" />
              {t("cart.add")}
            </button>
            <p className="text-xs text-muted-foreground">{t("cod.text")}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
