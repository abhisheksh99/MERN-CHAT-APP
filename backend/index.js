import express from "express"
import dotenv from "dotenv"
import {chats} from "./data/data.js"
import connectDb from "./config/db.js"
import userRoutes from "./routes/userRoute.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js"

dotenv.config()

connectDb()
const app = express();

// Increase the limit for JSON payloads
app.use(express.json({ limit: '50mb' }));

// Increase the limit for URL-encoded payloads
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get("/", (req,res)=>{
    res.send("Api is running")
})

app.use("/api/user", userRoutes)

// middleware routes
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
    console.log(`Server listening on port ${PORT}`)
)