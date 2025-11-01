import mongoose, { Schema, Document } from "mongoose"

export interface IBooking extends Document {
  experienceId: string
  name: string
  email: string
  date: string
  totalPrice: number 
  slot : string
}

const bookingSchema = new Schema<IBooking>({
  experienceId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  slot : {type:String, required: true}
})

export default mongoose.model<IBooking>("Booking", bookingSchema)
