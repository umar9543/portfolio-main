import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { Admin } from '@/models/Admin'
import { Project } from '@/models/Project'
import bcryptjs from 'bcryptjs'

const SEED_SECRET = process.env.SEED_SECRET

const SEED_PROJECTS = [
  {
    title: 'Sales Contract Module – ERP',
    shortDesc: 'Enterprise ERP module with dynamic forms, validations, and PDF generation.',
    fullDesc:
      'Complete Sales Contract ERP module with master-detail data structures, complex validations, dynamic forms, editable data tables, and automated PDF generation using React-PDF. Integrated seamlessly into the existing ASP.NET Core backend with SQL Server.',
    techStack: ['ASP.NET Core', 'SQL Server', 'React', 'Material UI', 'React-PDF', 'C#'],
    category: 'Full-Stack',
    githubUrl: '',
    liveUrl: '',
    thumbnail: '',
    cloudinaryId: '',
    featured: true,
    order: 1,
  },
  {
    title: 'Cyclo ERP',
    shortDesc: 'Frontend for ERP covering Commercial and HR modules — 6+ modules total.',
    fullDesc:
      'Frontend development for Cyclo ERP covering the Commercial module (Export Invoice, LC Creation, Import Invoice) and HR module (Employee Profiles, Shifts, Salary Management, Holiday Tracking) — 6+ modules total built with React and Material UI.',
    techStack: ['React', 'Material UI', 'JavaScript', 'REST APIs'],
    category: 'Frontend',
    githubUrl: '',
    liveUrl: '',
    thumbnail: '',
    cloudinaryId: '',
    featured: true,
    order: 2,
  },
  {
    title: 'Project Management System',
    shortDesc: 'Full-stack system with client/project management and employee filtering.',
    fullDesc:
      'Full-stack project management system built independently from scratch. Features client and project management, employee-based filtering, task tracking, and complete UI/backend integration. Built with the MERN stack.',
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    category: 'Full-Stack',
    githubUrl: 'https://github.com/umar9543',
    liveUrl: '',
    thumbnail: '',
    cloudinaryId: '',
    featured: true,
    order: 3,
  },
  {
    title: 'Full Stack E-Commerce',
    shortDesc: 'Production e-commerce with headless CMS, Stripe payments, and dynamic SSR.',
    fullDesc:
      'Production-ready e-commerce application with headless CMS for product management via Sanity, Stripe payment processing with webhooks, dynamic SSR rendering with Next.js, cart management, and order tracking.',
    techStack: ['Next.js', 'Sanity CMS', 'Stripe', 'TypeScript', 'Tailwind CSS'],
    category: 'Full-Stack',
    githubUrl: 'https://github.com/umar9543',
    liveUrl: '',
    thumbnail: '',
    cloudinaryId: '',
    featured: true,
    order: 4,
  },
]

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get('x-seed-secret')

    if (!SEED_SECRET || secret !== SEED_SECRET) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await connectDB()

    // Seed admin
    const existingAdmin = await Admin.findOne({ email: 'admin@mumar.dev' })
    if (!existingAdmin) {
      const passwordHash = await bcryptjs.hash('Admin@1234', 12)
      await Admin.create({ email: 'admin@mumar.dev', passwordHash })
    }

    // Seed projects
    await Project.deleteMany({})
    await Project.insertMany(SEED_PROJECTS)

    return NextResponse.json({
      success: true,
      message: 'Seeded admin and 4 projects. DISABLE THIS ENDPOINT NOW.',
    })
  } catch (error) {
    console.error('[SEED]', error)
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 })
  }
}
