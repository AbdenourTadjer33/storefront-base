import { Heading } from "@components/ui/heading"
import { Text } from "@components/ui/text"
import { Button } from "@components/ui/button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useTranslations } from "next-intl"

const SignInPrompt = () => {
  const t = useTranslations("templates.cart.sign-in")

  return (
    <div className="flex items-center justify-between">
      <div>
        <Heading level="h5">
          {t("title")}
        </Heading>
        <Text className="text-foreground/75 mt-2">{t("description")}</Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button variant="outline" data-testid="sign-in-button">
            {t("signin")}
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
