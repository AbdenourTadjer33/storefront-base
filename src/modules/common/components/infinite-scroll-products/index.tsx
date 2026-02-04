import { listProductsWithSort } from "@lib/data/products"
import InfiniteScrollProducts from "./infinite-scroll-products"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "../sort-products-dropdown"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
}

export default async function InfiniteScrollProductsWrapper({
  countryCode,
  region,
  sortBy,
  categoryId,
  collectionId,
}: {
  countryCode: string
  region: HttpTypes.StoreRegion
  sortBy?: SortOptions
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
}) {
  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (sortBy === "created_at") {
    queryParams["order"] = sortBy
  }

  const {
    response: { products, count },
  } = await listProductsWithSort({
    page: 1,
    queryParams,
    sortBy,
    countryCode,
  })

  return (
    <InfiniteScrollProducts
      countryCode={countryCode}
      region={region}
      sortBy={sortBy}
      categoryId={categoryId}
      initialProducts={products}
      initialCount={count}
    />
  )
}
