"use client"

import { HttpTypes } from "@medusajs/types"
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet"
import { convertToLocale } from "@lib/util/money"
import { useLocale, useTranslations } from "next-intl"
import { getCheckoutStep } from "@lib/util/get-checkout-step"
import { useState } from "react"
import { getLocaleDir } from "@i18n/config"
import {
  CartFooter,
  CartHeader,
  CartItem,
  EmptyCart,
  ScrollableCartItems,
} from "./parts"

interface Props {
  cart?: HttpTypes.StoreCart | null
  totalCartItems: number
  children: React.ReactNode
}

export default function CartSheet({ cart, totalCartItems, children }: Props) {
  const t = useTranslations("components.shopping-cart")
  const locale = useLocale()
  const [cartSheetOpen, setCartSheetOpen] = useState(false)

  const subtotal = cart?.subtotal ?? 0

  return (
    <Sheet open={cartSheetOpen} onOpenChange={setCartSheetOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={getLocaleDir(locale) === "ltr" ? "right" : "left"}
        className="flex h-full flex-col pb-0 sm:pb-0 w-full sm:w-96 gap-0"
      >
        <CartHeader title={t("title")} />

        {cart && cart.items?.length ? (
          <>
            {/* Scrollable product list */}
            <ScrollableCartItems>
              {cart.items
                .sort((a, b) =>
                  (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                )
                .map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    currencyCode={cart.currency_code}
                    content={{
                      qte: t("qty"),
                      remove: t("remove"),
                    }}
                  />
                ))}
            </ScrollableCartItems>

            {/* Footer pinned to bottom */}
            <CartFooter
              subtotal={subtotal}
              formattedSubtotal={convertToLocale({
                amount: subtotal,
                currency_code: cart.currency_code,
              })}
              checkoutStep={getCheckoutStep(cart)}
              content={{
                subtotal: t("subtotal"),
                subtotalInfo: t("subtotal-info"),
                checkout: t("checkout"),
                continueShopping: t("continue-shopping"),
              }}
            />
          </>
        ) : (
          <EmptyCart
            content={{
              title: t("empty-title"),
              description: t("empty-description"),
              exploreProducts: t("explore-products"),
            }}
          />
        )}
      </SheetContent>
    </Sheet>
  )
}
