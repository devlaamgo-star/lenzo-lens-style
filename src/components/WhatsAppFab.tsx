import { useI18n } from "@/lib/i18n";
import { whatsappLink } from "@/lib/catalog";
import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  const { t } = useI18n();
  return (
    <a
      href={whatsappLink(t("wa.msg"))}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] end-4 z-40 inline-flex items-center gap-2 rounded-full bg-success px-4 py-3 text-sm font-semibold text-success-foreground shadow-lift transition-transform hover:scale-105 md:bottom-6 md:end-6"
      style={{ marginBottom: "var(--fab-offset, 0px)" }}
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">{t("wa.help")}</span>
    </a>
  );
}
