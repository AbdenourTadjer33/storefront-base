import { HttpTypes } from "@medusajs/types"
import { useTranslations } from "next-intl"

type LineItemOptionsProps = {
  variant: HttpTypes.StoreProductVariant | undefined
  "data-testid"?: string
  "data-value"?: HttpTypes.StoreProductVariant
}

const LineItemOptions = ({
  variant,
  "data-testid": dataTestid,
  "data-value": dataValue,
}: LineItemOptionsProps) => {
  const t = useTranslations("components.line-item-options")

  return (
    <p
      data-testid={dataTestid}
      data-value={dataValue}
      className="inline-block sm:text-sm text-xs line-clamp-1"
    >
      {t("variant")}: <span className="font-medium">{variant?.title}</span>
    </p>
  )
}

export default LineItemOptions
