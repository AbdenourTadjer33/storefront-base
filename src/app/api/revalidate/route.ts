import { NextRequest, NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"
import { getCacheTag } from "@lib/data/cookies"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const tags = searchParams.get("tags") as string

  if (!tags) {
    return NextResponse.json({ error: "No tags provided" }, { status: 400 })
  }

  const tagsArray = tags.split(",")
  await Promise.all(
    tagsArray.map(async (tag) => {
      switch (tag) {
        case "products":
          revalidatePath("/(main)/", "page")
          revalidatePath("/(main)/store", "page")
          revalidatePath("/(main)/products/[handle]", "page")
          break
        case "collections":
          revalidatePath("/(main)/", "page")
          revalidatePath("/(main)/collections/[handle]", "page")
          break
        case "categories":
          revalidatePath("/(main)/", "page")
          revalidatePath("/(main)/", "layout")
          revalidatePath("/(main)/categories/[...category]")
          break
        case "shippingOption":
        case "shippingOptionType":
          revalidateTag(await getCacheTag("shippingOptions"))
        default:
          break
      }
    })
  )

  return NextResponse.json({ message: "Revalidated" }, { status: 200 })
}
