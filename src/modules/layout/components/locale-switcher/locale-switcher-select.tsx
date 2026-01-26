"use client"

import { ReactNode, useTransition } from "react"
import { Locale } from "@lib/data/locales"
import { useRouter } from "next/navigation"
import { setLocaleCodeCookie, updateLocale } from "@lib/data/locale-actions"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select"
import { getLocaleDir } from "@i18n/config"

type Props = {
  children: ReactNode
  locales: Locale[] | null
  defaultValue: string
  label: string
}

export default function LocaleSwitcherSelect({
  children,
  locales,
  defaultValue,
  label,
}: Props) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function onSelectChange(nextLocale: string) {
    let locale: string | undefined

    if (locales && locales.length > 0) {
      locale = locales.find(({ code }) => code.startsWith(nextLocale))?.code
    }

    startTransition(async () => {
      setLocaleCodeCookie(nextLocale)

      if (locale) {
        await updateLocale(locale)
      }

      router.refresh()
    })
  }

  return (
    <Select
      dir={getLocaleDir(defaultValue)}
      defaultValue={defaultValue}
      disabled={isPending}
      onValueChange={onSelectChange}
    >
      <SelectTrigger className="w-25">
        <SelectValue placeholder="Locale" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {children}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
