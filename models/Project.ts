import mongoose, { Document, Schema, Model } from 'mongoose'

export interface IProject {
  title: string
  shortDesc: string
  fullDesc?: string
  techStack: string[]
  category: 'Frontend' | 'Backend' | 'Full-Stack'
  githubUrl?: string
  liveUrl?: string
  thumbnail?: string
  cloudinaryId?: string
  featured: boolean
  order: number
  createdAt: Date
}

type ProjectDocument = IProject & Document

const ProjectSchema = new Schema<ProjectDocument>(
  {
    title: { type: String, required: true },
    shortDesc: { type: String, required: true, maxlength: 120 },
    fullDesc: { type: String },
    techStack: { type: [String], default: [] },
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'Full-Stack'],
      required: true,
    },
    githubUrl: { type: String },
    liveUrl: { type: String },
    thumbnail: { type: String },
    cloudinaryId: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const Project: Model<ProjectDocument> =
  mongoose.models.Project ?? mongoose.model<ProjectDocument>('Project', ProjectSchema)
