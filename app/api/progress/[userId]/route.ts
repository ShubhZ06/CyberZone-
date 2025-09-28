import { NextResponse } from "next/server"
import { mockData } from "@/lib/data"

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    const progress = mockData.getUserProgress(params.userId)
    return NextResponse.json(progress)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 })
  }
}
