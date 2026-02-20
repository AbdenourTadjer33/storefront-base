import { cn } from "@lib/util/utils"
import { HttpTypes } from "@medusajs/types"
import PlaceholderImage from "@modules/common/icons/placeholder-image"
import Image from "next/image"

export type ThumbnailSize = "small" | "medium" | "large" | "full" | "square"

interface Props {
  thumbnail?: string | null
  images?: HttpTypes.StoreProductImage[] | null
  size?: ThumbnailSize
  className?: string
  "data-testid"?: string
}

export default function Thumbnail({
  thumbnail,
  images,
  size,
  className,
  "data-testid": dataTestid,
}: Props) {
  const initialImage = thumbnail || images?.[0]?.url

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden p-4 rounded-lg transition-shadow ease-in-out duration-150",
        size !== "square" && "aspect-9/14",
        size === "small" && "w-[180px]",
        size === "medium" && "w-[290px]",
        size === "large" && "w-[440px]",
        size === "square" && "aspect-square",
        size === "full" && "w-full",
        className
      )}
      data-tesstid={dataTestid}
    >
      <ImageOrPlaceholder image={initialImage} size={size} />
    </div>
  )
}

function ImageOrPlaceholder({
  image,
  size,
}: Pick<Props, "size"> & { image?: string }) {
  return image ? (
    <Image
      src={image}
      alt="thumbnail"
      className="absolute inset-0 object-cover object-center"
      draggable={false}
      quality={50}
      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
      fill
    />
  ) : (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center">
      <PlaceholderImage size={size === "small" ? 16 : 24} />
    </div>
  )
}
