import storeConfig from "@lib/store-config"
import { HttpTypes } from "@medusajs/types"
import { VariantProps } from "./types"
import { ClassicVariant, CompactVariant } from "./variants"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { cn } from "@lib/util/utils"

interface ProductPreviewProps {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}

/**
 * We should determine the variant to display here.
 */
export default function ProductPreview({ product }: ProductPreviewProps) {
  const variant = storeConfig.productPreviewVariant

  const props: VariantProps = {
    product: product,
    showSecondaryImageOnHover: true,
  }

  let Comp: React.ReactNode

  switch (variant) {
    case "compact":
      Comp = <CompactVariant {...props} />
      break
    case "classic":
    default:
      Comp = <ClassicVariant {...props} />
      break
  }

  return (
    <LocalizedClientLink href={`/products/${product.handle}`}>
      <article
        className={cn("group relative cursor-pointer transition-all")}
        role="button"
        tabIndex={0}
        aria-label={`View ${product.title}`}
        data-testid="product-wrapper"
      >
        {Comp}
      </article>
    </LocalizedClientLink>
  )
}
