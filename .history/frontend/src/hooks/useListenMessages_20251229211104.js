import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      console.log("📩 New message received:", newMessage);

      setMessages((prevMessages) => {
        // 🔴 অন্য conversation হলে ignore
        if (
          newMessage.conversationId !==
          selectedConversation?._id
        ) {
          return prevMessages;
        }

        return [...prevMessages, newMessage];
      });
    });

    return () => socket.off("newMessage");
  }, [socket, setMessages, selectedConversation]);
};

export default useListenMessages;
