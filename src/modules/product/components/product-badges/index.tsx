"use client"

import { cn } from "@lib/util/utils"
import { useTranslations } from "next-intl"

interface ProductBadgeProps {
  type: "new" | "sale" | "bestseller" | "limited" | "custom"
  label?: string
  className?: string
}

const badgeStyles = {
  new: "badge-new",
  sale: "badge-sale",
  bestseller: "bg-foreground text-background",
  limited: "bg-amber-500 text-white",
  custom: "bg-muted text-foreground",
}

const defaultLabels = {
  new: "New",
  sale: "Sale",
  bestseller: "Bestseller",
  limited: "Limited Edition",
  custom: "",
}

function ProductBadge({ type, label, className }: ProductBadgeProps) {
  const displayLabel = label ?? defaultLabels[type]

  if (!displayLabel) return null

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-xs font-medium uppercase tracking-wider rounded-sm",
        badgeStyles[type],
        className
      )}
    >
      {displayLabel}
    </span>
  )
}

interface ProductBadgesProps {
  isNew?: boolean
  /**
   * here we should check if the product have list price of type sale.
   * so here we should modify the ProductBadges component to make this property
   * takes up a number. if gt 0, we display the badge `${howMuch}%`
   *
   * @deprecated
   */
  isOnSale?: boolean

  discountPercentage?: string | null

  isBestseller?: boolean
  isLimited?: boolean
  customBadges?: string[]
  className?: string
}

export default function ProductBadges({
  isOnSale,
  discountPercentage,
  isNew,
  isBestseller,
  isLimited,
  customBadges = [],
  className,
}: ProductBadgesProps) {
  const t = useTranslations("components.product-badges")
  const badges: Array<{ type: ProductBadgeProps["type"]; label?: string }> = []

  if (discountPercentage)
    badges.push({ type: "sale", label: `-${discountPercentage}%` })
  if (isNew) badges.push({ type: "new", label: t("new") })
  if (isBestseller) badges.push({ type: "bestseller", label: t("bestseller") })
  if (isLimited) badges.push({ type: "limited", label: t("limited") })

  customBadges.forEach((label) => badges.push({ type: "custom", label }))

  if (badges.length === 0) return null

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {badges.map((badge, idx) => (
        <ProductBadge key={`${badge.type}-${idx}`} {...badge} />
      ))}
    </div>
  )
}
