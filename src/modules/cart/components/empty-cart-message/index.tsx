import { Button } from "@components/ui/button"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useTranslations } from "next-intl"

const EmptyCartMessage = () => {
  const t = useTranslations("templates.cart")

  return (
    <div
      className="py-48 px-2 flex flex-col justify-center items-start"
      data-testid="empty-cart-message"
    >
      <Heading
        level="h1"
        className="flex flex-row text-3xl gap-x-2 items-baseline"
      >
        {t("title")}
      </Heading>
      <Text className="text-base mt-4 mb-6 max-w-lg">
        {t("empty-description")}
      </Text>

      <Button
        variant="outline"
        className="h-auto py-3 w-full text-base font-medium"
        asChild
      >
        <LocalizedClientLink href="/store">
          {t("explore-products")}
        </LocalizedClientLink>
      </Button>
    </div>
  )
}

export default EmptyCartMessage
