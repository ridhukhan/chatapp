const express = require("express")
const app= express()

PORT= 5000;

app.listen(PORT,()=>{
    console.log(`your server is running at https://localhost:${PORT}`)
})