import mongoose, { Document, Schema, Model } from 'mongoose'

export interface IMessage {
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: Date
}

type MessageDocument = IMessage & Document

const MessageSchema = new Schema<MessageDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const Message: Model<MessageDocument> =
  mongoose.models.Message ?? mongoose.model<MessageDocument>('Message', MessageSchema)
