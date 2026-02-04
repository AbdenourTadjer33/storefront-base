import { HttpTypes } from "@medusajs/types"

export interface CategoryNode extends HttpTypes.StoreProductCategory {
  depth: number
  category_children: CategoryNode[]
}

/**
 * Build category tree with depth
 */
export function buildCategoryTree(
  categories: HttpTypes.StoreProductCategory[]
): CategoryNode[] {
  const map = new Map<string, CategoryNode>()
  const roots: CategoryNode[] = []

  // Clone categories and init children + depth
  for (const cat of categories) {
    map.set(cat.id, {
      ...cat,
      depth: 0,
      category_children: [],
    })
  }

  // Build tree
  //   const valuesArray = Array.from(map.values())
  for (const cat of map.values()) {
    if (cat.parent_category?.id) {
      const parent = map.get(cat.parent_category.id)
      if (parent) {
        cat.depth = parent.depth + 1
        parent.category_children.push(cat)
      } else {
        roots.push(cat)
      }
    } else {
      roots.push(cat)
    }
  }

  return roots
}
