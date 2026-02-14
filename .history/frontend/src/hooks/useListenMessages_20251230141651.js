import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { selectedConversation, setMessages } = useConversation();
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (!socket || !selectedConversation) return;

    const handleNewMessage = (newMessage) => {
      console.log("Received message:", newMessage);

      // ignore sender's own message
      if (newMessage.senderId === authUser._id) {
        console.log("Ignored own message");
        return;
      }

      // check conversation
      const selectedConvId = selectedConversation._id.toString();
      const messageConvId = newMessage.conversationId.toString();
      console.log("Comparing conversation IDs:", { selectedConvId, messageConvId });

      if (selectedConvId !== messageConvId) {
        console.log("Message for another conversation, ignored");
        return;
      }

      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [socket, selectedConversation?._id, authUser?._id, setMessages]);
};

export default useListenMessages;
