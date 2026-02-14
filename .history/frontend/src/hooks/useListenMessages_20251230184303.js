import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (!socket) return;

		const handleNewMessage = (message) => {
			// only push message if it's not sent by me (authUser)
			if (message.senderId !== authUser._id) {
				setMessages([...messages, message]);
			}
		};

		socket.on("newMessage", handleNewMessage);

		return () => {
			socket.off("newMessage", handleNewMessage);
		};
	}, [socket, messages, setMessages, authUser._id]);
};

export default useListenMessages;