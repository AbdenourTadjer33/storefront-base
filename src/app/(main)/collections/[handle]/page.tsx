import { Suspense } from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCollectionByHandle, listCollections } from "@lib/data/collections"
import { getRegion, listRegions } from "@lib/data/regions"
import { StoreCollection, StoreRegion } from "@medusajs/types"
import { getCountryCode } from "@lib/data/cookies"
import { SortOptions } from "@modules/common/components/sort-products-dropdown"

import storeConfig from "@lib/store-config"
import ProductsTemplate from "@modules/common/templates/products"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import PaginatedProducts from "@modules/common/components/paginated-products"
import InfiniteScrollProductsWrapper from "@modules/common/components/infinite-scroll-products"
import { FilterSearchParams } from "@modules/common/components/filter-panel"

type Props = {
  params: Promise<{ handle: string }>
  searchParams: Promise<FilterSearchParams>
}

export const PRODUCT_LIMIT = 12

export async function generateStaticParams() {
  const { collections } = await listCollections({
    fields: "*products",
  })

  if (!collections) {
    return []
  }

  const countryCodes = await listRegions().then(
    (regions: StoreRegion[]) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[]
  )

  const collectionHandles = collections.map(
    (collection: StoreCollection) => collection.handle
  )

  const staticParams = countryCodes
    ?.map((countryCode: string) =>
      collectionHandles.map((handle: string | undefined) => ({
        countryCode,
        handle,
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const collection = await getCollectionByHandle(params.handle)

  if (!collection) {
    notFound()
  }

  const metadata = {
    title: `${collection.title} | Medusa Store`,
    description: `${collection.title} collection`,
  } as Metadata

  return metadata
}

export default async function CollectionPage({ params, searchParams }: Props) {
  const { handle } = await params
  const { sortBy, page, categoryId } = await searchParams

  const countryCode = await getCountryCode()

  if (!countryCode) {
    return notFound()
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return notFound()
  }

  const collection = await getCollectionByHandle(handle)
    .then((collection) => collection)
    .catch((r) => null)

  if (!collection) {
    notFound()
  }

  const props = {
    countryCode,
    region,
    page: page ? parseInt(page) : 1,
    sortBy: sortBy ?? "created_at",
    collectionId: collection.id,
    categoryId: categoryId,
  }

  return (
    <ProductsTemplate title={collection.title} isCollection>
      <Suspense
        fallback={
          <SkeletonProductGrid numberOfProducts={collection.products?.length} />
        }
      >
        {storeConfig.displayMode === "pagination" ? (
          <PaginatedProducts {...props} />
        ) : (
          <InfiniteScrollProductsWrapper {...props} />
        )}
      </Suspense>
    </ProductsTemplate>
  )
}
