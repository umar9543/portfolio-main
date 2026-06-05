import mongoose, { Document, Schema } from 'mongoose'

export interface IAdmin extends Document {
  email: string
  passwordHash: string
}

const AdminSchema = new Schema<IAdmin>({
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
})

export const Admin =
  mongoose.models.Admin ?? mongoose.model<IAdmin>('Admin', AdminSchema)
