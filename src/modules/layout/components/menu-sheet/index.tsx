"use client"

import { useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Button } from "@components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet"
import { getLocaleDir } from "@i18n/config"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import User from "@modules/common/icons/user"
import { sortCategories } from "@lib/util/sort-categories"
import { CategoryNode } from "@lib/util/build-category-tree"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@components/ui/collapsible"

interface Props {
  sortedCategories: CategoryNode[]
  customer?: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

interface ExpandedState {
  [key: string]: boolean
}

export default function MenuSheet({
  sortedCategories,
  customer,
  children,
}: Props) {
  const t = useTranslations("components.nav")
  const locale = useLocale()
  const [sheetOpen, setSheetOpen] = useState(false)

  const close = () => setSheetOpen(false)

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={getLocaleDir(locale) === "ltr" ? "left" : "right"}
        className="flex h-full flex-col pb-0 sm:pb-0 p-0 w-full sm:w-96"
      >
        <SheetHeader className="shrink-0">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            This is the menu sheet
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          <nav className="flex flex-col">
            {/* Main Navigation */}
            <div className="py-2">
              <LocalizedClientLink
                href="/store"
                className="mobile-nav-link px-4"
                onClick={close}
              >
                {t("store")}
              </LocalizedClientLink>

              {sortedCategories.map((category) => (
                <div key={category.id}>
                  {category.category_children.length > 0 ? (
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <button className="group mobile-nav-link px-4 flex w-full items-center justify-between">
                          <LocalizedClientLink
                            href={`/categories/${category.handle}`}
                            onClick={close}
                          >
                            {category.name}
                          </LocalizedClientLink>
                          <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                        </button>
                      </CollapsibleTrigger>

                      <CollapsibleContent className="bg-secondary/50 py-2">
                        {sortCategories(category.category_children).map(
                          (child) => (
                            <div key={child.id}>
                              {child.category_children.length > 0 ? (
                                <Collapsible>
                                  <CollapsibleTrigger asChild>
                                    <button className="group flex w-full items-center justify-between py-2.5 pl-8 pr-4 text-sm text-muted-foreground hover:text-foreground">
                                      <span className="font-medium uppercase tracking-wide text-xs">
                                        <LocalizedClientLink
                                          href={`/categories/${child.handle}`}
                                          onClick={close}
                                        >
                                          {child.name}
                                        </LocalizedClientLink>
                                      </span>
                                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-data-[state=open]:rotate-180" />
                                    </button>
                                  </CollapsibleTrigger>

                                  <CollapsibleContent className="bg-secondary/80 py-1">
                                    {sortCategories(
                                      child.category_children
                                    ).map((grandchild) => (
                                      <LocalizedClientLink
                                        key={grandchild.id}
                                        href={`/categories/${grandchild.handle}`}
                                        className="block py-2 pl-12 pr-4 text-sm text-muted-foreground hover:text-foreground"
                                        onClick={close}
                                      >
                                        {grandchild.name}
                                      </LocalizedClientLink>
                                    ))}
                                  </CollapsibleContent>
                                </Collapsible>
                              ) : (
                                <LocalizedClientLink
                                  href={`/categories/${child.handle}`}
                                  className="block py-2.5 pl-8 pr-4 text-xs font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground"
                                  onClick={close}
                                >
                                  {child.name}
                                </LocalizedClientLink>
                              )}
                            </div>
                          )
                        )}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <LocalizedClientLink
                      href={`/categories/${category.handle}`}
                      className="mobile-nav-link px-4"
                      onClick={close}
                    >
                      {category.name}
                    </LocalizedClientLink>
                  )}
                </div>
              ))}

              <LocalizedClientLink
                href="/whats-new"
                className="mobile-nav-link px-4"
                onClick={close}
              >
                {t("new")}
              </LocalizedClientLink>
            </div>
          </nav>
        </div>

        {/* Account Section */}
        <SheetFooter className="mt-auto">
          <div className="mt-auto flex flex-col gap-2 p-4 pt-0">
            {customer ? (
              <>
                <Button asChild>
                  <LocalizedClientLink href="/account" onClick={close}>
                    <User className="h-4 w-4" />
                    {t("account")}
                  </LocalizedClientLink>
                </Button>
              </>
            ) : (
              <>
                <p className="flex items-center text-foreground space-x-2">
                  <User className="size-5" />
                  <span className="font-medium">{t("account")}</span>
                </p>

                <Button asChild>
                  <LocalizedClientLink href="/account" onClick={close}>
                    {t("login")}
                  </LocalizedClientLink>
                </Button>

                <Button variant="outline" asChild>
                  <LocalizedClientLink
                    href="/account?register=1"
                    onClick={close}
                  >
                    {t("register")}
                  </LocalizedClientLink>
                </Button>
              </>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
