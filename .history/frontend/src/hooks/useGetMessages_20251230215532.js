import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			if (!selectedConversation?._id) return;

			setLoading(true);
			try {
				// get token from localStorage
				const token = localStorage.getItem("chat-token");

				const res = await fetch(
					`/api/message/${selectedConversation._id}`, // make sure backend route matches
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const data = await res.json();

				if (data.error) throw new Error(data.error);

				// update Zustand store
				setMessages(data);
			} catch (error) {
				toast.error(error.message || "Failed to load messages");
			} finally {
				setLoading(false);
			}
		};

		getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};

export default useGetMessages;
