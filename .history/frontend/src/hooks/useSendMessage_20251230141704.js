import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { toast } from "sonner";
import { useSocketContext } from "../context/SocketContext";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, setMessages } = useConversation();
  const { socket } = useSocketContext();

  const sendMessage = async (message) => {
    if (!message.trim() || !selectedConversation) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (data?.error) throw new Error(data.error);

      setMessages((prev) => [...prev, data]);

      // send to socket room
      socket.emit("sendMessage", data);

    } catch (error) {
      toast.error(error.message || "Message send failed");
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
