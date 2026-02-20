"use client"

import { HttpTypes } from "@medusajs/types"
import React from "react"
import ProductBadges from "../product-badges"
import { metadata } from "@lib/util/get-product-metadata"

interface ProductInfo {
  product: HttpTypes.StoreProduct
  headerSlot?: React.ReactNode
}

export default function ProductInfo({
  product: { title, subtitle, metadata: m },
  headerSlot,
}: ProductInfo) {
  return (
    <div id="product-info">
      <ProductBadges
        isBestseller={metadata("badges.isBestseller", m, false)}
        isNew={metadata("badges.isNew", m, false)}
        isLimited={metadata("badges.isLimited", m, false)}
        discountPercentage={"0"}
      />

      {subtitle && <p className="product-subtitle">{subtitle}</p>}

      <h1 className="product-title">{title}</h1>

      {headerSlot}
    </div>
  )
}
