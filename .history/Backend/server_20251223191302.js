
import express from "express";
import dotenv from "dotenv";
const app= express()

dotenv.config()
const PORT=process.env.PORT;
app.get('/',(req,res)=>{
    res.send("helllow world!!!!")
});



app.use("/api/auth",authroute)
app.listen(PORT,()=>{
    console.log(`your server is running at http://localhost:${PORT}`)
})