import React, { useState } from 'react'
import toast from 'react-hot-toast'

const useSignup = () => {
 const [loading,setLoading]=useState(false)


const signup=async({fullname,username,password,confirmpassword, gender})=>{

const success =handleInputErrors({fullname,username,password,confirmpassword, gender})

if(!success)return;

setLoading(true)
try {
    const res= await fetch("http://localhost:8000/api/auth/signup",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({fullname,username,password,confirmpassword, gender})
    })
} catch (error) {
   toast.error(error.message) 
}finally{
    setLoading(false)
}




}







}

export default useSignup


function handleInputErrors({fullname,username,password,confirmpassword, gender}){

    if(!fullname || !username || !password || !confirmpassword ||!gender){


toast.error("please fill in all fields")
return false


    }


if(password!==confirmpassword){
    toast.error("password and confirm pass not match")
    return false
}

if(password.length<6){

    toast.error("password must be at least 6 characters")
    return false
}

return true



}