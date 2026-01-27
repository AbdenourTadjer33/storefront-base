"use client"

import { Button } from "@components/ui/button"
import { transferCart } from "@lib/data/customer"
import { StoreCart, StoreCustomer } from "@medusajs/types"
import { AlertCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"

function CartMismatchBanner(props: {
  customer: StoreCustomer
  cart: StoreCart
}) {
  const t = useTranslations("components.cart-mismatch-banner")
  const { customer, cart } = props
  const [isPending, setIsPending] = useState(false)

  const [actionText, setActionText] = useState(() => t("action"))

  if (!customer || !!cart.customer_id) {
    return
  }

  const handleSubmit = async () => {
    try {
      setIsPending(true)
      setActionText(() => t("action-loading"))

      await transferCart()
    } catch {
      setActionText(() => t("action"))
      setIsPending(false)
    }
  }

  return (
    <div className="flex items-center justify-center md:p-4 p-2 text-center bg-orange-300 md:gap-2 gap-1 text-sm mt-2 text-orange-800">
      <div className="flex flex-col md:flex-row md:gap-2 gap-1 items-center">
        <span className="flex items-center gap-1">
          <AlertCircle className="size-5" />
          {t("title")}
        </span>

        <span className="max-md:hidden">·</span>

        <Button
          variant="ghost"
          className="cursor-pointer hover:bg-transparent active:bg-transparent focus:bg-transparent disabled:text-orange-500 text-orange-950 p-0 bg-transparent"
          disabled={isPending}
          onClick={handleSubmit}
        >
          {actionText}
        </Button>
      </div>
    </div>
  )
}

export default CartMismatchBanner
