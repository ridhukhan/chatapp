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

        // ✅ EKTA MESSAGE pathao, pura array na
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage); // Single message
        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in send message controller:", error.message);
        res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};