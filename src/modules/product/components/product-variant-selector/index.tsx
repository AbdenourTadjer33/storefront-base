"use client"

import { cn } from "@lib/util/utils"
import { HttpTypes } from "@medusajs/types"
import { OptionSelect } from "./option-select"
import { useTranslations } from "next-intl"

interface ProductVariantSelectorProps {
  options: HttpTypes.StoreProductOption[]

  selectedOptions: Record<string, string>
  onSelectOption: (optionId: string, value: string) => void

  disabled: boolean

  onClearOption?: (optionId: string) => void
  onClearAll?: () => void
  isOptionValueAvailable: (optionId: string, value: string) => boolean

  layout?: "default" | "inline" | "stacked"
  showClearButton?: boolean
  className?: string
}

export default function ProductVariantSelector({
  options,
  selectedOptions,
  onSelectOption,
  disabled,
  onClearOption,
  onClearAll,
  isOptionValueAvailable,
  layout = "default",
  showClearButton = true,
  className,
}: ProductVariantSelectorProps) {
  const t = useTranslations("components.product-variant-selector")

  if (!options || options.length == 0) {
    return null
  }

  const hasSelections = Object.keys(selectedOptions).length > 0

  return (
    <div className={cn("space-y-6", className)}>
      {options.map((option) => (
        <OptionSelect
          key={option.id}
          option={option}
          current={selectedOptions[option.id]}
          updateOption={onSelectOption}
          disabled={disabled}
          isOptionValueAvailable={isOptionValueAvailable}
          showClearButton={showClearButton}
          onClearOption={onClearOption}
          layout={layout}
        />
      ))}

      {showClearButton && hasSelections && onClearAll && (
        <button
          onClick={onClearAll}
          className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
        >
          {t("clear-all-selections")}
        </button>
      )}
    </div>
  )
}
