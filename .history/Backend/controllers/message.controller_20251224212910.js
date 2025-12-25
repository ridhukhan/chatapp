export const sendMessage =async (req,res)=>{
try {
    const {message}=req.body;
    const {id}=req.params;
    const senderId=req.userId
} catch (error) {
    console.log(" eroor in send message controller",error.message)

res.status(500).json({error:"INTERNAL SERVER ERROR"})
}
}