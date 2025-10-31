import mongoose from "mongoose"
import dotenv from "dotenv"
import Experience from "../models/Experience"

dotenv.config()

const MONGO_URI = process.env.MONGO_URI as string

const seedData = async () => {
  await mongoose.connect(MONGO_URI)

  await Experience.deleteMany()

  await Experience.insertMany([
    {
      title: "Hot Air Balloon Ride",
      description: "Experience sunrise from the sky!",
      image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff",
      location: "Cappadocia, Turkey",
      price: 200,
      availableDates: ["2025-11-01", "2025-11-05", "2025-11-10"],
      slots: 8
    },
    {
      title: "Scuba Diving Adventure",
      description: "Dive into the deep blue sea!",
      image: "https://images.unsplash.com/photo-1516900557540-80e7ff3c7c4a",
      location: "Bali, Indonesia",
      price: 150,
      availableDates: ["2025-11-03", "2025-11-06", "2025-11-09"],
      slots: 5
    }
  ])

  console.log("✅ Sample experiences added!")
  mongoose.connection.close()
}

seedData()
