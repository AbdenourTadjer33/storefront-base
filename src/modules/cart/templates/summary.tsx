"use client"

import { Heading } from "@components/ui/heading"
import { Button } from "@components/ui/button"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { getCheckoutStep } from "@lib/util/get-checkout-step"
import { useTranslations } from "next-intl"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const t = useTranslations("templates.cart")
  const step = getCheckoutStep(cart)

  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="h3">
        {t("summary")}
      </Heading>
      <DiscountCode cart={cart} />
      <Divider />
      <CartTotals totals={cart} />
      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
      >
        <Button className="w-full" size="lg">
          {t("checkout")}
        </Button>
      </LocalizedClientLink>
    </div>
  )
}

export default Summary
