
import express from "express";
import dotenv from "dotenv";
const app= express()

dotenv.config()
PORT=process.env.PORT;
app.get('/',(req,res)=>[
    res.send("helllow world!!!!")
])
app.listen(PORT,()=>{
    console.log(`your server is running at http://localhost:${PORT}`)
})