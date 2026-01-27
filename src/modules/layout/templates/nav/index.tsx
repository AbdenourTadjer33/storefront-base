import { cn } from "@lib/util/utils"
import { retrieveCart } from "@lib/data/cart"

import CartButton from "@modules/layout/components/cart-button"
import AccountButton from "@modules/layout/components/account-button"
import LogoContainer from "@modules/layout/components/logo-container"
import MobileBottomNav from "@modules/layout/components/mobile-bottom-nav"
import SearchBar from "@modules/layout/components/search-bar"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface Props {
  sticky?: boolean
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
 */
export default async function Nav({ sticky }: Props) {
  const cart = await retrieveCart().catch(() => null)

  const totalItems =
    cart?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const logoSrc = "/logo.svg"
  const logoAlt = "logo"

  return (
    <>
      {/* Main Navbar */}
      <header
        // dir={dir}
        className={cn(
          "w-full bg-background/95 backdrop-blur-md",
          "border-b border-border/50",
          "transition-shadow duration-200",
          sticky && "sticky top-0 z-50 shadow-sm"
        )}
      >
        <div className="container mx-auto px-4">
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
              <SearchBar className="max-w-lg w-full" />
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
            {/* Logo */}
            <LocalizedClientLink href="/" aria-label={logoAlt}>
              <LogoContainer src={logoSrc} alt={logoAlt} className="h-6" />
            </LocalizedClientLink>

            {/* Actions */}
            <div className="flex items-center gap-0.5">
              <AccountButton />
              <CartButton cart={cart} totalCartItems={totalItems} />
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav totalCartItems={totalItems} />

      {/* Spacer for mobile bottom nav */}
      {/* <div className="h-16 md:hidden" aria-hidden="true" /> */}
    </>
  )
}
