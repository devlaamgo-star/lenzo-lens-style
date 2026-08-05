import { Scissors, Sparkles, ShieldCheck, Eraser, Layers, Smartphone, Truck, Wallet, PhoneCall, Headphones, RefreshCcw } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "@/components/SectionHeading";
import type { TKey } from "@/lib/translations";

const BENEFITS: { icon: typeof Scissors; title: TKey; desc: TKey }[] = [
  { icon: Scissors, title: "b1", desc: "b1d" },
  { icon: Sparkles, title: "b2", desc: "b2d" },
  { icon: ShieldCheck, title: "b3", desc: "b3d" },
  { icon: Eraser, title: "b4", desc: "b4d" },
  { icon: Layers, title: "b5", desc: "b5d" },
  { icon: Smartphone, title: "b6", desc: "b6d" },
];

export function BenefitsSection() {
  const { t } = useI18n();
  return (
    <section className="section-y bg-surface">
      <div className="container-page">
        <SectionHeading title="benefits.title" subtitle="benefits.sub" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <div key={b.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                <b.icon className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold sm:text-base">{t(b.title)}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(b.desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TRUST: { icon: typeof Truck; title: TKey }[] = [
  { icon: Truck, title: "t1" },
  { icon: Wallet, title: "t2" },
  { icon: PhoneCall, title: "t3" },
  { icon: Headphones, title: "t4" },
  { icon: RefreshCcw, title: "t5" },
];

export function TrustSection() {
  const { t } = useI18n();
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-10">
          <SectionHeading title="trust.title" subtitle="trust.sub" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TRUST.map((item) => (
              <div key={item.title} className="flex items-center gap-3 rounded-2xl bg-surface p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-ink-foreground">
                  <item.icon className="h-4.5 w-4.5" strokeWidth={1.6} />
                </span>
                <p className="min-w-0 text-sm font-medium">{t(item.title)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
