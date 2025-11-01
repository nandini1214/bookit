import { Request, Response } from "express"
import Booking from "../models/Booking"
import Experience from "../models/Experience"

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { experienceId, name, email, date, slot, totalPrice } = req.body;

    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    // Check if slot exists
    if (!experience.slots.includes(slot)) {
      return res.status(400).json({ message: "Selected slot is not available" });
    }

    // Create booking
    const booking = await Booking.create({
      experienceId,
      name,
      email,
      date,
      slot,
      totalPrice,
    });

    // Remove booked slot (optional)
    experience.slots = experience.slots.filter((s) => s !== slot);
    await experience.save();

    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Booking failed" });
  }
};

