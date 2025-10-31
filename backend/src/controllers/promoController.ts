import { Request, Response } from "express"
import Promo from "../models/Promo"

export const validatePromo = async (req: Request, res: Response) => {
  try {
    const { code } = req.body
    const promo = await Promo.findOne({ code: code.toUpperCase() })
    if (!promo) return res.status(404).json({ message: "Invalid promo code" })
    res.status(200).json(promo)
  } catch (error) {
    res.status(500).json({ message: "Error validating promo code" })
  }
}
