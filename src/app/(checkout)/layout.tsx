import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import LogoContainer from "@modules/layout/components/logo-container"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import { useTranslations } from "next-intl"
import storeConfig from "@lib/store-config"
import ChevronLeft from "@modules/common/icons/chevron-left"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const t = useTranslations("pages.checkout.layout")
  const logoSrc = storeConfig.logoSrc
  const logoAlt = storeConfig.logoAlt

  return (
    <div className="w-full bg-background relative small:min-h-screen">
      <div className="h-16 bg-navbar border-b border-navabr-border">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="group text-base flex items-center gap-x-2 uppercase flex-1 basis-0"
            data-testid="back-to-cart-link"
          >
            <ChevronLeft className="rtl:rotate-180 text-foreground/80 group-hover:text-foreground" size={16} />
            <span className="mt-px hidden small:block text-foreground/80 group-hover:text-foreground ">
              {t('back-to-cart')}
            </span>
            <span className="mt-px block small:hidden text-foreground/80 group-hover:text-foreground">
              {t('back')}
            </span>
          </LocalizedClientLink>

          <LocalizedClientLink href="/" data-testid="store-link">
            <LogoContainer src={logoSrc} alt={logoAlt} />
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>
      <div className="py-4 w-full flex items-center justify-center">
        <MedusaCTA />
      </div>
    </div>
  )
}
