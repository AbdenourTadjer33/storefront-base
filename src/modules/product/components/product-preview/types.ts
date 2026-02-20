import { HttpTypes } from "@medusajs/types"



export interface VariantProps {
  product: HttpTypes.StoreProduct
  showSecondaryImageOnHover?: boolean

  footerSlot?: React.ReactNode
  ratingSlot?: React.ReactNode
}
