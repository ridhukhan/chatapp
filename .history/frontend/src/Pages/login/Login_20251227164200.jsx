import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'
const Login = () => {
const [username,setUsername]=useState("")
const [password,setPassword]=useState("")
const {loading,login}=useLogin()
const handleSubmit= async(e)=>{
    e.preventDefault()
    await login(username,password)
}
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>

<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'></div>
<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Login
					<span className='text-blue-500'> ChatApp</span>
				</h1>

<form onSubmit={handleSubmit}>

<div>
    <label className='label p-2'>
        <span className='text-base label-text text-amber-50'>Username</span>
    </label>
    <input type="text" placeholder='Enter username'  className='w-full input input-borderd h-10 text-black bg-amber-50'
    value={username}
    onChange={(e)=>setUsername(e.target.value)}

    />
</div>
<div>
    <label className='label p-2'>
        <span className='text-base label-text text-amber-50'>Password</span>
    </label>
    <input type="text" placeholder='Enter Password'  className=' text-black   w-full input input-borderd h-10 bg-amber-50'
    value={password}
    onChange={(e)=>setPassword(e.target.value)}

    />
</div>
<Link to={"/signup"} className='text-amber-400'>{"Don't" }have an account?</Link>

<div>
<button className='bg-blue-500 px-6 rounded-2xl py-2'> login</button>

</div>
</form>

    </div>
  )
}

export default Login