import { VariantProps } from "../types"
import ProductPrice from "../../product-price"
import ProductBadges from "../../product-badges"
import { metadata } from "@lib/util/get-product-metadata"
import { getProductPrice } from "@lib/util/get-product-price"
import ProductImage from "../image"

export function CompactVariant({ product }: VariantProps) {
  const m = product.metadata

  const { cheapestPrice } = getProductPrice({ product })

  const hasDiscount = cheapestPrice?.price_type == "sale"

  return (
    <>
      <div className="relative overflow-hidden rounded-lg">
        <ProductImage
          product={product}
          size="square"
          showSecondaryOnHover
          className="transition-transform duration-300 group-hover:scale-[1.02]"
        />

        <div className="absolute start-1 top-1 z-10">
          <ProductBadges
            isBestseller={metadata("badges.isBestseller", m, false)}
            isNew={metadata("badges.isBestseller", m, false)}
            isLimited={metadata("badges.isLimited", m, false)}
            discountPercentage={
              hasDiscount ? cheapestPrice?.percentage_diff : undefined
            }
          />
        </div>
      </div>

      <div className="mt-2 space-y-1">
        <h3 className="text-sm font-medium text-foreground">{product.title}</h3>

        <ProductPrice
          product={product}
          size="sm"
          showDiscountBadge={false}
          className="gap-2"
        />
      </div>
    </>
  )
}
