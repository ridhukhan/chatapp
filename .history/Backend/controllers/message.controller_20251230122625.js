import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/Socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [],
            });
        }

        const newMessage = await Message.create({
            conversationId: conversation._id,
            senderId,
            receiverId,
            message,
        });

        conversation.messages.push(newMessage._id);
        await conversation.save();

        // Socket emit - receiver ke notify koro
        const receiverSocketId = getReceiverSocketId(receiverId);
        const senderSocketId = getReceiverSocketId(senderId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
            io.to(getReceiverSocketId(senderId)).emit("newMessage", newMessage);
        }
 if (senderSocketId) {
            io.to(senderSocketId).emit("newMessage", newMessage);
            io.to(getReceiverSocketId(senderId)).emit("newMessage", newMessage);
 }
        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in send message controller:", error.message);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");

        if (!conversation) return res.status(200).json([]);

        res.status(200).json(conversation.messages);

    } catch (error) {
        console.log("Error in get message controller:", error.message);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};