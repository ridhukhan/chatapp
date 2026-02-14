import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import Logoutbtn from './Logoutbtn'

const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
<SearchInput/>
<div  className=' px-3 min-h-7 overflow-auto'>
<Conversations/>
</div>

<Logoutbtn/>
    </div>
  )
}

export default Sidebar