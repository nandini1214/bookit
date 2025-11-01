import express, { Application, Request, Response, NextFunction } from "express"
import cors from "cors"
import morgan from "morgan"
import experienceRoutes from "./routes/experienceRoutes"
import bookingRoutes from "./routes/bookingRoutes"
import promoRoutes from "./routes/promoRoutes"

const app: Application = express()

// -----------------------------
// 🌍 Global Middleware
// -----------------------------
app.use(cors()) // Enable CORS for frontend calls
app.use(express.json()) // Parse JSON body
app.use(morgan("dev")) // HTTP request logger

// -----------------------------
// 🚫 Disable caching for all API responses
// -----------------------------
app.use((req: Request, res: Response, next: NextFunction) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private")
  res.set("Pragma", "no-cache") // for older browsers
  res.set("Expires", "0")
  next()
})

// -----------------------------
// 🏠 Root route
// -----------------------------
app.get("/", (req: Request, res: Response) => {
  res.send("🌍 BookIt API is running...")
})

// -----------------------------
// 🧭 Route registration
// -----------------------------
app.use("/experiences", experienceRoutes)
app.use("/bookings", bookingRoutes)
app.use("/promo", promoRoutes)

// -----------------------------
// ⚠️ 404 handler (optional but clean)
// -----------------------------
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" })
})

export default app
