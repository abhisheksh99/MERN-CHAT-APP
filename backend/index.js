import express from "express"
import dotenv from "dotenv"
import {chats} from "./data/data.js"
dotenv.config()

const app = express();

app.get("/", (req,res)=>{
    res.send("Api is running")
})

app.get("/api/chats",(req,res)=>{
    res.send(chats)
})

app.get("/api/chat/:id",(req,res)=>{
    const singleChat = chats.find(c => c._id === req.params.id)
    res.send(singleChat)
    
})

app.listen(process.env.PORT,() => 
    console.log(`Server lsitening on ${process.env.PORT}`)
)
