import User from "../models/user.model.js"

export const getUsersForSidebar=async(req,res)=>{
try {
    


const loggedinuserId =req.user._id

const filteredUsers = await User.find({_id: {$ne :loggedinuserId}})
res.status(200).json(filteredUsers)



} catch (error) {
    console.error("Error in getUsersSidebar:",error)
res.status(500).json({error:"INTERNAL SERVER ERROR"})
    
}
}