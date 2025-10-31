import { Request, Response } from "express"
import Booking from "../models/Booking"
import Experience from "../models/Experience"

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { experienceId, name, email, date, totalPrice } = req.body

    const experience = await Experience.findById(experienceId)
    if (!experience) return res.status(404).json({ message: "Experience not found" })

    if (experience.slots <= 0) return res.status(400).json({ message: "No slots available" })

    const booking = await Booking.create({ experienceId, name, email, date, totalPrice })

    experience.slots -= 1
    await experience.save()

    res.status(201).json({ message: "Booking successful", booking })
  } catch (error) {
    res.status(500).json({ message: "Booking failed" })
  }
}
