import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "@/components/SectionHeading";
import { DESIGNS } from "@/lib/catalog";
import type { TKey } from "@/lib/translations";

type Card = {
  title: TKey;
  desc: TKey;
  image: string;
  search: { collection?: "minimal" | "artistique" | "elegance" | "urbain"; filter?: "new" | "best" };
};

const img = (id: string) => DESIGNS.find((d) => d.id === id)!.image;

const CARDS: Card[] = [
  { title: "col.minimal", desc: "col.minimal.d", image: img("regard-noir"), search: { collection: "minimal" } },
  { title: "col.artistique", desc: "col.artistique.d", image: img("chat-curieux"), search: { collection: "artistique" } },
  { title: "col.elegance", desc: "col.elegance.d", image: img("fleurs-pastel"), search: { collection: "elegance" } },
  { title: "col.urbain", desc: "col.urbain.d", image: img("canard-pop"), search: { collection: "urbain" } },
  { title: "nav.best", desc: "col.best.d", image: img("chat-orange"), search: { filter: "best" } },
  { title: "nav.new", desc: "col.new.d", image: img("soleil-felin"), search: { filter: "new" } },
];


export function CollectionsGrid() {
  const { t } = useI18n();
  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeading title="collections.title" subtitle="collections.sub" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c) => (
            <Link
              key={c.title}
              to="/collection"
              search={c.search}
              className="group relative flex min-h-[15rem] flex-col justify-end overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <img
                src={c.image}
                alt=""
                loading="lazy"
                width={1024}
                height={1024}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-transparent" />
              <div className="relative flex flex-col gap-1.5">
                <h3 className="text-lg font-bold text-ink-foreground">{t(c.title)}</h3>
                <p className="text-sm text-ink-foreground/80">{t(c.desc)}</p>
                <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-card px-4 py-2 text-xs font-semibold text-foreground">
                  {t("collections.discover")}
                  <ArrowRight className="h-3.5 w-3.5 flip-rtl" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
