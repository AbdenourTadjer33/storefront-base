"use client"

import { HttpTypes } from "@medusajs/types"
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
import { Button } from "@components/ui/button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import DeleteButton from "@modules/common/components/delete-button"
import { convertToLocale } from "@lib/util/money"
import { useLocale, useTranslations } from "next-intl"
import { getCheckoutStep } from "@lib/util/get-checkout-step"
import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { getLocaleDir } from "@i18n/config"

interface Props {
  cart?: HttpTypes.StoreCart | null
  totalCartItems: number
  children: React.ReactNode
}

export default function CartSheet({ cart, totalCartItems, children }: Props) {
  const t = useTranslations("components.shopping-cart")
  const locale = useLocale()

  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartSheetOpen, setCartSheetOpen] = useState(false)

  const open = () => setCartSheetOpen(true)
  const close = () => setCartSheetOpen(false)

  const subtotal = cart?.subtotal ?? 0
  const itemRef = useRef<number>(totalCartItems)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  useEffect(() => {
    if (itemRef.current !== totalCartItems && !pathname.includes("/cart")) {
      timedOpen()
    }
  }, [totalCartItems, itemRef.current])

  return (
    <Sheet open={cartSheetOpen} onOpenChange={setCartSheetOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={getLocaleDir(locale) === "ltr" ? "right" : "left"}
        className="flex h-full flex-col pb-0 sm:pb-0"
      >
        <SheetHeader className="shrink-0">
          <SheetTitle>{t("title")}</SheetTitle>
          <SheetDescription className="sr-only">
            This is the shopping cart sheet
          </SheetDescription>
        </SheetHeader>

        {cart && cart.items?.length ? (
          <>
            {/* Scrollable product list */}
            <div className="flex-1 overflow-y-auto py-6">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-border">
                  {cart.items
                    .sort((a, b) =>
                      (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                    )
                    .map((item) => (
                      <li
                        key={item.id}
                        data-testid="cart-item"
                        className="flex py-6"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="w-24"
                        >
                          <Thumbnail
                            thumbnail={item.thumbnail}
                            images={item.variant?.product?.images}
                            size="square"
                          />
                        </LocalizedClientLink>
                        <div className="ltr:ml-4 rtl:mr-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-foreground">
                              <h3>
                                <LocalizedClientLink
                                  href={`/products/${item.product_handle}`}
                                  data-testid="product-link"
                                >
                                  {item.title}
                                </LocalizedClientLink>
                              </h3>
                              <LineItemPrice
                                item={item}
                                style="tight"
                                currencyCode={cart.currency_code}
                              />
                            </div>
                            <LineItemOptions
                              variant={item.variant}
                              data-testid="cart-item-variant"
                              data-value={item.variant}
                            />
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p
                              className="text-muted-foreground"
                              data-testid="cart-item-quantity"
                              data-value={item.quantity}
                            >
                              {t("qty")} {item.quantity}
                            </p>

                            <DeleteButton
                              id={item.id}
                              data-testid="cart-item-remove-button"
                            >
                              {t("remove")}
                            </DeleteButton>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {/* Footer pinned to bottom */}
            <SheetFooter className="-mx-6 shrink-0">
              <div className="w-full flex-1 border-t border-border p-6">
                <div className="flex justify-between text-base font-medium text-foreground">
                  <p>{t("subtotal")}</p>
                  {/* <p>$262.00</p> */}
                  <p
                    className=""
                    data-testid="cart-subtotal"
                    data-value={subtotal}
                  >
                    {convertToLocale({
                      amount: subtotal,
                      currency_code: cart?.currency_code,
                    })}
                  </p>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {t("subtotal-info")}
                </p>
                <div className="mt-6 space-y-4">
                  <Button
                    type="button"
                    className="w-full py-3 h-auto text-base font-medium"
                    variant="default"
                    asChild
                  >
                    <LocalizedClientLink
                      href={`/checkout?step=${getCheckoutStep(cart)}`}
                      data-testid="checkout-button"
                    >
                      {t("checkout")}
                    </LocalizedClientLink>
                  </Button>

                  <Button
                    type="button"
                    className="w-full py-3 h-auto text-base font-medium"
                    variant="outline"
                    asChild
                  >
                    <SheetClose asChild>
                      <LocalizedClientLink href="/store">
                        {t("continue-shopping")}
                      </LocalizedClientLink>
                    </SheetClose>
                  </Button>
                </div>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="space-y-4 w-full">
              <h3 className="text-lg font-semibold text-foreground text-center">
                {t("empty-title")}
              </h3>

              <p className="text-muted-foreground text-sm text-center">
                {t("empty-description")}
              </p>
              <Button
                variant="outline"
                className="h-auto py-3 w-full text-base font-medium"
                onClick={close}
                asChild
              >
                <SheetClose asChild>
                  <LocalizedClientLink href="/store">
                    {t("explore-products")}
                  </LocalizedClientLink>
                </SheetClose>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
