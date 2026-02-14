import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage =async (req,res)=>{
try {
    const {message}=req.body;
    const {id:receiverId}=req.params;
    const senderId=req.user._id



 let conversation =   await Conversation.findOne({
        participants:{$all:[senderId,receiverId]}
    })

    if(!conversation){

        conversation = await Conversation.create({
            participants:[senderId,receiverId],
             messages: [],
        })
    }

    const newMessage = new Message.create({
conversationId:conversation._id,
        senderId,
        receiverId,
        message,
    })

    
        conversation.messages.push(newMessage._id)
        await conversation.save()
    res.status(201).json(newMessage)
   
} catch (error) {
    console.log(" eroor in send message controller",error.message)

res.status(500).json({error:"INTERNAL SERVER ERROR"})
}
}
export const getMessage = async (req,res)=>{

    try {
        const {id:userToChatId}=req.params;
        const senderId = req.user._id;

        const conversation= await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]}
        }).populate("messages")

        if(!conversation) return res.status(200).json([])
const messages = conversation.messages
        res.status(200).json(messages)
    } catch (error) {
         console.log(" eroor in get message controller",error.message)

    }
}

