import mongoose, { Schema, Document } from "mongoose"

export interface IPromo extends Document {
  code: string
  discountType: string // e.g. 'percent' or 'flat'
  value: number
}

const promoSchema = new Schema<IPromo>({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, required: true },
  value: { type: Number, required: true }
})

export default mongoose.model<IPromo>("Promo", promoSchema)
