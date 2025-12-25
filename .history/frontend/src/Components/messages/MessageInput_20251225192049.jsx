import React from 'react'
import { BiSolidSend } from "react-icons/bi";
const MessageInput = () => {
  return (
    <form className='px-4 my-3'>

<div className='w-full flex'>
<input type="text" className='border text-sm rounded-lg block w-78 p-2.5 bg-gray-700 border-gray-600 text-white' 
placeholder='type a message'/>

<button type='submit'className='ml-5  '>

<BiSolidSend className='max-w-10'/>

</button>
</div>

    </form>
  )
}

export default MessageInput