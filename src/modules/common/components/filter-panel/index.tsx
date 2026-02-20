"use client"

import React from "react"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "../sort-products-dropdown"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@components/ui/collapsible"
import ChevronDown from "@modules/common/icons/chevron-down"
import { Button } from "@components/ui/button"
import { cn } from "@lib/util/utils"
import { useQueryParams } from "@lib/hooks/use-query-params"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet"
import { SlidersHorizontal } from "lucide-react"
import { useTranslations } from "next-intl"

export type FilterSearchParams = {
  page?: string
  sortBy?: SortOptions
  categoryId?: string

  brandIds?: string
  collectionId?: string
  categoryIds?: string
  productIds?: string
}

type Variant = "sheet" | "aside"

interface Props {
  categories: HttpTypes.StoreProductCategory[]
  variant: Variant
}

export default function FilterPanel({ categories, variant }: Props) {
  const t = useTranslations("components.filter-panel")
  const { queryParams, setQueryParams } = useQueryParams()

  const isFiltered = queryParams.has("categoryId")

  const clearAll = () => {
    setQueryParams("categoryId", null)
  }

  if (variant === "sheet") {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="default" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            {t("title")}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:w-96 p-6">
          <SheetHeader>
            <SheetTitle>{t("title")}</SheetTitle>
            <SheetDescription className="sr-only">
              This is the filter panel
            </SheetDescription>
          </SheetHeader>

          <Filter categories={categories} />

          <SheetFooter className="mt-4 pt-4">
            <SheetClose asChild>
              <Button variant="outline" className="w-full" onClick={clearAll}>
                {t("clear-all")}
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )
  }

  if (variant === "aside") {
    return (
      <aside className="hidden w-80 flex-col gap-6 lg:flex">
        <div className="flex items-center justify-between">
          <h2 className="text-foreground text-xl font-medium">{t("title")}</h2>
          {isFiltered && (
            <Button
              size="sm"
              variant="secondary"
              className="text-sm font-medium"
              onClick={clearAll}
            >
              {t("clear-all")}
            </Button>
          )}
        </div>

        <div className="max-h-[calc(100vh-120px)] overflow-y-auto">
          <Filter categories={categories} />
        </div>
      </aside>
    )
  }

  return null
}

function Filter({
  categories,
}: {
  categories: HttpTypes.StoreProductCategory[]
}) {
  const t = useTranslations("components.filter-panel")
  const { queryParams, setQueryParams } = useQueryParams()

  const handleCategoryChange = (categoryId: string) => {
    setQueryParams("categoryId", categoryId)
  }

  return (
    <>
      {categories && (
        <FilterSection title={t("categories")} count={0} defaultOpen={true}>
          <>
            <button
              className={cn(
                "block text-base leading-6 font-medium",
                !queryParams.has("categoryId")
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {t("all-categories")}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className={cn(
                  "block text-left text-base leading-6 font-medium",
                  category.id === queryParams.get("categoryId")
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </button>
            ))}
          </>
        </FilterSection>
      )}
    </>
  )
}

interface FilterSectionProps {
  title: string
  count: number
  defaultOpen: boolean
  children: React.ReactNode
}

function FilterSection({
  title,
  count,
  defaultOpen,
  children,
}: FilterSectionProps) {
  return (
    <Collapsible className="py-4" defaultOpen={defaultOpen}>
      <CollapsibleTrigger asChild>
        <button className="flex w-full items-center justify-between hover:text-foreground group cursor-pointer">
          <span className="font-medium text-sm">
            {title} {count > 0 && `${count}`}
          </span>
          <ChevronDown className="rtl:mr-auto ltr:ml-auto transition-transform group-data-[state=open]:rotate-180" />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4 space-y-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}
