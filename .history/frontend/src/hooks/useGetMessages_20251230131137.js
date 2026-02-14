import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import { toast } from "sonner";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation?._id) return;

      setLoading(true);
      try {
        console.log("Fetching messages for conversation:", selectedConversation._id);
        const res = await fetch(`/api/message/${selectedConversation._id}`);
        const text = await res.text();
        const data = text ? JSON.parse(text) : [];
        if (data.error) throw new Error(data.error);

        console.log("Fetched messages:", data);
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
