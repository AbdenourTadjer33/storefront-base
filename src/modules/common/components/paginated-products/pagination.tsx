"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination"

export function Pagination({
  page,
  totalPages,
  "data-testid": dataTestid,
}: {
  page: number
  totalPages: number
  "data-testid"?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Helper function to generate an array of numbers within a range
  const arrayRange = (start: number, stop: number) =>
    Array.from({ length: stop - start + 1 }, (_, index) => start + index)

  // Function to handle page changes
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return

    const params = new URLSearchParams(searchParams)
    params.set("page", newPage.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  // Function to render page buttons based on the current page and total pages
  const renderPageButtons = () => {
    const buttons = []

    if (totalPages <= 7) {
      // Show all pages
      buttons.push(
        ...arrayRange(1, totalPages).map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              onClick={() => handlePageChange(p)}
              isActive={p === page}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))
      )
    } else {
      // Handle different cases for displaying pages and ellipses
      if (page <= 4) {
        // Show 1, 2, 3, 4, 5, ..., lastpage
        buttons.push(
          ...arrayRange(1, 5).map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                onClick={() => handlePageChange(p)}
                isActive={p === page}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))
        )
        buttons.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        )
        buttons.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              onClick={() => handlePageChange(totalPages)}
              isActive={totalPages === page}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )
      } else if (page >= totalPages - 3) {
        // Show 1, ..., lastpage - 4, lastpage - 3, lastpage - 2, lastpage - 1, lastpage
        buttons.push(
          <PaginationItem key={1}>
            <PaginationLink
              onClick={() => handlePageChange(1)}
              isActive={1 === page}
            >
              1
            </PaginationLink>
          </PaginationItem>
        )
        buttons.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        )
        buttons.push(
          ...arrayRange(totalPages - 4, totalPages).map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                onClick={() => handlePageChange(p)}
                isActive={p === page}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))
        )
      } else {
        // Show 1, ..., page - 1, page, page + 1, ..., lastpage
        buttons.push(
          <PaginationItem key={1}>
            <PaginationLink
              onClick={() => handlePageChange(1)}
              isActive={1 === page}
            >
              1
            </PaginationLink>
          </PaginationItem>
        )
        buttons.push(
          <PaginationItem key="ellipsis3">
            <PaginationEllipsis />
          </PaginationItem>
        )
        buttons.push(
          ...arrayRange(page - 1, page + 1).map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                onClick={() => handlePageChange(p)}
                isActive={p === page}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))
        )
        buttons.push(
          <PaginationItem key="ellipsis4">
            <PaginationEllipsis />
          </PaginationItem>
        )
        buttons.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              onClick={() => handlePageChange(totalPages)}
              isActive={totalPages === page}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )
      }
    }

    return buttons
  }

  return (
    <div className="flex justify-center w-full mt-12">
      <PaginationComponent data-testid={dataTestid}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(page - 1)}
              className={
                page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
              }
            />
          </PaginationItem>

          {renderPageButtons()}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(page + 1)}
              className={
                page === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationComponent>
    </div>
  )
}
