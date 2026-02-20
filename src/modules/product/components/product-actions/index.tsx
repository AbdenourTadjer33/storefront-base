"use client"

import { cn } from "@lib/util/utils"
import { motion } from "framer-motion"
import { useMemo, useState } from "react"
import { HttpTypes } from "@medusajs/types"
import Spinner from "@modules/common/icons/spinner"
import AlertCircle from "@modules/common/icons/alert-circle"
import { useTranslations } from "next-intl"
import { Button } from "@components/ui/button"
import Plus from "@modules/common/icons/plus"
import Minus from "@modules/common/icons/minus"
import { useRouter } from "next/navigation"

interface ProductActionsProps {
  selectedVariant: HttpTypes.StoreProductVariant | undefined
  isComplete: boolean
  onAddToCart: (qte?: number) => void
  onBuyNow: (qte?: number) => void
  isAddingToCart?: boolean
  isBuyingNow?: boolean
  layout?: "default" | "stacked" | "inline"
  className?: string
}

export default function ProductActions({
  selectedVariant,
  onAddToCart,
  onBuyNow,
  isComplete,
  isAddingToCart = false,
  isBuyingNow = false,
  layout = "stacked",
  className,
}: ProductActionsProps) {
  const t = useTranslations("components.product-actions")
  const router = useRouter()
  const [qte, setQte] = useState<number | null>(1)

  const { canPurchase, status, message } = useMemo(() => {
    if (!selectedVariant) {
      return {
        status: "in_stock",
        canPurchase: false,
        message: "Select options to see availability",
      }
    }

    const { manage_inventory, inventory_quantity, allow_backorder } =
      selectedVariant

    // Not managing inventory = always available
    if (!manage_inventory) {
      return { status: "in_stock", canPurchase: true }
    }

    const qty = inventory_quantity ?? 0

    if (qty > 10) {
      return { status: "in_stock", quantity: qty, canPurchase: true }
    }

    if (qty > 0 && qty <= 10) {
      return {
        status: "low_stock",
        quantity: qty,
        canPurchase: true,
        message: `Only ${qty} left in stock`,
      }
    }

    // Out of stock
    if (allow_backorder) {
      return {
        status: "backorder",
        quantity: 0,
        canPurchase: true,
        message: "Available for backorder",
      }
    }

    return {
      status: "out_of_stock",
      quantity: 0,
      canPurchase: false,
      message: "Out of stock",
    }
  }, [selectedVariant])

  const isDisabled =
    !isComplete || !canPurchase || isAddingToCart || isBuyingNow

  const maxQte = 10

  const handleQteChange = (qte: number) => {
    if (qte <= 0 || qte > maxQte) return

    setQte(qte)
  }

  const resolveQte = () => {
    let quantity = 1

    if (qte && typeof qte === "number" && qte! > maxQte) {
      quantity = qte
    }

    return quantity
  }

  const handleAddToCart = async () => {
    onAddToCart?.(resolveQte())
    setQte(1)
  }

  const handleBuyNow = async () => {
    onBuyNow?.(resolveQte())
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Inventory status message */}
      {message && status !== "in_stock" && (
        <motion.div
          className={cn(
            "flex items-center gap-2 text-sm px-3 py-2 rounded-sm",
            status === "low_stock" &&
              "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
            status === "out_of_stock" && "bg-destructive/10 text-destructive",
            status === "backorder" &&
              "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
          )}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </motion.div>
      )}

      {/* Action buttons */}
      <div
        className={cn(
          "flex gap-3",
          layout === "stacked" && "flex-col",
          layout === "inline" && "flex-row"
        )}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Button
              variant="outline"
              // size="icon-sm"
              className="bg-muted hover:text-muted-foreground"
              disabled={isDisabled}
              onClick={() => handleQteChange((qte ?? 0) + 1)}
            >
              <Plus />
            </Button>
            <input
              type="text"
              className="w-10 shrink-0 border-0 bg-transparent text-center text-base font-medium text-foreground focus:outline-none focus:ring-0"
              disabled={isDisabled}
              value={qte ?? ""}
              onChange={(e) => {
                const newValue = parseInt(e.target.value)
                if (!newValue || typeof newValue !== "number") {
                  setQte(null)
                  return
                }
                handleQteChange(newValue)
              }}
            />
            <Button
              variant="outline"
              // size="icon"
              className="bg-muted hover:text-muted-foreground"
              disabled={isDisabled}
              onClick={() => handleQteChange((qte ?? 0) - 1)}
            >
              <Minus />
            </Button>
          </div>

          {/* Add to Cart - Primary action */}
          <Button
            variant="outline"
            className="flex-1 btn-secondary-product"
            disabled={isDisabled}
            onClick={handleAddToCart}
            size="lg"
          >
            {isAddingToCart && <Spinner className="w-5 h-5" />}
            <span>
              {status === "out_of_stock"
                ? t("out-of-stock")
                : status === "backorder"
                ? t("pre-order")
                : t("add-cart")}
            </span>
          </Button>
        </div>
        <Button
          variant="default"
          size="lg"
          className="btn-primary-product"
          disabled={isDisabled}
          onClick={handleBuyNow}
        >
          {isBuyingNow && <Spinner className="w-5 h-5 animate-spin" />}
          <span>{t("buy-now")}</span>
        </Button>
      </div>

      {/* Help text when selection incomplete */}
      {!isComplete && (
        <p className="text-sm text-muted-foreground text-center">
          {t("select-options")}
        </p>
      )}
    </div>
  )
}
