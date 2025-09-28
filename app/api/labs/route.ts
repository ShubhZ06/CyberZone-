import { NextResponse } from "next/server"
// import { mockData } from "@/lib/data"

export async function GET() {
  try {
    // const labs = mockData.getLabs()
    const labs: any[] = [] // cleared mock data
    return NextResponse.json(labs)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch labs" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // In a real app, this would save to database
    console.log("[v0] Creating lab:", body) // debug prefix
    return NextResponse.json({ success: true, id: Date.now().toString() })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create lab" }, { status: 500 })
  }
}
