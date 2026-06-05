import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  shortDesc: z.string().min(1, 'Short description is required').max(120, 'Max 120 characters'),
  fullDesc: z.string().optional(),
  techStack: z.array(z.string()).default([]),
  category: z.enum(['Frontend', 'Backend', 'Full-Stack']),
  githubUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  liveUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  thumbnail: z.string().optional(),
  cloudinaryId: z.string().optional(),
  featured: z.boolean().default(false),
  order: z.number().default(0),
})

export const projectUpdateSchema = projectSchema.partial()

export const messageSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
})

export const markReadSchema = z.object({
  read: z.boolean(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type ProjectInput = z.infer<typeof projectSchema>
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>
export type MessageInput = z.infer<typeof messageSchema>
export type MarkReadInput = z.infer<typeof markReadSchema>
