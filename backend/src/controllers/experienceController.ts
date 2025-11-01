import { Request, Response } from "express"
import mongoose from "mongoose"
import Experience from "../models/Experience"

// GET all experiences
export const getExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await Experience.find()
    console.log("✅ Backend found:", JSON.stringify(experiences, null, 2))
    res.status(200).json(experiences)
  } catch (err) {
    if (err instanceof mongoose.Error) {
      console.error("MongoDB error:", err.message)
      return res.status(500).json({ message: "Database error while fetching experiences" })
    }

    console.error("Unexpected error:", err)
    res.status(500).json({ message: "Internal server error" })
  }
}

// GET single experience by ID
export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // Handle invalid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid experience ID format" })
    }

    const experience = await Experience.findById(id)
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" })
    }

    res.status(200).json(experience)
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid ID provided" })
    }

    if (err instanceof mongoose.Error) {
      console.error("MongoDB error:", err.message)
      return res.status(500).json({ message: "Database error while fetching experience details" })
    }

    console.error("Unexpected error:", err)
    res.status(500).json({ message: "Internal server error" })
  }
}
