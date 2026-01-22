import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

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
          revalidatePath("/(main)/store", "page")
          revalidatePath("/(main)/products/[handle]", "page")
          break
        case "collections":
          break
        case "categories":
          revalidatePath("/(main)/", "page")
          revalidatePath("/(main)/", "layout")
          break
        default:
          break
      }
    })
  )

  return NextResponse.json({ message: "Revalidated" }, { status: 200 })
}
