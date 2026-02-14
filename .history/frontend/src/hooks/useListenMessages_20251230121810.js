import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { setMessages, selectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (!socket || !selectedConversation) return;

    const handleNewMessage = (newMessage) => {
      // ❌ sender duplicate block
      if (newMessage.senderId === authUser._id) return;

      // ✅ FIX: ObjectId → string compare
      if (
        newMessage.conversationId.toString() !==
        selectedConversation._id.toString()
      ) {
        return;
      }

      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedConversation?._id, authUser?._id, setMessages]);
};

export default useListenMessages;
