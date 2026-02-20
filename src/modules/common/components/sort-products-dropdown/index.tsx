"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select"
import { getLocaleDir } from "@i18n/config"
import { useQueryParams } from "@lib/hooks/use-query-params"
import { useLocale, useTranslations } from "next-intl"
import { useMemo } from "react"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

interface Props {
  sortBy: SortOptions
}

export function SortProductsDropdown({ sortBy }: Props) {
  const t = useTranslations("components.sort-products")
  const locale = useLocale()

  const { queryParams, setQueryParams } = useQueryParams()

  const items = useMemo(
    () => [
      {
        value: "created_at",
        label: t("created_at"),
      },
      {
        value: "price_asc",
        label: t("price_asc"),
      },
      {
        value: "price_desc",
        label: t("price_desc"),
      },
    ],
    [locale]
  )

  const handleChange = (value: string) => {
    setQueryParams("sortBy", value)
  }

  return (
    <Select
      dir={getLocaleDir(locale)}
      value={queryParams.get("sortBy") ?? "created_at"}
      onValueChange={handleChange}
    >
      <SelectTrigger className="max-w-37.5">
        <SelectValue placeholder={t("sort-by")} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t("sort-by")}</SelectLabel>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
