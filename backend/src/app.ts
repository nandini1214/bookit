import express, { Application, Request, Response } from "express"
import cors from "cors"
import morgan from "morgan"
import experienceRoutes from "./routes/experienceRoutes"
import bookingRoutes from "./routes/bookingRoutes"
import promoRoutes from "./routes/promoRoutes"

const app: Application = express()

app.use(cors())
console.log(cors())
app.use(express.json())
app.use(morgan("dev"))

app.get("/", (req: Request, res: Response) => {
  res.send("🌍 BookIt API is running...")
})

app.use("/experiences", experienceRoutes)
app.use("/bookings", bookingRoutes)
app.use("/promo", promoRoutes)

export default app
      