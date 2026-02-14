import { useEffect, useState } from "react";
import {toast} from "sonner";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);

  const {
    messages,
    setMessages,
    selectedConversation,
  } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation?._id) return;

      setLoading(true);
      try {
        const token = localStorage.getItem("chat-token");

        const res = await fetch(
          `/api/message/${selectedConversation._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid messages format");
        }

        // ✅ always set array
        setMessages(data);
      } catch (error) {
        console.error("getMessages error:", error);
        toast.error(error.message || "Failed to load messages");

        // ✅ fallback — keep app stable
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation?._id, setMessages]);

  return {
    messages: Array.isArray(messages) ? messages : [],
    loading,
  };
};

export default useGetMessages;
