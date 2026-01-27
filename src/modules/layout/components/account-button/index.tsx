import { cn } from "@lib/util/utils"
import User from "@modules/common/icons/user"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function AccountButton() {
  return (
    <LocalizedClientLink
      href="/account"
      className={cn(
        "p-2 rounded-full transition-colors duration-200",
        "hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
      aria-label="Account"
      data-testid="nav-account-link"
    >
      <User className="size-5 text-foreground" strokeWidth={1.5} />
    </LocalizedClientLink>
  )
}
