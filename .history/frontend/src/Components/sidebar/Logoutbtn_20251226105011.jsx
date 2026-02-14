import React from 'react'
import { TbLogout2 } from "react-icons/tb";
import { Link } from 'react-router-dom';
const Logoutbtn = () => {
  return (
    <div className='mt-auto'>

<Link to={"/login"}><TbLogout2 className='w-6 h-6 text-amber-950 cursor-pointer'/>
</Link>
    </div>
  )
}

export default Logoutbtn