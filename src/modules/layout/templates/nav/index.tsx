import { cn } from "@lib/util/utils"
import { retrieveCart } from "@lib/data/cart"
import storeConfig from "@lib/store-config"
import CartButton from "@modules/layout/components/cart-button"
import AccountButton from "@modules/layout/components/account-button"
import LogoContainer from "@modules/layout/components/logo-container"
import MobileBottomNav from "@modules/layout/components/mobile-bottom-nav"
import SearchBar from "@modules/layout/components/search-bar"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import Menu from "@modules/common/icons/menu"
import MenuSheet from "@modules/layout/components/menu-sheet"
import { HttpTypes } from "@medusajs/types"
import { listCategories } from "@lib/data/categories"
import SecondaryNav from "./secondary-nav"
import { buildCategoryTree } from "@lib/util/build-category-tree"
import { sortCategories } from "@lib/util/sort-categories"
import { getTranslations } from "next-intl/server"
import SearchSheet from "@modules/layout/components/search-sheet"
import { Button } from "@components/ui/button"
import Search from "@modules/common/icons/search"

interface Props {
  customer?: HttpTypes.StoreCustomer | null
}

/**
 * Production-ready responsive Navbar component.
 *
 * Features:
 * - Desktop: Logo | Centered Search | Account | Cart
 * - Mobile: Top bar (Logo + Account + Cart) + Fixed bottom navigation
 * - RTL support via dir prop
 * - Sticky behavior via sticky prop
 * - Logo container handles any aspect ratio
 *
 *
 * Spec:
 * - desktop navbar: h-16
 * - secondary navbar: h-12
 * - mobile topbar: h-14
 * - mobile bottom bar: h-16
 */
export default async function Nav({ customer }: Props) {
  const sticky = storeConfig.isNavbarSticky
  const logoSrc = storeConfig.logoSrc
  const logoAlt = storeConfig.logoAlt

  const t = await getTranslations("components.nav")

  const cart = await retrieveCart().catch(() => null)

  const totalItems =
    cart?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const categories = await listCategories()
  const categoryTree = buildCategoryTree(categories)
  const sortedCategories = sortCategories(categoryTree)
  const topCategories = sortedCategories.slice(0, 6)

  return (
    <>
      {/* Main Navbar */}
      <header
        className={cn(
          "w-full bg-navbar border-b border-navbar-border", // backdrop-blur-md"
          "transition-shadow duration-200",
          sticky && "sticky top-0 z-50 shadow-sm"
        )}
      >
        <div className="content-container">
          {/* Desktop Navbar */}
          <nav
            className="hidden md:flex items-center justify-between h-16 gap-4"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <div className="shrink-0">
              <LocalizedClientLink href="/" aria-label={logoAlt}>
                <LogoContainer src={logoSrc} alt={logoAlt} />
              </LocalizedClientLink>
            </div>

            {/* Centered Search */}
            <div className="flex-1 flex justify-center px-8">
              <SearchSheet cart={cart} totalCartItems={totalItems}>
                <Button
                  variant="outline"
                  className="min-w-lg flex items-center justify-between text-muted-foreground"
                >
                  <span>{t("search")}</span>
                  <Search className="size-4" />
                </Button>
              </SearchSheet>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
              <AccountButton />
              <CartButton cart={cart} totalCartItems={totalItems} />
            </div>
          </nav>

          {/* Mobile Top Bar */}
          <nav
            className="flex md:hidden items-center justify-between h-14"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center gap-0.4">
              <MenuSheet
                customer={customer}
                sortedCategories={sortedCategories}
              >
                <button
                  className="flex items-center justify-center p-2 text-foreground/80 transition-colors hover:text-foreground lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </button>
              </MenuSheet>

              {/* Logo */}
              <LocalizedClientLink href="/" aria-label={logoAlt}>
                <LogoContainer src={logoSrc} alt={logoAlt} className="h-6" />
              </LocalizedClientLink>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-0.5">
              <AccountButton />
              <CartButton cart={cart} totalCartItems={totalItems} />
            </div>
          </nav>
        </div>

        <nav
          className="hidden md:block"
          role="navigation"
          aria-label="secondary navigation"
        >
          <div className="flex h-12 content-container items-center justify-center gap-8 px-6">
            <LocalizedClientLink
              href="/store"
              className={cn("nav-link data-[active=true]:nav-link-active")}
            >
              {t("store")}
            </LocalizedClientLink>

            <SecondaryNav topCategories={topCategories} />

            <LocalizedClientLink
              href="/whats-new"
              className={cn("nav-link data-[active=true]:nav-link-active")}
            >
              {t("new")}
            </LocalizedClientLink>
          </div>
        </nav>
      </header>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav cart={cart} totalCartItems={totalItems} />

      {/* Spacer for mobile bottom nav */}
      {/* <div className="h-16 md:hidden" aria-hidden="true" /> */}
    </>
  )
}
