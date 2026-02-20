import { CategoryNode } from "./build-category-tree"

export function flattenCategoryTree(
  tree: CategoryNode[],
  result: CategoryNode[] = []
): CategoryNode[] {
  for (const cat of tree) {
    result.push(cat)
    if (cat.category_children.length > 0) {
      flattenCategoryTree(cat.category_children, result)
    }
  }
  return result
}
