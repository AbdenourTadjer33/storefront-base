"use client"

import { useEffect, useRef, useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { useIntersection } from "@lib/hooks/use-in-view"
import { listProductsWithSort } from "@lib/data/products"
import { useTranslations } from "next-intl"
import Spinner from "@modules/common/icons/spinner"
import ProductPreview from "@modules/product/components/product-preview"
import { SortOptions } from "../sort-products-dropdown"

const PRODUCT_LIMIT = 12
const SCROLL_BUFFER = "400px" // Distance from bottom to trigger next load

type Product = HttpTypes.StoreProduct

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
}

export default function InfiniteScrollProducts({
  countryCode,
  region,
  sortBy,
  categoryId,
  initialProducts,
  initialCount,
}: {
  countryCode: string
  region: HttpTypes.StoreRegion
  sortBy?: SortOptions
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  initialProducts: Product[]
  initialCount: number
}) {
  const t = useTranslations("components.infinite-scroll-products")
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialCount > PRODUCT_LIMIT)
  const [error, setError] = useState<string | null>(null)

  const queryParams = {
    limit: PRODUCT_LIMIT,
  }

  const observerTarget = useRef<HTMLDivElement>(null)
  const isIntersecting = useIntersection(observerTarget, SCROLL_BUFFER)

  // Reset state when filters change
  useEffect(() => {
    setProducts(initialProducts)
    setPage(1)
    setHasMore(initialCount > PRODUCT_LIMIT)
    setError(null)
  }, [sortBy, categoryId, initialProducts, initialCount])

  // Load more when intersection is detected
  useEffect(() => {
    if (!isIntersecting || !hasMore || isLoading) return

    const loadMore = async () => {
      setIsLoading(true)
      setError(null)

      const queryParams: PaginatedProductsParams = {
        limit: PRODUCT_LIMIT,
      }

      if (categoryId) {
        queryParams["category_id"] = [categoryId]
      }

      if (sortBy === "created_at") {
        queryParams["order"] = sortBy
      }

      try {
        const nextPage = page + 1
        const { response } = await listProductsWithSort({
          countryCode,
          page: nextPage,
          queryParams,
          sortBy,
        })

        if (response.products.length === 0) {
          setHasMore(false)
        } else {
          setProducts((prev) => [...prev, ...response.products])
          setPage(nextPage)

          // Check if we've loaded all products
          const totalLoaded = products.length + response.products.length
          setHasMore(totalLoaded < response.count)
        }
      } catch (err) {
        console.error("Error loading products:", err)
        setError("Failed to load more products. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    loadMore()
  }, [
    isIntersecting,
    hasMore,
    isLoading,
    page,
    countryCode,
    sortBy,
    categoryId,
    products.length,
  ])

  return (
    <div className="w-full">
      <ul
        className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
        data-testid="products-list-infinite"
      >
        {products.map((p) => (
          <li key={p.id}>
            <ProductPreview product={p} region={region} />
          </li>
        ))}
      </ul>

      {/* Loading indicator */}
      {isLoading && (
        <div
          className="flex items-center justify-center py-8"
          data-testid="loading-indicator"
        >
          <Spinner className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">{t("loading")}</span>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && products.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">{t("notfound")}</p>
        </div>
      )}

      {/* Intersection observer target */}
      {hasMore && <div ref={observerTarget} className="h-4" />}
    </div>
  )
}
