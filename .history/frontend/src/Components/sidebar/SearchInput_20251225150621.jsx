import React from 'react'
import { FaSearch } from "react-icons/fa";
const SearchInput = () => {
  return (
    <form className='flex items-center gap-2'>
<input type='text' placeholder='search...' className='input input-bordered rouunded-full'/>
<button type="submit" className='btn btn-circle'><FaSearch /></button>
    </form>
  )
}

export default SearchInput