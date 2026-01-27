"use client"

import { cn } from "@lib/util/utils"

import Home from "@modules/common/icons/home"
import LayoutGrid from "@modules/common/icons/layout-grid"
import ShoppingBag from "@modules/common/icons/shopping-bag"
import Search from "@modules/common/icons/search"
import User from "@modules/common/icons/user"
import { IconProps } from "types/icon"
import { useCallback, useState } from "react"
import SearchModal from "../search-modal"
import { useTranslations } from "next-intl"

interface Props {
  totalCartItems: number
}

interface NavItem {
  icon: React.FC<IconProps>
  label: string
  href?: string
  onClick?: VoidFunction
  badge?: number
}

export default function MobileBottomNav({ totalCartItems }: Props) {
  const t = useTranslations("components.nav")
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleSearchOpen = useCallback(() => {
    setIsSearchOpen(true)
  }, [])

  const handleSearchClose = useCallback(() => {
    setIsSearchOpen(false)
  }, [])

  const navItems: NavItem[] = [
    { icon: Home, label: t("home"), href: "/" },
    { icon: LayoutGrid, label: t("store"), href: "/store" },
    {
      icon: ShoppingBag,
      label: t("cart"),
      href: "/cart",
      badge: totalCartItems,
    },
    { icon: Search, label: t("search"), onClick: handleSearchOpen },
    { icon: User, label: t("account"), href: "/account" },
  ]

  return (
    <>
      <nav
        className={cn(
          "fixed bottom-0 inset-x-0 z-40",
          "bg-background/95 backdrop-blur-md",
          "border-t border-border",
          "pb-safe md:hidden"
        )}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isButton = !!item.onClick

            const content = (
              <>
                <div className="relative">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={cn(
                        "absolute -top-1.5 -end-1.5 flex items-center justify-center",
                        "min-w-4 h-4 px-1 text-[10px] font-semibold",
                        "bg-primary text-primary-foreground rounded-full"
                      )}
                    >
                      {item.badge > 99 ? "99+" : item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium mt-1">
                  {item.label}
                </span>
              </>
            )

            const className = cn(
              "flex flex-col items-center justify-center flex-1 py-2",
              "text-muted-foreground transition-colors duration-200",
              "hover:text-foreground active:text-foreground",
              "focus:outline-none focus-visible:text-foreground"
            )

            if (isButton) {
              return (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className={className}
                  aria-label={item.label}
                >
                  {content}
                </button>
              )
            }

            return (
              <a
                key={item.label}
                href={item.href}
                className={className}
                aria-label={item.label}
              >
                {content}
              </a>
            )
          })}
        </div>
      </nav>

      {/* Mobile Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={handleSearchClose} />
    </>
  )
}
