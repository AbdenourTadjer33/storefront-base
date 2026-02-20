import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@lib/util/utils"

export const headingVariants = cva("font-semibold tracking-tight", {
  variants: {
    level: {
      h1: "text-4xl lg:text-5xl",
      h2: "text-3xl lg:text-4xl",
      h3: "text-2xl lg:text-3xl",
      h4: "text-xl lg:text-2xl",
      h5: "text-lg font-medium",
      h6: "text-base",
    },
    muted: {
      true: "text-muted-foreground",
      false: "",
    },
  },
  defaultVariants: {
    level: "h2",
    muted: false,
  },
})

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: React.ElementType
}

export function Heading({
  className,
  level,
  muted,
  as,
  ...props
}: HeadingProps) {
  const Comp = as || level || "h2"

  return (
    <Comp
      className={cn(headingVariants({ level, muted }), className)}
      {...props}
    />
  )
}
