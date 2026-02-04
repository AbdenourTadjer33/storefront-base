"use client"

import React from "react"
import { Button } from "@components/ui/button"
import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@components/ui/sheet"
import { HttpTypes } from "@medusajs/types"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/product/components/thumbnail"
import LineItemQuantity from "@modules/common/components/line-item-quantity"

export function CartHeader({ title }: { title: string }) {
  return (
    <SheetHeader className="shrink-0 border-border border-b -mx-6">
      <SheetTitle className="px-6">{title}</SheetTitle>
      <SheetDescription className="sr-only">
        This is the shopping cart sheet
      </SheetDescription>
    </SheetHeader>
  )
}

export function CartFooter({
  subtotal,
  formattedSubtotal,
  checkoutStep,
  content,
}: {
  subtotal: number
  formattedSubtotal: string
  checkoutStep: string
  content: Record<string, string>
}) {
  return (
    <SheetFooter className="-mx-6 shrink-0">
      <div className="w-full flex-1 border-t border-border p-6 sm:pb-6 sm:pt-6 pb-4 pt-4">
        <div className="flex justify-between text-base font-medium text-foreground">
          <p>{content.subtotal}</p>
          <p data-testid="cart-subtotal" data-value={subtotal}>
            {formattedSubtotal}
          </p>
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {content.subtotalInfo}
        </p>
        <div className="mt-4 sm:space-y-4 space-y-2">
          <Button
            type="button"
            className="w-full sm:py-3 h-auto font-medium sm:text-base"
            variant="default"
            asChild
          >
            <LocalizedClientLink
              href={`/checkout?step=${checkoutStep}`}
              data-testid="checkout-button"
            >
              {content.checkout}
            </LocalizedClientLink>
          </Button>

          <Button
            type="button"
            className="w-full sm:py-3 h-auto font-medium sm:text-base"
            variant="outline"
            asChild
          >
            <SheetClose asChild>
              <LocalizedClientLink href="/store">
                {content.continueShopping}
              </LocalizedClientLink>
            </SheetClose>
          </Button>
        </div>
      </div>
    </SheetFooter>
  )
}

export function ScrollableCartItems({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 overflow-y-auto py-6 no-scrollbar">
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-border">
          {children}
        </ul>
      </div>
    </div>
  )
}

export function CartItem({
  item,
  currencyCode,
  content,
}: {
  item: HttpTypes.StoreCartLineItem
  currencyCode: string
  content: Record<string, string>
}) {
  return (
    <li key={item.id} data-testid="cart-item" className="flex py-6">
      <LocalizedClientLink
        href={`/products/${item.product_handle}`}
        className="w-20" // sm:w-24
      >
        <Thumbnail
          thumbnail={item.thumbnail}
          images={item.variant?.product?.images}
          size="square"
        />
      </LocalizedClientLink>
      <div className="ltr:ml-4 rtl:mr-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between">
            <h3 className="sm:text-base text-sm font-medium text-foreground line-clamp-2">
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
              currencyCode={currencyCode}
            />
          </div>
          <LineItemOptions
            variant={item.variant}
            data-testid="cart-item-variant"
            data-value={item.variant}
          />
        </div>
        <div className="flex flex-1 items-center justify-between text-sm">
          <LineItemQuantity item={item} />

          <DeleteButton id={item.id} data-testid="cart-item-remove-button">
            {content.remove}
          </DeleteButton>
        </div>
      </div>
    </li>
  )
}

export function EmptyCart({ content }: { content: Record<string, string> }) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <div className="space-y-4 w-full">
        <h3 className="text-lg font-semibold text-foreground text-center">
          {content.title}
        </h3>

        <p className="text-muted-foreground text-sm text-center">
          {content.description}
        </p>
        <Button
          variant="outline"
          className="h-auto py-3 w-full text-base font-medium"
          onClick={close}
          asChild
        >
          <SheetClose asChild>
            <LocalizedClientLink href="/store">
              {content.exploreProducts}
            </LocalizedClientLink>
          </SheetClose>
        </Button>
      </div>
    </div>
  )
}
