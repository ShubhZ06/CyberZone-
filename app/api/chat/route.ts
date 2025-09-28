import { NextRequest, NextResponse } from 'next/server'
import { chatCompletion } from '@/lib/ai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const prompt = (body?.prompt || '').toString()
    if (!prompt.trim()) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const reply = await chatCompletion(prompt)
    return NextResponse.json({ reply })
  } catch (e) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
