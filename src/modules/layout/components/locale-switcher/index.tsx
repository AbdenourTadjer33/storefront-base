import { useLocale, useTranslations } from "next-intl"
import LocaleSwitcherSelect from "./locale-switcher-select"
import { i18nConfig } from "@i18n/config"

import { Locale } from "@lib/data/locales"
import { SelectItem } from "@components/ui/select"

export default function LocaleSwitcher({
  locales,
}: {
  locales: Locale[] | null
}) {
  const t = useTranslations("components.locale-switcher")
  const locale = useLocale()

  return (
    <LocaleSwitcherSelect
      locales={locales}
      defaultValue={locale}
      label={t("label")}
    >
      {i18nConfig.locales.map((locale) => (
        <SelectItem key={locale} value={locale}>
          {i18nConfig.localeConfigs[locale].name}
        </SelectItem>
      ))}
    </LocaleSwitcherSelect>
  )
}
