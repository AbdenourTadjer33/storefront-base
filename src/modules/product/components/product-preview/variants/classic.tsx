import { VariantProps } from "../types"
import ProductPrice from "../../product-price"
import ProductBadges from "../../product-badges"
import { metadata } from "@lib/util/get-product-metadata"
import { getProductPrice } from "@lib/util/get-product-price"
import ProductImage from "../image"

export function ClassicVariant({ product }: VariantProps) {
  const m = product.metadata

  const { cheapestPrice } = getProductPrice({ product })

  const hasDiscount = cheapestPrice?.price_type == "sale"

  return (
    <>
      <div className="relative overflow-hidden rounded-lg">
        <ProductImage
          product={product}
          size="full"
          showSecondaryOnHover
          className="transition-transform duration-300 group-hover:scale-105"
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

      <div className="mt-3 space-y-1.5">
        <h3 className="text-sm font-medium text-foreground line-clamp-2 transition-colors">
          {product.title}
        </h3>

        <ProductPrice
          product={product}
          size="sm"
          layout="inline"
          showDiscountBadge={false}
          className="gap-2"
        />
      </div>
    </>
  )
}
