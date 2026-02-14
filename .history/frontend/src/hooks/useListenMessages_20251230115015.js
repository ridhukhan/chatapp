import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { setMessages, selectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      // ❌ sender side duplicate block
      if (newMessage.senderId === authUser?._id) return;

      // ❌ অন্য conversation হলে ignore
      if (newMessage.conversationId !== selectedConversation?._id) return;

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedConversation?._id, authUser?._id, setMessages]);
};

export default useListenMessages;
