/**
 * This is product preview (cards) design variants.
 *
 * @property classic: This is a classic card, the card thumbnail is aspect-9/14.
 * @property compact: This compact card, the card thumbnail is aspect-square.
 */
type ProductPreviewDesignVariant = "classic" | "compact"

/**
 * This is product overview design variants.
 *
 * @property classic
 * @property compact
 * @property editorial
 */
type ProductOverviewDesignVariant = "classic" | "compact" | "editorial"

/**
 * This is products display mode in (Products / Category / Collection) pages.
 *
 * @property pagination: this will render the product cards with a pagination element.
 * @property infinite-scroll: this will render the product cards and load more when you reach the end.
 */
type ProductsDisplayMode = "pagination" | "infinite-scroll"

/**
 * This determine if we display breadcrumb in header page.
 */
type ShowBreadcrumbsInPageHeaders = boolean

type IsNavbarSticky = boolean

type ShowPromoBanner = boolean

type PromoBannerVariant = "classic" | "social-media" | "promotion" | "shop-now" | "discover"

type ShowSecondaryNav = true

interface StoreConfig {
  showPromoBanner: ShowPromoBanner
  promoBannerVariant?: PromoBannerVariant
  showSecondaryNav: ShowSecondaryNav
  isNavbarSticky: IsNavbarSticky
  showBreadcrumbsInPageHeaders: ShowBreadcrumbsInPageHeaders
  productOverviewDesignVariant: ProductOverviewDesignVariant
  productPreviewVariant: ProductPreviewDesignVariant

  displayMode: ProductsDisplayMode

  logoSrc: string
  logoAlt: string
}

const config: StoreConfig = {
  showPromoBanner: true,

  promoBannerVariant: "classic",

  showSecondaryNav: true,

  isNavbarSticky: true,

  showBreadcrumbsInPageHeaders: true,

  productPreviewVariant: "compact",

  productOverviewDesignVariant: "classic",

  displayMode: "infinite-scroll",

  logoSrc: "/logo.svg",
  logoAlt: "Logo",
}

export default config
