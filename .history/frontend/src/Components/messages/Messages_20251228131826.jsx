import React from 'react'

import useGetMessages from '../../hooks/useGetMessages'
import Message from './Message'
import MessageSkeleton from '../skeletons/MessageSkeleton'

const Messages = () => {


  const {messages=[],loading} =useGetMessages()
  console.log("messages",messages)
  return (
    <div className='  px-4 flex-1 overflow-y-auto'>
{!loading && messages.length > 0 && messages.map((msg)=>(


<Message  key={msg._id} message={msg}/>
))}
{loading &&
 [...Array(3)].map((_, idx) =>(<MessageSkeleton key={idx} />))}
{!loading && Messages.length === 0 && (
  <p  className='text-center'>Send a Message to Start the conversation</p>
)}
    </div>
  )
}

export default Messages