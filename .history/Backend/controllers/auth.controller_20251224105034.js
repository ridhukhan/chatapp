import User from "../models/user.model.js"

export const singup =async (req,res)=>{
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


   const newUser = new User({
    fullname,
    username,
    password,
    gendar,
    profilepic: gender==="male"? boyprofilepic : girlprofilepic
   })

   await newUser.save()
    } catch (error) {
        res.status(404).send({
            message:error.message
        })
    }

}
export const login =(req,res)=>{
   console.log("login route")

}
export const logout =(req,res)=>{
   console.log("logout route")
}
