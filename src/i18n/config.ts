export const i18nConfig = {
  locales: ["fr", "ar"], // Enable only what you need
  defaultLocale: "fr",

  // Optional: locale-specific settings
  localeConfigs: {
    en: { name: "English", dir: "ltr" },
    fr: { name: "Français", dir: "ltr" },
    ar: { name: "العربية", dir: "rtl" },
  },

  /**
   * @description URL strategy: 'prefix' or 'prefix-except-default'
   * 
   * 'prefix' -> all locales in URL (/en/products, /fr/products)
   * 'prefix-except-default' -> default locale without prefix (/products, /fr/products)
   */
  // urlStrategy: "prefix-except-default" as const,

  // Cookie name for storing user's locale preference
  localeCookieName: "NEXT_LOCALE",

  // Cookie expiry (in days)
  localeCookieExpiry: 365,

  // Locale detection priority
  // detectionOrder: ["cookie", "header", "default"] as const,

  // Namespaces available (for type safety and validation)
  // namespaces: ["common"] as const,

  // Enable locale in URL or use cookie/header only
  localeInUrl: false,
} as const

export type Locale = (typeof i18nConfig.locales)[number]
export type I18nConfig = typeof i18nConfig
// export type DetectionMethod = (typeof i18nConfig.detectionOrder)[number]

// Helper to check if a string is a valid locale
export function isValidLocale(locale: string): locale is Locale {
  return i18nConfig.locales.includes(locale as Locale)
}

// Get locale display name
export function getLocaleDisplayName(locale: Locale): string {
  return i18nConfig.localeConfigs[locale]?.name || locale
}

// Get text direction for locale
export function getLocaleDir(locale: string): "ltr" | "rtl" {
  // @ts-ignore
  return i18nConfig.localeConfigs[locale]?.dir || "ltr"
}
