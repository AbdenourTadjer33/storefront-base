/**
 * Safely get a nested value from metadata using dot-notation.
 *
 * Usage:
 *   getFromMetadata('badges.is_new', metadata, false)
 */
export function getFromMetadata<T>(
  key: string,
  metadata: Record<string, unknown> | null | undefined,
  defaultValue: T
): T {
  if (!metadata || typeof metadata !== "object") return defaultValue

  const keys = key.split(".")

  let result: any = metadata

  for (const k of keys) {
    if (result == null || typeof result !== "object" || !(k in result)) {
      return defaultValue
    }
    result = result[k]
  }

  return (result as T) ?? defaultValue
}

export const metadata = getFromMetadata
