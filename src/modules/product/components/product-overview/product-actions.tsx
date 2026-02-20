"use client"

import { HttpTypes } from "@medusajs/types"
import ProductPrice from "../product-price"
import ProductVariantSelector from "../product-variant-selector"
import ProductAction from "../product-actions"
import { useLocale } from "next-intl"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { isEqual } from "lodash"
import { addToCart, retrieveCart } from "@lib/data/cart"
import { getCheckoutStep } from "@lib/util/get-checkout-step"

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export function ProductActions({
  product,
  region,
}: {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isBuyingNow, setIsBuyingNow] = useState(false)

  const [options, setOptions] = useState<Record<string, string>>({})

  // If there is 1 variant, preselect the options.
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected.
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  // check if the selected options product a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // check if all options are selected
  const isComplete = useMemo(() => {
    const productOptions = product.options ?? []
    const productVariants = product.variants ?? []
    if (productOptions.length === 0) return productVariants.length > 0
    return productOptions.every((opt) => options[opt.id] !== undefined)
  }, [product.options, options, (product.variants ?? []).length])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we dont manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwie, we can't add to cart
    return false
  }, [selectedVariant])

  const handleAddToCart = async (qte: number = 1) => {
    if (!selectedVariant?.id) return

    setIsAddingToCart(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: qte,
    })

    setIsAddingToCart(false)
  }

  const handleBuyNow = async (qte: number = 1) => {
    if (!selectedVariant?.id) return

    setIsBuyingNow(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: qte,
    })

    const cart = await retrieveCart()

    router.push(`/checkout?step=${cart ? getCheckoutStep(cart) : "address"}`)

    setIsBuyingNow(false)
  }

  const clearOption = (optionId: string) => {
    setOptions((prev) => {
      const next = { ...prev }
      delete next[optionId]
      return next
    })
  }

  const clearAllOptions = () => setOptions({})

  const getAvailableVariantsForSelection = (
    partialSelection: Record<string, string>
  ): HttpTypes.StoreProductVariant[] => {
    return (product.variants ?? []).filter((variant) => {
      const variantOptions = variant.options ?? []
      return Object.entries(partialSelection).every(([optId, value]) => {
        return variantOptions.some(
          (vo) => vo.option_id === optId && vo.value === value
        )
      })
    })
  }

  const isOptionValueAvailable = (optionId: string, value: string) => {
    const testSelection = { ...options, [optionId]: value }
    const matchingVariants = getAvailableVariantsForSelection(testSelection)
    return matchingVariants.some((variant) => {
      if (!variant.manage_inventory) return true
      if (variant.allow_backorder) return true
      return (variant.inventory_quantity ?? 0) > 0
    })
  }

  return (
    <>
      <ProductPrice product={product} variant={selectedVariant} size="lg" />

      {(product.variants?.length ?? 0) > 1 && product.options && (
        <ProductVariantSelector
          options={product.options}
          selectedOptions={options}
          disabled={false}
          onSelectOption={setOptionValue}
          onClearOption={clearOption}
          onClearAll={clearAllOptions}
          isOptionValueAvailable={isOptionValueAvailable}
        />
      )}

      <ProductAction
        selectedVariant={selectedVariant}
        isComplete={isComplete}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isAddingToCart={isAddingToCart}
        isBuyingNow={isBuyingNow}
      />
    </>
  )
}
