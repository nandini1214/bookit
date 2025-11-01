import mongoose, { Schema, Document } from "mongoose"

export interface IExperience extends Document {
  title: string
  description: string
  image: string
  location: string
  price: number
  availableDates: string[]
  slots: string[]
}

const experienceSchema = new Schema<IExperience>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  availableDates: { type: [String], required: true },
  slots: { type: [String], required: true }
})

export default mongoose.model<IExperience>("Experience", experienceSchema)
