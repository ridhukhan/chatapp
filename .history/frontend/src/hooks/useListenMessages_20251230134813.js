import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { setMessages, selectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (!socket || !selectedConversation || !authUser) {
      console.log("Socket / Conversation / AuthUser missing", { socket, selectedConversation, authUser });
      return;
    }

  const handleNewMessage = (newMessage) => {
  if (!selectedConversation) {
    console.log("No conversation selected yet, skipping message", newMessage);
    return;
  }

  console.log("Received message:", newMessage);

  if (newMessage.senderId === authUser._id) {
    console.log("Ignored own message");
    return;
  }

  const selectedConvId = selectedConversation._id.toString();
  const messageConvId = newMessage.conversationId.toString();

  console.log("Comparing conversation IDs:", { messageConvId, selectedConvId, equal: messageConvId === selectedConvId });

  if (messageConvId !== selectedConvId) {
    console.log("Message for another conversation, ignored");
    return;
  }

  setMessages((prev) => [...prev, newMessage]);
};

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
      console.log("Removed newMessage listener");
    };
  }, [socket, selectedConversation?._id, authUser?._id, setMessages]);
};

export default useListenMessages;
