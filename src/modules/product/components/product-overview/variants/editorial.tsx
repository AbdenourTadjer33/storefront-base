import { motion } from "framer-motion"
import { VariantProps } from "../types"
import { cn } from "@lib/util/utils"
import ProductImageGallery from "../../product-image-gallery"
import ProductPrice from "../../product-price"
import ProductVariantSelector from "../../product-variant-selector"
import ProductActions from "../../product-actions"
import ProductDetailsAccordion from "../../product-details-accordion"

export function EditorialVariant({
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
  return (
    <motion.article
      dir={dir}
      className={cn(className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero Image Section */}
      <div className="relative h-[70vh] min-h-[500px] bg-muted overflow-hidden">
        <ProductImageGallery
          images={images}
          thumbnail={product.thumbnail}
          productTitle={product.title}
          layout="carousel"
          showThumbnails={false}
          className="h-full [&>div]:h-full [&>div>img]:object-contain [&>div]:rounded-none"
        />
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Title & Description */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">{ProductHeader}</div>
              {SecondaryActions}
            </div>

            {product.description && (
              <p className="product-description text-lg leading-relaxed max-w-2xl">
                {product.description}
              </p>
            )}

            <ProductDetailsAccordion
              features={features}
              materials={product.material}
              careInstructions={careInstructions}
              dimensions={{
                weight: product.weight,
                length: product.length,
                width: product.width,
                height: product.height,
              }}
              warranty={warranty}
            />

            {footerSlot}
          </div>

          {/* Right: Purchase Panel */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8 space-y-8 p-6 bg-card rounded-lg shadow-product-md">
              <ProductPrice
                product={product}
                variant={selectedVariant}
                size="xl"
                layout="stacked"
              />
              {afterPriceSlot}

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

              <ProductActions
                selectedVariant={selectedVariant}
                isComplete={isComplete}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                isAddingToCart={isAddingToCart}
                isBuyingNow={isBuyingNow}
                layout="stacked"
              />

              {afterActionsSlot}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
