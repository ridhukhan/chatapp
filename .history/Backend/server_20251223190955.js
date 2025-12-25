
import express from "express";
import dotenv from "dotenv";
const app= express()

dotenv.config()
const PORT=process.env.PORT;
app.get('/',(req,res)=>{
    res.send("helllow world!!!!")
});


app.get("/api/auth/singup",(req,res)=>{
   console.log("singup route")
});
app.get("/api/auth/login",(req,res)=>{
   console.log("login route")
});
app.listen(PORT,()=>{
    console.log(`your server is running at http://localhost:${PORT}`)
})