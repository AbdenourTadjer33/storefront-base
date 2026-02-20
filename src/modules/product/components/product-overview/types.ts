import { HttpTypes } from "@medusajs/types"
import React from "react"

export type ProductOverviewDesignVariant =
  | "classic"
  | "centered"
  | "sticky-actions"
  | "editorial"
  | "compact"

export interface VariantProps {
  dir: "ltr" | "rtl"
  product: HttpTypes.StoreProduct
  images: HttpTypes.StoreProductImage[]
  region: HttpTypes.StoreRegion
  countryCode: string

  /**
   * @deprecated use productHeaderSlot instead.
   */
  ProductHeader?: React.ReactNode

  /**
   * @deprecated use secondaryActionsSlot instead.
   */
  SecondaryActions?: React.ReactNode

  headerSlot?: React.ReactNode
  productHeaderSlot: React.ReactNode
  secondaryActionsSlot?: React.ReactNode

  productActionsWrapper: React.ReactNode

  // selectedVariant: HttpTypes.StoreProductVariant | undefined
  // selectedOptions: Record<string, string>
  // selectOption: (optionId: string, value: string) => void
  // clearOption: (optionId: string) => void
  // clearAllOptions: () => void

  // isOptionValueAvailable: (optionId: string, value: string) => boolean

  // priceInfo: ReturnType<typeof useProductVariant>["priceInfo"]
  // inventoryInfo: ReturnType<typeof useProductVariant>["inventoryInfo"]

  // handleAddToCart: () => void
  // handleBuyNow: () => void

  // isAddingToCart: boolean
  // isBuyingNow: boolean
  // isComplete: boolean

  // features?: string[]
  // careInstructions?: string
  // warranty?: string

  // afterPriceSlot?: React.ReactNode
  afterActionsSlot?: React.ReactNode
  footerSlot?: React.ReactNode
  className?: string
}
