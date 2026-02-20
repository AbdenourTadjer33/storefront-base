import { cn } from "@lib/util/utils"

const Divider = ({ className }: { className?: string }) => (
  <div className={cn("h-px w-full border-b border-border mt-1", className)} />
)

export default Divider
