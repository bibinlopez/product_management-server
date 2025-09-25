import dotenv from "dotenv"
dotenv.config()
import express from "express"
import mongoose from "mongoose"
import cors from "cors"

import authRoute from "./routes/authRoutes.js"

const app = express()

app.use(express.json())

app.use(cors())

app.get("/", (req, res) => {
  res.send("Welcome to api landing page..")
})

app.use("/api/auth", authRoute)

app.use((err, req, res, next) =>
  res
    .status(err.statusCode || 500)
    .json({ success: false, message: err.message || "Something went wrong!!!" })
)

const port = process.env.PORT || 4000

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "seclob" })
    console.log("CONNECTED TO THE DB...")
    app.listen(port, console.log(`Server is listening on the port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
