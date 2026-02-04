import { HttpTypes } from "@medusajs/types"

export function getCategoryPath(
  category: HttpTypes.StoreProductCategory,
  categoryMap: Map<string, HttpTypes.StoreProductCategory>
) {
  const path: HttpTypes.StoreProductCategory[] = []
  let current: HttpTypes.StoreProductCategory | null = category
  const visited = new Set<string>()

  while (current) {
    if (visited.has(current.id)) break // prevent infinite loops
    visited.add(current.id)

    path.unshift(current)

    const parentId: string | undefined = current.parent_category?.id
    if (!parentId) break

    current = categoryMap.get(parentId) || null
  }

  return path
}
