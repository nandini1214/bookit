// server.ts
import dotenv from "dotenv"
import mongoose from "mongoose"
import app from "./app"

// -----------------------------
// 1️⃣ Load environment variables
// -----------------------------
dotenv.config()

// -----------------------------
// 2️⃣ Define and validate environment variables
// -----------------------------
const PORT: number = parseInt(process.env.PORT || "4000", 10)
const MONGO_URI: string | undefined = process.env.MONGO_URI

if (!MONGO_URI) {
  console.error("❌ Error: MONGO_URI is not defined in the .env file.")
  process.exit(1)
}

// -----------------------------
// 3️⃣ Connect to MongoDB and start server
// -----------------------------
const startServer = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log("✅ Connected to MongoDB Atlas")

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Failed to connect to MongoDB:", error.message)
    } else {
      console.error("❌ Unknown error while connecting to MongoDB.")
    }
    process.exit(1)
  }
}

// -----------------------------
// 4️⃣ Graceful shutdown
// -----------------------------
process.on("SIGINT", async () => {
  console.log("\n🛑 Received SIGINT. Closing MongoDB connection...")
  await mongoose.disconnect()
  console.log("✅ MongoDB connection closed. Exiting process.")
  process.exit(0)
})

process.on("unhandledRejection", (reason) => {
  console.error("❌ Unhandled Promise Rejection:", reason)
  process.exit(1)
})

// Start the server
startServer()
