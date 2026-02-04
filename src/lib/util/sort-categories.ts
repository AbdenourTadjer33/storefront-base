import { HttpTypes } from "@medusajs/types"
import { CategoryNode } from "./category-utils"

export function sortCategories<
  T extends CategoryNode | HttpTypes.StoreProductCategory
>(categories: T[]): T[] {
  return [...categories].sort((a, b) => {
    if (a.rank === null && b.rank === null) return 0
    if (a.rank === null) return 1
    if (b.rank === null) return -1
    return a.rank - b.rank
  })
}
