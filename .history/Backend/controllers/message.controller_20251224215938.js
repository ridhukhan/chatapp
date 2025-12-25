import Conversation from "../models/conversation.model.js";

export const sendMessage =async (req,res)=>{
try {
    const {message}=req.body;
    const {id:receiverId}=req.params;
    const senderId=req.user._Id



 let conversation =   await Conversation.findOne({
        participants:{$all:[senderId,receiverId]}
    })

    if(!conversation){

        conversation = await Conversation.create({
            participants:[senderId,receiverId]
        })
    }
} catch (error) {
    console.log(" eroor in send message controller",error.message)

res.status(500).json({error:"INTERNAL SERVER ERROR"})
}
}