"use client"

import { cn } from "@lib/util/utils"
import { HttpTypes } from "@medusajs/types"
import { useCallback, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import ChevronLeft from "@modules/common/icons/chevron-left"
import ChevronRight from "@modules/common/icons/chevron-right"
import ZoomIn from "@modules/common/icons/zoom-in"
import Thumbnail from "../thumbnail"

interface ImageGalleryProps {
  images: HttpTypes.StoreProductImage[]
  thumbnail?: string | null
  productTitle: string
  layout?: "horizontal" | "vertical" | "grid" | "carousel"
  showThumbnails?: boolean
  enableZoom?: boolean
  className?: string
}

const placeholderImage = "/placeholder.svg"

export default function ProductImageGallery({
  images,
  thumbnail,
  productTitle,
  layout = "horizontal",
  showThumbnails = true,
  enableZoom = true,
  className,
}: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  // Build image list with fallbacks
  const imageList =
    images.length > 0
      ? images.sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0))
      : thumbnail
      ? [{ id: "thumb", url: thumbnail, rank: 0 }]
      : [{ id: "placeholder", url: placeholderImage, rank: 0 }]

  const currentImage = imageList[activeIndex]

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % imageList.length)
  }, [imageList.length])

  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + imageList.length) % imageList.length)
  }, [imageList.length])

  const handleThumbnailClick = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  const toggleZoom = useCallback(() => {
    if (enableZoom) {
      setIsZoomed((prev) => !prev)
    }
  }, [enableZoom])

  // Vertical layout (thumbnails on left)
  if (layout === "vertical") {
    return (
      <div className={cn("flex gap-4", className)} dir="ltr">
        {showThumbnails && imageList.length > 1 && (
          <div className="flex flex-col gap-2 w-20">
            {imageList.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => handleThumbnailClick(idx)}
                // className={cn(
                //   "gallery-thumbnail w-full  overflow-hidden",
                //   idx === activeIndex && "gallery-thumbnail-active"
                // )}
                className={cn(
                  "gallery-thumbnail",
                  idx === activeIndex && "gallery-thumbnail-active"
                )}
                aria-label={`View image ${idx + 1}`}
              >
                <Thumbnail thumbnail={img.url} size="square" />
                {/* <img
                  src={img.url}
                  alt={`${productTitle} - Image ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                /> */}
              </button>
            ))}
          </div>
        )}

        {/* <div className="flex-1 relative aspect-3/4 bg-muted rounded-sm overflow-hidden"> */}
        <Thumbnail thumbnail={currentImage.url} size="square" />
        {/* <AnimatePresence mode="wait">
            <motion.img
              key={currentImage.id}
              src={currentImage.url}
              alt={productTitle}
              className={cn(
                "w-full h-full object-cover transition-transform duration-300",
                isZoomed && "scale-150 cursor-zoom-out",
                !isZoomed && enableZoom && "cursor-zoom-in"
              )}
              onClick={toggleZoom}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence> */}

        {/* {enableZoom && (
            <button
              onClick={toggleZoom}
              className="absolute bottom-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 hover:opacity-100 transition-opacity"
              aria-label="Toggle zoom"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          )} */}
        {/* </div> */}
      </div>
    )
  }

  // Grid layout
  if (layout === "grid") {
    return (
      <div
        className={cn(
          "grid grid-cols-2 gap-2",
          imageList.length === 1 && "grid-cols-1",
          className
        )}
      >
        {imageList.slice(0, 4).map((img, idx) => (
          <motion.div
            key={img.id}
            className={cn(
              "relative aspect-square bg-muted rounded-sm overflow-hidden",
              idx === 0 && imageList.length > 1 && "col-span-2 aspect-4/3"
            )}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={img.url}
              alt={`${productTitle} - Image ${idx + 1}`}
              className="w-full h-full object-cover"
              loading={idx === 0 ? "eager" : "lazy"}
            />
          </motion.div>
        ))}
      </div>
    )
  }

  // Carousel layout (mobile-optimized)
  if (layout === "carousel") {
    return (
      <div className={cn("relative", className)}>
        <div className="relative aspect-square bg-muted rounded-sm overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage.id}
              src={currentImage.url}
              alt={productTitle}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence>

          {imageList.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-product-md"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 flip-rtl" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-product-md"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 flip-rtl" />
              </button>
            </>
          )}
        </div>

        {/* Dots indicator */}
        {imageList.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {imageList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleThumbnailClick(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  idx === activeIndex
                    ? "bg-foreground w-6"
                    : "bg-foreground/20 hover:bg-foreground/40"
                )}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  // Default: Horizontal layout (thumbnails below)
  return (
    <div className={cn("space-y-4", className)}>
      <div className="relative aspect-4/5 bg-muted rounded-sm overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage.id}
            src={currentImage.url}
            alt={productTitle}
            className={cn(
              "w-full h-full object-cover transition-transform duration-300",
              isZoomed && "scale-150 cursor-zoom-out",
              !isZoomed && enableZoom && "cursor-zoom-in"
            )}
            onClick={toggleZoom}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>

        {imageList.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-product-md hover:bg-background transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 flip-rtl" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-product-md hover:bg-background transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 flip-rtl" />
            </button>
          </>
        )}
      </div>

      {showThumbnails && imageList.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {imageList.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => handleThumbnailClick(idx)}
              className={cn(
                "gallery-thumbnail shrink-0",
                idx === activeIndex && "gallery-thumbnail-active"
              )}
              aria-label={`View image ${idx + 1}`}
            >
              <img
                src={img.url}
                alt={`${productTitle} - Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
