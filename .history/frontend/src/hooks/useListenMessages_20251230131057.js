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
      console.log("Received message:", newMessage);

      if (newMessage.senderId.toString() === authUser._id.toString()) {
        console.log("Ignored own message");
        return;
      }

      if (newMessage.conversationId.toString() !== selectedConversation._id.toString()) {
        console.log("Message for another conversation, ignored");
        return;
      }

      setMessages((prev) => [...prev, newMessage]);
      console.log("Message added to state");
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
      console.log("Removed newMessage listener");
    };
  }, [socket, selectedConversation?._id, authUser?._id, setMessages]);
};

export default useListenMessages;
