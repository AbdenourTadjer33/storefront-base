import { cn } from "@lib/util/utils"
import { RotateCcw, Truck } from "lucide-react"
import { AccordionItem } from "./accordion-item"
import { useTranslations } from "next-intl"



interface Props {
  description?: string
  features?: string[]
  careInstructions?: string
  materials?: string | null
  dimensions?: {
    weight?: number | null
    length?: number | null
    width?: number | null
    height?: number | null
  }
  shipping?: {
    freeShippingThreshold?: number
    estimatedDays?: string
    returnDays?: number
  }
  warranty?: string
  className?: string
}

export default function ProductDetailsAccordion({
  description,
  features,
  careInstructions,
  materials,
  dimensions,
  shipping,
  warranty,
  className,
}: Props) {
  const t = useTranslations("components.product-details-accordion")

  return (
    <div
      className={cn("divide-y divide-border border-t border-border", className)}
    >
      {description && (
        <AccordionItem title={t("description")} defaultOpen>
          <p>{description}</p>
        </AccordionItem>
      )}

      {features && features.length > 0 && (
        <AccordionItem title={t("features")}>
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </AccordionItem>
      )}

      {(materials || careInstructions) && (
        <AccordionItem title={t("materials-care")}>
          {materials && (
            <p className="mb-2">
              <strong>{t("materials")}:</strong> {materials}
            </p>
          )}
          {careInstructions && (
            <p>
              <strong>{t("care")}:</strong> {careInstructions}
            </p>
          )}
        </AccordionItem>
      )}

      {dimensions && Object.values(dimensions).some(Boolean) && (
        <AccordionItem title={t("dimensions")}>
          <div className="grid grid-cols-2 gap-2">
            {dimensions.weight && (
              <div>
                <span className="text-muted-foreground">{t("weight")}:</span>{" "}
                {dimensions.weight}g
              </div>
            )}
            {dimensions.length && (
              <div>
                <span className="text-muted-foreground">{t("length")}:</span>{" "}
                {dimensions.length}cm
              </div>
            )}
            {dimensions.width && (
              <div>
                <span className="text-muted-foreground">{t("width")}:</span>{" "}
                {dimensions.width}cm
              </div>
            )}
            {dimensions.height && (
              <div>
                <span className="text-muted-foreground">{t("height")}:</span>{" "}
                {dimensions.height}cm
              </div>
            )}
          </div>
        </AccordionItem>
      )}

      {shipping && (
        <AccordionItem title={t("shipping")}>
          <div className="space-y-3">
            {shipping.freeShippingThreshold && (
              <p className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Free shipping on orders over ${shipping.freeShippingThreshold}
              </p>
            )}
            {shipping.estimatedDays && (
              <p>Estimated delivery: {shipping.estimatedDays}</p>
            )}
            {shipping.returnDays && (
              <p className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                {shipping.returnDays}-day free returns
              </p>
            )}
          </div>
        </AccordionItem>
      )}

      {warranty && (
        <AccordionItem title={t("warranty")}>
          <p>{warranty}</p>
        </AccordionItem>
      )}
    </div>
  )
}
