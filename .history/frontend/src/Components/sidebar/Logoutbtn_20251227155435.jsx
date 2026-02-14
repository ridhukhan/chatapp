import React from 'react'
import { TbLogout2 } from "react-icons/tb";
import { Link } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
const Logoutbtn = () => {

 const {loading,logout}= useLogout()
  return (
    <div className='mt-auto'>

{!loading?(


<TbLogout2 className='w-6 h-6 text-amber-950 cursor-pointer' onClick={logout}/>


):(

  <span className='loading loading-ball'></span>
)}
    </div>
  )
}

export default Logoutbtn