export const singup =async (req,res)=>{
    try {
        const  {fullname,username,password,confirmpassword,gender}=req.body
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
