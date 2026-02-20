import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@components/ui/breadcrumb"
import LocalizedClientLink from "../localized-client-link"
import { Fragment } from "react"
import { useTranslations } from "next-intl"

type TBreadcrumbItem = { title: string; href: string }

export default function Breadcrumbs({
  breadcrumbs,
  addLogicalPrefixes = true,
  prefixWithHomeProducts = true,
}: {
  breadcrumbs: TBreadcrumbItem[]
  addLogicalPrefixes?: boolean
  prefixWithHomeProducts?: boolean
}) {
  const t = useTranslations("components.nav")

  if (addLogicalPrefixes || prefixWithHomeProducts) {
    breadcrumbs.unshift({
      title: t("products"),
      href: "/store",
    })

    breadcrumbs.unshift({
      title: t("home"),
      href: "/",
    })
  }

  return (
    <>
      {breadcrumbs.length > 0 && (
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, i) => {
              const isLast = i === breadcrumbs.length - 1
              return (
                <Fragment key={i}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{item.title}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <LocalizedClientLink href={item.href}>
                          {item.title}
                        </LocalizedClientLink>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </Fragment>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      )}
    </>
  )
}
