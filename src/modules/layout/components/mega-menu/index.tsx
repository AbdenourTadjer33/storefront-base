"use client"

import { CategoryNode } from "@lib/util/build-category-tree"
import { sortCategories } from "@lib/util/sort-categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useTranslations } from "next-intl"
import { useEffect, useRef } from "react"

interface Props {
  category: CategoryNode
  isOpen: boolean
  onClose: VoidFunction
}

export default function MegaMenu({ category, isOpen, onClose }: Props) {
  const t = useTranslations("components.nav")

  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const childCategories = sortCategories(category.category_children)

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 top-[200px] z-30 fade-in pointer-events-none" // bg-foreground/5 backdrop-blur-sm
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mega Menu Panel */}
      <div
        ref={menuRef}
        className="animate-mega-menu-enter absolute left-0 right-0 top-full z-40 border-b border-navabr-border bg-megamenu shadow-shadow"
        role="menu"
        aria-label={`${category.name} submenu`}
      >
        <div className="mx-auto max-w-7xl px-6 py-10">
          {/* Category Header */}
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-medium text-foreground">
              {category.name}
            </h2>
            <LocalizedClientLink
              href={`/categories/${category.handle}`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={onClose}
            >
              {t('seeall')}
            </LocalizedClientLink>
          </div>

          {/* Multi-column Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {childCategories.map((childCategory) => (
              <div key={childCategory.id} className="space-y-4">
                {/* Column Header (Depth 1 Category) */}
                <LocalizedClientLink
                  href={`/categories/${childCategory.handle}`}
                  className="block text-sm font-semibold uppercase tracking-wider text-foreground transition-colors hover:text-muted-foreground"
                  onClick={onClose}
                >
                  {childCategory.name}
                </LocalizedClientLink>

                {/* Sub-items (Depth 2 Categories) */}
                {childCategory.category_children.length > 0 && (
                  <ul className="space-y-2.5">
                    {sortCategories(childCategory.category_children).map(
                      (subCategory) => (
                        <li key={subCategory.id}>
                          <LocalizedClientLink
                            href={`/categories/${subCategory.handle}`}
                            className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                            onClick={onClose}
                          >
                            {subCategory.name}
                          </LocalizedClientLink>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
