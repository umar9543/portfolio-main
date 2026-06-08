import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Message } from '@/models/Message'
import { requireAdmin } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request)
    await connectDB()

    const { searchParams } = new URL(request.url)
    const unread = searchParams.get('unread')

    const filter = unread === 'true' ? { read: false } : {}
    const messages = await Message.find(filter).sort({ createdAt: -1 }).lean()

    return NextResponse.json(messages)
  } catch (error) {
    if (error instanceof NextResponse) return error
    console.error('[GET MESSAGES]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
