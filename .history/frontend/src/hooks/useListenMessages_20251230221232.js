import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { setMessages } = useConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;
			// functional update — এটা দিয়ে ডুপ্লিকেট/মিসিং প্রবলেম চলে যাবে
			setMessages((prev) => [...prev, newMessage]);
		});

		// ক্লিনআপ — পুরনো listener রিমুভ করবে
		return () => socket?.off("newMessage");
	}, [socket, setMessages]); // messages dependency বাদ দিয়েছি — এটাই ছিল মূল বাগ!
};

export default useListenMessages;