import User from "../models/user.model.js"
import argon2 from "argon2"
import generateTokenAndSetCoookie from "../utils/generateToken.js"
export const signup =async (req,res)=>{
    try {
        const  {fullname,username,password,confirmpassword,gender}=req.body
   
   
   if(password !== confirmpassword){
    return res.status(404).json({error:"password dont match"})
   }
   


   const user = await User.findOne({username});
   if(user){
    return res.status(404).json({error:"username alredy exist"})
   }


   const boyprofilepic=`https://avatar.iran.liara.run/public/boy?username=${username}`
   const girlprofilepic=`https://avatar.iran.liara.run/public/girl?username=${username}`

const hashedpassword=await argon2.hash(password)
   const newUser = new User({
    fullname,
    username,
    password:hashedpassword,
    gender,
    profilepic: gender==="male"? boyprofilepic : girlprofilepic
   });
if(newUser){
    //generate jwt token

    generateTokenAndSetCoookie(newUser._id,res)
   await newUser.save();

   return res.status(201).json({
    _id: newUser._id,
    fullname: newUser.fullname,
    username: newUser.username,
    profilepic: newUser.profilepic
   })
}else{
    res.status(400).json({
        error:"Invalid user data"
    })
}
    } catch (error) {
        console.log("Error in singup controller",error.message)
     return res.status(404).json({
            error:"internal serval error"
        })
    }

}
export const login = async (req,res)=>{
   try {

    const {username,password}=req.body;

    const user = await User.findOne({username});
    if(!user){
     return   res.status(400).json({message:"user not found"})
    }
const isMatch = await argon2.verify(user.password,password);

if(!isMatch){
     return   res.status(400).json({message:"password not match"})
    
}
    generateTokenAndSetCoookie(user._id,res)


     return res.status(201).json({
    _id: user._id,
    fullname: user.fullname,
    username: user.username,
    profilepic: user.profilepic
   })

   } catch (error) {
     console.log("Error in singup controller",error.message)
     return res.status(404).json({
            error:"internal serval error"
        })
   }

}
export const logout =(req,res)=>{
   try {
    res.cookie('jwt',"",{maxAge:0});
    res.status(201).json({
        message:"Logged out successfully"
    })
   } catch (error) {
     console.log("Error in singup controller",error.message)
     return res.status(404).json({
            error:"internal serval error"
        })
   }
}
