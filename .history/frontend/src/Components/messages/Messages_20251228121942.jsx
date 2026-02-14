import React from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'

const Messages = () => {


  const {Messages,loading} =useGetMessages()
  console.log("messages",Messages)
  return (
    <div className='  px-4 flex-1 overflow-y-auto'>

{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
{!loading && Messages.length === 0 && (
  <p  className='text-center'>Send a Message to Start the conversation</p>
)}







    </div>
  )
}

export default Messages