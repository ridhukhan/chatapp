export const getUsersForSidebar=(req,res)=>{
try {
    
} catch (error) {
    console.error("Error in getUsersSidebar:",error)
res.status(500).json({error:"INTERNAL SERVER ERROR"})
    
}
}