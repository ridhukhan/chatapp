import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/Socket.js";

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		// কনভার্সেশন খুঁজে বের করো বা নতুন তৈরি করো
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		// নতুন মেসেজ তৈরি করো
		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		// ডাটাবেসে সেভ করো (প্যারালালে)
		await Promise.all([conversation.save(), newMessage.save()]);

		// ====== SOCKET IO: শুধু রিসিভারকে রিয়েল-টাইম মেসেজ পাঠাও ======
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// শুধু রিসিভারের সকেটে ইমিট করো
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}
		// ==================================================================

		// API response হিসেবে নতুন মেসেজ রিটার্ন করো (ফ্রন্টএন্ড অপটিমিস্টিক আপডেটের জন্য)
		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // আসল মেসেজগুলো পপুলেট করো

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};