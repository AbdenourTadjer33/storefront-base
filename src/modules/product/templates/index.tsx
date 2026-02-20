import storeConfig from "@lib/store-config"
import { HttpTypes } from "@medusajs/types"
import {
  ClassicVariant,
  CompactVariant,
  EditorialVariant,
  // CompactVariant,
  // EditorialVariant,
} from "../components/product-overview"
import type { VariantProps } from "../components/product-overview"
import ProductInfo from "../components/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import RelatedProducts from "../components/related-products"
import ProductActionsWrapper from "./product-actions-wrapper"
import { getLocaleDir } from "@i18n/config"
import { JsonDump } from "@components/json-dump"
import { getLocale } from "next-intl/server"
import { getProductCategoryPath } from "@lib/util/get-product-path"
import { getCachedCategoryMap } from "@lib/data/categories"
import Breadcrumbs from "@modules/common/components/breadcrumbs"
import { Suspense } from "react"

interface Props {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

export default async function ProductTemplate({
  product,
  region,
  countryCode,
  images,
}: Props) {
  const variant = storeConfig.productOverviewDesignVariant
  const showBreadcrumbsInPageHeaders = storeConfig.showBreadcrumbsInPageHeaders

  const locale = await getLocale()

  const renderBreadcrumbs = async () => {
    if (!showBreadcrumbsInPageHeaders) return null

    const paths = getProductCategoryPath(product, await getCachedCategoryMap())

    if (paths.length == 0) return null

    const breadcrumbs = paths.map((c) => ({
      title: c.name,
      href: `/categories/${c.handle}`,
    }))

    breadcrumbs.push({
      title: product.title,
      href: "",
    })

    return (
      <div className="flex flex-col mb-6">
        <div className="mx-auto">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      </div>
    )
  }

  const props: VariantProps = {
    dir: getLocaleDir(locale),
    headerSlot: <>{renderBreadcrumbs()}</>,
    product,
    images,
    region,
    countryCode,
    productHeaderSlot: <ProductInfo product={product} />,
    productActionsWrapper: (
      <ProductActionsWrapper id={product.id} region={region} />
    ),
    footerSlot: (
      <>
        {/* <RelatedProducts product={product} region={region} countryCode={countryCode} /> */}
      </>
    ),
    // footerSlot: <JsonDump src={product} />,
    // footerSlot: (
    //   <div className="py-8">
    //     <Suspense fallback={<SkeletonRelatedProducts />}>
    //       <RelatedProducts
    //         product={product}
    //         region={region}
    //         countryCode={countryCode}
    //       />
    //     </Suspense>
    //   </div>
    // ),
  }

  let Comp

  switch (variant) {
    case "compact":
      Comp = CompactVariant
      break
    case "editorial":
      Comp = EditorialVariant
      break
    case "classic":
    default:
      Comp = ClassicVariant
      break
  }

  return (
    <>
      <Comp {...props} />

      <div className="content-container my-16 small:my-32">
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts
            product={product}
            region={region}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </>
  )
}
