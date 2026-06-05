import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Project } from '@/models/Project'
import { projectUpdateSchema } from '@/lib/validations'
import { requireAdmin } from '@/lib/auth'
import cloudinary from '@/lib/cloudinary'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await connectDB()
    const project = await Project.findById(id).lean()
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }
    return NextResponse.json(project)
  } catch (error) {
    console.error('[GET PROJECT]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin(request)
    const { id } = await params
    await connectDB()

    const body = await request.json()
    const parsed = projectUpdateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const project = await Project.findByIdAndUpdate(id, parsed.data, {
      new: true,
      runValidators: true,
    }).lean()

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    if (error instanceof NextResponse) return error
    console.error('[PUT PROJECT]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin(request)
    const { id } = await params
    await connectDB()

    const project = await Project.findById(id)
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Delete image from Cloudinary if it exists
    if (project.cloudinaryId) {
      try {
        await cloudinary.uploader.destroy(project.cloudinaryId)
      } catch (cloudinaryError) {
        console.error('[CLOUDINARY DELETE]', cloudinaryError)
      }
    }

    await Project.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof NextResponse) return error
    console.error('[DELETE PROJECT]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
