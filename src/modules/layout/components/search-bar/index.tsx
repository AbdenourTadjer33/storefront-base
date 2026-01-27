"use client"

import { useState, useCallback } from "react"
import { cn } from "@lib/util/utils"

import Search from "@modules/common/icons/search"
import { useTranslations } from "next-intl"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@components/ui/input-group"

interface Props {
  autoFocus?: boolean
  className?: string
}

export default function SearchBar({ className, autoFocus }: Props) {
  const t = useTranslations("components.search")
  const [query, setQuery] = useState("")

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
    },
    [query]
  )

  return (
    <form onSubmit={handleSubmit} className={cn(className)}>
      <InputGroup className="h-10">
        <InputGroupInput
          placeholder={t("placeholder")}
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="search"
          autoFocus={autoFocus}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="submit"
            variant="ghost"
            size="sm"
            className="cursor-pointer"
          >
            <Search className="size-4 text-muted-foreground" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}
