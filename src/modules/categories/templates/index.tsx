import { notFound } from "next/navigation"
import { Suspense } from "react"

import { HttpTypes } from "@medusajs/types"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import PaginatedProducts from "@modules/common/components/paginated-products"
import {
  SortOptions,
  SortProductsDropdown,
} from "@modules/common/components/sort-products-dropdown"

import storeConfig from "@lib/store-config"
import InfiniteScrollProductsWrapper from "@modules/common/components/infinite-scroll-products"
import Breadcrumbs from "@modules/common/components/breadcrumbs"
import { getCachedCategoryMap } from "@lib/data/categories"
import { getCategoryPath } from "@lib/util/get-category-path"

export default async function CategoryTemplate({
  countryCode,
  region,
  category,
  sortBy,
  page,
}: {
  countryCode: string
  region: HttpTypes.StoreRegion
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
}) {
  if (!category || !countryCode) notFound()

  const props = {
    countryCode,
    region,
    page: page ? parseInt(page) : 1,
    sortBy: sortBy ?? "created_at",
    categoryId: category.id,
  }

  const renderBreadcrumbs = async () => {
    if (!storeConfig.showBreadcrumbsInPageHeaders) return null

    const paths = getCategoryPath(category, await getCachedCategoryMap())

    const breadcrumbs = paths.map((c) => ({
      title: c.name,
      href: `/categories/${c.handle}`,
    }))

    return <Breadcrumbs breadcrumbs={breadcrumbs} />
  }

  return (
    <div
      className="flex flex-col gap-3 lg:gap-12 content-container py-6"
      data-testid="category-container"
    >
      <div className="flex flex-col gap-6">
        {storeConfig.showBreadcrumbsInPageHeaders && (
          <div className="mx-auto">{renderBreadcrumbs()}</div>
        )}

        <div className="text-center py-6">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {category.name}
          </h1>

          {category.description && (
            <p className="mt-4 max-w-2xl mx-auto text-sm text-muted-foreground md:text-base">
              {category.description}
            </p>
          )}
        </div>

        {storeConfig.showBreadcrumbsInPageHeaders && (
          <div>{renderBreadcrumbs()}</div>
        )}

        <div className="py-6">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {category.name}
          </h1>

          {category.description && (
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              {category.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-x-2">
          <SortProductsDropdown sortBy="created_at" />
        </div>
      </div>

      <div className="flex flex-col gap-10 lg:flex-row">
        <main className="flex-1 min-h-150">
          <Suspense
            fallback={
              <SkeletonProductGrid
                numberOfProducts={category.products?.length}
              />
            }
          >
            {storeConfig.displayMode === "pagination" ? (
              <PaginatedProducts {...props} />
            ) : (
              <InfiniteScrollProductsWrapper {...props} />
            )}
          </Suspense>
        </main>
      </div>
    </div>
  )
}
