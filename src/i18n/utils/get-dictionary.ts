import type { Locale } from "../config"

// Namespace types for better DX
export type Namespace = "common"
// | 'product' | 'checkout' | 'auth';

const dictionaries: Record<Locale, Record<Namespace, () => Promise<any>>> = {
  en: {
    common: () => import("../locales/en/common.json").then((m) => m.default),
    // product: () => import('../locales/en/product.json').then(m => m.default),
    // checkout: () => import('../locales/en/checkout.json').then(m => m.default),
    // auth: () => import('../locales/en/auth.json').then(m => m.default),
  },
  fr: {
    common: () => import("../locales/fr/common.json").then((m) => m.default),
    // product: () => import('../locales/fr/product.json').then(m => m.default),
    // checkout: () => import('../locales/fr/checkout.json').then(m => m.default),
    // auth: () => import('../locales/fr/auth.json').then(m => m.default),
  },
  ar: {
    common: () => import("../locales/ar/common.json").then((m) => m.default),
    // product: () => import('../locales/ar/product.json').then(m => m.default),
    // checkout: () => import('../locales/ar/checkout.json').then(m => m.default),
    // auth: () => import('../locales/ar/auth.json').then(m => m.default),
  },
}

export async function getDictionary(
  locale: Locale,
  namespace: Namespace = "common"
) {
  return dictionaries[locale][namespace]()
}

// Load multiple namespaces at once
export async function getDictionaries(locale: Locale, namespaces: Namespace[]) {
  const dicts = await Promise.all(
    namespaces.map((ns) => getDictionary(locale, ns))
  )

  return namespaces.reduce((acc, ns, index) => {
    acc[ns] = dicts[index]
    return acc
  }, {} as Record<Namespace, any>)
}
