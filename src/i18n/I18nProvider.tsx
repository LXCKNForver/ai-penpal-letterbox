"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultLocale,
  dictionaries,
  isLocale,
  languageStorageKey,
  type I18nKey,
  type Locale,
} from "@/src/i18n/config";

type TranslateParams = Record<string, string | number>;

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: I18nKey, params?: TranslateParams) => string;
  tArray: (key: I18nKey) => readonly string[];
};

export const I18nContext = createContext<I18nContextValue | null>(null);

function readPath(source: unknown, key: string) {
  return key.split(".").reduce<unknown>((current, segment) => {
    if (current && typeof current === "object" && segment in current) {
      return (current as Record<string, unknown>)[segment];
    }

    return undefined;
  }, source);
}

function interpolate(value: string, params?: TranslateParams) {
  if (!params) return value;

  return Object.entries(params).reduce(
    (text, [key, replacement]) => text.replaceAll(`{${key}}`, String(replacement)),
    value
  );
}

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;

  const stored = window.localStorage.getItem(languageStorageKey);

  return isLocale(stored) ? stored : defaultLocale;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(languageStorageKey, nextLocale);
    document.documentElement.lang =
      nextLocale === "zh" ? "zh-CN" : nextLocale === "ja" ? "ja-JP" : "en";
  }, []);

  useEffect(() => {
    document.documentElement.lang =
      locale === "zh" ? "zh-CN" : locale === "ja" ? "ja-JP" : "en";
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => {
    function t(key: I18nKey, params?: TranslateParams) {
      const translated = readPath(dictionaries[locale], key);
      const fallback = readPath(dictionaries[defaultLocale], key);
      const value = typeof translated === "string" ? translated : fallback;

      return interpolate(typeof value === "string" ? value : key, params);
    }

    function tArray(key: I18nKey) {
      const translated = readPath(dictionaries[locale], key);
      const fallback = readPath(dictionaries[defaultLocale], key);

      if (Array.isArray(translated)) return translated;
      if (Array.isArray(fallback)) return fallback;

      return [];
    }

    return { locale, setLocale, t, tArray };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
