import express, { Application, Request, Response } from "express"
import cors from "cors"
import morgan from "morgan"
import experienceRoutes from "./routes/experienceRoutes"
import bookingRoutes from "./routes/bookingRoutes"
import promoRoutes from "./routes/promoRoutes"

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.get("/", (req: Request, res: Response) => {
  res.send("🌍 BookIt API is running...")
})

app.use("/api/experiences", experienceRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/promo", promoRoutes)

export default app
