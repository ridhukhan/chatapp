const express = require("express")
const app= express()
const dotenv=require("dotenv");
dotenv.config()
PORT=process.env.PORT;
app.get('/',(req,res)=>[
    res.send("helllow world!!!!")
])
app.listen(PORT,()=>{
    console.log(`your server is running at http://localhost:${PORT}`)

    
})