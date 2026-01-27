import { cn } from "@lib/util/utils"
import { HttpTypes } from "@medusajs/types"
import ShoppingBag from "@modules/common/icons/shopping-bag"
import CartSheet from "../cart-sheet"

interface Props {
  cart: HttpTypes.StoreCart | null
  totalCartItems: number
}

export default async function CartButton({
  cart: cartState,
  totalCartItems,
}: Props) {
  return (
    <CartSheet cart={cartState} totalCartItems={totalCartItems}>
      <button
        aria-label={`Shopping cart with ${totalCartItems} items`}
        className={cn(
          "relative p-2 rounded-full transition-colors duration-200",
          "hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
      >
        <ShoppingBag className="size-5 text-foreground" />
        {totalCartItems > 0 && (
          <span
            className={cn(
              "absolute -top-0.5 -end-0.5 flex items-center justify-center",
              "min-w-4.5 h-4.5 px-1 text-[10px] font-semibold",
              "bg-primary text-primary-foreground rounded-full",
              "animate-in zoom-in-50 duration-200"
            )}
          >
            {totalCartItems > 99 ? "99+" : totalCartItems}
          </span>
        )}
      </button>
    </CartSheet>
  )
}
