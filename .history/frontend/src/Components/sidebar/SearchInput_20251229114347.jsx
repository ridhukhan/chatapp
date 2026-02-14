import React from 'react'
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import {useGetConversations} from "../../hooks/useGetConversations"
import useConversaton from '../../zustand/useConversation';
import { toast } from 'sonner';
const SearchInput = () => {

  const [search ,setSearch]=useState('')
  const {setSelectedConersation}=useConversaton()
  const {conversations}=useGetConversations()



  const handleSubmit = (e)=>{
e.preventDefault();

if(!search)return;
if(search<3){

  return toast.error("Search term must be at least 3 charecter long ")
}

const conversation =conversations.find((c)=>c.fullname.toLowerCase().includes(search.toLowerCase()))


if(conversation){
  setSelectedConersation(conversation);
  setSearch('')
}else toast.error("no such us found")
  }
  return (
    <form onSubmit={handleSubmit}   className='flex items-center gap-2'>
<input type='text' placeholder='search...' className='input input-bordered rouunded-full'

value={search}
onChange={(e)=>setSearch(e.target.value)}
/>
<button type="submit" className='ml-5 btn-circle'><FaSearch /></button>
    </form>
  )
}

export default SearchInput