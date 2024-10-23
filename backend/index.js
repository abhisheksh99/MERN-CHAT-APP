import express from "express"
import dotenv from "dotenv"
import {chats} from "./data/data.js"
import connectDb from "./config/db.js"
import userRoutes from "./routes/userRoute.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js"

dotenv.config()

connectDb()
const app = express();

app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Api is running")
})

app.use("/api/user",userRoutes)


// middleware routes
app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT,() => 
    console.log(`Server lsitening on ${process.env.PORT}`)
)
