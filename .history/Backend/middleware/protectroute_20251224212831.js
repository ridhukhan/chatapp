import jwt from "jsonwebtoken"
const protectRoute =(req,res,next)=>{
    try {
        const token= req.cookie.jwt;
    } catch (error) {
        console.log("Error in protectRoute MiddleWare",error.message)
   res.status(500).json({error:"Internal server error"})
    }
}