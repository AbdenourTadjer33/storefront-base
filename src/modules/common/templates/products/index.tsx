import React, { Suspense } from "react"

import { SortProductsDropdown } from "@modules/common/components/sort-products-dropdown"
import FilterPanelWrapper from "./filter-panel-wrapper"
import Breadcrumbs from "@modules/common/components/breadcrumbs"

interface ProductsTemplateProps {
  title: string
  isCollection?: boolean
  children?: React.ReactNode
}

export default function ProductsTemplate({
  title,
  isCollection = false,
  children,
}: ProductsTemplateProps) {
  return (
    <div
      className="flex flex-col gap-3 lg:gap-12 content-container py-6"
      data-testid="category-container"
    >
      <div className="flex flex-col gap-6">
        <div>
          <Breadcrumbs
            breadcrumbs={isCollection ? [{ title: title, href: "" }] : []}
          />
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-foreground text-[48px] font-semibold">{title}</h1>
        </div>

        <div className="flex items-center justify-end gap-x-2">
          <div className="lg:hidden">
            <Suspense fallback={<>Loading...</>}>
              <FilterPanelWrapper variant="sheet" />
            </Suspense>
          </div>

          <SortProductsDropdown sortBy="created_at" />
        </div>
      </div>

      <div className="flex flex-col gap-10 lg:flex-row">
        <div>
          <Suspense fallback={<>Loading...</>}>
            <FilterPanelWrapper variant="aside" />
          </Suspense>
        </div>

        <main className="flex-1 min-h-150">
          {children ?? (
            <div className="flex h-full items-center justify-center rounded-lg border border-primary/50 bg-primary/10 px-6 py-6">
              <p className="text-foreground text-center text-sm">
                Slot (swap it with your content)
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
