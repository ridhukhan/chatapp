import React, { useRef ,useEffect} from 'react'
import useConversaton from '../../zustand/useConversation'
import SearchInput from '../Components/sidebar/SearchInput';

const Conversation = ({conversation,lastIdx,emoji}) => {


const conversationcontainerRef=useRef(null)


const {selectedConversation,setSelectedConversation}=useConversaton()

const isSelected= selectedConversation?._id === conversation._id;




useEffect(() => {
    if (conversationcontainerRef.current) {
     conversationcontainerRef.current.scrollTop =conversationcontainerRef.current.scrollHeight
    }
  }, [selectedConversation])

  return (
    <div>
  
<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
  
  ${isSelected? "bg-sky-600": ""}`}
  onClick={()=>setSelectedConversation(conversation)}
  >
    ref={conversationcontainerRef}
<div className='avatar online'>
<div className='w-12 rounded-full'>
    <img src={conversation.profilepic} alt='user avater' />
</div>
</div>
<div className='flex flex-col flex-1'>

    <div className='flex gap-3 justify-between'>
        <p className='font-bold text-gray-200'>{conversation.fullname}</p>
        <span className='text-2xl'>{emoji}</span>
    </div>
</div>
</div>
{!lastIdx && <div className='divider my-0 py-0 h-1'/>}


    </div>
  )
}

export default Conversation