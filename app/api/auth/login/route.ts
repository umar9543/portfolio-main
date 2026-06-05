import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Admin } from '@/models/Admin'
import { loginSchema } from '@/lib/validations'
import { signJWT, setAuthCookie } from '@/lib/auth'
import bcryptjs from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = loginSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { email, password } = parsed.data

    await connectDB()
    const admin = await Admin.findOne({ email: email.toLowerCase() })

    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const isValid = await bcryptjs.compare(password, admin.passwordHash)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = await signJWT({ sub: admin._id.toString(), email: admin.email })
    const response = NextResponse.json({ success: true })
    return setAuthCookie(response, token)
  } catch (error) {
    console.error('[AUTH LOGIN]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
