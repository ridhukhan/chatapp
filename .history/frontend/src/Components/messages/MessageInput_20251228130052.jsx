import React from 'react'
import { useState } from 'react';
import { BiSolidSend } from "react-icons/bi";
import useSendMessage from '../../hooks/useSendMessage';
const MessageInput = () => {

const [message,setMessage]=useState("");
const {loading ,sendMessage}=useSendMessage()

  const handleSubmit = async(e)=>{
e.preventDefault()
if(!message) return ;
await sendMessage(message)
setMessage("")
  }
  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>

<div className='w-full flex'>
<input type="text" className='border text-sm rounded-lg block w-78 p-2.5 bg-gray-700 border-gray-600 text-white' 
placeholder='type a message'
value={message}
onChange={(e)=>setMessage(e.target.value)}
/>

<button type='submit'className='ml-5  ' disabled={loading}>
{loading? <span className='loading loading-spinner'></span>:<BiSolidSend className='max-w-10 '/>}


</button>
</div>

    </form>
  )
}

export default MessageInput