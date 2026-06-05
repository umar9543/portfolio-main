import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Message } from '@/models/Message'
import { messageSchema } from '@/lib/validations'
import { Resend } from 'resend'


// Do NOT initialize Resend at module level — it throws during Vercel build
// if RESEND_API_KEY is missing. Initialize inside the handler instead.
const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? 'mumer9543@gmail.com'


export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = messageSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = parsed.data

    await connectDB()

    // Save to MongoDB
    await Message.create({ name, email, subject, message })

    // Send email notification via Resend (skip if API key not configured)
    try {
      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: CONTACT_EMAIL,
          subject: `[Portfolio] ${subject}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #00F5FF;">New Contact Form Message</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px; font-weight: bold; width: 100px;">From:</td>
                  <td style="padding: 8px;">${name} &lt;${email}&gt;</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Subject:</td>
                  <td style="padding: 8px;">${subject}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold; vertical-align: top;">Message:</td>
                  <td style="padding: 8px; white-space: pre-wrap;">${message}</td>
                </tr>
              </table>
            </div>
          `,
        })
      }
    } catch (emailError) {
      console.error('[RESEND EMAIL]', emailError)
      // Don't fail the request if email fails — message is already saved
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[POST CONTACT]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
