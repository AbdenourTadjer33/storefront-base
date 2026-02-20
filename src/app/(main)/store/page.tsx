import { Suspense } from "react"
import { Metadata } from "next"
import { getCountryCode } from "@lib/data/cookies"
import { notFound } from "next/navigation"
import { getRegion } from "@lib/data/regions"
import { FilterSearchParams } from "@modules/common/components/filter-panel"
import { getTranslations } from "next-intl/server"

import storeConfig from "@lib/store-config"
import ProductsTemplate from "@modules/common/templates/products"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import InfiniteScrollProductsWrapper from "@modules/common/components/infinite-scroll-products"
import PaginatedProducts from "@modules/common/components/paginated-products"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: Promise<FilterSearchParams>
  params: Promise<{}>
}

export default async function StorePage({ searchParams }: Params) {
  const { page, sortBy, categoryId } = await searchParams

  const t = await getTranslations("pages.store")

  const countryCode = await getCountryCode()

  if (!countryCode) {
    return null
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return notFound()
  }

  const props = {
    countryCode,
    region,
    page: page ? parseInt(page) : 1,
    sortBy: sortBy ?? "created_at",
    categoryId,
  }

  return (
    <ProductsTemplate title={t("title")}>
      <Suspense fallback={<SkeletonProductGrid />}>
        {storeConfig.displayMode === "pagination" ? (
          <PaginatedProducts {...props} />
        ) : (
          <InfiniteScrollProductsWrapper {...props} />
        )}
      </Suspense>
    </ProductsTemplate>
  )
}
