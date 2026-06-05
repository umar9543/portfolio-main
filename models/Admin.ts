import mongoose, { Document, Schema, Model } from 'mongoose'

export interface IAdmin {
  email: string
  passwordHash: string
}

type AdminDocument = IAdmin & Document

const AdminSchema = new Schema<AdminDocument>({
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
})

export const Admin: Model<AdminDocument> =
  mongoose.models.Admin ?? mongoose.model<AdminDocument>('Admin', AdminSchema)
