
import express from "express";
import dotenv from "dotenv";
import authroute from "./routes/auth.routes.js"
import messageroute from "./routes/message.routes.js"
import usersroute from "./routes/users.routes.js"

import cookieParser from "cookie-parser";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app } from "./socket/Socket.js";
const app= express()

dotenv.config()
const PORT=process.env.PORT;
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authroute);
app.use("/api/message",messageroute)
app.use("/api/users",usersroute)


/*app.get('/',(req,res)=>{
    res.send("helllow world!!!!")
});*/




app.listen(PORT,()=>{
    connectToMongoDB()
    console.log(`your server is running at http://localhost:${PORT}`)
})