import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { selectedConversation } = useConversation(); // messages আর setMessages লাগবে না

	const sendMessage = async (message) => {
		if (!message.trim()) return; // খালি মেসেজ পাঠানো বন্ধ

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

			// এই লাইনটা পুরোপুরি বাদ দাও!
			// setMessages([...messages, data]);
			// কারণ এখন ব্যাকএন্ড থেকে দুই জনকেই সকেট দিয়ে মেসেজ পাঠানো হচ্ছে
			// useListenMessages হুক নিজেই messages আপডেট করবে

		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};

export default useSendMessage;
