export const getUsersForSidebar=(req,res)=>{
try {
    
} catch (error) {
    console.log("Error in getUsersSidebar:",error)
res.status(500).json({error:"INTERNAL SERVER ERROR"})
    
}
}