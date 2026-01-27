import { cn } from "@lib/util/utils"

interface Props {
  src: string
  alt: string
  className?: string
}

/**
 * Logo container that handles any aspect ratio without stretching or cropping.
 * Uses fixed max-height with flexible width to preserve aspect ratio.
 */
export default function LogoContainer({ src, alt, className }: Props) {
  return (
    <div
      className={cn("flex items-center justify-center h-8 md:h-10", className)}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-auto max-w-[120px] md:max-w-[160px] object-contain"
        style={{ height: "100%", width: "auto" }}
      />
    </div>
  )
}
