import { Smartphone, LayoutGrid, PackageCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "@/components/SectionHeading";
import type { TKey } from "@/lib/translations";

const STEPS: { icon: typeof Smartphone; title: TKey; desc: TKey }[] = [
  { icon: Smartphone, title: "how.s1", desc: "how.s1d" },
  { icon: LayoutGrid, title: "how.s2", desc: "how.s2d" },
  { icon: PackageCheck, title: "how.s3", desc: "how.s3d" },
];

export function HowItWorks() {
  const { t } = useI18n();
  return (
    <section id="comment-ca-marche" className="section-y bg-surface">
      <div className="container-page">
        <SectionHeading title="how.title" subtitle="how.sub" />
        <div className="mt-10 grid gap-5 md:grid-cols-3 lg:gap-7">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                  <step.icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-bold tracking-widest text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold">{t(step.title)}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{t(step.desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
