import { HttpTypes } from "@medusajs/types"
import { getCategoryPath } from "./get-category-path"

export function getProductCategoryPath(
  product: HttpTypes.StoreProduct,
  categoryMap: Map<string, HttpTypes.StoreProductCategory>
) {
  if (!product.categories?.length) return []

  // Build paths for all categories
  const paths = product.categories.map((cat) =>
    getCategoryPath(cat, categoryMap)
  )

  // Pick the deepest path
  const deepestPath = paths.sort((a, b) => b.length - a.length)[0]

  return deepestPath
}
