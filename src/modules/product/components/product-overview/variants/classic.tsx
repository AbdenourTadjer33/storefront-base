import { VariantProps } from "../types"
import { cn } from "@lib/util/utils"
import ProductImageGallery from "../../product-image-gallery"
// import ProductPrice from "../../product-price"
// import ProductVariantSelector from "../../product-variant-selector"
// import ProductActions from "../../product-actions"
import ProductDetailsAccordion from "../../product-details-accordion"
import { ProductActions } from "../product-actions"

export function ClassicVariant({
  dir,
  product,
  images,

  headerSlot,
  productHeaderSlot,
  secondaryActionsSlot,

  productActionsWrapper,
  afterActionsSlot,

  // selectedVariant,
  // selectedOptions,

  // selectOption,
  // clearOption,
  // clearAllOptions,

  // isOptionValueAvailable,

  // handleAddToCart,
  // handleBuyNow,

  // isAddingToCart,
  // isBuyingNow,
  // isComplete,

  // features,
  // careInstructions,
  // warranty,

  // afterPriceSlot,
  footerSlot,
  className,
}: VariantProps) {
  return (
    <article className={cn(" content-container py-8 ", className)}>
      {headerSlot}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Image Gallery */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <ProductImageGallery
            images={images}
            thumbnail={product.thumbnail}
            productTitle={product.title}
            layout="vertical"
          />
        </div>

        {/* Right: Product Info */}
        <div className="space-y-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">{productHeaderSlot}</div>
            {secondaryActionsSlot}
          </div>

          {productActionsWrapper}

          {/* <ProductPrice product={product} variant={selectedVariant} size="lg" />

          {afterPriceSlot}

          {(product.variants?.length ?? 0) > 1 && product.options && (
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
          /> */}

          {afterActionsSlot}

          {/* Product Details Accordion */}
          {/* <ProductDetailsAccordion
            description={product.description ?? ""}
            features={features}
            materials={product.material}
            careInstructions={careInstructions}
            dimensions={{
              weight: product.weight,
              length: product.length,
              width: product.width,
              height: product.height,
            }}
            shipping={{
              freeShippingThreshold: 100,
              estimatedDays: "3-5 business days",
              returnDays: 30,
            }}
            warranty={warranty}
          /> */}
        </div>
      </div>

      {footerSlot}
    </article>
  )
}
