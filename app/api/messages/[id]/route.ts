import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Message } from '@/models/Message'
import { requireAdmin } from '@/lib/auth'
import { markReadSchema } from '@/lib/validations'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin(request)
    const { id } = await params
    await connectDB()

    const body = await request.json()
    const parsed = markReadSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const message = await Message.findByIdAndUpdate(
      id,
      { read: parsed.data.read },
      { new: true }
    ).lean()

    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 })
    }

    return NextResponse.json(message)
  } catch (error) {
    if (error instanceof NextResponse) return error
    console.error('[PATCH MESSAGE]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
