import { useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { searchDeliveryZones } from "@/lib/delivery-address";
import { useI18n } from "@/lib/i18n";

export function DeliveryZoneSelect({ value, onChange, error, className }: {
  value: string; onChange: (value: string) => void; error?: string | undefined; className: string;
}) {
  const { t } = useI18n();
  const listId = useId();
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const results = searchDeliveryZones(query);
  const expanded = open && query.trim().length > 0;

  function select(label: string) {
    setQuery(label);
    onChange(label);
    setOpen(false);
    setActive(-1);
    input.current?.focus();
  }
  function move(index: number) {
    setActive(index);
    document.getElementById(`${listId}-${index}`)?.scrollIntoView({ block: "nearest" });
  }

  return (
    <div className="relative min-w-0" onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <label htmlFor="delivery-zone" className="mb-1.5 block text-sm font-medium">{t("f.deliveryZone")}</label>
      <div className="relative">
        <input ref={input} id="delivery-zone" role="combobox" autoComplete="off"
          aria-autocomplete="list" aria-expanded={expanded} aria-controls={listId}
          aria-activedescendant={expanded && active >= 0 ? `${listId}-${active}` : undefined}
          aria-required="true" aria-invalid={Boolean(error)} aria-describedby={error ? `${listId}-error` : undefined}
          placeholder={t("f.deliveryZonePlaceholder")} value={query} maxLength={120}
          className={`${className} pe-12`} onFocus={() => setOpen(true)}
          onChange={(event) => { setQuery(event.target.value); onChange(""); setActive(-1); setOpen(true); }}
          onKeyDown={(event) => {
            if (event.key === "Escape") { setOpen(false); setActive(-1); }
            if (event.key === "ArrowDown" && results.length) {
              event.preventDefault(); setOpen(true); move(Math.min(active + 1, results.length - 1));
            }
            if (event.key === "ArrowUp" && results.length) {
              event.preventDefault(); move(Math.max(active - 1, 0));
            }
            if (event.key === "Enter" && expanded) {
              event.preventDefault();
              const result = results[active];
              if (result) select(result.label);
            }
          }} />
        <ChevronDown className="pointer-events-none absolute end-4 top-4 h-4 w-4 text-muted-foreground" />
      </div>
      {expanded && (
        <div className="absolute start-0 end-0 top-full z-30 mt-1 overflow-hidden rounded-lg border border-border bg-card shadow-soft">
          <div id={listId} role="listbox" aria-label={t("f.deliveryZone")}
            className="max-h-96 overflow-y-auto overscroll-contain">
            {results.map((zone, index) => (
              <Button key={zone.label} id={`${listId}-${index}`} type="button" role="option"
                aria-selected={value === zone.label} variant="ghost" tabIndex={-1}
                onMouseDown={(event) => event.preventDefault()} onClick={() => select(zone.label)}
                className={`min-h-12 h-auto w-full justify-between whitespace-normal rounded-none px-4 py-3 text-start font-normal ${active === index ? "bg-accent text-accent-foreground" : ""}`}>
                <span className="min-w-0 break-words">{zone.label}</span>
                {value === zone.label && <Check className="h-4 w-4 shrink-0 text-primary" />}
              </Button>
            ))}
            {!results.length && <p className="px-4 py-3 text-sm text-muted-foreground" role="status">{t("f.deliveryZoneEmpty")}</p>}
          </div>
        </div>
      )}
      {error && <p id={`${listId}-error`} className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}