import { NextResponse } from "next/server"
// import { mockData } from "@/lib/data"

export async function GET() {
  try {
    // const modules = mockData.getModules()
    const modules: any[] = [] // cleared mock data
    return NextResponse.json(modules)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch modules" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // In a real app, this would save to database
    console.log("[v0] Creating module:", body) // debug prefix
    return NextResponse.json({ success: true, id: Date.now().toString() })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create module" }, { status: 500 })
  }
}
