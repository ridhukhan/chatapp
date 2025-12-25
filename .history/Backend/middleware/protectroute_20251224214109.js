import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

const protectRoute =(req,res,next)=>{
    try {
        const token= req.cookies.jwt;
        if(!token){
            return res.status(401).json({error:"unauthorizd - no token provider"})
        }
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({error:"unauthorizd - no token provider"})

        }
        const user = await User.findById(decoded.userId).select("password")
    } catch (error) {
        console.log("Error in protectRoute MiddleWare",error.message)
   res.status(500).json({error:"Internal server error"})
    }
}