import { en } from "@/src/i18n/dictionaries/en";
import { ja } from "@/src/i18n/dictionaries/ja";
import { zh } from "@/src/i18n/dictionaries/zh";

export const locales = ["zh", "en", "ja"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "zh";
export const languageStorageKey = "app_language";

export const dictionaries = {
  zh,
  en,
  ja,
} as const;

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}.${P}`
    : never
  : never;

type LeafPaths<T> = T extends readonly string[]
  ? never
  : T extends object
    ? {
        [K in keyof T]-?: K extends string | number
          ? T[K] extends readonly string[]
            ? K
            : T[K] extends object
              ? Join<K, LeafPaths<T[K]>>
              : K
          : never;
      }[keyof T]
    : never;

export type I18nKey = LeafPaths<typeof zh>;

export function isLocale(value: string | null | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function getLanguageLabel(locale: Locale) {
  return dictionaries[defaultLocale].language[locale];
}
