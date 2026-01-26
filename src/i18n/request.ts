import { getRequestConfig } from "next-intl/server"
import { i18nConfig, isValidLocale } from "./config"
import { cookies } from "next/headers"

export default getRequestConfig(async () => {
  let locale = (await cookies()).get(i18nConfig.localeCookieName)?.value

  if (!locale || !isValidLocale(locale)) {
    locale = i18nConfig.defaultLocale
  }

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  }
})
