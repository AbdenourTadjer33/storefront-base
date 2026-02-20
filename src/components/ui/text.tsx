import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@lib/util/utils"

const textVariants = cva(
  "leading-7",
  {
    variants: {
      size: {
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
      },
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        subtle: "text-foreground/80",
        destructive: "text-destructive",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
      },
    },
    defaultVariants: {
      size: "base",
      variant: "default",
      weight: "normal",
    },
  }
)

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: React.ElementType
}

export function Text({
  className,
  size,
  variant,
  weight,
  as = "p",
  ...props
}: TextProps) {
  const Comp = as

  return (
    <Comp
      className={cn(textVariants({ size, variant, weight }), className)}
      {...props}
    />
  )
}
