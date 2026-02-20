import { JsonDump } from "@components/json-dump"
import { sdk } from "@lib/config"
import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import ProductPreview from "@modules/product/components/product-preview"
import { getTranslations } from "next-intl/server"

interface RelatedProductsProps {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
  region,
}: RelatedProductsProps) {
  const t = await getTranslations("components.related-products")
  const queryParams: HttpTypes.StoreProductListParams = {}

  if (region?.id) {
    queryParams.region_id = region.id
  }

  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id]
  }

  if (product.tags) {
    queryParams.tag_id = product.tags
      .map((t) => t.id)
      .filter(Boolean) as string[]
  }

  if (product.categories) {
    queryParams.category_id = product.categories
      .map((c) => c.id)
      .filter(Boolean) as string[]
  }

  const products = await listProducts({ queryParams, countryCode }).then(
    ({ response }) => {
      return response.products.filter(
        (responseProduct) => responseProduct.id !== product.id
      )
    }
  )

  if (!products.length) {
    return null
  }

  return (
    <div className="product-page-constraint">
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-base text-muted-foreground mb-6">
          {t("title")}
        </span>
        <p className="text-2xl max-w-lg">{t("description")}</p>
      </div>

      <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
        {products.map((product) => (
          <li key={product.id}>
            <ProductPreview region={region} product={product} />
          </li>
        ))}
      </ul>
    </div>
  )
}
