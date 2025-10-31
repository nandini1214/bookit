import dotenv from "dotenv"
import mongoose from "mongoose"
import app from "./app"

// Load environment variables from .env file
dotenv.config()

// Set up constants
const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI as string

// Connect to MongoDB Atlas
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas")

    // Start Express server after DB connection succeeds
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message)
    process.exit(1) // Exit app if DB connection fails
  })
