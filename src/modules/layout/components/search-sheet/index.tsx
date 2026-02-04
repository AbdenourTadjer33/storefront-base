import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet"
import storeConfig from "@lib/store-config"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useTranslations } from "next-intl"
import React from "react"
import LogoContainer from "../logo-container"
import SearchBar from "../search-bar"
import AccountButton from "../account-button"
import CartButton from "../cart-button"
import { HttpTypes } from "@medusajs/types"

interface Props {
  cart: HttpTypes.StoreCart | null
  totalCartItems: number
  children: React.ReactNode
}

export default function SearchSheet({ cart, totalCartItems, children }: Props) {
  const logoSrc = storeConfig.logoSrc
  const logoAlt = storeConfig.logoAlt

  const t = useTranslations("components.search")

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="top" className="md:py-10 max-md:h-full">
        <SheetHeader>
          <SheetTitle className="md:sr-only font-medium">
            {t("title")}
          </SheetTitle>
          <SheetDescription className="sr-only">Search bar</SheetDescription>
        </SheetHeader>
        <div className="content-container hidden md:flex items-start justify-between gap-4">
          <div className="shrink-0">
            <LocalizedClientLink href="/">
              <LogoContainer src={logoSrc} alt={logoAlt} />
            </LocalizedClientLink>
          </div>

          <div className="flex-1 flex flex-col max-w-xl gap-3">
            <SearchBar className="max-w-xl w-full" autoFocus />
            <p className="text-sm text-muted-foreground">{t("hint")}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <AccountButton />
            <CartButton cart={cart} totalCartItems={totalCartItems} />
          </div>
        </div>
        <div className="md:hidden flex flex-col">
          <SearchBar autoFocus />
          <div className="flex-1 py-2">
            <p className="text-sm text-muted-foreground">{t("hint")}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
