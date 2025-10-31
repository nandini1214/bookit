import { Request, Response } from "express"
import Experience from "../models/Experience"

export const getExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await Experience.find()
    res.status(200).json(experiences)
  } catch (error) {
    res.status(500).json({ message: "Error fetching experiences" })
  }
}

export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const experience = await Experience.findById(req.params.id)
    if (!experience) return res.status(404).json({ message: "Experience not found" })
    res.status(200).json(experience)
  } catch (error) {
    res.status(500).json({ message: "Error fetching experience details" })
  }
}
