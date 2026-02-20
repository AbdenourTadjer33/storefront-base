import { getProductPrice } from "@lib/util/get-product-price"
import { cn } from "@lib/util/utils"
import { HttpTypes } from "@medusajs/types"

interface ProductPriceProps {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant

  size?: "sm" | "md" | "lg" | "xl"
  layout?: "inline" | "stacked"
  showDiscountBadge?: boolean
  className?: string
}

const sizeClasses = {
  sm: {
    current: "text-sm font-semibold",
    original: "text-xs!",
    badge: "text-xs px-1.5 py-0.5",
  },
  md: {
    current: "text-xl md:text-2xl font-medium",
    original: "text-base",
    badge: "text-xs px-2 py-0.5",
  },
  lg: {
    current: "text-2xl md:text-3xl font-medium",
    original: "text-lg",
    badge: "text-sm px-2 py-1",
  },
  xl: {
    current: "text-3xl md:text-4xl font-semibold",
    original: "text-xl",
    badge: "text-sm px-2.5 py-1",
  },
}

export default function ProductPrice({
  product,
  variant,
  size = "lg",
  layout = "inline",
  showDiscountBadge = true,
  className,
}: ProductPriceProps) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className={cn("h-8 w-32 bg-muted animate-pulse rounded")} />
  }

  const styles = sizeClasses[size]

  const hasDiscount = selectedPrice.price_type === "sale"

  return (
    <div
      className={cn(
        "flex items-baseline gap-3",
        layout === "stacked" && "flex-col items-start gap-1",
        className
      )}
    >
      <span
        key={selectedPrice.calculated_price_number}
        className={cn(
          "font-display",
          styles.current,
          hasDiscount ? "price-sale" : "price-current"
        )}
        // initial={{ opacity: 0, y: 10 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.2 }}
      >
        {selectedPrice.calculated_price}
      </span>

      {hasDiscount && selectedPrice.original_price_number && (
        <span
          className={cn("price-compare", styles.original)}
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          // transition={{ duration: 0.2, delay: 0.1 }}
        >
          {selectedPrice.original_price}
        </span>
      )}

      {hasDiscount && showDiscountBadge && selectedPrice.percentage_diff && (
        <span
          className={cn("badge-sale rounded-sm", styles.badge)}
          // initial={{ opacity: 0, scale: 0.8 }}
          // animate={{ opacity: 1, scale: 1 }}
          // transition={{ duration: 0.2, delay: 0.15 }}
        >
          -{selectedPrice.percentage_diff}%
        </span>
      )}
    </div>
  )
}
