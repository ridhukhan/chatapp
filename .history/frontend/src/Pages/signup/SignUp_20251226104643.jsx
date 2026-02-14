import React from 'react'
import GendarCheckbox from './GendarCheckbox'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div  className='flex flex-col items-center justify-center min-w-96 mx-auto'>

<div  className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>

	<h1 className='text-3xl font-semibold text-center text-gray-300'>
	Sign Up <span className='text-blue-500'> ChatApp</span></h1>

<form action="">
<div>

    <label  className='label p-2'>
        <span className='text-base label-text'>Full Name</span>
    </label>
    <input type='text' placeholder='Saidur Rahman' className='w-full input input-bordered  h-10' />
</div>

<div>

    <label  className='label p-2'>
        <span className='text-base label-text'>username</span>
    </label>
    <input type='text' placeholder='saidur' className='w-full input input-bordered  h-10' />
</div>

<div>

    <label  className='label p-2'>
        <span className='text-base label-text'>password</span>
    </label>
    <input type='password' placeholder='password' className='w-full input input-bordered  h-10' />
</div>
<div>

    <label  className='label p-2'>
        <span className='text-base label-text'>Confirm password</span>
    </label>
    <input type='text' placeholder='again password' className='w-full input input-bordered  h-10' />
</div>
<GendarCheckbox/>

<Link className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' to={"/login"}>
Already have an account?</Link>

<div>
<button className=' px-6 py-1  rounded btn btn-block btn-sm mt-2 border border-slate-700 bg-blue-500' >Sign Up</button>
</div>










</form>

</div>




    </div>
  )
}

export default SignUp