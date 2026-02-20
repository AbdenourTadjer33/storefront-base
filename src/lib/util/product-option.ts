import { colorMap } from "@lib/constants"
import { HttpTypes } from "@medusajs/types"

export function isOptionValueAvailable(
  product: HttpTypes.StoreProduct,
  options: Record<string, string>,
  optionId: string,
  value: string
) {
  const testSelection = {...options, [optionId]: value};
  const matchingVariants = getAvailableVariantsForSelection(product, testSelection);
  return matchingVariants.some((variant) => {
    if (!variant.manage_inventory) return true;
    if (variant.allow_backorder) return true;
    return (variant.inventory_quantity ?? 0) > 0
  })
}

function getAvailableVariantsForSelection(
  product: HttpTypes.StoreProduct,
  partialSelection: Record<string, string>
) {
  return (product.variants ?? []).filter((variant) => {
    const variantOptions = variant.options ?? []
    return Object.entries(partialSelection).every(([optId, value]) => {
      return variantOptions.some(
        (vo) => vo.option_id === optId && vo.value === value
      )
    })
  })
}

export function isColorOption(optionTitle: string): boolean {
  const colorKeywords = ["color", "colour", "farbe", "couleur", "colore"]
  return colorKeywords.some((kw) => optionTitle.toLowerCase().includes(kw))
}

export function getColorValue(
  value: string,
  metadata?: Record<string, unknown> | null
): string | null {
  // Check metadata first for explicit hex value
  if (metadata?.colorHex && typeof metadata.colorHex === "string") {
    return metadata.colorHex
  }

  // Try to match by name
  const normalized = value.toLowerCase().trim()
  return colorMap[normalized] || null
}
