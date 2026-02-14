import React, { useEffect, useState } from 'react'
import useConversaton from '../zustand/useConversation'
import { toast } from 'sonner'

const useGetMessages = () => {
  const [loading ,setLoading]=useState(false)
 const {messages,setMessages,selectedConversation}= useConversaton()

useEffect(()=>{
const getMessages =  async  ()=>{
setLoading(true);
    try {
        const res = await fetch(`/api/message/${selectedConversation._id}`);

        const data = await res.json();
        if(data.error) throw new Error(data.error)
            setMessages(data)
    } catch (error) {
toast.error(error.message)
    }finally{
        setLoading(false)
    }
};

    if(selectedConversation?._id) getMessages();

},[selectedConversation?._id,setMessages])






return {messages,loading};

};

export default useGetMessages