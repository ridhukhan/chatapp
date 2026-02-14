import { useEffect } from 'react';
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { setMessages } = useConversation(); // messages remove koro, only setMessages

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            console.log("📩 New message received:", newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => socket?.off("newMessage");
    }, [socket, setMessages]); // messages dependency remove

};

export default useListenMessages;