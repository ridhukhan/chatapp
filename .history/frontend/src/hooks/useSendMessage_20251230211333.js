import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message) => {
		if (!message.trim()) return; // খালি মেসেজ পাঠানো বন্ধ করো

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

			// এই লাইনটা রাখো — সেন্ডারের কাছে তৎক্ষণাৎ মেসেজ দেখানোর জন্য
			setMessages([...messages, data]);

		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};

export default useSendMessage;