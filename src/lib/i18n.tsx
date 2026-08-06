import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LANGS, translate, type Lang, type TKey } from "./translations";

type I18nValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  t: (key: TKey) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

const STORAGE_KEY = "lenzo-lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (LANGS as string[]).includes(stored)) {
      setLangState(stored as Lang);
    }
  }, []);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      setLang,
      t: (key: TKey) => translate(lang, key),
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

const FALLBACK: I18nValue = {
  lang: "fr",
  dir: "ltr",
  setLang: () => {},
  t: (key: TKey) => translate("fr", key),
};

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  // Fall back to French instead of crashing if a component renders outside the provider
  return ctx ?? FALLBACK;
}

export type { Lang };
