"use client"

import { CategoryNode } from "@lib/util/build-category-tree"
import { cn } from "@lib/util/utils"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MegaMenu from "@modules/layout/components/mega-menu"
import { useCallback, useRef, useState } from "react"

interface Props {
  topCategories: CategoryNode[]
}

export default function SecondaryNav({ topCategories }: Props) {
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = useCallback((categoryId: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveMegaMenu(categoryId)
  }, [])

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null)
    }, 150)
  }, [])

  const closeMegaMenu = useCallback(() => {
    setActiveMegaMenu(null)
  }, [])

  // useEffect(() => {
  //   console.log(activeMegaMenu)
  // }, [activeMegaMenu])

  return (
    <>
      {topCategories.map((category) => (
        <div
          key={category.id}
          onMouseEnter={() =>
            category.category_children.length > 0 &&
            handleMouseEnter(category.id)
          }
          onMouseLeave={handleMouseLeave}
        >
          <LocalizedClientLink
            href={`/categories/${category.handle}`}
            className={cn(
              "nav-link data-[active=true]:nav-link-active flex items-center gap-0.5",
              activeMegaMenu === category.id && "nav-link-active"
            )}
            aria-haspopup={category.category_children.length > 0}
            aria-expanded={activeMegaMenu === category.id}
          >
            {category.name}
            {category.category_children.length > 0 && (
              <ChevronDown className="size-3" />
            )}
          </LocalizedClientLink>

          {/* Mega Menu */}
          {category.category_children.length > 0 && (
            <MegaMenu
              category={category}
              isOpen={activeMegaMenu === category.id}
              onClose={closeMegaMenu}
            />
          )}
        </div>
      ))}
    </>
  )
}
