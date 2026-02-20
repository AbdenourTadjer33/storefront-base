import { listCategories } from "@lib/data/categories"
import FilterPanel from "@modules/common/components/filter-panel"

export default async function FilterPanelWrapper({
  variant,
}: {
  variant: "sheet" | "aside"
}) {
  const categories = await listCategories()

  return <FilterPanel categories={categories} variant={variant} />
}
