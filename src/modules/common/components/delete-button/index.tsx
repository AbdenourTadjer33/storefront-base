import { deleteLineItem } from "@lib/data/cart"
import { cn } from "@lib/util/utils"
import { useState } from "react"
import Trash from "@modules/common/icons/trash"
import Spinner from "@modules/common/icons/spinner"

const DeleteButton = ({
  id,
  children,
  className,
}: {
  id: string
  children?: React.ReactNode
  className?: string
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    await deleteLineItem(id).catch((err) => {
      setIsDeleting(false)
    })
  }

  return (
    <div className={cn("flex items-center justify-between text-sm", className)}>
      <button
        className="flex items-center gap-x-1 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
        onClick={() => handleDelete(id)}
      >
        {isDeleting ? <Spinner className="animate-spin" /> : <Trash />}
        <span>{children}</span>
      </button>
    </div>
  )
}

export default DeleteButton
