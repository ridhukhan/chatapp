export const singup =async (req,res)=>{
    try {
        const  {fullname,username,password,confirmpassword,gender}=req.body
   
   
   if(password !== confirmpassword){
    return res.status(404).json({error:"password dont match"})
   }
   
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
