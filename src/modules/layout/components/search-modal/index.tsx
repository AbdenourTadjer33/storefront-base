"use client"

import { useEffect } from "react"
import { cn } from "@lib/util/utils"

import X from "@modules/common/icons/x"
import { useTranslations } from "next-intl"
import SearchBar from "../search-bar"

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: Props) {
  const t = useTranslations("components.search")

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-50",
        "bg-background/95 backdrop-blur-sm",
        "animate-in fade-in duration-200"
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="text-sm font-medium text-foreground">
            {t("title")}
          </span>
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-2 -me-2 rounded-full hover:bg-accent transition-colors"
          >
            <X className="h-5 w-5 text-foreground" strokeWidth={1.5} />
          </button>
        </div>

        {/* Search input */}
        <SearchBar className="p-4" autoFocus={true} />

        {/* Quick suggestions placeholder */}
        <div className="flex-1 px-4 py-2">
          <p className="text-sm text-muted-foreground">{t("hint")}</p>
        </div>
      </div>
    </div>
  )
}
