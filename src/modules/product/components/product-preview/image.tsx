import { HttpTypes } from "@medusajs/types"
import Thumbnail, { ThumbnailSize } from "../thumbnail"
import { cn } from "@lib/util/utils"

interface Props {
  product: HttpTypes.StoreProduct
  size?: ThumbnailSize
  showSecondaryOnHover?: boolean
  className?: string
}

export default function ProductImage({
  product,
  size = "full",
  showSecondaryOnHover = true,
  className,
}: Props) {
  const primaryImg = product.thumbnail ?? product.images?.[0]?.url

  let secondaryImage: string | undefined | null

  if (product.images && product.images.length > 1) {
    const sortedImages = product.images.sort((a, b) => a.rank - b.rank)
    secondaryImage = sortedImages[1]?.url
  }

  const showSecondary = showSecondaryOnHover && secondaryImage

  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      <Thumbnail
        thumbnail={primaryImg}
        size={size}
        className={cn(
          "transition-opacity ease-out will-change-transform will-change-opacity",
          showSecondary && "group-hover:opacity-0 "
        )}
      />
      {showSecondary && (
        <>
          <Thumbnail
            thumbnail={secondaryImage}
            size={size}
            className={cn(
              "opacity-0 group-hover:opacity-100 absolute inset-0 duration-300 transition-opacity ease-out",
              "will-change-transform will-change-opacity backface-hidden"
            )}
          />
        </>
      )}
    </div>
  )
}
