"use client"

import { motion } from "framer-motion"
import { VariantProps } from "../types"
import { cn } from "@lib/util/utils"
import ProductImageGallery from "../../product-image-gallery"
import ProductPrice from "../../product-price"
import ProductVariantSelector from "../../product-variant-selector"
import ProductDetailsAccordion from "../../product-details-accordion"
import { useMemo, useState } from "react"
import ChevronUp from "@modules/common/icons/chevron-up"
import ChevronDown from "@modules/common/icons/chevron-down"

export function CompactVariant({
  dir,
  product,
  images,

  ProductHeader,
  SecondaryActions,

  selectedVariant,
  selectedOptions,
  selectOption,
  clearOption,
  clearAllOptions,

  isOptionValueAvailable,

  handleAddToCart,
  handleBuyNow,

  isAddingToCart,
  isBuyingNow,
  isComplete,

  features,
  careInstructions,
  warranty,

  afterPriceSlot,
  afterActionsSlot,
  footerSlot,
  className,
}: VariantProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

    const { canPurchase, status, message } = useMemo(() => {
      if (!selectedVariant) {
        return {
          status: "in_stock",
          canPurchase: false,
          message: "Select options to see availability",
        }
      }

      const { manage_inventory, inventory_quantity, allow_backorder } =
        selectedVariant

      // Not managing inventory = always available
      if (!manage_inventory) {
        return { status: "in_stock", canPurchase: true }
      }

      const qty = inventory_quantity ?? 0

      if (qty > 10) {
        return { status: "in_stock", quantity: qty, canPurchase: true }
      }

      if (qty > 0 && qty <= 10) {
        return {
          status: "low_stock",
          quantity: qty,
          canPurchase: true,
          message: `Only ${qty} left in stock`,
        }
      }

      // Out of stock
      if (allow_backorder) {
        return {
          status: "backorder",
          quantity: 0,
          canPurchase: true,
          message: "Available for backorder",
        }
      }

      return {
        status: "out_of_stock",
        quantity: 0,
        canPurchase: false,
        message: "Out of stock",
      }
    }, [selectedVariant])

  return (
    <motion.article
      dir={dir}
      className={cn("pb-28", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Full-width Image Carousel */}
      <ProductImageGallery
        images={images}
        thumbnail={product.thumbnail}
        productTitle={product.title}
        layout="carousel"
        className="px-0"
      />

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            {ProductHeader}
            <ProductPrice
              product={product}
              variant={selectedVariant}
              size="md"
            />
          </div>
          {SecondaryActions}
        </div>

        {afterPriceSlot}

        {/* Collapsible Description */}
        {product.description && (
          <div>
            <p
              className={cn(
                "product-description transition-all duration-200",
                !isDescriptionExpanded && "line-clamp-3"
              )}
            >
              {product.description}
            </p>
            {product.description.length > 150 && (
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground mt-2 flex items-center gap-1"
              >
                {isDescriptionExpanded ? (
                  <>
                    Show less <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Read more <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Options */}
        {product.options && product.options.length > 0 && (
          <ProductVariantSelector
            options={product.options}
            selectedOptions={selectedOptions}
            disabled={false}
            onSelectOption={selectOption}
            onClearOption={clearOption}
            onClearAll={clearAllOptions}
            isOptionValueAvailable={isOptionValueAvailable}
          />
        )}

        {afterActionsSlot}

        {/* Details Accordion */}
        <ProductDetailsAccordion
          features={features}
          materials={product.material}
          careInstructions={careInstructions}
          shipping={{
            freeShippingThreshold: 100,
            estimatedDays: "3-5 business days",
            returnDays: 30,
          }}
          warranty={warranty}
        />

        {footerSlot}
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="sticky-action-bar">
        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            disabled={
              !isComplete || !canPurchase || isAddingToCart
            }
            className="btn-primary-product flex-1"
          >
            {isAddingToCart
              ? "Adding..."
              : status === "out_of_stock"
              ? "Out of Stock"
              : "Add to Cart"}
          </button>
          <button
            onClick={handleBuyNow}
            disabled={!isComplete || !canPurchase || isBuyingNow}
            className="btn-secondary-product w-auto! px-6"
          >
            Buy
          </button>
        </div>
      </div>
    </motion.article>
  )
}
