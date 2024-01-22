import mongoose from "mongoose";
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { productRouter } from "./Routers/productRouter.js";
dotenv.config()
const port = 8000

const app = express()
app.use(cors())
app.use(express.json())

app.use("/products", productRouter)





const PASSWORD = process.env.PASSWORD
const URL = process.env.URL.replace("<password>", PASSWORD)
const PORT = process.env.PORT




mongoose.connect(URL)
  .then(() => console.log('salam verdim alana panyatkasi olana!'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
