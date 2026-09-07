import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, LayoutGrid, Rows3 } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { useI18n } from "@/lib/i18n";
import { DESIGNS, IPHONE_MODELS } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { StickyPackBar } from "@/components/StickyPackBar";
import { cn } from "@/lib/utils";
import { CustomSkinCard } from "@/components/CustomSkinCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const searchSchema = z.object({
  filter: z.enum(["new", "best"]).optional(),
  sort: z.enum(["popular", "new", "az", "za"]).optional(),
  model: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/collection")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Tous les designs — Collection SKINUP" },
      {
        name: "description",
        content:
          "Découvrez tous les designs de stickers caméra SKINUP pour iPhone. Filtrez par modèle, collection et style, puis composez votre pack de 3 pour 149 MAD.",
      },
      { property: "og:title", content: "Tous les designs — Collection SKINUP" },
      {
        property: "og:description",
        content: "Filtrez par modèle, collection et style, puis composez votre pack de 3 pour 149 MAD.",
      },
    ],
  }),
  component: CollectionPage,
});

function CollectionPage() {
  const { t, lang } = useI18n();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [wide, setWide] = useState(false);

  const sort = search.sort ?? "popular";

  const results = useMemo(() => {
    let list = [...DESIGNS];
    if (search.filter === "new") list = list.filter((d) => d.isNew);
    if (search.filter === "best") {
      list = [...list].sort((a, b) => b.popularity - a.popularity).slice(0, 12);
    }
    if (search.q) {
      const q = search.q.toLowerCase();
      list = list.filter((d) =>
        Object.values(d.name).some((n) => n.toLowerCase().includes(q)),
      );
    }
    switch (sort) {
      case "new":
        list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      case "az":
        list.sort((a, b) => a.name[lang].localeCompare(b.name[lang]));
        break;
      case "za":
        list.sort((a, b) => b.name[lang].localeCompare(a.name[lang]));
        break;
      default:
        list.sort((a, b) => b.popularity - a.popularity);
    }
    return list;
  }, [search.filter, search.q, sort, lang]);

  const update = (patch: Record<string, string | undefined>) =>
    navigate({ search: { ...search, ...patch } as never });


  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="container-page py-8 lg:py-12">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              {t("breadcrumb.home")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 flip-rtl" />
            <span className="text-foreground">{t("col.title")}</span>
          </nav>
          <h1 className="mt-3 text-2xl font-bold sm:text-3xl lg:text-[2.1rem]">{t("col.title")}</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">{t("col.sub")}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex h-9 items-center rounded-full bg-ink px-4 text-[13px] font-semibold text-ink-foreground">
              {t("menu.stickers")}
            </span>
            <Link
              to="/skins"
              className="inline-flex h-9 items-center rounded-full border border-border bg-card px-4 text-[13px] font-semibold transition-colors hover:bg-surface"
            >
              {t("skins.nav")}
            </Link>
            <Link
              to="/iphone-air"
              className="inline-flex h-9 items-center rounded-full border border-border bg-card px-4 text-[13px] font-semibold transition-colors hover:bg-surface"
            >
              {t("air.nav")}
            </Link>
            <Link
              to="/dos-camera"
              className="inline-flex h-9 items-center rounded-full border border-border bg-card px-4 text-[13px] font-semibold transition-colors hover:bg-surface"
            >
              {t("backlens.nav")}
            </Link>
            <Link
              to="/objectifs"
              className="inline-flex h-9 items-center rounded-full border border-border bg-card px-4 text-[13px] font-semibold transition-colors hover:bg-surface"
            >
              {t("lens.nav")}

            </Link>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft lg:flex-row lg:items-center lg:justify-between">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:w-auto lg:flex-1">
              <Select
                value={search.model ?? "all"}
                onValueChange={(v) => update({ model: v === "all" ? undefined : v })}
              >
                <SelectTrigger className="h-11 min-w-0 rounded-full">
                  <SelectValue placeholder={t("col.model")} />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  <SelectItem value="all">{t("col.model")} — {t("col.all")}</SelectItem>
                  {IPHONE_MODELS.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>


              <Select value={sort} onValueChange={(v) => update({ sort: v })}>
                <SelectTrigger className="h-11 min-w-0 rounded-full">
                  <SelectValue placeholder={t("col.sort")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">{t("sort.popular")}</SelectItem>
                  <SelectItem value="new">{t("sort.new")}</SelectItem>
                  <SelectItem value="az">{t("sort.az")}</SelectItem>
                  <SelectItem value="za">{t("sort.za")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                {results.length} {t("col.results")}
              </p>
              <div className="hidden items-center gap-1 rounded-full border border-border p-1 lg:flex">
                <button
                  type="button"
                  aria-label={t("col.grid")}
                  onClick={() => setWide(false)}
                  className={cn("grid h-8 w-8 place-items-center rounded-full", !wide && "bg-ink text-ink-foreground")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label={t("col.grid")}
                  onClick={() => setWide(true)}
                  className={cn("grid h-8 w-8 place-items-center rounded-full", wide && "bg-ink text-ink-foreground")}
                >
                  <Rows3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="mt-12 flex flex-col items-center gap-4 text-center">
              <p className="text-sm text-muted-foreground">{t("col.none")}</p>
              <button
                type="button"
                onClick={() => navigate({ search: {} })}
                className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-ink-foreground"
              >
                {t("col.reset")}
              </button>
            </div>
          ) : (
            <div
              className={cn(
                "mt-8 grid grid-cols-2 gap-4 lg:gap-6",
                wide ? "lg:grid-cols-3" : "lg:grid-cols-4",
              )}
            >
              <CustomSkinCard priority />
              {results.map((d, i) => (
                <ProductCard key={d.id} design={d} priority={i < 4} />
              ))}
            </div>
          )}
        </div>
      </section>
      <StickyPackBar />
    </>
  );
}
