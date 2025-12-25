
import express from "express";
import dotenv from "dotenv";
import authroute from "./routes/auth.routes.js"
import messageroute from "./routes/message.routes.js"

import connectToMongoDB from "./db/connectToMongoDB.js";
const app= express()

dotenv.config()
const PORT=process.env.PORT;
app.use(express.json())
app.use("/api/auth",authroute);
app.use("/api/message",messageroute)

/*app.get('/',(req,res)=>{
    res.send("helllow world!!!!")
});*/




app.listen(PORT,()=>{
    connectToMongoDB()
    console.log(`your server is running at http://localhost:${PORT}`)
})