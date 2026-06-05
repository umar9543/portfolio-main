import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Project } from '@/models/Project'
import { projectSchema } from '@/lib/validations'
import { requireAdmin } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {}
    if (category) filter.category = category
    if (featured === 'true') filter.featured = true

    const projects = await Project.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .lean()

    return NextResponse.json(projects)
  } catch (error) {
    console.error('[GET PROJECTS]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request)
    await connectDB()

    const body = await request.json()
    const parsed = projectSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const project = await Project.create(parsed.data)
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    if (error instanceof NextResponse) return error
    console.error('[POST PROJECT]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
