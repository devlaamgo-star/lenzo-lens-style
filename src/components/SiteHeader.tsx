import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import logo from "@/assets/skinup-logo.png";
import { useI18n } from "@/lib/i18n";
import { usePack } from "@/lib/pack";
import { useCart } from "@/lib/cart";
import { CAMERA_LENS_SKINS, FULL_BODY_SKINS } from "@/lib/catalog";
import { BACK_LENS_SKINS, IPHONE_AIR_SKINS, ANIME_SKINS } from "@/lib/catalog";
import { LANGS, type Lang } from "@/lib/translations";
import { cn } from "@/lib/utils";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navLinkClass =
  "relative inline-flex items-center py-1 text-[13px] font-medium tracking-tight text-foreground/70 transition-colors hover:text-foreground data-[status=active]:text-foreground";

const LANG_LABELS: Record<Lang, string> = { fr: "Français", ar: "العربية", en: "English" };

export function SiteHeader() {
  const { t, lang, setLang, dir } = useI18n();
  const navigate = useNavigate();
  const pack = usePack();
  const cart = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [mobileCollectionOpen, setMobileCollectionOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openCollection = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setCollectionOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setCollectionOpen(false), 120);
  };

  const collectionItems = [
    { to: "/collection" as const, search: {}, label: t("menu.all") },
    { to: "/collection" as const, search: {}, label: t("menu.stickers") },
    { to: "/objectifs" as const, search: {}, label: t("lens.nav") },
    { to: "/dos-camera" as const, search: {}, label: t("backlens.nav") },
    { to: "/iphone-air" as const, search: {}, label: t("air.nav") },
    { to: "/anime" as const, search: {}, label: t("anime.nav") },
    { to: "/skins" as const, search: {}, label: t("skins.nav") },
    { to: "/collection" as const, search: { filter: "new" as const }, label: t("nav.new") },
    { to: "/collection" as const, search: { filter: "best" as const }, label: t("nav.best") },
  ];

  const rightLinks = [
    { to: "/skins" as const, label: t("skins.nav"), search: {} },
    { to: "/collection" as const, label: t("nav.new"), search: { filter: "new" as const } },
    { to: "/comment-ca-marche" as const, label: t("nav.how"), search: {} },
    { to: "/avis" as const, label: t("nav.reviews"), search: {} },
    { to: "/design-personnalise" as const, label: t("nav.custom"), search: {} },
    { to: "/faq" as const, label: t("nav.faq"), search: {} },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-card transition-shadow",
        scrolled ? "border-border shadow-[0_1px_3px_rgba(0,0,0,0.06)]" : "border-border/60",
      )}
    >
      <div className="container-page grid h-14 grid-cols-[auto_1fr_auto] items-center gap-3 md:h-[68px] lg:h-[78px]">
        <div className="flex items-center gap-2">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label={t("nav.menu")}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors hover:bg-surface lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side={dir === "rtl" ? "right" : "left"} className="w-[86vw] max-w-sm overflow-y-auto p-0">
              <SheetTitle className="sr-only">{t("nav.menu")}</SheetTitle>
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <img src={logo} alt="SKINUP" width={1152} height={576} className="h-auto w-[100px] object-contain md:w-[120px] lg:w-[140px]" />
                <button
                  type="button"
                  aria-label={t("nav.close")}
                  onClick={() => setMobileOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full hover:bg-surface"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 p-4">
                <Link
                  to="/collection"
                  search={{ filter: "best" as const }}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium hover:bg-surface"
                >
                  {t("nav.best")}
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileCollectionOpen((v) => !v)}
                  aria-expanded={mobileCollectionOpen}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium hover:bg-surface"
                >
                  {t("nav.collection")}
                  <ChevronDown
                    className={cn("h-4 w-4 transition-transform", mobileCollectionOpen && "rotate-180")}
                  />
                </button>
                {mobileCollectionOpen && (
                  <div className="flex flex-col border-s border-border ps-3">
                    {collectionItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        search={item.search}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}

                {rightLinks.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    search={item.search}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3 py-3 text-base font-medium hover:bg-surface"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/pack"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 inline-flex h-12 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground"
                >
                  {t("pack.title")}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex shrink-0 items-center">
            <img src={logo} alt="SKINUP" width={1152} height={576} className="h-auto w-[100px] object-contain md:w-[120px] lg:w-[140px]" />
          </Link>
        </div>

        <nav className="hidden min-w-0 items-center justify-center gap-5 lg:flex xl:gap-6">
          <Link to="/collection" search={{ filter: "best" as const }} className={navLinkClass}>
            {t("nav.best")}
          </Link>

          <div className="relative" onMouseEnter={openCollection} onMouseLeave={scheduleClose}>
            <button
              type="button"
              aria-expanded={collectionOpen}
              onClick={() => setCollectionOpen((v) => !v)}
              className={cn(navLinkClass, "gap-1 outline-none", collectionOpen && "text-foreground")}
            >
              {t("nav.collection")}
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", collectionOpen && "rotate-180")} />
              <span
                className={cn(
                  "absolute inset-x-0 -bottom-[3px] h-[2px] rounded-full bg-primary transition-opacity duration-200",
                  collectionOpen ? "opacity-100" : "opacity-0",
                )}
              />
            </button>

            {collectionOpen && (
              <div
                className="absolute start-0 top-full z-50 w-[264px] animate-fade-in border border-border/70 bg-card py-1.5 shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
                style={{ borderRadius: 3, marginTop: 10 }}
              >
                {collectionItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    search={item.search}
                    onClick={() => setCollectionOpen(false)}
                    className="block px-6 py-3 text-[13px] text-muted-foreground transition-colors hover:bg-surface hover:text-foreground data-[status=active]:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {rightLinks.map((item) => (
            <Link key={item.label} to={item.to} search={item.search} className={navLinkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-0 sm:gap-0.5">
          <button
            type="button"
            aria-label={t("nav.search")}
            onClick={() => setSearchOpen(true)}
            className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-surface"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <Link
            to="/commande"
            aria-label={t("nav.account")}
            className="hidden h-9 w-9 place-items-center rounded-full transition-colors hover:bg-surface sm:grid"
          >
            <User className="h-[18px] w-[18px]" />
          </Link>
          <Link
            to="/panier"
            aria-label={t("nav.cart")}
            className="relative grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-surface"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            {cart.count + pack.designs.length > 0 && (
              <span className="absolute -top-0.5 end-0 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {cart.count + pack.designs.length}
              </span>
            )}
          </Link>

          <div className="ms-1.5 flex items-center rounded-full border border-border p-0.5">
            {LANGS.map((l: Lang) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-label={LANG_LABELS[l]}
                aria-pressed={l === lang}
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase transition-colors",
                  l === lang ? "bg-ink text-ink-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder={t("search.placeholder")} />
        <CommandList>
          <CommandEmpty>{t("col.none")}</CommandEmpty>
          <CommandGroup heading={t("lens.nav")}>
            {CAMERA_LENS_SKINS.map((s) => (
              <CommandItem
                key={s.id}
                value={`${s.name.fr} ${s.name.en} ${s.name.ar}`}
                onSelect={() => {
                  setSearchOpen(false);
                  navigate({ to: "/objectifs/$slug", params: { slug: s.slug } });
                }}
              >
                <img src={s.image} alt="" loading="lazy" className="me-3 h-8 w-8 rounded-md object-contain" />
                {s.name[lang]}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading={t("anime.nav")}>
            {ANIME_SKINS.map((s) => (
              <CommandItem
                key={s.id}
                value={`${s.name.fr} ${s.name.en} ${s.name.ar}`}
                onSelect={() => {
                  setSearchOpen(false);
                  navigate({ to: "/anime/$slug", params: { slug: s.slug } });
                }}
              >
                <img src={s.image} alt="" loading="lazy" className="me-3 h-8 w-8 rounded-md object-contain" />
                {s.name[lang]}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading={t("air.nav")}>
            {IPHONE_AIR_SKINS.map((s) => (
              <CommandItem
                key={s.id}
                value={`${s.name.fr} ${s.name.en} ${s.name.ar}`}
                onSelect={() => {
                  setSearchOpen(false);
                  navigate({ to: "/iphone-air/$slug", params: { slug: s.slug } });
                }}
              >
                <img src={s.image} alt="" loading="lazy" className="me-3 h-8 w-8 rounded-md object-contain" />
                {s.name[lang]}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading={t("backlens.nav")}>
            {BACK_LENS_SKINS.map((s) => (
              <CommandItem
                key={s.id}
                value={`${s.name.fr} ${s.name.en} ${s.name.ar}`}
                onSelect={() => {
                  setSearchOpen(false);
                  navigate({ to: "/dos-camera/$slug", params: { slug: s.slug } });
                }}
              >
                <img src={s.image} alt="" loading="lazy" className="me-3 h-8 w-8 rounded-md object-contain" />
                {s.name[lang]}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading={t("skins.nav")}>
            {FULL_BODY_SKINS.map((s) => (
              <CommandItem
                key={s.id}
                value={`${s.name.fr} ${s.name.en} ${s.name.ar}`}
                onSelect={() => {
                  setSearchOpen(false);
                  navigate({ to: "/skins/$slug", params: { slug: s.slug } });
                }}
              >
                <img src={s.image} alt="" loading="lazy" className="me-3 h-8 w-8 rounded-md object-contain" />
                {s.name[lang]}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
