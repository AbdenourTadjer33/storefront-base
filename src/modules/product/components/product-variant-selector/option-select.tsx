"use client"

import { getColorValue, isColorOption } from "@lib/util/product-option"
import { cn } from "@lib/util/utils"
import { HttpTypes } from "@medusajs/types"
import { motion } from "framer-motion"

import X from "@modules/common/icons/x"
import React from "react"
import { useTranslations } from "next-intl"

interface OptionButtonProps {
  value: HttpTypes.StoreProductOptionValue
  isSelected: boolean
  isAvailable: boolean
  isColor: boolean
  colorHex: string | null
  onSelect: () => void
}

function OptionButton({
  value,
  isSelected,
  isAvailable,
  isColor,
  colorHex,
  onSelect,
}: OptionButtonProps) {
  if (isColor && colorHex) {
    return (
      <motion.button
        type="button"
        onClick={onSelect}
        disabled={!isAvailable}
        className={cn(
          "color-swatch relative",
          isSelected && "color-swatch-selected",
          !isAvailable && "opacity-40 cursor-not-allowed"
        )}
        style={{ backgroundColor: colorHex }}
        whileHover={isAvailable ? { scale: 1.1 } : undefined}
        whileTap={isAvailable ? { scale: 0.95 } : undefined}
        aria-label={`Select ${value.value}`}
        aria-pressed={isSelected}
      >
        {!isAvailable && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-full h-0.5 bg-foreground/50 rotate-45 absolute" />
          </span>
        )}
      </motion.button>
    )
  }

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      disabled={!isAvailable}
      className={cn(
        "option-button",
        isSelected && "option-button-selected",
        !isAvailable && "option-button-disabled"
      )}
      whileHover={isAvailable ? { scale: 1.02 } : undefined}
      whileTap={isAvailable ? { scale: 0.98 } : undefined}
      aria-label={`Select ${value.value}`}
      aria-pressed={isSelected}
    >
      {value.value}
    </motion.button>
  )
}

interface OptionSelectProps {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (optionId: string, value: string) => void
  disabled: boolean
  isOptionValueAvailable: (optionId: string, value: string) => boolean
  showClearButton?: boolean
  onClearOption?: (optionId: string) => void
  layout?: "default" | "inline" | "stacked"
  className?: string
}

export function OptionSelect({
  option,
  current,
  updateOption,
  disabled,
  isOptionValueAvailable,
  showClearButton = true,
  onClearOption,
  layout = "default",
}: OptionSelectProps) {
  const t = useTranslations("components.product-variant-selector")

  const isColor = isColorOption(option.title)
  const values = option.values ?? []

  return (
    <div className={cn("space-y-3")}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {option.title}
          {current && (
            <span className="ml-2 text-foreground normal-case tracking-normal">
              — {current}
            </span>
          )}
        </label>

        {showClearButton && current && onClearOption && (
          <button
            onClick={() => onClearOption(option.id)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            aria-label={`Clear ${option.title} selection`}
          >
            <X className="w-3 h-3" />
            {t("clear")}
          </button>
        )}
      </div>

      <div
        className={cn(
          "flex flex-wrap gap-2",
          layout === "stacked" && "flex-col",
          layout === "inline" && "gap-3"
        )}
      >
        {values.map((v) => {
          const isSelected = current === v.value
          const isAvailable = isOptionValueAvailable(option.id, v.value)
          const colorHex = isColor ? getColorValue(v.value, v.metadata) : null

          return (
            <OptionButton
              key={v.id}
              value={v}
              isSelected={isSelected}
              isAvailable={isAvailable}
              isColor={isColor}
              colorHex={colorHex}
              onSelect={() => updateOption(option.id, v.value)}
            />
          )
        })}
      </div>
    </div>
  )
}
