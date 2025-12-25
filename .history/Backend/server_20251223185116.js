const express = require("express")
const app= express()

PORT= 5000;
app.get('/',(req,res)=>[
    res.send("helllow world!!")
])
app.listen(PORT,()=>{
    console.log(`your server is running at http://localhost:${PORT}`)
})