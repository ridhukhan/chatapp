import { useState } from "react"
import useConversation from "../zustand/useConversation"
import { toast } from "sonner"

const useSendMessage = () => {
  const [loading, setLoading] = useState(false)

  const {messages, setMessages, selectedConversation } = useConversation()

  const sendMessage = async (message) => {
    if (!message.trim()) return
    if (!selectedConversation) return

    setLoading(true)
    try {
      const res = await fetch(
        `/api/message/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      )

      const data = await res.json()

      if (data?.error) {
        throw new Error(data.error)
      }

      // safe state update
        setMessages([...messages, data])
    } catch (error) {
      toast.error(error.message || "Message send failed")
    } finally {
      setLoading(false)
    }
  }

  return { sendMessage, loading }
}

export default useSendMessage
