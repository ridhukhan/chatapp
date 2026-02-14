import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;

      setMessages((prev) => [...prev, newMessage]); // ✅ now SAFE
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages]);
};

export default useListenMessages;
