import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"
import { getCountryCode } from "@lib/data/cookies"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
  params: Promise<{}>
}

export default async function StorePage(props: Params) {
  const countryCode = await getCountryCode()

  if (!countryCode) {
    return null;
  }
  const params = await props.params
  const searchParams = await props.searchParams
  const { sortBy, page } = searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={countryCode}
    />
  )
}
