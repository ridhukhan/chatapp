import jwt from "jsonwebtoken"

const generateTokenAndSetCoookie = (userId,res)=>{

const token =jwt.sign({userId},process.env.JWT_SECRET,)
}