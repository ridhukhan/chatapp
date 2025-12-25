import React from 'react'

const SearchInput = () => {
  return (
    <form className='flex items-center gap-2'>
<input type='text' placeholder='search...' className='input input-bordered rouunded-full'/>
<button type="submit" className='btn btn-circle'>Icon</button>
    </form>
  )
}

export default SearchInput