import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export function useQueryParams() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string | null) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  return { queryParams: searchParams, setQueryParams }
}
