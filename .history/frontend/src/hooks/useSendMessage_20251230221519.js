import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const {  setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message) => {
		if (!message.trim()) return;

		setLoading(true);
		try {
			const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});

			const data = await res.json();
			if (data.error) throw new Error(data.error);

			// অপটিমিস্টিক আপডেট — functional update দিয়ে (সবচেয়ে সেফ)
			setMessages((prev) => [...prev, data]);

		} catch (error) {
			toast.error(error.message || "Failed to send message");
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};

export default useSendMessage;