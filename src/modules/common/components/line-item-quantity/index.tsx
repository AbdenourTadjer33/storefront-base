"use client"

import { Button } from "@components/ui/button"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import Minus from "@modules/common/icons/minus"
import Plus from "@modules/common/icons/plus"
import Spinner from "@modules/common/icons/spinner"
import { useState } from "react"

interface Props {
  item: HttpTypes.StoreCartLineItem
}

export default function LineItemQuantity({ item }: Props) {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const maxQte = 10

  const changeQuantity = async (quantity: number) => {
    if (quantity < 0 || quantity > maxQte) return

    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon-sm"
        className="bg-muted hover:text-muted-foreground"
        disabled={updating}
        onClick={async () => await changeQuantity(item.quantity + 1)}
      >
        <Plus />
      </Button>
      <input
        type="text"
        className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-foreground focus:outline-none focus:ring-0"
        disabled={updating}
        value={item.quantity}
        onChange={(e) => {
          const newValue = parseInt(e.target.value)

          if (!newValue || typeof newValue !== "number") return
          changeQuantity(newValue)
        }}
      />

      <Button
        variant="outline"
        size="icon-sm"
        className="bg-muted hover:text-muted-foreground"
        disabled={updating}
        onClick={async () => await changeQuantity(item.quantity - 1)}
      >
        <Minus />
      </Button>
      {updating && <Spinner className="ms-1" />}
    </div>
  )
}
