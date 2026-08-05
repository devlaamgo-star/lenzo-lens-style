import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import logo from "@/assets/lenzo-logo.png";
import { useI18n } from "@/lib/i18n";
import { usePack } from "@/lib/pack";
import { DESIGNS, PACK_SIZE } from "@/lib/catalog";
import { LANGS, type Lang } from "@/lib/translations";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  "text-sm font-medium text-foreground/80 transition-colors hover:text-primary data-[status=active]:text-primary";

export function SiteHeader() {
  const { t, lang, setLang, dir } = useI18n();
  const pack = usePack();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const collectionItems = [
    { to: "/collection" as const, search: {}, label: t("menu.all") },
    { to: "/collection" as const, search: { collection: "minimal" }, label: t("menu.minimal") },
    { to: "/collection" as const, search: { collection: "artistique" }, label: t("menu.artistic") },
    { to: "/collection" as const, search: { collection: "elegance" }, label: t("menu.premium") },
    { to: "/collection" as const, search: { filter: "new" }, label: t("nav.new") },
    { to: "/collection" as const, search: { filter: "best" }, label: t("nav.best") },
  ];

  const mainLinks = [
    { to: "/" as const, label: t("nav.home"), search: undefined },
    { to: "/collection" as const, label: t("nav.new"), search: { filter: "new" } },
    { to: "/collection" as const, label: t("nav.best"), search: { filter: "best" } },
    { to: "/comment-ca-marche" as const, label: t("nav.how"), search: undefined },
    { to: "/avis" as const, label: t("nav.reviews"), search: undefined },
    { to: "/faq" as const, label: t("nav.faq"), search: undefined },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur transition-shadow",
        scrolled ? "border-border shadow-soft" : "border-transparent",
      )}
    >
      <div className="container-page grid h-16 grid-cols-[auto_1fr_auto] items-center gap-3 lg:h-[72px]">
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
                <img src={logo} alt="LENZO" width={1152} height={576} className="h-6 w-auto" />
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
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium hover:bg-surface"
                >
                  {t("nav.home")}
                </Link>
                <p className="px-3 pt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("nav.collection")}
                </p>
                {collectionItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    search={item.search}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-base font-medium hover:bg-surface"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="my-2 h-px bg-border" />
                {mainLinks.slice(3).map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
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
            <img
              src={logo}
              alt="LENZO"
              width={1152}
              height={576}
              className="h-6 w-auto sm:h-7"
            />
          </Link>
        </div>

        <nav className="hidden min-w-0 items-center justify-center gap-6 lg:flex">
          <Link to="/" className={navLinkClass} activeOptions={{ exact: true }}>
            {t("nav.home")}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(navLinkClass, "inline-flex items-center gap-1 outline-none")}>
              {t("nav.collection")}
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56">
              {collectionItems.map((item) => (
                <DropdownMenuItem key={item.label} asChild>
                  <Link to={item.to} search={item.search} className="cursor-pointer">
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {mainLinks.slice(1).map((item) => (
            <Link key={item.label} to={item.to} search={item.search} className={navLinkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-0.5 sm:gap-1">
          <button
            type="button"
            aria-label={t("nav.search")}
            onClick={() => setSearchOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-surface"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            to="/commande"
            aria-label={t("nav.account")}
            className="hidden h-10 w-10 place-items-center rounded-full transition-colors hover:bg-surface sm:grid"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            to="/pack"
            aria-label={t("nav.cart")}
            className="relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-surface"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-0.5 end-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
              {pack.designs.length}/{PACK_SIZE}
            </span>
          </Link>
          <div className="ms-1 flex items-center rounded-full border border-border p-0.5">
            {LANGS.map((l: Lang) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={cn(
                  "rounded-full px-2 py-1 text-[11px] font-semibold uppercase transition-colors",
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
          <CommandGroup heading={t("col.title")}>
            {DESIGNS.map((d) => (
              <CommandItem
                key={d.id}
                value={`${d.name.fr} ${d.name.en} ${d.name.ar}`}
                onSelect={() => {
                  setSearchOpen(false);
                  pack.add(d.id);
                }}
              >
                <img src={d.image} alt="" loading="lazy" className="me-3 h-8 w-8 rounded-md object-cover" />
                {d.name[lang]}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
